const fs = require('fs');
const path = require('path');
const srcDir = path.join('d:', 'Projects', 'Online_Shopping', 'client', 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.js') || file.endsWith('.jsx')) results.push(file);
    }
  });
  return results;
}

const files = walk(srcDir);
let totalFixed = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Match prop=`...`
  const newContent = content.replace(/(\w+)=\`([^\`]+)\`/g, '$1={`$2`}');
  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log('Fixed JSX in ' + file);
    totalFixed++;
  }
});
console.log('Total files fixed: ' + totalFixed);
