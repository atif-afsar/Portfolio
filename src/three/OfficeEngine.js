import * as THREE from "three";
import { Sizes, Mouse, Time } from "./Utils.js";
import Resources from "./Resources.js";
import OfficeRenderer from "./Renderer.js";
import OfficeCamera from "./Camera.js";
import World from "./World.js";
import OfficeAudio from "./Audio.js";
import MonitorScreen from "./MonitorScreen.js";
import sources from "./Sources.js";

// One owning instance of the whole 3D office. Created/destroyed by OfficeScene.jsx.
export default class OfficeEngine {
  constructor({ glEl, cssEl, overlayEl }) {
    this.scene = new THREE.Scene();
    this.cssScene = new THREE.Scene();

    this.sizes = new Sizes();
    this.mouse = new Mouse();
    this.time = new Time();
    this.resources = new Resources(sources);
    this.renderer = new OfficeRenderer({ glEl, cssEl, overlayEl, sizes: this.sizes });
    this.camera = new OfficeCamera({
      scene: this.scene,
      sizes: this.sizes,
      mouse: this.mouse,
      time: this.time,
      // the 3D layer, not <body>, so free-cam dragging can't capture clicks
      // meant for the overlay chips
      controlsEl: this.renderer.css.domElement,
    });
    this.world = new World({ scene: this.scene, resources: this.resources });
    this.audio = new OfficeAudio({ camera: this.camera, resources: this.resources, scene: this.scene });
    this.monitor = new MonitorScreen({
      scene: this.scene,
      cssScene: this.cssScene,
      camera: this.camera,
      resources: this.resources,
    });

    // Forward mouse events into the engine (UI may attach extra listeners)
    document.addEventListener("mousemove", this._onMouseMove);
    document.addEventListener("mousedown", this._onMouseDown);

    this.sizes.on("resize", () => {
      this.camera.resize();
      this.renderer.resize();
    });
    this.time.on("tick", () => this.update());
  }

  _onMouseMove = (event) => this.mouse.trigger("mousemove", [event]);
  _onMouseDown = (event) => this.mouse.trigger("mousedown", [event]);

  update() {
    this.camera.update();
    this.world.update(this.time);
    this.audio.update();
    this.monitor.update();
    this.renderer.render({
      scene: this.scene,
      cssScene: this.cssScene,
      camera: this.camera.instance,
      time: this.time,
    });
  }

  dispose() {
    this.time.dispose();
    this.monitor.dispose();
    this.world.dispose();
    this.audio.dispose();
    this.camera.dispose();
    this.renderer.dispose();
    this.sizes.dispose();
    document.removeEventListener("mousemove", this._onMouseMove);
    document.removeEventListener("mousedown", this._onMouseDown);
  }
}
