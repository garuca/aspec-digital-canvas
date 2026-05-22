import fs from 'fs';
import path from 'path';

const contentPath = '/Users/garuca/.gemini/antigravity-ide/brain/d8059983-46fd-40d4-af42-f90b8edf4f46/.system_generated/steps/1436/content.md';
const fileContent = fs.readFileSync(contentPath, 'utf8');

// Find all script blocks or JSON-like structures
const regex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;

while ((match = regex.exec(fileContent)) !== null) {
  const scriptContent = match[1];
  if (scriptContent.includes('cobe') || scriptContent.includes('globe') || scriptContent.includes('canvas')) {
    console.log(`--- MATCH ${count} (Length: ${scriptContent.length}) ---`);
    console.log(scriptContent.substring(0, 1000));
    console.log('...\n');
    count++;
  }
}

console.log(`Found ${count} matching script tags.`);
