// DOM-based event bus (port of the reference's UIEventBus).
// Decouples the Three.js engine from the React UI overlay.
const bus = {
  // Returns an unsubscribe function (safe to return from a React effect).
  on(event, callback) {
    const handler = (e) => callback(e.detail);
    document.addEventListener(event, handler);
    return () => document.removeEventListener(event, handler);
  },
  dispatch(event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
};

export default bus;
