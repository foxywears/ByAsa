const express = require('express');
const router = express.Router();
const db = require('../db');

// Sanitize string to prevent XSS
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>"']/g, '');
}

// GET /api/products - Fetch all products with optional category and search filters
router.get('/', (req, res) => {
  try {
    let products = db.getProducts();
    const category = sanitize(req.query.category);
    const search = sanitize(req.query.search);

    // Filter by category
if (category && category !== 'All') {
      const categoryMap = {
        'Mini Bags': 'Mini Bags',
        'Totes': 'Totes',
        'Handbags': 'Handbags',
        'Sneakers': 'Sneakers',
        'Accessories': 'Accessories',
        'On Sale': 'On Sale',
      };
      
      if (category === 'On Sale') {
        products = products.filter((p) => p.originalPrice !== null);
      } else {
        products = products.filter((p) => p.category === category);
      }
    }

    // Search by title or description (case-insensitive)
    if (search) {
      const searchTerm = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm) ||
          p.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    }

    res.json({ success: true, count: products.length, products });
  } catch (err) {
    console.error('[Products] Error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id - Fetch single product
router.get('/:id', (req, res) => {
  try {
    const product = db.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (err) {
    console.error('[Products] Error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch product' });
  }
});

module.exports = router;

