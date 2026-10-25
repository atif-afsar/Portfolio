import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import TWEEN from "@tweenjs/tween.js";
import bus from "./EventBus.js";

// Keyframe positions (ported from reference, world units ~ cm).
const keys = {
  idle: { position: new THREE.Vector3(-20000, 12000, 20000), focal: new THREE.Vector3(0, -1000, 0) },
  monitor: { position: new THREE.Vector3(0, 950, 2000), focal: new THREE.Vector3(0, 950, 0) },
  desk: { position: new THREE.Vector3(0, 1800, 5500), focal: new THREE.Vector3(0, 500, 0) },
  loading: { position: new THREE.Vector3(-35000, 35000, 35000), focal: new THREE.Vector3(0, -5000, 0) },
  orbit: { position: new THREE.Vector3(-15000, 10000, 15000), focal: new THREE.Vector3(-100, 350, 0) },
};

export default class OfficeCamera {
  constructor({ scene, sizes, mouse, time }) {
    this.scene = scene;
    this.sizes = sizes;
    this.mouse = mouse;
    this.time = time;

    this.instance = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 10, 900000);
    this.position = new THREE.Vector3().copy(keys.loading.position);
    this.focalPoint = new THREE.Vector3().copy(keys.loading.focal);
    this.currentKeyframe = "loading";
    this.freeCam = false;

    scene.add(this.instance);

    this.orbitControls = new OrbitControls(this.instance, document.body);
    this.orbitControls.enablePan = false;
    this.orbitControls.enableDamping = true;
    this.orbitControls.dampingFactor = 0.05;
    this.orbitControls.maxPolarAngle = Math.PI / 2;
    this.orbitControls.minDistance = 4000;
    this.orbitControls.maxDistance = 29000;
    this.orbitControls.target.set(...keys.orbit.focal.toArray());

    bus.on("loadingScreenDone", () => this.transition("idle", 2500, TWEEN.Easing.Exponential.Out));

    // Click toggles idle<->desk (the "walk in" mechanic)
    this._onMouseDown = () => {
      if (this.freeCam) return;
      if (this.currentKeyframe === "idle" || this.targetKeyframe === "idle") {
        this.transition("desk");
      } else if (this.currentKeyframe === "desk" || this.targetKeyframe === "desk") {
        this.transition("idle");
      }
    };
    document.addEventListener("mousedown", this._onMouseDown);

    bus.on("enterMonitor", () => this.transition("monitor", 2000, TWEEN.Easing.Quintic.InOut));
    bus.on("leftMonitor", () => this.transition("desk"));
    bus.on("freeCamToggle", (toggle) => {
      if (toggle) {
        this.transition("orbit", 750, TWEEN.Easing.Quintic.InOut, () => {
          // hand control to OrbitControls: it already drives the camera
          this.orbitControls.target.copy(keys.orbit.focal);
          this.orbitControls.update();
          this.freeCam = true;
        });
      } else {
        this.freeCam = false;
        this.transition("idle", 4000, TWEEN.Easing.Exponential.Out);
      }
    });
  }

  transition(key, duration = 1000, easing = TWEEN.Easing.Quintic.InOut, callback) {
    if (this.currentKeyframe === key) return;
    TWEEN.removeAll();
    this.currentKeyframe = undefined;
    this.targetKeyframe = key;
    const kf = keys[key];
    const posTween = new TWEEN.Tween(this.position).to(kf.position, duration).easing(easing).onComplete(() => {
      this.currentKeyframe = key;
      this.targetKeyframe = undefined;
      if (callback) callback();
    });
    const focTween = new TWEEN.Tween(this.focalPoint).to(kf.focal, duration).easing(easing);
    posTween.start();
    focTween.start();
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    TWEEN.update();

    if (this.freeCam && this.orbitControls) {
      // OrbitControls moved the camera this frame — follow it
      this.position.copy(this.instance.position);
      this.focalPoint.copy(this.orbitControls.target);
      this.orbitControls.update();
      this.instance.lookAt(this.focalPoint);
      return;
    } else {
      // idle drift + desk mouse parallax
      const kf = keys[this.currentKeyframe];
      if (this.currentKeyframe === "idle" && kf) {
        const t = this.time.elapsed;
        const drift = new THREE.Vector3(
          Math.sin((t + 19000) * 0.00008) * kf.position.x,
          Math.sin((t + 1000) * 0.000004) * 4000 + kf.position.y - 3000,
          kf.position.z
        );
        this.position.copy(drift);
      }
      if (this.currentKeyframe === "desk" && kf) {
        const w = this.sizes.width;
        const h = this.sizes.height;
        const aspect = h / w;
        this.focalPoint.x += (this.mouse.x - w / 2 - this.focalPoint.x) * 0.05;
        this.focalPoint.y += (-(this.mouse.y - h) - this.focalPoint.y) * 0.05;
        this.position.x += (this.mouse.x - w / 2 - this.position.x) * 0.025;
        this.position.z = kf.position.z + aspect * 3000 - 1800;
      }
    }

    this.instance.position.copy(this.position);
    this.instance.lookAt(this.focalPoint);
  }

  dispose() {
    document.removeEventListener("mousedown", this._onMouseDown);
    this.orbitControls.dispose();
  }
}
