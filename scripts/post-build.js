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
// 4. Generate school/index.html with School-specific OG tags
const schoolDir = path.join(distPath, "school");
if (!fs.existsSync(schoolDir)) {
  fs.mkdirSync(schoolDir, { recursive: true });
}
// Start from the built index.html (has correct bundled script/CSS refs)
let schoolHtml = fs.readFileSync(indexPath, "utf-8");
// Replace title
schoolHtml = schoolHtml.replace(
  /<title>.*?<\/title>/,
  '<title>ASPEC School Navigator - Gestão Escolar Inteligente</title>'
);
// Replace meta description
schoolHtml = schoolHtml.replace(
  /<meta name="description" content="[^"]*" \/>/,
  '<meta name="description" content="Aumente a retenção de alunos e recupere sua receita com inteligência de dados. IA preditiva de evasão, cobrança automatizada e app nativo." />'
);
// Replace OG tags
schoolHtml = schoolHtml.replace(
  /<meta property="og:title" content="[^"]*" \/>/,
  '<meta property="og:title" content="ASPEC School Navigator - Gestão Escolar Inteligente" />'
);
schoolHtml = schoolHtml.replace(
  /<meta property="og:description" content="[^"]*" \/>/,
  '<meta property="og:description" content="Aumente a retenção de alunos e recupere sua receita com inteligência de dados. Payback em menos de 2 meses." />'
);
schoolHtml = schoolHtml.replace(
  /<meta property="og:url" content="[^"]*" \/>/,
  '<meta property="og:url" content="https://aspec.ia.br/school" />'
);
// Replace Twitter tags
schoolHtml = schoolHtml.replace(
  /<meta name="twitter:title" content="[^"]*" \/>/,
  '<meta name="twitter:title" content="ASPEC School Navigator - Gestão Escolar Inteligente" />'
);
schoolHtml = schoolHtml.replace(
  /<meta name="twitter:description" content="[^"]*" \/>/,
  '<meta name="twitter:description" content="Aumente a retenção de alunos e recupere sua receita com inteligência de dados. Payback em menos de 2 meses." />'
);
fs.writeFileSync(path.join(schoolDir, "index.html"), schoolHtml);
console.log('Successfully generated school/index.html with School-specific OG tags');


// 5. Ensure academia directory exists in dist (static HTML served from public/)
const academiaDir = path.join(distPath, "academia");
if (fs.existsSync(academiaDir)) {
  console.log('Academia directory found in dist (served from public/)');
} else {
  console.log('Warning: academia directory not found in dist');
}

console.log('Post-build script finished successfully!');
