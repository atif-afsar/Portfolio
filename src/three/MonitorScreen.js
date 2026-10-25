import * as THREE from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import bus from "./EventBus.js";

const SCREEN_SIZE = { w: 1280, h: 1024 };
const IFRAME_PADDING = 32;

// The monitor screen: a CSS3D iframe (the 2D OS) occluded properly by GL planes,
// with smudge/shadow texture layers and a perspective dimmer (port of the
// reference's MonitorScreen.ts, minus the two static videos — user opted out).
export default class MonitorScreen {
  constructor({ scene, cssScene, camera, resources }) {
    this.scene = scene;
    this.cssScene = cssScene;
    this.camera = camera;
    this.resources = resources;
    this.position = new THREE.Vector3(0, 950, 255);
    this.rotation = new THREE.Euler(-3 * THREE.MathUtils.DEG2RAD, 0, 0);
    this.meshes = [];

    this.initializeScreenEvents();
    this.createIframe();
    const maxOffset = this.createTextureLayers();
    this.createEnclosingPlanes(maxOffset);
    this.createPerspectiveDimmer(maxOffset);
  }

  initializeScreenEvents() {
    this._onMouseMove = (event) => {
      const overIframe = event.target && event.target.id === "computer-screen";
      event.inComputer = overIframe;
      this.inComputer = overIframe;
      if (this.inComputer && !this.prevInComputer) bus.dispatch("enterMonitor", {});
      if (!this.inComputer && this.prevInComputer && !this.mouseClickInProgress) {
        bus.dispatch("leftMonitor", {});
      }
      if (!this.inComputer && this.mouseClickInProgress && this.prevInComputer) {
        this.shouldLeaveMonitor = true;
      } else {
        this.shouldLeaveMonitor = false;
      }
      this.prevInComputer = this.inComputer;
    };
    this._onMouseDown = (event) => {
      this.inComputer = event.inComputer;
      this.mouseClickInProgress = true;
      this.prevInComputer = this.inComputer;
    };
    this._onMouseUp = () => {
      if (this.shouldLeaveMonitor) bus.dispatch("leftMonitor", {});
      this.shouldLeaveMonitor = false;
      this.mouseClickInProgress = false;
    };
    document.addEventListener("mousemove", this._onMouseMove);
    document.addEventListener("mousedown", this._onMouseDown);
    document.addEventListener("mouseup", this._onMouseUp);
  }

  // Re-dispatch input forwarded by the OS (see os/index.html) as real DOM
  // events on the iframe element, flagged `inComputer`. Mouse coordinates are
  // mapped from iframe space into page space. The InfoOverlay also posts
  // `_AUTO_` keydowns from this window to trigger the typing SFX.
  bridgeIframeEvents(iframe) {
    const allowed = new Set(["mousemove", "mousedown", "mouseup", "keydown", "keyup"]);
    this._onMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.source !== iframe.contentWindow && event.source !== window) return;
      const data = event.data;
      if (!data || !allowed.has(data.type)) return;

