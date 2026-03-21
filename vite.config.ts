import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/aspec-digital-canvas/',
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    {
      name: "copy-404",
      closeBundle() {
        const distPath = path.resolve(__dirname, "dist");
        const indexContent = fs.readFileSync(path.join(distPath, "index.html"), "utf-8");
        fs.writeFileSync(
          path.join(distPath, "404.html"),
          indexContent.replace('<div id="root"></div>', '<div id="root"><script>sessionStorage.redirect = location.href;</script></div><script>if (sessionStorage.redirect) { sessionStorage.removeItem("redirect"); location.href = "/aspec-digital-canvas/" + location.hash; } else { location.href = "/aspec-digital-canvas/"; }</script>')
        );
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
