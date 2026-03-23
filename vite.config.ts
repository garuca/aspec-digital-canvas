import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    componentTagger(),
    {
      name: "copy-404",
      closeBundle() {
        const distPath = path.resolve(__dirname, "dist");
        const indexContent = fs.readFileSync(path.join(distPath, "index.html"), "utf-8");
        fs.writeFileSync(
          path.join(distPath, "404.html"),
          indexContent
        );
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
