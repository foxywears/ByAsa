const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const errorHandler = require('./middleware/errorHandler');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const newsletterRouter = require('./routes/newsletter');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the public directory (for frontend)
app.use(express.static(path.join(__dirname, '..', 'public')));

// Serve photos directory with proper MIME types for .jfif files
app.use('/photos', express.static(path.join(__dirname, '..', 'photos'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.jfif')) {
      res.setHeader('Content-Type', 'image/jpeg');
    }
  }
}));

// Placeholder image endpoint (generates SVG placeholders)
app.get('/api/placeholder/:name', (req, res) => {
  const { name } = req.params;
  const colors = ['#FCE7F3', '#FDF2F8', '#FFF0F5', '#FBCFE8', '#F9A8D4'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
    <rect width="400" height="500" fill="${color}"/>
    <text x="200" y="250" font-family="Georgia, serif" font-size="18" fill="#EC4899" text-anchor="middle" dominant-baseline="middle">ByAsa</text>
    <text x="200" y="280" font-family="Arial, sans-serif" font-size="12" fill="#9CA3AF" text-anchor="middle">${name}</text>
  </svg>`;
  
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=31536000');
  res.send(svg);
});

// API Routes
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/newsletter', newsletterRouter);

// Admin API - Get dashboard stats
app.get('/api/admin/stats', (req, res) => {
  const db = require('./db');
  const products = db.getProducts();
  const orders = db.getOrders();
  
  let subscriberCount = 0;
  try {
    const subPath = path.join(__dirname, 'subscribers.json');
    if (fs.existsSync(subPath)) {
      const subs = JSON.parse(fs.readFileSync(subPath, 'utf8'));
      subscriberCount = subs.length;
    }
  } catch(e) {}
  
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  
  res.json({
    success: true,
    stats: {
      totalProducts: products.length,
      totalOrders: orders.length,
      totalRevenue,
      pendingOrders,
      subscriberCount,
      lowStock: products.filter(p => !p.inStock).length
    }
  });
});

// Admin API - Get all orders with details
app.get('/api/admin/orders', (req, res) => {
  const db = require('./db');
  const orders = db.getOrders();
  res.json({ success: true, count: orders.length, orders });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'ByAsa API is running', timestamp: new Date().toISOString() });
});

// Serve admin dashboard HTML
app.get('/admin', (req, res) => {
  const adminHTML = path.join(__dirname, '..', 'public', 'admin.html');
  if (fs.existsSync(adminHTML)) {
    res.sendFile(adminHTML);
  } else {
    res.status(404).send('Admin dashboard not found');
  }
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`\n🌸 ByAsa Store API running on http://localhost:${PORT}`);
  console.log(`📦 Products: http://localhost:${PORT}/api/products`);
  console.log(`📊 Admin: http://localhost:${PORT}/admin`);
  console.log(`🏠 Frontend: http://localhost:${PORT}\n`);
});

