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

  // Start context
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });

  // Visit 1: Initial Load (Should show the Old Hero)
  console.log('--- VISIT 1: INITIAL LOAD ---');
  const page1 = await context.newPage();
  
  // Clear any existing localStorage state first to simulate a clean first-time user visit
  await page1.goto('http://localhost:8081/');
  await page1.evaluate(() => localStorage.clear());
  
  // Reload to perform the first clean visit
  console.log('Reloading to perform Visit 1...');
  await page1.reload({ waitUntil: 'networkidle' });
  await page1.waitForTimeout(3000);
  
  const path1 = '/Users/garuca/.gemini/antigravity-ide/brain/d8059983-46fd-40d4-af42-f90b8edf4f46/visit1_old_hero.png';
  console.log(`Taking screenshot of Visit 1 (Old Hero expected) and saving to ${path1}...`);
  await page1.screenshot({ path: path1 });
  await page1.close();

  // Visit 2: Refresh/Consecutive Load (Should show the New Hero)
  console.log('--- VISIT 2: SECOND LOAD ---');
  const page2 = await context.newPage();
  
  console.log('Navigating for Visit 2...');
  await page2.goto('http://localhost:8081/', { waitUntil: 'networkidle' });
  await page2.waitForTimeout(3000);
  
  const path2 = '/Users/garuca/.gemini/antigravity-ide/brain/d8059983-46fd-40d4-af42-f90b8edf4f46/visit2_new_hero.png';
  console.log(`Taking screenshot of Visit 2 (New Hero expected) and saving to ${path2}...`);
  await page2.screenshot({ path: path2 });
  await page2.close();

  // Visit 3: Third Load (Should show the Old Hero again)
  console.log('--- VISIT 3: THIRD LOAD ---');
  const page3 = await context.newPage();
  
  console.log('Navigating for Visit 3...');
  await page3.goto('http://localhost:8081/', { waitUntil: 'networkidle' });
  await page3.waitForTimeout(3000);
  
  const path3 = '/Users/garuca/.gemini/antigravity-ide/brain/d8059983-46fd-40d4-af42-f90b8edf4f46/visit3_old_hero.png';
  console.log(`Taking screenshot of Visit 3 (Old Hero expected) and saving to ${path3}...`);
  await page3.screenshot({ path: path3 });
  await page3.close();

  console.log('Closing browser...');
  await browser.close();
  console.log('Verification script completed!');
}

main().catch(err => {
  console.error('Execution error:', err);
});
