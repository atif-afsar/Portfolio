import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Easing } from "@tweenjs/tween.js";
import bus from "./EventBus.js";

// cubic-bezier(x1, y1, x2, y2) easing, like CSS. The reference uses
// (0.13, 0.99, 0, 1) for the snappy monitor / free-cam moves.
const bezier = (x1, y1, x2, y2) => {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sampleX = (t) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t) => ((ay * t + by) * t + cy) * t;
  const slopeX = (t) => (3 * ax * t + 2 * bx) * t + cx;
  return (x) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const err = sampleX(t) - x;
      const d = slopeX(t);
      if (Math.abs(err) < 1e-6 || Math.abs(d) < 1e-6) break;
      t -= err / d;
    }
    return sampleY(Math.min(1, Math.max(0, t)));
  };
};
const snappy = bezier(0.13, 0.99, 0, 1);

// Live keyframes (port of the reference's CameraKeyframes.ts). Every keyframe
// updates every frame, so the desk view keeps following the mouse and the
// idle view keeps drifting even while the camera is flying towards them, and
// all of them adapt to the screen's aspect ratio.
const makeKeyframes = ({ sizes, mouse, time }) => {
  const idleOrigin = new THREE.Vector3(-20000, 12000, 20000);
  const deskOrigin = new THREE.Vector3(0, 1800, 5500);
  const monitorOrigin = new THREE.Vector3(0, 950, 2000);

  const idle = { position: idleOrigin.clone(), focal: new THREE.Vector3(0, -1000, 0) };
  idle.update = () => {
    const t = time.elapsed;
    idle.position.x = Math.sin((t + 19000) * 0.00008) * idleOrigin.x;
    idle.position.y = Math.sin((t + 1000) * 0.000004) * 4000 + idleOrigin.y - 3000;
  };

  const desk = {
    position: deskOrigin.clone(),
    focal: new THREE.Vector3(0, 500, 0),
    targetPos: deskOrigin.clone(),
    targetFoc: new THREE.Vector3(0, 500, 0),
  };
  desk.update = () => {
    const { width: w, height: h } = sizes;
    desk.targetFoc.x += (mouse.x - w / 2 - desk.targetFoc.x) * 0.05;
    desk.targetFoc.y += (-(mouse.y - h) - desk.targetFoc.y) * 0.05;
    desk.targetPos.x += (mouse.x - w / 2 - desk.targetPos.x) * 0.025;
    desk.targetPos.y += (-(mouse.y - h * 2) - desk.targetPos.y) * 0.025;
    // taller (portrait) screens back off so the whole desk stays in frame
    desk.targetPos.z = deskOrigin.z + (h / w) * 3000 - 1800;
    desk.focal.copy(desk.targetFoc);
    desk.position.copy(desk.targetPos);
  };

  const monitor = { position: monitorOrigin.clone(), focal: new THREE.Vector3(0, 950, 0) };
  monitor.update = () => {
    const { width: w, height: h } = sizes;
    // fit the whole screen on narrow / portrait viewports
    monitor.position.z = monitorOrigin.z + (h / w) * 1200 - (w < 768 ? 0 : 600);
  };

  const fixed = (p, f) => ({ position: p, focal: f, update() {} });
  return {
    idle,
    desk,
    monitor,
    loading: fixed(new THREE.Vector3(-35000, 35000, 35000), new THREE.Vector3(0, -5000, 0)),
    orbit: fixed(new THREE.Vector3(-15000, 10000, 15000), new THREE.Vector3(-100, 350, 0)),
  };
};

export default class OfficeCamera {
  constructor({ scene, sizes, mouse, time, controlsEl }) {
    this.sizes = sizes;
    this.time = time;
    this.keyframes = makeKeyframes({ sizes, mouse, time });

    this.instance = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 10, 900000);
    this.position = this.keyframes.loading.position.clone();
    this.focalPoint = this.keyframes.loading.focal.clone();
    this.currentKeyframe = "loading";
    this.targetKeyframe = undefined;
    this.flight = null;
    this.freeCam = false;
    scene.add(this.instance);

    // the 3D layer, not <body>, so free-cam dragging can't capture clicks meant
    // for the overlay chips. Off until free-cam (it captures the pointer).
    this.orbitControls = new OrbitControls(this.instance, controlsEl);
    this.orbitControls.enablePan = false;
    this.orbitControls.enableDamping = true;
    this.orbitControls.dampingFactor = 0.05;
    this.orbitControls.maxPolarAngle = Math.PI / 2;
    this.orbitControls.minDistance = 4000;
    this.orbitControls.maxDistance = 29000;
    this.orbitControls.target.copy(this.keyframes.orbit.focal);
    this.orbitControls.enabled = false;

    // Click toggles idle <-> desk (the "walk in" mechanic)
    this._onMouseDown = (event) => {
      if (this.freeCam) return;
      if (event.target?.closest?.("[data-prevent-click]")) return;
      const at = (k) => this.currentKeyframe === k || this.targetKeyframe === k;
      if (at("idle")) this.transition("desk");
      else if (at("desk")) this.transition("idle");
    };
    document.addEventListener("mousedown", this._onMouseDown);

    this.unsubs = [
      bus.on("loadingScreenDone", () => this.transition("idle", 2500, Easing.Exponential.Out)),
      bus.on("enterMonitor", () => this.transition("monitor", 2000, snappy)),
      bus.on("leftMonitor", () => this.transition("desk")),
      bus.on("freeCamToggle", (on) => {
        if (on) {
          this.transition("orbit", 750, snappy, () => {
            this.instance.position.copy(this.keyframes.orbit.position);
            this.orbitControls.target.copy(this.keyframes.orbit.focal);
            this.orbitControls.enabled = true;
            this.orbitControls.update();
            this.freeCam = true;
          });
        } else {
          this.freeCam = false;
          this.orbitControls.enabled = false;
          this.transition("idle", 4000, Easing.Exponential.Out);
        }
      }),
    ];
  }

  // Fly from wherever the camera is now to a (possibly moving) keyframe.
  transition(key, duration = 1000, easing = Easing.Quintic.InOut, callback) {
    if (this.currentKeyframe === key) return;
    this.currentKeyframe = undefined;
    this.targetKeyframe = key;
    this.flight = {
      key,
      start: this.time.elapsed,
      duration,
      easing,
      callback,
      fromPos: this.position.clone(),
      fromFoc: this.focalPoint.clone(),
    };
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    if (this.freeCam) {
      this.orbitControls.update();
      this.position.copy(this.instance.position);
      this.focalPoint.copy(this.orbitControls.target);
      return;
    }

    for (const k in this.keyframes) this.keyframes[k].update();

    if (this.flight) {
      const f = this.flight;
      const kf = this.keyframes[f.key];
      const p = Math.min(1, (this.time.elapsed - f.start) / f.duration);
      const e = f.easing(p);
      this.position.lerpVectors(f.fromPos, kf.position, e);
      this.focalPoint.lerpVectors(f.fromFoc, kf.focal, e);
      if (p >= 1) {
        this.flight = null;
        this.currentKeyframe = f.key;
        this.targetKeyframe = undefined;
        f.callback?.();
      }
    } else if (this.currentKeyframe) {
      const kf = this.keyframes[this.currentKeyframe];
      this.position.copy(kf.position);
      this.focalPoint.copy(kf.focal);
    }

    this.instance.position.copy(this.position);
    this.instance.lookAt(this.focalPoint);
  }

  dispose() {
    this.unsubs.forEach((off) => off());
    document.removeEventListener("mousedown", this._onMouseDown);
    this.orbitControls.dispose();
  }
}
