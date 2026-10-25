// DOM-based event bus (port of the reference's UIEventBus).
// Decouples the Three.js engine from the React UI overlay.
const bus = {
  on(event, callback) {
    const handler = (e) => callback(e.detail);
    handler._raw = callback;
    document.addEventListener(event, handler);
    return handler;
  },
  off(event, handlerOrRaw) {
    const handler =
      typeof handlerOrRaw === "function" && handlerOrRaw._raw
        ? handlerOrRaw
        : (e) => handlerOrRaw(e.detail);
    document.removeEventListener(event, handler);
  },
  dispatch(event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
};

export default bus;
