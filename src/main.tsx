import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Tema aplicado antes do React via script inline no index.html (anti-FOUC).
// ThemeProvider sincroniza o store após o mount.

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
