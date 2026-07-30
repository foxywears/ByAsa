// ===== ByAsa - Cart Module =====

const WHATSAPP_NUMBER = '2349163067887';
const BANK_DETAILS = {
  bankName: 'Guaranty Trust Bank (GTBank)',
  accountName: 'ByAsa Luxury Concept',
  accountNumber: '0123456789',
};

class ByAsaCart {
  constructor() {
    this.items = this.loadCart();
    this.renderCallbacks = [];
  }

  // Load cart from localStorage
  loadCart() {
    try {
      const saved = localStorage.getItem('byasa_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  // Save cart to localStorage
  saveCart() {
    localStorage.setItem('byasa_cart', JSON.stringify(this.items));
    this.notify();
  }

  // Register render callback
  onRender(callback) {
    this.renderCallbacks.push(callback);
  }

  // Notify all listeners to re-render
  notify() {
    this.renderCallbacks.forEach((cb) => cb(this));
  }

  // Get total item count
  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Calculate subtotal
  getSubtotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // Get formatted subtotal
  getFormattedSubtotal() {
    return formatCurrency(this.getSubtotal());
  }

  // Add item to cart
  addItem(product) {
    const existing = this.items.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrls?.[0] || '',
        quantity: 1,
        category: product.category,
      });
    }
    this.saveCart();
    this.showAddedFeedback(product.title);
  }

  // Remove item from cart
  removeItem(productId) {
    this.items = this.items.filter((item) => item.id !== productId);
    this.saveCart();
  }

  // Update quantity
  updateQuantity(productId, delta) {
    const item = this.items.find((i) => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeItem(productId);
    } else {
      this.saveCart();
    }
    this.notify();
  }

  // Clear cart
  clearCart() {
    this.items = [];
    this.saveCart();
  }

  // Post order to backend API
  async submitOrder(customerDetails, paymentMethod = 'Bank Transfer') {
    if (this.items.length === 0) {
      throw new Error('Cart is empty');
    }

    const payload = {
      customerDetails,
      items: this.items,
      totalAmount: this.getSubtotal(),
      paymentMethod,
    };

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to submit order');
    }
    return data.order;
  }

  // Generate WhatsApp message with customer details
  getWhatsAppMessage(customerDetails, orderRef = null, paymentMethod = 'WhatsApp') {
    if (this.items.length === 0 && !orderRef) return '';

    let message = '🌸 *New Order - ByAsa Store* 🌸\n\n';

    if (orderRef) {
      message += `🔖 *Order Ref:* #${orderRef}\n`;
      message += `💳 *Payment Method:* ${paymentMethod}\n\n`;
    }
    
    // Customer details
    if (customerDetails) {
      message += '*Customer Information:*\n';
      message += `👤 *Name:* ${customerDetails.name}\n`;
      message += `📞 *Phone:* ${customerDetails.phone}\n`;
      if (customerDetails.location) message += `📍 *Location:* ${customerDetails.location}\n`;
      if (customerDetails.note) message += `📝 *Note:* ${customerDetails.note}\n`;
      message += '\n';
    }
    
    message += '*Order Details:*\n';
    message += '─'.repeat(25) + '\n';

    this.items.forEach((item, index) => {
      message += `${index + 1}. *${item.title}*\n`;
      message += `   Qty: ${item.quantity} × ₦${formatNumber(item.price)}\n`;
      message += `   Sub: ₦${formatNumber(item.price * item.quantity)}\n\n`;
    });

    message += '─'.repeat(25) + '\n';
    message += `*Total Amount: ₦${formatNumber(this.getSubtotal())}*\n\n`;
    if (paymentMethod === 'Bank Transfer') {
      message += '_Note: I have completed/initiated bank transfer payment for this order._\n\n';
    }
    message += '_Thank you for shopping with ByAsa!_ 🙏\n';

    return encodeURIComponent(message);
  }

  // Open checkout modal
  openCheckout() {
    if (this.items.length === 0) {
      showToast('Your cart is empty!', 'error');
      return;
    }
    // Show checkout modal
    const modal = document.getElementById('checkoutModal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      // Fallback: open WhatsApp directly without details
      this.whatsAppCheckout(null);
    }
  }

  // Open WhatsApp checkout with customer details
  whatsAppCheckout(customerDetails, orderRef = null) {
    if (this.items.length === 0 && !orderRef) {
      showToast('Your cart is empty!', 'error');
      return;
    }

    const message = this.getWhatsAppMessage(customerDetails, orderRef);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, '_blank');
  }

  // Show added to cart feedback
  showAddedFeedback(title) {
    showToast(`✨ "${title}" added to cart!`, 'success');
  }
}

// Create global cart instance
const cart = new ByAsaCart();

// ===== Utility Functions =====

function formatCurrency(amount) {
  return `₦${formatNumber(Math.round(amount))}`;
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ===== Toast Notification =====
function showToast(message, type = 'success') {
  // Guard against DOM not being ready
  if (!document.body) {
    console.log('[Toast]', message);
    return;
  }
  const existingToast = document.querySelector('.toast-notification');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = `toast-notification ${type}`;
  toast.innerHTML = message;
  
  // Style the toast
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '100px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: type === 'success' ? '#EC4899' : type === 'info' ? '#6B7280' : '#EF4444',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '50px',
    fontSize: '14px',
    fontWeight: '500',
    zIndex: '100',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    opacity: '0',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    maxWidth: '90%',
    textAlign: 'center',
  });

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
  });

  // Auto remove
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Export for use in other scripts
window.ByAsaCart = ByAsaCart;
window.cart = cart;
window.BANK_DETAILS = BANK_DETAILS;
window.formatCurrency = formatCurrency;
window.formatNumber = formatNumber;
window.showToast = showToast;


