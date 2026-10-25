import { createRoot } from "react-dom/client";
import OsApp from "./OsApp.jsx";

// Entry for /os/ (os/index.html). No StrictMode: this tree runs inside a CSS3D
// iframe where a single clean mount matters more than dev double-invoking.
createRoot(document.getElementById("root")).render(<OsApp />);
