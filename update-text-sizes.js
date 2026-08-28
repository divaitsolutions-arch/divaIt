const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) results.push(file);
    }
  });
  return results;
}

const files = walk('/home/cosmic-soul/Desktop/skill development trainings /divaIt/src');
// We are replacing text-xs (12px) and any custom tiny text sizes with text-[13px]
const regex = /text-(xs|\[8px\]|\[9px\]|\[10px\]|\[11px\]|\[12px\])/g;

let count = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (regex.test(content)) {
    content = content.replace(regex, 'text-[13px]');
    fs.writeFileSync(file, content);
    count++;
  }
});
console.log(`Successfully updated ${count} files to enforce the 13px minimum text size rule.`);
