// ===== ByAsa - API Utility =====

const API_BASE = '/api';

async function fetchProducts(category = 'All', search = '') {
  const params = new URLSearchParams();
  if (category && category !== 'All') params.append('category', category);
  if (search) params.append('search', search);

  const url = `${API_BASE}/products${params.toString() ? '?' + params.toString() : ''}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.success) {
      return data.products;
    }
    throw new Error(data.error || 'Failed to fetch products');
  } catch (err) {
    console.error('[API] Error fetching products:', err);
    return [];
  }
}

async function fetchProductById(id) {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`);
    const data = await res.json();
    if (data.success) {
      return data.product;
    }
    throw new Error(data.error || 'Failed to fetch product');
  } catch (err) {
    console.error('[API] Error fetching product:', err);
    return null;
  }
}

async function createOrder(orderData) {
  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('[API] Error creating order:', err);
    return { success: false, error: err.message };
  }
}

async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    const data = await res.json();
    return data;
  } catch (err) {
    return { success: false, message: 'Server offline' };
  }
}

