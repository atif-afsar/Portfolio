// Asset manifest for the 3D office — only what's actually referenced.
// Paths are relative to / (served from public/office).
const sources = [
  { name: "computerSetupModel", type: "gltfModel", path: "/office/models/Computer/computer_setup.glb" },
  { name: "computerSetupTexture", type: "texture", path: "/office/models/Computer/baked_computer-2048.webp" },
  { name: "environmentModel", type: "gltfModel", path: "/office/models/World/environment.glb" },
  { name: "environmentTexture", type: "texture", path: "/office/models/World/baked_environment-2048.webp" },
  { name: "decorModel", type: "gltfModel", path: "/office/models/Decor/decor.glb" },
  { name: "decorTexture", type: "texture", path: "/office/models/Decor/baked_decor_modified-2048.webp" },
  { name: "monitorSmudgeTexture", type: "texture", path: "/office/textures/monitor/layers/smudges.jpg" },
  { name: "monitorShadowTexture", type: "texture", path: "/office/textures/monitor/layers/shadow-compressed.png" },
  // Audio (used subset only; skipped radio/idle wavs)
  { name: "mouseDown", type: "audio", path: "/office/audio/mouse_down.mp3" },
  { name: "mouseUp", type: "audio", path: "/office/audio/mouse_up.mp3" },
  { name: "keyboardKeydown", type: "audio", path: "/office/audio/key_1.mp3" },
  { name: "keyboardKeydown2", type: "audio", path: "/office/audio/key_2.mp3" },
  { name: "keyboardKeydown3", type: "audio", path: "/office/audio/key_3.mp3" },
  { name: "keyboardKeydown4", type: "audio", path: "/office/audio/key_4.mp3" },
  { name: "keyboardKeydown5", type: "audio", path: "/office/audio/key_5.mp3" },
  { name: "keyboardKeydown6", type: "audio", path: "/office/audio/key_6.mp3" },
  { name: "startup", type: "audio", path: "/office/audio/startup.mp3" },
  { name: "office", type: "audio", path: "/office/audio/office-ambience.mp3" },
  { name: "ccType", type: "audio", path: "/office/audio/type.mp3" },
];

export default sources;
