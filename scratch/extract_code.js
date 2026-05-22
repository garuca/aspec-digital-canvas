import fs from 'fs';

const contentPath = '/Users/garuca/.gemini/antigravity-ide/brain/d8059983-46fd-40d4-af42-f90b8edf4f46/.system_generated/steps/1436/content.md';
const fileContent = fs.readFileSync(contentPath, 'utf8');

// We want to find: self.__next_f.push([1,"\"use client\"..."])
// Let's find self.__next_f.push([1,"..."]) or self.__next_f.push([1,"\"use client\"..."])
const regex = /self\.__next_f\.push\(\[1,\s*"(.*?)"\]\)/g;
let match;
let found = false;

while ((match = regex.exec(fileContent)) !== null) {
  const content = match[1];
  if (content.includes('use client') && content.includes('createGlobe')) {
    // Decode JavaScript string escapes
    // We can wrap it in quotes and parse it with JSON.parse to properly unescape it
    try {
      // JSON.parse needs double quotes, and double quotes inside need to be escaped properly.
      // Since it was a JS string literal, we can parse it as a JSON string by prefixing and suffixing quotes
      // and converting backslashes if needed, or by using eval.
      // Let's use Function to evaluate it safely as a string literal.
      const unescaped = new Function(`return "${content}";`)();
      console.log("Successfully extracted code!");
      fs.writeFileSync('/Users/garuca/aspec-digital-canvas/src/components/GlobePulse.tsx', unescaped, 'utf8');
      found = true;
      break;
    } catch (e) {
      console.error("Error evaluating string:", e);
    }
  }
}

if (!found) {
  console.log("Could not find the component code using the simple regex. Let's dump all push statements.");
  // Let's do a wider search
  const broadRegex = /self\.__next_f\.push\(\[1,\s*"(.*?)"\]\)/g;
  let idx = 0;
  while ((match = broadRegex.exec(fileContent)) !== null) {
    if (match[1].includes('createGlobe')) {
      console.log(`Match ${idx} length: ${match[1].length}`);
    }
    idx++;
  }
}
