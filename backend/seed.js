const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'db.json');

// ===== HOW TO ADD YOUR OWN IMAGES =====
// 1. Drop your image file into the "photos/" folder (e.g., my-bag.jpg)
// 2. Add a new entry below like:
//       'my-bag': '/photos/my-bag.jpg',
// 3. Use it in a product below:
//       imageUrls: [ photoMap['my-bag'], ... ]
// 4. Run: cd backend && node seed.js && node server.js
// ========================================
const photoMap = {
  'coach-pink': '/photos/bag-pink.jfif',
  'coach-heart': '/photos/bag-heart.jfif',

};

const products = [
  {
    id: 'p1',
    title: 'Lavender Dream Tote',
    description: 'Spacious tote bag crafted from premium vegan leather with gold-tone hardware. Perfect for everyday elegance.',
    price: 45000,
    originalPrice: 55000,
    category: 'Totes',
    imageUrls: [
      photoMap['coach-pink'],
      '/api/placeholder/lavender-tote-2',
      '/api/placeholder/lavender-tote-3',
    ],
    inStock: true,
    tags: ['BESTSELLER'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p2',
    title: 'Rose Gold Mini Crossbody',
    description: 'Compact crossbody bag with adjustable chain strap and sparkling crystal embellishments.',
    price: 32000,
    originalPrice: 38000,
    category: 'Mini Bags',
    imageUrls: [
      photoMap['coach-heart'],
      '/api/placeholder/rose-mini-2',
      '/api/placeholder/rose-mini-3',
    ],
    inStock: true,
    tags: ['HOT'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p3',
    title: 'Blush Pearl Clutch',
    description: 'Elegant clutch adorned with freshwater pearl detailing. Removable wrist strap included.',
    price: 28000,
    originalPrice: null,
    category: 'Accessories',
    imageUrls: [
      photoMap['coach-tan'],
      '/api/placeholder/blush-clutch-2',
    ],
    inStock: true,
    tags: ['BESTSELLER', 'HOT'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p4',
    title: 'Dusty Pink Saddle Bag',
    description: 'Modern saddle bag silhouette with magnetic closure and detachable shoulder strap.',
    price: 52000,
    originalPrice: 65000,
    category: 'Mini Bags',
    imageUrls: [
      photoMap['coach-pink'],
      '/api/placeholder/dusty-saddle-2',
    ],
    inStock: true,
    tags: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p5',
    title: 'Mauve Silk Scarf Set',
    description: 'Set of two luxury silk scarves with hand-rolled edges. Can be worn as accessories or bag ties.',
    price: 15000,
    originalPrice: 20000,
    category: 'Accessories',
    imageUrls: [
      '/api/placeholder/mauve-scarf-1',
      '/api/placeholder/mauve-scarf-2',
    ],
    inStock: true,
    tags: ['ON SALE'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p6',
    title: 'Petal Pink Shopper',
    description: 'Oversized shopper bag ideal for work or travel. Features interior zip pocket and reinforced handles.',
    price: 62000,
    originalPrice: null,
    category: 'Totes',
    imageUrls: [
      photoMap['coach-heart'],
      '/api/placeholder/petal-shopper-2',
    ],
    inStock: true,
    tags: ['BESTSELLER'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p7',
    title: 'Crystal Hairpin Set',
    description: 'Set of 3 crystal-embellished hairpins in rose gold. Adds instant glamour to any look.',
    price: 8500,
    originalPrice: 12000,
    category: 'Accessories',
    imageUrls: [
      '/api/placeholder/crystal-pins-1',
      '/api/placeholder/crystal-pins-2',
    ],
    inStock: true,
    tags: ['HOT', 'ON SALE'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p8',
    title: 'Blush Beaded Evening Bag',
    description: 'Intricately beaded evening bag with satin lining and magnetic snap closure.',
    price: 38000,
    originalPrice: 45000,
    category: 'Mini Bags',
    imageUrls: [
      photoMap['coach-tan'],
      '/api/placeholder/blush-evening-2',
    ],
    inStock: true,
    tags: ['HOT'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p9',
    title: 'Large Weekend Duffle',
    description: 'Spacious weekend duffle in soft pink vegan leather. Features shoe compartment and luggage sleeve.',
    price: 75000,
    originalPrice: 90000,
    category: 'Totes',
    imageUrls: [
      '/api/placeholder/duffle-1',
      '/api/placeholder/duffle-2',
    ],
    inStock: true,
    tags: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p10',
    title: 'Gold Hoop Earrings',
    description: 'Oversized gold-tone hoop earrings with subtle crystal drop detail. Hypoallergenic posts.',
    price: 12000,
    originalPrice: null,
    category: 'Accessories',
    imageUrls: [
      '/api/placeholder/gold-hoops-1',
      '/api/placeholder/gold-hoops-2',
    ],
    inStock: true,
    tags: ['BESTSELLER'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p11',
    title: 'Mini Basket Weave Bag',
    description: 'Summer-ready mini basket bag with leather trim and cute fruit-shaped charm.',
    price: 25000,
    originalPrice: 32000,
    category: 'Mini Bags',
    imageUrls: [
      photoMap['coach-pink'],
      '/api/placeholder/basket-mini-2',
    ],
    inStock: true,
    tags: ['ON SALE'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'p12',
    title: 'ByAsa Signature Tote',
    description: 'The iconic ByAsa tote in signature blush pink. Features branded dust bag and authenticity card.',
    price: 85000,
    originalPrice: null,
    category: 'Totes',
    imageUrls: [
      photoMap['coach-heart'],
      '/api/placeholder/signature-tote-2',
      '/api/placeholder/signature-tote-3',
    ],
    inStock: true,
    tags: ['BESTSELLER', 'HOT'],
    createdAt: new Date().toISOString(),
  },
];

const dbData = {
  products,
  orders: [],
};

fs.writeFileSync(DB_PATH, JSON.stringify(dbData, null, 2));
console.log(`✅ Seeded ${products.length} products to db.json`);
