import { chromium } from '@playwright/test';
import * as path from 'path';

const artifactsDir = '/Users/garuca/.gemini/antigravity-ide/brain/d8059983-46fd-40d4-af42-f90b8edf4f46';

async function captureVisit(page, visitNumber, name) {
  console.log(`\n--- Visit ${visitNumber} (${name}) ---`);
  console.log('Navigating to http://localhost:8081/...');
  await page.goto('http://localhost:8081/', { waitUntil: 'networkidle', timeout: 15000 });
  
  // Print current localStorage item value
  const heroTypeInStorage = await page.evaluate(() => localStorage.getItem('aspec_hero_type'));
  const renderedHeroType = await page.evaluate(() => {
    // Let's find the active background element
    // Old: canvas with class block/touch-none
    // New: GalaxyBackground (which usually renders particles/canvas inside)
    // Globe: GlobePulse component
    const canvas = document.querySelector('canvas');
    let canvasDetails = null;
    if (canvas) {
      canvasDetails = {
        className: canvas.className,
        style: canvas.getAttribute('style'),
        width: canvas.width,
        height: canvas.height,
        clientWidth: canvas.clientWidth,
        clientHeight: canvas.clientHeight,
        offsetWidth: canvas.offsetWidth,
        offsetHeight: canvas.offsetHeight,
      };
    }
    const hasGlobe = !!document.querySelector('canvas[style*="grab"]');
    const hasNebulaCanvas = !!document.querySelector('canvas[style*="black"]');
    const hasSpline = !!document.querySelector('div.pointer-events-auto canvas');
    const hasAurora = !!document.querySelector('div.bg-slate-950') || !!document.querySelector('div[class*="bg-slate-950"]');
    const hasGalaxy = !hasGlobe && !hasNebulaCanvas && !hasSpline && !hasAurora && !!document.querySelector('canvas');
    return { hasGlobe, hasNebulaCanvas, hasGalaxy, hasSpline, hasAurora, canvasDetails };
  });
  console.log(`State in localStorage AFTER load: ${heroTypeInStorage}`);
  console.log(`Rendered detection:`, renderedHeroType);

  // Wait 3 seconds for WebGL renders to initialize and stabilize
  await page.waitForTimeout(3000);

  const screenshotPath = path.join(artifactsDir, `visit${visitNumber}_${name}.png`);
  console.log(`Saving screenshot to ${screenshotPath}...`);
  await page.screenshot({ path: screenshotPath });
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  page.on('console', msg => {
    console.log(`[BROWSER CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.error(`[BROWSER ERROR]: ${err.message}`);
  });

  // Start fresh by navigating and clearing storage
  console.log('Initializing and clearing localStorage...');
  await page.goto('http://localhost:8081/', { waitUntil: 'networkidle' });
  await page.evaluate(() => localStorage.clear());
  console.log('localStorage cleared.');

  // Let's check canvas dimensions and WebGL support in browser
  const webglSupport = await page.evaluate(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    } catch (e) {
      return false;
    }
  });
  console.log(`Browser reports WebGL support: ${webglSupport}`);

  // Visit 1: Expecting "old" (nebula shader)
  await captureVisit(page, 1, 'old_nebula');

  // Visit 2: Expecting "new" (galaxy)
  await captureVisit(page, 2, 'new_galaxy');

  // Visit 3: Expecting "globe" (globe pulse)
  await captureVisit(page, 3, 'globe_pulse');

  // Visit 4: Expecting "globe-small" (globe small)
  await captureVisit(page, 4, 'globe_small');

  // Visit 5: Expecting "spline" (interactive 3D canvas)
  await captureVisit(page, 5, 'spline');

  // Visit 6: Expecting "aurora" (dynamic aurora background)
  await captureVisit(page, 6, 'aurora');

  // Visit 7: Expecting "old" (nebula shader loop back)
  await captureVisit(page, 7, 'loop_nebula');

  console.log('\nClosing browser...');
  await browser.close();
  console.log('Done!');
}

main().catch(err => {
  console.error('Execution error:', err);
});
