import { chromium } from '@playwright/test';

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--ignore-gpu-blocklist',
      '--disable-gpu-sandbox',
      '--use-gl=angle',
      '--use-angle=swiftshader'
    ]
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  console.log('Registering console listeners...');
  page.on('console', msg => {
    console.log(`[BROWSER CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`);
  });

  page.on('pageerror', err => {
    console.error(`[BROWSER ERROR]: ${err.message}`);
  });

  console.log('Navigating to http://localhost:8081/...');
  try {
    await page.goto('http://localhost:8081/', { waitUntil: 'networkidle', timeout: 10000 });
  } catch (err) {
    console.error('Failed to navigate:', err);
  }

  // Wait and capture multiple screenshots to see the progression
  const timings = [2000, 6000, 7000, 10000, 10000]; // cumulative: 2s, 8s, 15s, 25s, 35s
  const labels = ['2s', '8s', '15s', '25s', '35s'];
  
  for (let i = 0; i < timings.length; i++) {
    await page.waitForTimeout(timings[i]);
    const screenshotPath = `/Users/garuca/aspec-digital-canvas/scripts/screenshot_${labels[i]}.png`;
    console.log(`Taking screenshot at ${labels[i]} and saving to ${screenshotPath}...`);
    await page.screenshot({ path: screenshotPath });
  }

  console.log('Closing browser...');
  await browser.close();
}

main().catch(err => {
  console.error('Execution error:', err);
});

