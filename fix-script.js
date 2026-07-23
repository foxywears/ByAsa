const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

console.log('=== ByAsa File Fixer ===\n');

// ============================================================
// 1. WRITE MAIN.JS
// ============================================================
const mainJSContent = `// ===== ByAsa - Main Application =====

let allProducts = [];
let currentCategory = 'All';
let currentSearch = '';

const dom = {
  productGrid: document.getElementById('productGrid'),
  categoryChips: document.getElementById('categoryChips'),
  searchInput: document.getElementById('searchInput'),
  searchInputMobile: document.getElementById('searchInputMobile'),
  cartIcon: document.getElementById('cartIcon'),
  cartCount: document.getElementById('cartCount'),
  cartDrawer: document.getElementById('cartDrawer'),
  cartOverlay: document.getElementById('cartOverlay'),
  cartItems: document.getElementById('cartItems'),
  cartSubtotal: document.getElementById('cartSubtotal'),
  cartTotal: document.getElementById('cartTotal'),
  cartItemCount: document.getElementById('cartItemCount'),
  closeCart: document.getElementById('closeCart'),
  whatsappCheckout: document.getElementById('whatsappCheckout'),
  whatsappCheckoutMobile: document.getElementById('whatsappCheckoutMobile'),
  mobileCartBtn: document.getElementById('mobileCartBtn'),
  mobileSubtotal: document.getElementById('mobileSubtotal'),
  heroSlider: document.getElementById('heroSlider'),
  sliderTrack: document.getElementById('sliderTrack'),
  sliderPrev: document.getElementById('sliderPrev'),
  sliderNext: document.getElementById('sliderNext'),
  sliderDots: document.getElementById('sliderDots'),
  quickViewModal: document.getElementById('quickViewModal'),
  quickViewClose: document.getElementById('quickViewClose'),
  modalGallery: document.getElementById('modalGallery'),
  modalThumbs: document.getElementById('modalThumbs'),
  modalTitle: document.getElementById('modalTitle'),
  modalCategory: document.getElementById('modalCategory'),
  modalPrice: document.getElementById('modalPrice'),
  modalOriginalPrice: document.getElementById('modalOriginalPrice'),
  modalDescription: document.getElementById('modalDescription'),
  modalAddToCart: document.getElementById('modalAddToCart'),
  modalWhatsApp: document.getElementById('modalWhatsApp'),
  wishlistIcon: document.getElementById('wishlistIcon'),
  wishlistCount: document.getElementById('wishlistCount'),
  wishlistDrawer: document.getElementById('wishlistDrawer'),
  wishlistOverlay: document.getElementById('wishlistOverlay'),
  wishlistClose: document.getElementById('wishlistClose'),
  wishlistItems: document.getElementById('wishlistItems'),
  wishlistSubtotal: document.getElementById('wishlistSubtotal'),
  mobileSearchToggle: document.getElementById('mobileSearchToggle'),
  mobileSearchBar: document.getElementById('mobileSearchBar'),
};

// ===== HERO SLIDER =====
class HeroSlider {
  constructor() {
    this.slides = [
      { img: '/api/placeholder/hero-luxury-bags', title: 'Spring Collection 2025', subtitle: 'Discover the elegance of ByAsa', badge: 'NEW ARRIVALS' },
      { img: '/api/placeholder/hero-mini-bags', title: 'Mini Bags, Big Style', subtitle: 'Compact luxury for every occasion', badge: 'SHOP MINI' },
      { img: '/api/placeholder/hero-accessories', title: 'Accessories That Shine', subtitle: 'Complete your look with our curated pieces', badge: 'EXPLORE' },
    ];
    this.currentIndex = 0;
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.isDragging = false;
    this.autoPlayInterval = null;
    this.init();
  }
  init() { this.renderSlides(); this.createDots(); this.bindEvents(); this.startAutoPlay(); }
  renderSlides() {
    let h = '';
    for (let i = 0; i < this.slides.length; i++) {
      const s = this.slides[i];
      const badge = s.badge ? '<span class="inline-block px-3 py-1 bg-pink-500 text-white text-xs font-semibold tracking-wider rounded-full mb-3 uppercase">' + s.badge + '</span>' : '';
      h += '<div class="hero-slide flex-shrink-0 w-full relative" data-index="' + i + '">' +
        '<div class="relative w-full h-[300px] sm:h-[400px] md:h-[480px] lg:h-[520px] overflow-hidden rounded-2xl">' +
          '<img src="' + s.img + '" alt="' + s.title + '" class="w-full h-full object-cover">' +
          '<div class="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent flex items-center">' +
            '<div class="px-6 md:px-12 lg:px-16 max-w-lg">' + badge +
              '<h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-serif leading-tight mb-3">' + s.title + '</h2>' +
              '<p class="text-white/80 text-sm sm:text-base md:text-lg mb-5">' + s.subtitle + '</p>' +
              '<div class="flex flex-wrap gap-3">' +
                '<a href="#products" class="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all">Shop Collection<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></a>' +
                '<a href="https://wa.me/2349163067887" target="_blank" class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/40 px-6 py-3 rounded-full text-sm font-semibold transition-all">Order via WhatsApp</a>' +
              '</div></div></div>';
    }
    dom.sliderTrack.innerHTML = h;
  }
  createDots() {
    let h = '';
    for (let i = 0; i < this.slides.length; i++) h += '<button class="slider-dot ' + (i === 0 ? 'active' : '') + '" data-index="' + i + '"></button>';
    dom.sliderDots.innerHTML = h;
  }
  bindEvents() {
    dom.sliderPrev.addEventListener('click', () => this.prev());
    dom.sliderNext.addEventListener('click', () => this.next());
    dom.sliderDots.addEventListener('click', (e) => { const d = e.target.closest('.slider-dot'); if (d) { this.goTo(parseInt(d.dataset.index)); this.resetAutoPlay(); } });
    dom.heroSlider.addEventListener('touchstart', (e) => { this.touchStartX = e.changedTouches[0].screenX; this.isDragging = true; }, { passive: true });
    dom.heroSlider.addEventListener('touchmove', (e) => { if (!this.isDragging) return; this.touchEndX = e.changedTouches[0].screenX; }, { passive: true });
    dom.heroSlider.addEventListener('touchend', () => { this.isDragging = false; const diff = this.touchStartX - this.touchEndX; if (Math.abs(diff) > 50) { if (diff > 0) this.next(); else this.prev(); this.resetAutoPlay(); } }, { passive: true });
  }
  goTo(i) { this.currentIndex = i; dom.sliderTrack.style.transform = 'translateX(-' + (this.currentIndex * 100) + '%)'; document.querySelectorAll('.slider-dot').forEach((d, idx) => d.classList.toggle('active', idx === i)); }
  next() { this.goTo((this.currentIndex + 1) % this.slides.length); }
  prev() { this.goTo((this.currentIndex - 1 + this.slides.length) % this.slides.length); }
  startAutoPlay() { this.autoPlayInterval = setInterval(() => this.next(), 5000); }
  resetAutoPlay() { clearInterval(this.autoPlayInterval); this.startAutoPlay(); }
}

function renderCategoryChips() {
  const cats = ['All', 'Mini Bags', 'Totes', 'Accessories', 'On Sale'];
  let html = '';
  for (let i = 0; i < cats.length; i++) html += '<button class="category-chip ' + (cats[i] === currentCategory ? 'active' : '') + '" data-category="' + cats[i] + '">' + cats[i] + '</button>';
  dom.categoryChips.innerHTML = html;
  dom.categoryChips.querySelectorAll('.category-chip').forEach(function(btn) {
    btn.addEventListener('click', function() {
      dom.categoryChips.querySelectorAll('.category-chip').forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
      currentCategory = this.dataset.category;
      dom.searchInput.value = '';
      dom.searchInputMobile.value = '';
      currentSearch = '';
      renderProducts();
    });
  });
}

function renderProducts() {
  let items = allProducts.slice();
  if (currentCategory && currentCategory !== 'All') {
    if (currentCategory === 'On Sale') { items = items.filter(function(p) { return p.originalPrice && p.originalPrice > 0; }); }
    else { items = items.filter(function(p) { return p.category === currentCategory; }); }
  }
  if (currentSearch) {
    const t = currentSearch.toLowerCase();
    items = items.filter(function(p) { return p.title.toLowerCase().indexOf(t) !== -1 || p.description.toLowerCase().indexOf(t) !== -1 || p.category.toLowerCase().indexOf(t) !== -1 || (p.tags || []).some(function(tag) { return tag.toLowerCase().indexOf(t) !== -1; }); });
  }
  const ce = document.getElementById('productCount');
  if (ce) ce.textContent = items.length + ' product' + (items.length !== 1 ? 's' : '');
  if (!items.length) { dom.productGrid.innerHTML = '<div class="col-span-full text-center py-16"><div class="text-6xl mb-4">👜</div><h3 class="text-xl font-serif font-semibold text-gray-600 mb-2">No products found</h3><p class="text-gray-400">Try adjusting your search or filter</p></div>'; return; }
  let html = '';
  for (let i = 0; i < items.length; i++) {
    const p = items[i];
    const imgUrl = p.imageUrls && p.imageUrls[0] ? p.imageUrls[0] : '/api/placeholder/product';
    var hB = (p.tags || []).indexOf('HOT') !== -1 ? '<span class="badge badge-hot">HOT</span>' : '';
    var bB = (p.tags || []).indexOf('BESTSELLER') !== -1 ? '<span class="badge badge-bestseller">BESTSELLER</span>' : '';
    var sB = p.originalPrice ? '<span class="badge badge-sale">SALE</span>' : '';
    var badges = hB + bB + sB;
    html += '<div class="product-card animate-fade-in-up" data-id="' + p.id + '">' +
      '<div class="image-wrapper"><img src="' + imgUrl + '" alt="' + p.title + '" loading="lazy">' +
      '<div class="absolute top-2 left-2 flex flex-wrap gap-1 z-10" style="max-width:70%">' + badges + '</div>' +
      '<button onclick="event.stopPropagation();var p2=getProductById(\\'' + p.id + '\\');if(p2&&window.wishlist)window.wishlist.toggle(p2);" style="position:absolute;top:12px;right:12px;width:36px;height:36px;border-radius:50%;background:white;box-shadow:0 2px 8px rgba(0,0,0,0.1);display:flex;align-items:center;justify-content:center;border:none;cursor:pointer;z-index:10"><svg class="w-[18px] h-[18px]" fill="none" stroke="#EC4899" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg></button>' +
      '<button onclick="event.stopPropagation();cart.addItem(getProductById(\\'' + p.id + '\\'))" style="position:absolute;bottom:12px;right:12px;width:40px;height:40px;border-radius:50%;background:white;box-shadow:0 2px 8px rgba(0,0,0,0.15);display:flex;align-items:center;justify-content:center;border:none;cursor:pointer;color:#EC4899;z-index:10" title="Quick Add"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg></button>' +
      '</div>' +
      '<div class="p-3 md:p-4"><p class="text-xs text-pink-400 font-medium uppercase tracking-wider mb-1">' + p.category + '</p>' +
      '<h3 class="font-serif font-semibold text-sm md:text-base text-gray-800 mb-1" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">' + p.title + '</h3>' +
      '<div class="flex items-center gap-2 mb-3"><span class="font-bold text-pink-600 text-sm md:text-base">' + window.formatCurrency(p.price) + '</span>' + (p.originalPrice ? '<span class="text-gray-400 text-xs line-through">' + window.formatCurrency(p.originalPrice) + '</span>' : '') + '</div>' +
      '<button onclick="event.stopPropagation();cart.addItem(getProductById(\\'' + p.id + '\\'))" style="width:100%;padding:10px 0;background:linear-gradient(135deg,#F472B6,#EC4899);color:white;font-size:14px;font-weight:600;border-radius:50px;border:none;cursor:pointer;box-shadow:0 4px 6px rgba(0,0,0,0.1)">Add to Cart</button>' +
      '</div>';
  }
  dom.productGrid.innerHTML = html;
}

function getProductById(id) { for (let i = 0; i < allProducts.length; i++) { if (allProducts[i].id === id) return allProducts[i]; } return null; }

dom.mobileSearchToggle.addEventListener('click', function() { dom.mobileSearchBar.classList.toggle('hidden'); if (!dom.mobileSearchBar.classList.contains('hidden')) dom.searchInputMobile.focus(); });

function setupSearch() {
  function handleSearch(v) { currentSearch = v.trim(); currentCategory = 'All'; renderCategoryChips(); renderProducts(); }
  var t;
  dom.searchInput.addEventListener('input', function(e) { clearTimeout(t); t = setTimeout(function() { handleSearch(e.target.value); }, 300); });
  dom.searchInputMobile.addEventListener('input', function(e) { clearTimeout(t); t = setTimeout(function() { handleSearch(e.target.value); }, 300); });
}

function renderCartDrawer() {
  var items = cart.items;
  if (!items.length) {
    dom.cartItems.innerHTML = '<div class="flex flex-col items-center justify-center py-16 text-gray-400"><svg class="w-20 h-20 mb-4 text-pink-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg><p class="text-lg font-medium">Your cart is empty</p><p class="text-sm mt-1">Add some lovely items!</p></div>';
    dom.cartSubtotal.textContent = '₦0'; dom.cartTotal.textContent = '₦0';
    if (dom.cartItemCount) dom.cartItemCount.textContent = '0 items';
    return;
  }
  var h = '';
  for (var i = 0; i < items.length; i++) {
    var it = items[i];
    h += '<div class="cart-item animate-fade-in-up" data-id="' + it.id + '"><img src="' + (it.imageUrl || '/api/placeholder/product') + '" alt="' + it.title + '" class="w-[70px] h-[70px] rounded-lg object-cover bg-pink-50"><div class="flex-1 min-w-0"><h4 class="text-sm font-semibold text-gray-800 truncate">' + it.title + '</h4><p class="text-pink-500 font-bold text-sm mt-0.5">' + window.formatCurrency(it.price) + '</p><div class="flex items-center gap-2 mt-2"><button class="qty-btn" onclick="cart.updateQuantity(\\'' + it.id + '\\', -1)">-</button><span class="text-sm font-semibold w-6 text-center">' + it.quantity + '</span><button class="qty-btn" onclick="cart.updateQuantity(\\'' + it.id + '\\', 1)">+</button></div><div class="flex flex-col items-end justify-between"><button onclick="cart.removeItem(\\'' + it.id + '\\')" class="text-gray-400 hover:text-red-500"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button><span class="text-sm font-bold text-pink-600">' + window.formatCurrency(it.price * it.quantity) + '</span></div>';
  }
  dom.cartItems.innerHTML = h;
  dom.cartSubtotal.textContent = cart.getFormattedSubtotal();
  dom.cartTotal.textContent = cart.getFormattedSubtotal();
  if (dom.cartItemCount) dom.cartItemCount.textContent = cart.getItemCount() + ' item' + (cart.getItemCount() !== 1 ? 's' : '');
}

function updateCartIcon() { var c = cart.getItemCount(); dom.cartCount.textContent = c; dom.cartCount.style.display = c > 0 ? 'flex' : 'none'; }
function updateMobileBar() { dom.mobileSubtotal.textContent = cart.getFormattedSubtotal(); }
function openCart() { dom.cartDrawer.classList.add('open'); dom.cartOverlay.classList.add('active'); document.body.style.overflow = 'hidden'; renderCartDrawer(); }
function closeCart() { dom.cartDrawer.classList.remove('open'); dom.cartOverlay.classList.remove('active'); document.body.style.overflow = ''; }

function renderWishlistDrawer() {
  var items = window.wishlist ? window.wishlist.items : [];
  if (!items.length) { dom.wishlistItems.innerHTML = '<div class="flex flex-col items-center justify-center py-16 text-gray-400"><svg class="w-16 h-16 mb-3 text-pink-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg><p class="text-base font-medium">Your wishlist is empty</p></div>'; return; }
  var h = '';
  for (var i = 0; i < items.length; i++) {
    var it = items[i];
    h += '<div class="cart-item animate-fade-in-up"><img src="' + (it.imageUrl || '/api/placeholder/product') + '" style="width:70px;height:70px;border-radius:8px;object-fit:cover;background:#FCE7F3"><div class="flex-1 min-w-0"><h4 class="text-sm font-semibold text-gray-800 truncate">' + it.title + '</h4><p class="text-pink-500 font-bold text-sm mt-0.5">' + window.formatCurrency(it.price) + '</p><div class="flex gap-2 mt-2"><button onclick="cart.addItem(getProductById(\\'' + it.id + '\\'));if(window.wishlist)window.wishlist.remove(\\'' + it.id + '\\');" style="font-size:12px;padding:6px 12px;background:#EC4899;color:white;border-radius:50px;border:none;cursor:pointer">Add to Cart</button></div><button onclick="if(window.wishlist)window.wishlist.remove(\\'' + it.id + '\\');" class="text-gray-400 hover:text-red-500 shrink-0"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button></div>';
  }
  dom.wishlistItems.innerHTML = h;
}

function updateWishlistIcon() { if (!window.wishlist) return; var c = window.wishlist.getItemCount ? window.wishlist.getItemCount() : 0; dom.wishlistCount.textContent = c; dom.wishlistCount.style.display = c > 0 ? 'flex' : 'none'; }

async function init() {
  renderCategoryChips();
  setupSearch();
  new HeroSlider();
  try { var res = await fetch('/api/products'); var data = await res.json(); if (data.success) allProducts = data.products; } catch(e) { console.error(e); }
  renderProducts();
  dom.cartIcon.addEventListener('click', openCart);
  dom.closeCart.addEventListener('click', closeCart);
  dom.cartOverlay.addEventListener('click', closeCart);
  dom.mobileCartBtn.addEventListener('click', openCart);
  dom.whatsappCheckout.addEventListener('click', function() { if(window.cart) window.cart.whatsAppCheckout(); });
  dom.whatsappCheckoutMobile.addEventListener('click', function() { if(window.cart) window.cart.whatsAppCheckout(); });
  if (window.cart) { window.cart.onRender(function() { renderCartDrawer(); updateCartIcon(); updateMobileBar(); }); }
  if (window.wishlist) { window.wishlist.onRender(function() { renderWishlistDrawer(); updateWishlistIcon(); }); }
  dom.wishlistIcon.addEventListener('click', function() { dom.wishlistDrawer.classList.add('open'); dom.wishlistOverlay.classList.add('active'); document.body.style.overflow = 'hidden'; renderWishlistDrawer(); });
  dom.wishlistClose.addEventListener('click', function() { dom.wishlistDrawer.classList.remove('open'); dom.wishlistOverlay.classList.remove('active'); document.body.style.overflow = ''; });
  dom.wishlistOverlay.addEventListener('click', function() { dom.wishlistDrawer.classList.remove('open'); dom.wishlistOverlay.classList.remove('active'); document.body.style.overflow = ''; });
  updateCartIcon(); updateMobileBar(); updateWishlistIcon();
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (dom.cartDrawer.classList.contains('open')) closeCart();
      if (dom.wishlistDrawer.classList.contains('open')) { dom.wishlistDrawer.classList.remove('open'); dom.wishlistOverlay.classList.remove('active'); document.body.style.overflow = ''; }
    }
  });
  console.log('🌸 ByAsa Store loaded!');
}
document.addEventListener('DOMContentLoaded', init);
`;

const mainJSPath = path.join(ROOT, 'public', 'js', 'main.js');
fs.writeFileSync(mainJSPath, mainJSContent, 'utf8');
console.log('✓ Wrote public/js/main.js (' + mainJSContent.length + ' bytes)');

// ============================================================
// 2. FIX INDEX.HTML - remove duplicated sections
// ============================================================
const indexPath = path.join(ROOT, 'public', 'index.html');
let
