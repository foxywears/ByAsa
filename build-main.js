/**
 * ByAsa Store - Build Script for main.js
 * Run: node build-main.js
 * This script validates the main.js file structure.
 */

const fs = require('fs');
const path = require('path');

const mainJSPath = path.join(__dirname, 'public', 'js', 'main.js');

console.log('=== ByAsa Build Script ===\n');

if (!fs.existsSync(mainJSPath)) {
  console.error('❌ public/js/main.js not found');
  process.exit(1);
}

const content = fs.readFileSync(mainJSPath, 'utf8');
const lines = content.split('\n');

console.log(`📄 public/js/main.js (${lines.length} lines, ${content.length} bytes)`);

// Basic validation
const checks = [
  { name: 'DOM references', pattern: 'document.getElementById' },
  { name: 'HeroSlider class', pattern: 'class HeroSlider' },
  { name: 'Cart rendering', pattern: 'renderCartDrawer' },
  { name: 'Wishlist rendering', pattern: 'renderWishlistDrawer' },
  { name: 'Checkout modal', pattern: 'checkoutModal' },
  { name: 'API integration', pattern: 'fetch(\'/api/products\'' },
  { name: 'Init function', pattern: 'async function init' },
  { name: 'DOMContentLoaded', pattern: 'DOMContentLoaded' },
];

let passed = 0;
checks.forEach(check => {
  if (content.includes(check.pattern)) {
    console.log(`  ✅ ${check.name}`);
    passed++;
  } else {
    console.log(`  ⚠️  ${check.name} - pattern not found: "${check.pattern}"`);
  }
});

console.log(`\n${passed}/${checks.length} checks passed`);
if (passed === checks.length) {
  console.log('✅ Build validation successful!');
}
