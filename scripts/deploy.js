import ghpages from 'gh-pages';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.resolve(__dirname, '..', 'dist');

console.log('Dist path:', distPath);
console.log('Files to deploy:');
fs.readdirSync(distPath).forEach(f => console.log(' -', f));

ghpages.publish(
  distPath,
  {
    branch: 'gh-pages',
    repo: 'https://github.com/garuca/aspec-digital-canvas.git',
    dotfiles: true,
    message: 'Deploy to GitHub Pages',
  },
  (err) => {
    if (err) {
      console.error('Error deploying:', err);
      process.exit(1);
    }
    console.log('Deployed successfully!');
  }
);
