/**
 * ByAsa Store - Fix Script
 * Run: node fix-script.js
 * This script ensures the database and files are in a consistent state.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DB_PATH = path.join(ROOT, 'backend', 'db.json');

console.log('=== ByAsa Store Fix Script ===\n');

// Check if db.json exists
if (!fs.existsSync(DB_PATH)) {
  console.log('⚠️  db.json not found. Run: node backend/seed.js');
  process.exit(1);
}

// Verify db.json is valid JSON
try {
  const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  console.log(`✅ db.json is valid (${data.products?.length || 0} products, ${data.orders?.length || 0} orders)`);
} catch (err) {
  console.error('❌ db.json is corrupted. Run: node backend/seed.js');
  process.exit(1);
}

// Check required directories
const dirs = [
  path.join(ROOT, 'public', 'js'),
  path.join(ROOT, 'public', 'css'),
  path.join(ROOT, 'backend', 'routes'),
  path.join(ROOT, 'backend', 'middleware'),
  path.join(ROOT, 'photos'),
];

let allGood = true;
dirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`✅ ${path.relative(ROOT, dir)}/ exists`);
  } else {
    console.log(`❌ ${path.relative(ROOT, dir)}/ missing`);
    allGood = false;
  }
});

console.log(allGood ? '\n✅ All checks passed!' : '\n⚠️  Some issues found. Run: node backend/seed.js');
