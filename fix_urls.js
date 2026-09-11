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
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  // Replace string literals like 'http://localhost:5000/api/...'
  content = content.replace(/'http:\/\/localhost:5000(.*?)'/g, (match, p1) => {
    changed = true;
    return `\`\${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${p1}\``;
  });

  // Replace string literals like "http://localhost:5000/uploads/..."
  content = content.replace(/\"http:\/\/localhost:5000(.*?)\"/g, (match, p1) => {
    changed = true;
    return `\`\${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${p1}\``;
  });

  // Replace template literals like `http://localhost:5000/api/...`
  content = content.replace(/\`http:\/\/localhost:5000(.*?)\`/g, (match, p1) => {
    changed = true;
    return `\`\${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${p1}\``;
  });

  if (changed) {
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
