import * as THREE from "three";
import bus from "./EventBus.js";

// Applies a baked lightmap texture to every mesh of a loaded GLTF scene
// (the "baked GI" trick — no real lights needed).
function applyBakedTexture(gltfScene, texture, scale = 900) {
  texture.flipY = false;
  const material = new THREE.MeshBasicMaterial({ map: texture });
  gltfScene.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.scale.set(scale, scale, scale);
      child.material = material;
    }
  });
  return gltfScene.scene;
}

// Perlin-noise coffee steam (port of the reference's GLSL pair).
const COFFEE_VERT = `
uniform float uTime;
varying vec2 vUv;
vec2 fade(vec2 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
float perlin2d(vec2 P){
  vec4 Pi=floor(P.xyxy)+vec4(0.0,0.0,1.0,1.0);
  vec4 Pf=fract(P.xyxy)-vec4(0.0,0.0,1.0,1.0);
  Pi=mod(Pi,289.0);
  vec4 ix=Pi.xzxz; vec4 iy=Pi.yyww; vec4 fx=Pf.xzxz; vec4 fy=Pf.yyww;
  vec4 i=permute(permute(ix)+iy);
  vec4 gx=2.0*fract(i*0.0243902439)-1.0;
  vec4 gy=abs(gx)-0.5; vec4 tx=floor(gx+0.5); gx=gx-tx;
  vec2 g00=vec2(gx.x,gy.x); vec2 g10=vec2(gx.y,gy.y);
  vec2 g01=vec2(gx.z,gy.z); vec2 g11=vec2(gx.w,gy.w);
  vec4 norm=1.79284291400159-0.85373472095314*vec4(dot(g00,g00),dot(g01,g01),dot(g10,g10),dot(g11,g11));
  g00*=norm.x; g01*=norm.y; g10*=norm.z; g11*=norm.w;
  float n00=dot(g00,vec2(fx.x,fy.x)); float n10=dot(g10,vec2(fx.y,fy.y));
  float n01=dot(g01,vec2(fx.z,fy.z)); float n11=dot(g11,vec2(fx.w,fy.w));
  vec2 fade_xy=fade(Pf.xy);
  vec2 n_x=mix(vec2(n00,n01),vec2(n10,n11),fade_xy.x);
  float n_xy=mix(n_x.x,n_x.y,fade_xy.y);
  return 2.3*n_xy;
}
void main(){
  vec3 newPosition=position;
  vec2 displacementUv=uv;
  displacementUv*=5.0;
  displacementUv.y-=uTime*0.0002;
  float displacementStrength=pow(uv.y*3.0,2.0);
  float perlin=perlin2d(displacementUv)*displacementStrength;
  newPosition.y+=perlin*0.1;
  vec4 modelPosition=modelMatrix*vec4(newPosition,1.0);
  vec4 viewPosition=viewMatrix*modelPosition;
  vec4 projectionPosition=projectionMatrix*viewPosition;
  gl_Position=projectionPosition;
  vUv=uv;
}`;

const COFFEE_FRAG = `
uniform float uTime;
uniform float uTimeFrequency;
uniform vec2 uUvFrequency;
uniform vec3 uColor;
varying vec2 vUv;
vec2 fade(vec2 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
float perlin2d(vec2 P){
  vec4 Pi=floor(P.xyxy)+vec4(0.0,0.0,1.0,1.0);
  vec4 Pf=fract(P.xyxy)-vec4(0.0,0.0,1.0,1.0);
  Pi=mod(Pi,289.0);
  vec4 ix=Pi.xzxz; vec4 iy=Pi.yyww; vec4 fx=Pf.xzxz; vec4 fy=Pf.yyww;
  vec4 i=permute(permute(ix)+iy);
  vec4 gx=2.0*fract(i*0.0243902439)-1.0;
  vec4 gy=abs(gx)-0.5; vec4 tx=floor(gx+0.5); gx=gx-tx;
  vec2 g00=vec2(gx.x,gy.x); vec2 g10=vec2(gx.y,gy.y);
  vec2 g01=vec2(gx.z,gy.z); vec2 g11=vec2(gx.w,gy.w);
  vec4 norm=1.79284291400159-0.85373472095314*vec4(dot(g00,g00),dot(g01,g01),dot(g10,g10),dot(g11,g11));
  g00*=norm.x; g01*=norm.y; g10*=norm.z; g11*=norm.w;
  float n00=dot(g00,vec2(fx.x,fy.x)); float n10=dot(g10,vec2(fx.y,fy.y));
  float n01=dot(g01,vec2(fx.z,fy.z)); float n11=dot(g11,vec2(fx.w,fy.w));
  vec2 fade_xy=fade(Pf.xy);
  vec2 n_x=mix(vec2(n00,n01),vec2(n10,n11),fade_xy.x);
  float n_xy=mix(n_x.x,n_x.y,fade_xy.y);
  return 2.3*n_xy;
}
void main(){
  vec2 uv=vUv*uUvFrequency;
  uv.y-=uTime*uTimeFrequency;
  float borderAlpha=min(vUv.x*4.0,(1.0-vUv.x)*4.0);
  borderAlpha=borderAlpha*(1.0-vUv.y);
  float perlin=perlin2d(uv);
  perlin*=borderAlpha;
  perlin*=0.6;
  perlin=min(perlin,1.0);
  gl_FragColor=vec4(uColor,perlin);
}`;

export default class World {
  constructor({ scene, resources }) {
    this.scene = scene;
    this.resources = resources;
    this.groups = [];
    this.coffee = null;
    this.disposed = false;

    // Build once resources finish loading
    bus.on("resourcesReady", () => this.build());
    // Build immediately if already ready (React re-mount case)
    if (resources.loaded === resources.toLoad) this.build();
  }

  build() {
    if (this.built || this.disposed) return;
    const items = this.resources.items;

    const computer = applyBakedTexture(items.gltfModel.computerSetupModel, items.texture.computerSetupTexture);
    const environment = applyBakedTexture(items.gltfModel.environmentModel, items.texture.environmentTexture);
    const decor = applyBakedTexture(items.gltfModel.decorModel, items.texture.decorTexture);
    this.scene.add(computer, environment, decor);
    this.groups.push(computer, environment, decor);

    // Coffee steam
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      vertexShader: COFFEE_VERT,
      fragmentShader: COFFEE_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uTimeFrequency: { value: 0.001 },
        uUvFrequency: { value: new THREE.Vector2(3, 5) },
        uColor: { value: new THREE.Color("#c9c9c9") },
      },
    });
    this.coffee = new THREE.Mesh(new THREE.PlaneGeometry(280, 700), material);
    this.coffee.position.set(1670, 200, 900);
    this.scene.add(this.coffee);
    this.groups.push(this.coffee);
    this.built = true;
  }

  update(time) {
    if (this.coffee) this.coffee.material.uniforms.uTime.value = time.elapsed;
  }

  dispose() {
    this.disposed = true;
    for (const g of this.groups) {
      this.scene.remove(g);
      g.traverse?.((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose?.());
      });
    }
    this.groups = [];
  }
}
