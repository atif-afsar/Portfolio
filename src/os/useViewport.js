import { useEffect, useState } from "react";

export const TOOLBAR_HEIGHT = 32;
const COMPACT_BELOW = 760;

const read = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
  compact: window.innerWidth < COMPACT_BELOW,
});

// Viewport size + "compact" flag (phones / narrow windows: maximized windows,
// horizontal nav, single-tap shortcuts).
export default function useViewport() {
  const [viewport, setViewport] = useState(read);
  useEffect(() => {
    const onResize = () => setViewport(read());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return viewport;
}
