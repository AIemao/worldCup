import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // TailwindCSS v4 via plugin nativo do Vite (sem PostCSS)
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // alias obrigatório para shadcn/ui
    },
  },
});
