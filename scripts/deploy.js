const ghpages = require('gh-pages');
const path = require('path');

const distPath = path.resolve(__dirname, '..', 'dist');

ghpages.publish(
  distPath,
  {
    branch: 'gh-pages',
    repo: 'https://github.com/garuca/aspec-digital-canvas.git',
    dotfiles: true,
  },
  (err) => {
    if (err) {
      console.error('Error deploying:', err);
      process.exit(1);
    }
    console.log('Deployed successfully!');
  }
);
