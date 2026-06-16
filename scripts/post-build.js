import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.resolve(__dirname, '..', 'dist');

console.log('Running post-build script...');

// 1. Copy index.html to 404.html at root
const indexPath = path.join(distPath, "index.html");
if (fs.existsSync(indexPath)) {
  const indexContent = fs.readFileSync(indexPath, "utf-8");
  fs.writeFileSync(path.join(distPath, "404.html"), indexContent);
  console.log('Successfully copied index.html to 404.html');
} else {
  console.error('Error: dist/index.html not found! Post-build copying failed.');
  process.exit(1);
}

// 2. Copy for luizvieira
const luizvieiraPath = path.join(distPath, "luizvieira");
if (fs.existsSync(luizvieiraPath)) {
  const luizIndexPath = path.join(luizvieiraPath, "index.html");
  if (fs.existsSync(luizIndexPath)) {
    const luizIndex = fs.readFileSync(luizIndexPath, "utf-8");
    fs.writeFileSync(path.join(luizvieiraPath, "404.html"), luizIndex);
    console.log('Successfully copied luizvieira index.html to 404.html');
  }
}

// 3. Copy for medpluscomerciohospitalar
const medplusPath = path.join(distPath, "medpluscomerciohospitalar");
if (fs.existsSync(medplusPath)) {
  const medplusIndexPath = path.join(medplusPath, "index.html");
  if (fs.existsSync(medplusIndexPath)) {
    const medplusIndex = fs.readFileSync(medplusIndexPath, "utf-8");
    const subdirs = ["admin", "carrinho", "produtos", "sobre", "contato", "servicos"];
    subdirs.forEach(subdir => {
      const subdirPath = path.join(medplusPath, subdir);
      if (!fs.existsSync(subdirPath)) {
        fs.mkdirSync(subdirPath, { recursive: true });
      }
      fs.writeFileSync(path.join(subdirPath, "index.html"), medplusIndex);
    });
    console.log('Successfully created medplus subdirectory HTML files');
  }
}

console.log('Post-build script finished successfully!');
