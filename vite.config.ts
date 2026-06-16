import { defineConfig, type ViteDevServer } from "vite";
import type { IncomingMessage, ServerResponse } from "http";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

const vividPlugin = () => ({
  name: "vivid-static",
  configureServer(server: ViteDevServer) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url?.startsWith("/vivid")) {
        const filePath = req.url.replace("/vivid", "");
        const staticPath = path.resolve(
          __dirname,
          "public/vivid",
          filePath === "/" || filePath === "" ? "index.html" : filePath
        );
        if (fs.existsSync(staticPath) && fs.statSync(staticPath).isFile()) {
          const content = fs.readFileSync(staticPath);
          const ext = path.extname(staticPath);
          const contentType =
            ext === ".html" ? "text/html"
            : ext === ".js" ? "application/javascript"
            : ext === ".css" ? "text/css"
            : ext === ".webp" ? "image/webp"
            : ext === ".png" ? "image/png"
            : "text/plain";
          res.setHeader("Content-Type", contentType);
          return res.end(content);
        }
      }
      next();
    });
  },
});

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

const staticContentTypes: Record<string, string> = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const serveStaticSubapp = (mount: string, publicDir: string) => ({
  configureServer(server: ViteDevServer) {
    server.middlewares.use(async (req, res, next) => {
      if (!req.url?.startsWith(mount)) {
        next();
        return;
      }
      const filePath = req.url.replace(mount, "");
      const staticPath = path.resolve(
        __dirname,
        publicDir,
        filePath === "/" || filePath === "" ? "index.html" : filePath.replace(/^\//, "")
      );
      if (fs.existsSync(staticPath) && fs.statSync(staticPath).isFile()) {
        const content = fs.readFileSync(staticPath);
        const ext = path.extname(staticPath);
        res.setHeader("Content-Type", staticContentTypes[ext] ?? "text/plain");
        res.end(content);
        return;
      }
      next();
    });
  },
});

const luizvieiraPlugin = () => ({
  name: "luizvieira-static",
  ...serveStaticSubapp("/luizvieira", "public/luizvieira"),
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
    vividPlugin(),
    medplusPlugin(),
    luizvieiraPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
