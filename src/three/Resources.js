import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { AudioLoader } from "three/examples/jsm/loaders/AudioLoader.js";
import bus from "./EventBus.js";

// Loads every entry in Sources.js. Emits progress via the bus; fires 'ready'.
export default class Resources {
  constructor(sources, onProgress) {
    this.sources = sources;
    this.items = { texture: {}, gltfModel: {}, audio: {} };
    this.toLoad = sources.length;
    this.loaded = 0;

    this.gltfLoader = new GLTFLoader();
    this.textureLoader = new THREE.TextureLoader();
    this.audioLoader = new AudioLoader();

    sources.forEach((source) => {
      if (source.type === "gltfModel") {
        this.gltfLoader.load(source.path, (file) => this.sourceLoaded(source, file));
      } else if (source.type === "texture") {
        this.textureLoader.load(source.path, (file) => {
          file.colorSpace = THREE.SRGBColorSpace; // three 0.182 (was .encoding in 0.137)
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "audio") {
        this.audioLoader.load(source.path, (buffer) => this.sourceLoaded(source, buffer));
      }
    });

    if (onProgress) onProgress(this);
  }

  sourceLoaded(source, file) {
    this.items[source.type][source.name] = file;
    this.loaded++;
    bus.dispatch("loadedSource", {
      sourceName: source.name,
      progress: this.loaded / this.toLoad,
      toLoad: this.toLoad,
      loaded: this.loaded,
    });
    if (this.loaded === this.toLoad) bus.dispatch("resourcesReady", {});
  }
}
