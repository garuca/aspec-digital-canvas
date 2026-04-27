import { defineConfig, type ViteDevServer } from "vite";
import type { IncomingMessage, ServerResponse } from "http";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

const medplusPlugin = () => ({
  name: "medplus-static",
  configureServer(server: ViteDevServer) {
    server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
      if (req.url?.startsWith("/medpluscomerciohospitalar")) {
        const filePath = req.url.replace("/medpluscomerciohospitalar", "");
        const staticPath = path.resolve(
          __dirname,
          "public/medpluscomerciohospitalar",
          filePath === "/" ? "index.html" : filePath
        );
        if (fs.existsSync(staticPath) && fs.statSync(staticPath).isFile()) {
          const content = fs.readFileSync(staticPath);
          const ext = path.extname(staticPath);
          const contentType =
            ext === ".html"
              ? "text/html"
              : ext === ".js"
              ? "application/javascript"
              : ext === ".css"
              ? "text/css"
              : ext === ".webp"
              ? "image/webp"
              : ext === ".png"
              ? "image/png"
              : "text/plain";
          res.setHeader("Content-Type", contentType);
          return res.end(content);
        }
      }
      next();
    });
  },
});

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
    medplusPlugin(),
    {
      name: "copy-404",
      closeBundle() {
        const distPath = path.resolve(__dirname, "dist");
        const indexContent = fs.readFileSync(path.join(distPath, "index.html"), "utf-8");
        
        fs.writeFileSync(
          path.join(distPath, "404.html"),
          indexContent
        );

        const medplusPath = path.join(distPath, "medpluscomerciohospitalar");
        if (fs.existsSync(medplusPath)) {
          const medplusIndex = fs.readFileSync(
            path.join(medplusPath, "index.html"),
            "utf-8"
          );
          fs.writeFileSync(
            path.join(medplusPath, "_redirects"),
            "/*  /medpluscomerciohospitalar/index.html  200\n"
          );
          
          const subdirs = ["admin", "carrinho", "produtos", "sobre", "contato", "servicos"];
          subdirs.forEach(subdir => {
            const subdirPath = path.join(medplusPath, subdir);
            if (!fs.existsSync(subdirPath)) {
              fs.mkdirSync(subdirPath, { recursive: true });
            }
            fs.writeFileSync(path.join(subdirPath, "index.html"), medplusIndex);
          });
        }
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
