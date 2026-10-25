import * as THREE from "three";
import bus from "./EventBus.js";

const DEFAULT_REF_DISTANCE = 10000;

export default class OfficeAudio {
  constructor({ camera, resources, scene }) {
    this.camera = camera;
    this.resources = resources;
    this.scene = scene;
    this.listener = new THREE.AudioListener();
    camera.instance.add(this.listener);
    this.loadedAudio = resources.items.audio;
    this.audioPool = {};
    this.context = null;

    this.ambienceKey = null;

    this.unsubs = [
      bus.on("loadingScreenDone", () => {
        // Resume audio only after the START click (autoplay policies).
        // Use the listener's context: every THREE.Audio node (and any filter
        // connected to one) must belong to the same AudioContext.
        setTimeout(() => {
          this.context = this.listener.context;
          this.context.resume();
          this.startAmbience();
        }, 150);
      }),
      bus.on("muteToggle", (mute) => {
        this.listener.setMasterVolume(mute ? 0 : 1);
      }),
    ];

    // Input SFX. Events from inside the monitor arrive re-dispatched by
    // MonitorScreen with `inComputer` set (port of AudioSources.ts).
    this.lastKey = "";
    this._onMouseDown = (event) => {
      if (event.inComputer) this.play("mouseDown", { volume: 0.8, position: new THREE.Vector3(800, -300, 1200) });
    };
    this._onMouseUp = (event) => {
      if (event.inComputer) this.play("mouseUp", { volume: 0.8, position: new THREE.Vector3(800, -300, 1200) });
    };
    this._onKeyDown = (event) => {
      const key = event.key || "";
      if (key.includes("_AUTO_")) {
        this.play("ccType", { volume: 0.1, randDetuneScale: 0 });
        return;
      }
      if (!event.inComputer || key === this.lastKey) return;
      this.lastKey = key;
      this.play("keyboardKeydown", {
        volume: 0.8,
        randDetuneScale: 0,
        position: new THREE.Vector3(-300, -400, 1200),
      });
    };
    this._onKeyUp = (event) => {
      if (event.inComputer) this.lastKey = "";
    };
    document.addEventListener("mousedown", this._onMouseDown);
    document.addEventListener("mouseup", this._onMouseUp);
    document.addEventListener("keydown", this._onKeyDown);
    document.addEventListener("keyup", this._onKeyUp);
  }

  startAmbience() {
    if (this.ambienceKey) return;
    this.ambienceKey = this.play("office", { volume: 0.1, loop: true, filter: { type: "lowpass", frequency: 1000 } });
    this.play("startup", { volume: 0.4 });
  }

  play(sourceName, options = {}) {
    if (!this.context) return null;
    const buffer = this.loadedAudio[sourceName];
    if (!buffer) return null;

    const poolKey = sourceName + "_" + Object.keys(this.audioPool).length;
    const positional = options.position ? new THREE.PositionalAudio(this.listener) : new THREE.Audio(this.listener);

    if (options.position) {
      positional.setRefDistance(options.refDistance || DEFAULT_REF_DISTANCE);
      const anchor = new THREE.Mesh(
        new THREE.SphereGeometry(100, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0 })
      );
      anchor.position.copy(options.position);
      anchor.name = poolKey;
      this.scene.add(anchor);
      anchor.userData.audio = positional;
      // Parent the positional audio to the anchor so its position is tracked
      anchor.add(positional);
    }

    positional.setBuffer(buffer);
    if (options.filter) {
      const filter = this.context.createBiquadFilter();
      filter.type = options.filter.type;
      filter.frequency.setValueAtTime(options.filter.frequency, this.context.currentTime);
      positional.setFilter(filter);
    }
    positional.setLoop(options.loop ? true : false);
    positional.setVolume(options.volume || 1);

    const randomName = this.pickVariant(sourceName);
    if (randomName !== sourceName && this.loadedAudio[randomName]) positional.setBuffer(this.loadedAudio[randomName]);
    positional.play();

    const detune = (Math.random() * 200 - 100) * (options.randDetuneScale || 0);
    if (detune) positional.setDetune(detune);
    if (options.pitch) positional.setDetune(options.pitch * 100);

    if (positional.source) {
      positional.source.onended = () => {
        delete this.audioPool[poolKey];
        if (options.position) {
          const obj = this.scene.getObjectByName(poolKey);
          if (obj) this.scene.remove(obj);
        }
      };
      this.audioPool[poolKey] = positional;
    }
    return poolKey;
  }

  pickVariant(name) {
    const keys = Object.keys(this.loadedAudio).filter((k) => k.toLowerCase().includes(name.toLowerCase()));
    if (keys.length === 0) return name;
    return keys[Math.floor(Math.random() * keys.length)];
  }

  setFilterFrequency(key, freq) {
    const a = this.audioPool[key];
    if (!a) return;
    if (!Number.isFinite(freq)) return;
    const f = Math.max(0, Math.min(22050, freq));
    const filter = a.getFilter();
    if (filter) filter.frequency.setValueAtTime(f, a.context.currentTime);
  }

  setVolume(key, volume) {
    this.audioPool[key]?.setVolume(volume);
  }

  // Per-frame: map camera distance to ambience muffle (port of AmbienceAudio.update)
  update() {
    if (!this.ambienceKey) return;
    const p = this.camera.instance.position;
    const distance = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
    const map = (v, a, b, c, d) => c + ((d - c) / (b - a)) * (v - a);
    const freq = map(distance, 0, 10000, 100, 22000);
    const vol = map(distance, 1200, 10000, 0, 0.2);
    this.setFilterFrequency(this.ambienceKey, freq - 3000);
    this.setVolume(this.ambienceKey, Math.min(Math.max(vol, 0.05), 0.1));
  }

  dispose() {
    this.unsubs.forEach((off) => off());
    document.removeEventListener("mousedown", this._onMouseDown);
    document.removeEventListener("mouseup", this._onMouseUp);
    document.removeEventListener("keydown", this._onKeyDown);
    document.removeEventListener("keyup", this._onKeyUp);
    for (const key in this.audioPool) {
      try {
        this.audioPool[key].stop();
      } catch {
        /* already stopped */
      }
    }
    this.audioPool = {};
    // THREE shares one AudioContext across mounts, so suspend rather than close it.
    if (this.context) this.context.suspend().catch(() => {});
    this.context = null;
  }
}
