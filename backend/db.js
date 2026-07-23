const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'db.json');

// Initialize DB file if it doesn't exist
function initDB() {
  if (!fs.existsSync(DB_PATH)) {
    const defaultData = {
      products: [],
      orders: [],
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(defaultData, null, 2));
    console.log('[DB] Initialized db.json');
  }
}

// Read entire DB
function readDB() {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('[DB] Error reading:', err);
    return { products: [], orders: [] };
  }
}

// Write entire DB
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Products
function getProducts() {
  return readDB().products;
}

function getProductById(id) {
  const products = readDB().products;
  return products.find((p) => p.id === id) || null;
}

function addProduct(product) {
  const db = readDB();
  db.products.push(product);
  writeDB(db);
  return product;
}

// Orders
function getOrders() {
  return readDB().orders;
}

function createOrder(order) {
  const db = readDB();
  const newOrder = {
    id: generateId(),
    ...order,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };
  db.orders.push(newOrder);
  writeDB(db);
  return newOrder;
}

function updateOrderStatus(id, status) {
  const db = readDB();
  const index = db.orders.findIndex((o) => o.id === id);
  if (index !== -1) {
    db.orders[index].status = status;
    writeDB(db);
    return db.orders[index];
  }
  return null;
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

initDB();

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  getOrders,
  createOrder,
  updateOrderStatus,
};

