// ===== ByAsa - Wishlist Module =====

class ByAsaWishlist {
  constructor() {
    this.items = this.loadWishlist();
    this.renderCallbacks = [];
  }

  loadWishlist() {
    try {
      const saved = localStorage.getItem('byasa_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  saveWishlist() {
    localStorage.setItem('byasa_wishlist', JSON.stringify(this.items));
    this.notify();
  }

  onRender(callback) {
    this.renderCallbacks.push(callback);
  }

  notify() {
    this.renderCallbacks.forEach((cb) => cb(this));
  }

  getItemCount() {
    return this.items.length;
  }

  isInWishlist(productId) {
    return this.items.some((item) => item.id === productId);
  }

  toggle(product) {
    const index = this.items.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      this.items.splice(index, 1);
      showToast(`"${product.title}" removed from wishlist`, 'info');
    } else {
      this.items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        originalPrice: product.originalPrice,
        imageUrl: product.imageUrls?.[0] || '',
        category: product.category,
      });
      showToast(`❤️ "${product.title}" saved to wishlist!`, 'success');
    }
    this.saveWishlist();
  }

  remove(productId) {
    this.items = this.items.filter((item) => item.id !== productId);
    this.saveWishlist();
  }

  clear() {
    this.items = [];
    this.saveWishlist();
  }
}

const wishlist = new ByAsaWishlist();
window.wishlist = wishlist;

