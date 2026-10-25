import * as THREE from "three";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";

// Full-screen film-grain overlay (port of the reference's screen shader).
const SCREEN_VERT = `
varying vec2 vUv;
void main(){ vUv=uv; gl_Position=vec4(position,1.0); }`;

const SCREEN_FRAG = `
#ifdef GL_ES
precision mediump float;
#endif
const float PHI=1.61803398874989484820459;
uniform float u_time;
float noise(vec2 xy,float seed){return fract(tan(distance(xy*PHI,xy)*seed)*xy.x);}
void main(){
  gl_FragColor=vec4(noise(gl_FragCoord.xy,fract(u_time)+1.0),
                    noise(gl_FragCoord.xy,fract(u_time)+2.0),
                    noise(gl_FragCoord.xy,fract(u_time)+3.0),0.01);
}`;

export default class OfficeRenderer {
  constructor({ glEl, cssEl, overlayEl, sizes }) {
    this.sizes = sizes;

    this.gl = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    this.gl.outputColorSpace = THREE.SRGBColorSpace;
    this.gl.setPixelRatio(Math.min(sizes.pixelRatio, 2));
    this.gl.setSize(sizes.width, sizes.height);
    this.gl.setClearColor(0x000000, 0);
    this.gl.domElement.style.position = "absolute";
    this.gl.domElement.style.top = "0px";
    this.gl.domElement.style.zIndex = "1";
    glEl.appendChild(this.gl.domElement);

    this.css = new CSS3DRenderer();
    this.css.setSize(sizes.width, sizes.height);
    this.css.domElement.style.position = "absolute";
    this.css.domElement.style.top = "0px";
    this.css.domElement.style.zIndex = "1";
    cssEl.appendChild(this.css.domElement);

    this.overlay = new THREE.WebGLRenderer();
    this.overlay.setPixelRatio(Math.min(sizes.pixelRatio, 2));
    this.overlay.setSize(sizes.width, sizes.height);
    this.overlay.domElement.style.position = "absolute";
    this.overlay.domElement.style.top = "0px";
    this.overlay.domElement.style.zIndex = "2";
    this.overlay.domElement.style.mixBlendMode = "soft-light";
    this.overlay.domElement.style.opacity = "0.12";
    this.overlay.domElement.style.pointerEvents = "none";
    overlayEl.appendChild(this.overlay.domElement);

    // Overlay scene: a big grain plane that follows the camera
    this.overlayScene = new THREE.Scene();
    this.uniforms = { u_time: { value: 1 } };
    this.grain = new THREE.Mesh(
      new THREE.PlaneGeometry(10000, 10000),
      new THREE.ShaderMaterial({
        vertexShader: SCREEN_VERT,
        fragmentShader: SCREEN_FRAG,
        uniforms: this.uniforms,
        depthTest: false,
        depthWrite: false,
      })
    );
    this.overlayScene.add(this.grain);
  }

  resize() {
    const s = this.sizes;
    this.gl.setSize(s.width, s.height);
    this.gl.setPixelRatio(Math.min(s.pixelRatio, 2));
    this.css.setSize(s.width, s.height);
    this.overlay.setSize(s.width, s.height);
    this.overlay.setPixelRatio(Math.min(s.pixelRatio, 2));
  }

  render({ scene, cssScene, camera, time }) {
    this.uniforms.u_time.value = Math.sin((time.current || 1) * 0.01);
    this.gl.render(scene, camera);
    this.css.render(cssScene, camera);
    this.grain.position.copy(camera.position);
    this.overlay.render(this.overlayScene, camera);
  }

  dispose() {
    this.gl.dispose();
    this.overlay.dispose();
    this.gl.domElement.remove();
    this.css.domElement.remove();
    this.overlay.domElement.remove();
  }
}