      const evt = new CustomEvent(data.type, { bubbles: true, cancelable: false });
      evt.inComputer = event.source === iframe.contentWindow;
      if (data.type === "mousemove") {
        const { top, left, width, height } = iframe.getBoundingClientRect();
        evt.clientX = Math.round(data.clientX * (width / SCREEN_SIZE.w) + left);
        evt.clientY = Math.round(data.clientY * (height / SCREEN_SIZE.h) + top);
      } else if (data.type === "keydown" || data.type === "keyup") {
        evt.key = data.key;
      }
      iframe.dispatchEvent(evt);
    };
    window.addEventListener("message", this._onMessage);
  }

  createIframe() {
    const container = document.createElement("div");
    container.style.width = SCREEN_SIZE.w + "px";
    container.style.height = SCREEN_SIZE.h + "px";
    container.style.background = "#1d2e2f";

    const iframe = document.createElement("iframe");
    iframe.src = "/os/";
    iframe.style.width = SCREEN_SIZE.w + "px";
    iframe.style.height = SCREEN_SIZE.h + "px";
    iframe.style.padding = IFRAME_PADDING + "px";
    iframe.style.boxSizing = "border-box";
    iframe.style.border = "0";
    iframe.style.opacity = "0.98";
    iframe.className = "jitter";
    iframe.id = "computer-screen";
    iframe.title = "AtifOS";

    this.bridgeIframeEvents(iframe);
    container.appendChild(iframe);
    this.createCssPlane(container);
  }

  createCssPlane(element) {
    const object = new CSS3DObject(element);
    object.position.copy(this.position);
    object.rotation.copy(this.rotation);
    this.cssScene.add(object);

    // Invisible GL plane so WebGL geometry occludes the CSS plane correctly
    const material = new THREE.MeshLambertMaterial();
    material.side = THREE.DoubleSide;
    material.opacity = 0;
    material.transparent = true;
    material.blending = THREE.NoBlending;
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(SCREEN_SIZE.w, SCREEN_SIZE.h), material);
    mesh.position.copy(object.position);
    mesh.rotation.copy(object.rotation);
    this.scene.add(mesh);
    this.meshes.push(mesh);
  }

  createTextureLayers() {
    const textures = this.resources.items.texture;
    const scaleFactor = 4;
    const layers = [
      { texture: textures.monitorSmudgeTexture, blending: THREE.AdditiveBlending, opacity: 0.12, offset: 24 },
      { texture: textures.monitorShadowTexture, blending: THREE.NormalBlending, opacity: 1, offset: 5 },
    ];

    let maxOffset = -1;
    for (const layer of layers) {
      if (!layer.texture) continue;
      const offset = layer.offset * scaleFactor;
      this.addTextureLayer(layer.texture, layer.blending, layer.opacity, offset);
      maxOffset = Math.max(maxOffset, offset);
    }
    return maxOffset;
  }

  addTextureLayer(texture, blendingMode, opacity, offset) {
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      blending: blendingMode,
      side: THREE.DoubleSide,
      opacity,
      transparent: true,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(SCREEN_SIZE.w, SCREEN_SIZE.h), material);
    mesh.position.copy(this.position).add(new THREE.Vector3(0, 0, offset));
    mesh.rotation.copy(this.rotation);
    this.scene.add(mesh);
    this.meshes.push(mesh);
  }

  createEnclosingPlanes(maxOffset) {
    const planes = [
      {
        size: [maxOffset, SCREEN_SIZE.h],
        pos: new THREE.Vector3(-SCREEN_SIZE.w / 2, 0, maxOffset / 2),
        rot: new THREE.Euler(0, 90 * THREE.MathUtils.DEG2RAD, 0),
      },
      {
        size: [maxOffset, SCREEN_SIZE.h],
        pos: new THREE.Vector3(SCREEN_SIZE.w / 2, 0, maxOffset / 2),
        rot: new THREE.Euler(0, 90 * THREE.MathUtils.DEG2RAD, 0),
      },
      {
        size: [SCREEN_SIZE.w, maxOffset],
        pos: new THREE.Vector3(0, SCREEN_SIZE.h / 2, maxOffset / 2),
        rot: new THREE.Euler(90 * THREE.MathUtils.DEG2RAD, 0, 0),
      },
      {
        size: [SCREEN_SIZE.w, maxOffset],
        pos: new THREE.Vector3(0, -SCREEN_SIZE.h / 2, maxOffset / 2),
        rot: new THREE.Euler(90 * THREE.MathUtils.DEG2RAD, 0, 0),
      },
    ];

    for (const p of planes) {
      const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: 0x48493f });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(p.size[0], p.size[1]), material);
      mesh.position.copy(this.position).add(p.pos);
      mesh.rotation.copy(p.rot);
      this.scene.add(mesh);
      this.meshes.push(mesh);
    }
  }

  createPerspectiveDimmer(maxOffset) {
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      color: 0x000000,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(SCREEN_SIZE.w, SCREEN_SIZE.h), material);
    mesh.position.copy(this.position).add(new THREE.Vector3(0, 0, maxOffset - 5));
    mesh.rotation.copy(this.rotation);
    this.dimmingPlane = mesh;
    this.scene.add(mesh);
    this.meshes.push(mesh);
  }

  update() {
    if (!this.dimmingPlane) return;
    const planeNormal = new THREE.Vector3(0, 0, 1);
    const viewVector = new THREE.Vector3()
      .copy(this.camera.instance.position)
      .sub(this.position)
      .normalize();
    const dot = viewVector.dot(planeNormal);
    const dimPos = this.dimmingPlane.position;
    const camPos = this.camera.instance.position;
    const distance = Math.sqrt(
      (camPos.x - dimPos.x) ** 2 + (camPos.y - dimPos.y) ** 2 + (camPos.z - dimPos.z) ** 2
    );
    const opacity = 1 / (distance / 10000);
    const DIM_FACTOR = 0.7;
    this.dimmingPlane.material.opacity = (1 - opacity) * DIM_FACTOR + (1 - dot) * DIM_FACTOR;
  }

  dispose() {
    document.removeEventListener("mousemove", this._onMouseMove);
    document.removeEventListener("mousedown", this._onMouseDown);
    document.removeEventListener("mouseup", this._onMouseUp);
    window.removeEventListener("message", this._onMessage);
    for (const m of this.meshes) this.scene.remove(m);
    for (const o of Array.from(this.cssScene.children)) this.cssScene.remove(o);
    this.meshes = [];
  }
}
