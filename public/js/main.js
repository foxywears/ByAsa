// ===== ByAsa - Main Application =====

let allProducts = [];
let currentCategory = 'All';
let currentSearch = '';
let currentSort = 'featured';

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
  sortSelect: document.getElementById('sortSelect'),
  checkoutModal: document.getElementById('checkoutModal'),
  checkoutOverlay: document.getElementById('checkoutOverlay'),
  checkoutClose: document.getElementById('checkoutClose'),
  checkoutForm: document.getElementById('checkoutForm'),
  checkoutName: document.getElementById('checkoutName'),
  checkoutPhone: document.getElementById('checkoutPhone'),
  checkoutLocation: document.getElementById('checkoutLocation'),
  checkoutNote: document.getElementById('checkoutNote'),
  checkoutItems: document.getElementById('checkoutItems'),
  checkoutTotal: document.getElementById('checkoutTotal'),
  checkoutSubmit: document.getElementById('checkoutSubmit'),
  checkoutSubmitText: document.getElementById('checkoutSubmitText'),
  scrollToTop: document.getElementById('scrollToTop'),
  bankDetailsCard: document.getElementById('bankDetailsCard'),
  copyAccBtn: document.getElementById('copyAccBtn'),
  payBankRadio: document.getElementById('payBankRadio'),
  payWhatsAppRadio: document.getElementById('payWhatsAppRadio'),
  orderSuccessModal: document.getElementById('orderSuccessModal'),
  orderSuccessOverlay: document.getElementById('orderSuccessOverlay'),
  receiptOrderRef: document.getElementById('receiptOrderRef'),
  receiptStatus: document.getElementById('receiptStatus'),
  receiptTotal: document.getElementById('receiptTotal'),
  receiptRefInline: document.getElementById('receiptRefInline'),
  sendProofWhatsAppBtn: document.getElementById('sendProofWhatsAppBtn'),
  closeOrderSuccessBtn: document.getElementById('closeOrderSuccessBtn'),
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
    let html = '';
    for (let i = 0; i < this.slides.length; i++) {
      const s = this.slides[i];
      const badgeHtml = s.badge ? '<span class="inline-block px-3 py-1 bg-pink-500 text-white text-xs font-semibold tracking-wider rounded-full mb-3 uppercase">' + s.badge + '</span>' : '';
      html += '<div class="hero-slide flex-shrink-0 w-full relative" data-index="' + i + '">' +
        '<div class="relative w-full h-[300px] sm:h-[400px] md:h-[480px] lg:h-[520px] overflow-hidden rounded-2xl">' +
          '<img src="' + s.img + '" alt="' + s.title + '" class="w-full h-full object-cover" onerror="this.style.display=\'none\'">' +
          '<div class="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent flex items-center">' +
            '<div class="px-6 md:px-12 lg:px-16 max-w-lg">' + badgeHtml +
              '<h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-serif leading-tight mb-3">' + s.title + '</h2>' +
              '<p class="text-white/80 text-sm sm:text-base md:text-lg mb-5">' + s.subtitle + '</p>' +
              '<div class="flex flex-wrap gap-3">' +
                '<a href="#products" class="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all">Shop Collection<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></a>' +
                '<a href="https://wa.me/2349163067887" target="_blank" class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/40 px-6 py-3 rounded-full text-sm font-semibold transition-all">Order via WhatsApp</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    }
    dom.sliderTrack.innerHTML = html;
  }
  createDots() {
    let html = '';
    for (let i = 0; i < this.slides.length; i++) {
      html += '<button class="slider-dot ' + (i === 0 ? 'active' : '') + '" data-index="' + i + '" aria-label="Go to slide ' + (i + 1) + '"></button>';
    }
    dom.sliderDots.innerHTML = html;
  }
  bindEvents() {
    dom.sliderPrev.addEventListener('click', () => this.prev());
    dom.sliderNext.addEventListener('click', () => this.next());
    dom.sliderDots.addEventListener('click', (e) => {
      const dot = e.target.closest('.slider-dot');
      if (dot) { this.goTo(parseInt(dot.dataset.index)); this.resetAutoPlay(); }
    });
    dom.heroSlider.addEventListener('touchstart', (e) => { this.touchStartX = e.changedTouches[0].screenX; this.isDragging = true; }, { passive: true });
    dom.heroSlider.addEventListener('touchmove', (e) => { if (!this.isDragging) return; this.touchEndX = e.changedTouches[0].screenX; }, { passive: true });
    dom.heroSlider.addEventListener('touchend', () => {
      this.isDragging = false;
      const diff = this.touchStartX - this.touchEndX;
      if (Math.abs(diff) > 50) { if (diff > 0) this.next(); else this.prev(); this.resetAutoPlay(); }
    }, { passive: true });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { this.prev(); this.resetAutoPlay(); }
      if (e.key === 'ArrowRight') { this.next(); this.resetAutoPlay(); }
    });
  }
  goTo(index) {
    this.currentIndex = index;
    dom.sliderTrack.style.transform = 'translateX(-' + (this.currentIndex * 100) + '%)';
    const dots = document.querySelectorAll('.slider-dot');
    for (let i = 0; i < dots.length; i++) dots[i].classList.toggle('active', i === this.currentIndex);
  }
  next() { this.goTo((this.currentIndex + 1) % this.slides.length); }
  prev() { this.goTo((this.currentIndex - 1 + this.slides.length) % this.slides.length); }
  startAutoPlay() { this.autoPlayInterval = setInterval(() => this.next(), 5000); }
  resetAutoPlay() { clearInterval(this.autoPlayInterval); this.startAutoPlay(); }
}

// ===== Loading Skeleton =====
function showLoadingSkeleton() {
  let html = '';
  for (let i = 0; i < 8; i++) {
    html += '<div class="product-card animate-pulse">' +
      '<div class="image-wrapper"><div class="skeleton w-full h-full absolute top-0 left-0"></div></div>' +
      '<div class="p-3 md:p-4">' +
        '<div class="skeleton h-3 w-16 mb-2"></div>' +
        '<div class="skeleton h-4 w-full mb-2"></div>' +
        '<div class="skeleton h-4 w-3/4 mb-3"></div>' +
        '<div class="skeleton h-8 w-full rounded-full"></div>' +
      '</div>' +
    '</div>';
  }
  dom.productGrid.innerHTML = html;
}

// ===== Category Chips =====
function renderCategoryChips() {
  const cats = ['All', 'Mini Bags', 'Totes', 'Accessories', 'On Sale'];
  let html = '';
  for (let i = 0; i < cats.length; i++) {
    const c = cats[i];
    html += '<button class="category-chip ' + (c === currentCategory ? 'active' : '') + '" data-category="' + c + '">' + c + '</button>';
  }
  dom.categoryChips.innerHTML = html;
  const chips = dom.categoryChips.querySelectorAll('.category-chip');
  for (let i = 0; i < chips.length; i++) {
    chips[i].addEventListener('click', function() {
      const allChips = dom.categoryChips.querySelectorAll('.category-chip');
      for (let j = 0; j < allChips.length; j++) allChips[j].classList.remove('active');
      this.classList.add('active');
      currentCategory = this.dataset.category;
      dom.searchInput.value = '';
      dom.searchInputMobile.value = '';
      currentSearch = '';
      renderProducts();
    });
  }
}

// ===== Sort Products =====
function sortProducts(items) {
  const sorted = items.slice();
  switch (currentSort) {
    case 'price-low':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    default: // featured - keep original order
      break;
  }
  return sorted;
}

// ===== Get Discount Percentage =====
function getDiscountPercent(originalPrice, price) {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round((1 - price / originalPrice) * 100);
}

// ===== Render Products =====
function renderProducts() {
  let items = allProducts.slice();
  
  // Filter by category
  if (currentCategory && currentCategory !== 'All') {
    if (currentCategory === 'On Sale') {
      items = items.filter(function(p) { return p.originalPrice && p.originalPrice > 0; });
    } else {
      items = items.filter(function(p) { return p.category === currentCategory; });
    }
  }
  
  // Filter by search
  if (currentSearch) {
    const term = currentSearch.toLowerCase();
    items = items.filter(function(p) {
      return p.title.toLowerCase().indexOf(term) !== -1 ||
        p.description.toLowerCase().indexOf(term) !== -1 ||
        p.category.toLowerCase().indexOf(term) !== -1 ||
        (p.tags || []).some(function(t) { return t.toLowerCase().indexOf(term) !== -1; });
    });
  }
  
  // Sort
  items = sortProducts(items);
  
  // Update count
  const countEl = document.getElementById('productCount');
  if (countEl) countEl.textContent = items.length + ' product' + (items.length !== 1 ? 's' : '');
  
  // Empty state
  if (!items.length) {
    dom.productGrid.innerHTML = '<div class="col-span-full text-center py-16"><div class="text-6xl mb-4">👜</div><h3 class="text-xl font-serif font-semibold text-gray-600 mb-2">No products found</h3><p class="text-gray-400">Try adjusting your search or filter</p></div>';
    return;
  }
  
  // Build product cards
  let html = '';
  for (let i = 0; i < items.length; i++) {
    const p = items[i];
    const imgUrl = p.imageUrls && p.imageUrls[0] ? p.imageUrls[0] : '/api/placeholder/product-default';
    const hotBadge = (p.tags || []).indexOf('HOT') !== -1 ? '<span class="badge badge-hot">HOT</span>' : '';
    const bestsellerBadge = (p.tags || []).indexOf('BESTSELLER') !== -1 ? '<span class="badge badge-bestseller">BESTSELLER</span>' : '';
    const saleBadge = p.originalPrice ? '<span class="badge badge-sale">SALE</span>' : '';
    const discount = getDiscountPercent(p.originalPrice, p.price);
    const discountBadge = discount ? '<span class="badge badge-discount">-' + discount + '%</span>' : '';
    const isFav = window.wishlist && window.wishlist.isInWishlist ? window.wishlist.isInWishlist(p.id) : false;
    
    html += '<div class="product-card animate-fade-in-up" data-id="' + p.id + '">' +
      '<div class="image-wrapper">' +
        '<img src="' + imgUrl + '" alt="' + p.title + '" loading="lazy" onerror="this.src=\'/api/placeholder/product-default\'">' +
        '<div class="absolute top-2 left-2 flex flex-wrap gap-1 z-10" style="max-width:70%">' + hotBadge + bestsellerBadge + saleBadge + discountBadge + '</div>' +
        '<button onclick="event.stopPropagation(); var pp = getProductById(\'' + p.id + '\'); if(pp && window.wishlist) window.wishlist.toggle(pp);" title="Wishlist" class="wishlist-btn ' + (isFav ? 'active' : '') + '">' +
          '<svg class="w-[18px] h-[18px]" fill="' + (isFav ? '#EC4899' : 'none') + '" stroke="#EC4899" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>' +
        '</button>' +
        '<button onclick="event.stopPropagation(); cart.addItem(getProductById(\'' + p.id + '\'))" style="position:absolute;bottom:12px;right:12px;width:40px;height:40px;border-radius:50%;background:white;box-shadow:0 2px 8px rgba(0,0,0,0.15);display:flex;align-items:center;justify-content:center;border:none;cursor:pointer;color:#EC4899;z-index:10" title="Quick Add"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg></button>' +
      '</div>' +
      '<div class="p-3 md:p-4">' +
        '<p class="text-xs text-pink-400 font-medium uppercase tracking-wider mb-1">' + p.category + '</p>' +
        '<h3 class="font-serif font-semibold text-sm md:text-base text-gray-800 mb-1" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">' + p.title + '</h3>' +
        '<div class="flex items-center gap-2 mb-3">' +
          '<span class="font-bold text-pink-600 text-sm md:text-base">' + window.formatCurrency(p.price) + '</span>' +
          (p.originalPrice ? '<span class="text-gray-400 text-xs line-through">' + window.formatCurrency(p.originalPrice) + '</span>' : '') +
        '</div>' +
        '<button onclick="event.stopPropagation(); cart.addItem(getProductById(\'' + p.id + '\'))" style="width:100%;padding:10px 0;background:linear-gradient(135deg,#F472B6,#EC4899);color:white;font-size:14px;font-weight:600;border-radius:50px;border:none;cursor:pointer;box-shadow:0 4px 6px rgba(0,0,0,0.1)">Add to Cart</button>' +
      '</div>' +
    '</div>';
  }
  dom.productGrid.innerHTML = html;
}

function getProductById(id) {
  for (let i = 0; i < allProducts.length; i++) {
    if (allProducts[i].id === id) return allProducts[i];
  }
  return null;
}

// ===== Mobile Search =====
if (dom.mobileSearchToggle) {
  dom.mobileSearchToggle.addEventListener('click', function() {
    dom.mobileSearchBar.classList.toggle('hidden');
    if (!dom.mobileSearchBar.classList.contains('hidden')) dom.searchInputMobile.focus();
  });
}

// ===== Search =====
function setupSearch() {
  function handleSearch(value) {
    currentSearch = value.trim();
    currentCategory = 'All';
    renderCategoryChips();
    renderProducts();
  }
  let timeout;
  if (dom.searchInput) {
    dom.searchInput.addEventListener('input', function(e) {
      clearTimeout(timeout);
      timeout = setTimeout(function() { handleSearch(e.target.value); }, 300);
    });
  }
  if (dom.searchInputMobile) {
    dom.searchInputMobile.addEventListener('input', function(e) {
      clearTimeout(timeout);
      timeout = setTimeout(function() { handleSearch(e.target.value); }, 300);
    });
  }
}

// ===== Sort =====
function setupSort() {
  if (dom.sortSelect) {
    dom.sortSelect.addEventListener('change', function() {
      currentSort = this.value;
      renderProducts();
    });
  }
}

// ===== Cart Drawer =====
function renderCartDrawer() {
  const items = cart.items;
  if (!items.length) {
    dom.cartItems.innerHTML = '<div class="flex flex-col items-center justify-center py-16 text-gray-400"><svg class="w-20 h-20 mb-4 text-pink-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg><p class="text-lg font-medium">Your cart is empty</p><p class="text-sm mt-1">Add some lovely items!</p></div>';
    dom.cartSubtotal.textContent = '₦0';
    dom.cartTotal.textContent = '₦0';
    if (dom.cartItemCount) dom.cartItemCount.textContent = '0 items';
    return;
  }
  let html = '';
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    html += '<div class="cart-item animate-fade-in-up" data-id="' + item.id + '">' +
      '<img src="' + (item.imageUrl || '/api/placeholder/product-thumb') + '" alt="' + item.title + '" onerror="this.src=\'/api/placeholder/product-thumb\'" class="w-[70px] h-[70px] rounded-lg object-cover bg-pink-50">' +
      '<div class="flex-1 min-w-0">' +
        '<h4 class="text-sm font-semibold text-gray-800 truncate">' + item.title + '</h4>' +
        '<p class="text-pink-500 font-bold text-sm mt-0.5">' + window.formatCurrency(item.price) + '</p>' +
        '<div class="flex items-center gap-2 mt-2">' +
          '<button class="qty-btn" onclick="cart.updateQuantity(\'' + item.id + '\', -1)"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg></button>' +
          '<span class="text-sm font-semibold w-6 text-center">' + item.quantity + '</span>' +
          '<button class="qty-btn" onclick="cart.updateQuantity(\'' + item.id + '\', 1)"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg></button>' +
        '</div>' +
      '</div>' +
      '<div class="flex flex-col items-end justify-between">' +
        '<button onclick="cart.removeItem(\'' + item.id + '\')" class="text-gray-400 hover:text-red-500"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>' +
        '<span class="text-sm font-bold text-pink-600">' + window.formatCurrency(item.price * item.quantity) + '</span>' +
      '</div>' +
    '</div>';
  }
  dom.cartItems.innerHTML = html;
  dom.cartSubtotal.textContent = cart.getFormattedSubtotal();
  dom.cartTotal.textContent = cart.getFormattedSubtotal();
  if (dom.cartItemCount) dom.cartItemCount.textContent = cart.getItemCount() + ' item' + (cart.getItemCount() !== 1 ? 's' : '');
}

function updateCartIcon() {
  const count = cart.getItemCount();
  dom.cartCount.textContent = count;
  dom.cartCount.style.display = count > 0 ? 'flex' : 'none';
}

function updateMobileBar() {
  dom.mobileSubtotal.textContent = cart.getFormattedSubtotal();
}

function openCart() {
  dom.cartDrawer.classList.add('open');
  dom.cartOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  renderCartDrawer();
}

function closeCart() {
  dom.cartDrawer.classList.remove('open');
  dom.cartOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// ===== Wishlist Drawer =====
function renderWishlistDrawer() {
  const items = window.wishlist ? window.wishlist.items : [];
  if (!items.length) {
    dom.wishlistItems.innerHTML = '<div class="flex flex-col items-center justify-center py-16 text-gray-400"><svg class="w-16 h-16 mb-3 text-pink-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg><p class="text-base font-medium">Your wishlist is empty</p></div>';
    return;
  }
  let html = '';
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    html += '<div class="cart-item animate-fade-in-up">' +
      '<img src="' + (it.imageUrl || '/api/placeholder/product') + '" style="width:70px;height:70px;border-radius:8px;object-fit:cover;background:#FCE7F3">' +
      '<div class="flex-1 min-w-0">' +
        '<h4 class="text-sm font-semibold text-gray-800 truncate">' + it.title + '</h4>' +
        '<p class="text-pink-500 font-bold text-sm mt-0.5">' + window.formatCurrency(it.price) + '</p>' +
        '<div class="flex gap-2 mt-2">' +
          '<button onclick="cart.addItem(getProductById(\'' + it.id + '\'));if(window.wishlist)window.wishlist.remove(\'' + it.id + '\');" style="font-size:12px;padding:6px 12px;background:#EC4899;color:white;border-radius:50px;border:none;cursor:pointer">Add to Cart</button>' +
        '</div>' +
      '</div>' +
      '<button onclick="if(window.wishlist)window.wishlist.remove(\'' + it.id + '\');" class="text-gray-400 hover:text-red-500 shrink-0"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>' +
    '</div>';
  }
  dom.wishlistItems.innerHTML = html;
}

function updateWishlistIcon() {
  if (!window.wishlist) return;
  const count = window.wishlist.getItemCount ? window.wishlist.getItemCount() : 0;
  dom.wishlistCount.textContent = count;
  dom.wishlistCount.style.display = count > 0 ? 'flex' : 'none';
}

// ===== Checkout Modal =====
function openCheckoutModal() {
  if (cart.items.length === 0) {
    showToast('Your cart is empty!', 'error');
    return;
  }
  if (dom.checkoutModal) {
    // Render checkout items summary
    let html = '';
    cart.items.forEach(function(item) {
      html += '<div class="flex items-center gap-3 py-2 border-b border-gray-100">' +
        '<img src="' + (item.imageUrl || '/api/placeholder/product-thumb') + '" alt="' + item.title + '" class="w-12 h-12 rounded-lg object-cover bg-pink-50">' +
        '<div class="flex-1 min-w-0">' +
          '<p class="text-sm font-medium text-gray-800 truncate">' + item.title + '</p>' +
          '<p class="text-xs text-gray-400">Qty: ' + item.quantity + ' × ' + window.formatCurrency(item.price) + '</p>' +
        '</div>' +
        '<span class="text-sm font-semibold text-pink-600">' + window.formatCurrency(item.price * item.quantity) + '</span>' +
      '</div>';
    });
    dom.checkoutItems.innerHTML = html;
    dom.checkoutTotal.textContent = cart.getFormattedSubtotal();

    // Default to Bank Transfer
    if (dom.payBankRadio) dom.payBankRadio.checked = true;
    updatePaymentMethodUI('Bank Transfer');
    
    dom.checkoutModal.classList.add('active');
    dom.checkoutOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    cart.whatsAppCheckout(null);
  }
}

function closeCheckoutModal() {
  if (dom.checkoutModal) {
    dom.checkoutModal.classList.remove('active');
    dom.checkoutOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function updatePaymentMethodUI(method) {
  const cards = document.querySelectorAll('.payment-method-card');
  cards.forEach(function(card) {
    const radio = card.querySelector('input[type="radio"]');
    if (radio && radio.value === method) {
      card.classList.add('active', 'border-pink-500', 'bg-pink-50/50');
      card.classList.remove('border-gray-200');
    } else {
      card.classList.remove('active', 'border-pink-500', 'bg-pink-50/50');
      card.classList.add('border-gray-200');
    }
  });

  if (dom.bankDetailsCard) {
    if (method === 'Bank Transfer') {
      dom.bankDetailsCard.style.display = 'block';
      if (dom.checkoutSubmitText) dom.checkoutSubmitText.textContent = 'Place Order & View Payment Info';
    } else {
      dom.bankDetailsCard.style.display = 'none';
      if (dom.checkoutSubmitText) dom.checkoutSubmitText.textContent = 'Proceed to WhatsApp Checkout';
    }
  }
}

function setupPaymentMethodToggle() {
  const radios = document.querySelectorAll('input[name="paymentMethod"]');
  radios.forEach(function(radio) {
    radio.addEventListener('change', function() {
      updatePaymentMethodUI(this.value);
    });
  });

  if (dom.copyAccBtn) {
    dom.copyAccBtn.addEventListener('click', function() {
      const accNo = window.BANK_DETAILS ? window.BANK_DETAILS.accountNumber : '0123456789';
      navigator.clipboard.writeText(accNo).then(function() {
        showToast('📋 Account Number Copied!', 'success');
      }).catch(function() {
        showToast('Account Number: ' + accNo, 'info');
      });
    });
  }
}

async function handleCheckoutSubmit(e) {
  e.preventDefault();
  const customerDetails = {
    name: dom.checkoutName.value.trim(),
    phone: dom.checkoutPhone.value.trim(),
    location: dom.checkoutLocation.value.trim(),
    note: dom.checkoutNote.value.trim(),
  };
  
  if (!customerDetails.name) {
    showToast('Please enter your name', 'error');
    dom.checkoutName.focus();
    return;
  }
  if (!customerDetails.phone || customerDetails.phone.length < 10) {
    showToast('Please enter a valid phone number', 'error');
    dom.checkoutPhone.focus();
    return;
  }

  const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
  const paymentMethod = selectedPayment ? selectedPayment.value : 'Bank Transfer';

  // Disable button & show spinner
  const btn = dom.checkoutSubmit;
  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing Order...';

  try {
    // Post order to backend DB
    const order = await cart.submitOrder(customerDetails, paymentMethod);
    
    // Save items copy for WhatsApp receipt before clearing cart
    const itemsCopy = cart.items.slice();
    const formattedSubtotal = cart.getFormattedSubtotal();
    
    // Clear cart and close checkout modal
    cart.clearCart();
    closeCheckoutModal();

    if (paymentMethod === 'WhatsApp') {
      cart.whatsAppCheckout(customerDetails, order.orderRef);
      showToast('🌸 Order reference #' + order.orderRef + ' created!', 'success');
    } else {
      showOrderSuccessModal(order, customerDetails, itemsCopy, formattedSubtotal);
    }
  } catch (err) {
    console.error('[Checkout Error]', err);
    showToast(err.message || 'Failed to place order. Please try again.', 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = originalText;
  }
}

function showOrderSuccessModal(order, customerDetails, items, formattedTotal) {
  if (!dom.orderSuccessModal) return;

  if (dom.receiptOrderRef) dom.receiptOrderRef.textContent = '#' + order.orderRef;
  if (dom.receiptRefInline) dom.receiptRefInline.textContent = '#' + order.orderRef;
  if (dom.receiptTotal) dom.receiptTotal.textContent = formattedTotal || window.formatCurrency(order.totalAmount);
  if (dom.receiptStatus) {
    dom.receiptStatus.textContent = order.status || 'Pending Payment';
  }

  // Setup WhatsApp proof button
  if (dom.sendProofWhatsAppBtn) {
    dom.sendProofWhatsAppBtn.onclick = function() {
      let message = `🌸 *Payment Proof - ByAsa Store* 🌸\n\n`;
      message += `🔖 *Order Ref:* #${order.orderRef}\n`;
      message += `👤 *Name:* ${customerDetails.name}\n`;
      message += `📞 *Phone:* ${customerDetails.phone}\n`;
      message += `💰 *Amount:* ${formattedTotal}\n`;
      message += `💳 *Method:* Direct Bank Transfer\n\n`;
      message += `_Hello, I have made a bank transfer for my order #${order.orderRef}. Please find proof attached._`;

      const url = `https://wa.me/2349163067887?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    };
  }

  // Setup Close button
  if (dom.closeOrderSuccessBtn) {
    dom.closeOrderSuccessBtn.onclick = closeOrderSuccessModal;
  }
  if (dom.orderSuccessOverlay) {
    dom.orderSuccessOverlay.onclick = closeOrderSuccessModal;
  }

  dom.orderSuccessModal.classList.add('active');
  dom.orderSuccessOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeOrderSuccessModal() {
  if (dom.orderSuccessModal) {
    dom.orderSuccessModal.classList.remove('active');
    dom.orderSuccessOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ===== Scroll to Top =====
function setupScrollToTop() {
  if (!dom.scrollToTop) return;
  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      dom.scrollToTop.classList.add('visible');
    } else {
      dom.scrollToTop.classList.remove('visible');
    }
  });
  dom.scrollToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== Newsletter =====
function setupNewsletter() {
  const form = document.getElementById('newsletterForm');
  const messageEl = document.getElementById('newsletterMessage');
  if (!form) return;
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value.trim();
    const btn = document.getElementById('newsletterBtn');
    
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email', 'error');
      return;
    }
    
    btn.disabled = true;
    btn.textContent = 'Subscribing...';
    
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      
      if (data.success) {
        showToast('🌸 Subscribed successfully!', 'success');
        form.reset();
        if (messageEl) {
          messageEl.textContent = data.message || 'Check your email for a welcome message!';
          messageEl.className = 'text-sm mt-3 text-green-600';
          messageEl.style.display = 'block';
          setTimeout(function() { messageEl.style.display = 'none'; }, 5000);
        }
      } else {
        showToast(data.error || 'Subscription failed', 'error');
      }
    } catch(err) {
      showToast('Failed to subscribe. Please try again.', 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Subscribe';
    }
  });
}

// ===== Initialize =====
async function init() {
  // Show loading skeleton
  showLoadingSkeleton();
  
  renderCategoryChips();
  setupSearch();
  setupSort();
  new HeroSlider();
  setupScrollToTop();
  setupNewsletter();
  setupPaymentMethodToggle();
  
  // Fetch products
  try {
    const res = await fetch('/api/products');
    const data = await res.json();
    if (data.success) allProducts = data.products;
  } catch(e) {
    console.error(e);
  }
  
  renderProducts();
  
  // Cart events
  dom.cartIcon.addEventListener('click', openCart);
  dom.closeCart.addEventListener('click', closeCart);
  dom.cartOverlay.addEventListener('click', closeCart);
  dom.mobileCartBtn.addEventListener('click', openCart);
  
  // Checkout events - use the new checkout modal instead of direct WhatsApp
  dom.whatsappCheckout.addEventListener('click', function() {
    openCheckoutModal();
  });
  dom.whatsappCheckoutMobile.addEventListener('click', function() {
    openCheckoutModal();
  });
  
  // Checkout modal events
  if (dom.checkoutClose) dom.checkoutClose.addEventListener('click', closeCheckoutModal);
  if (dom.checkoutOverlay) dom.checkoutOverlay.addEventListener('click', closeCheckoutModal);
  if (dom.checkoutForm) dom.checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  
  // Cart callbacks
  if (window.cart) {
    window.cart.onRender(function() {
      renderCartDrawer();
      updateCartIcon();
      updateMobileBar();
    });
  }
  
  // Wishlist callbacks
  if (window.wishlist) {
    window.wishlist.onRender(function() {
      renderWishlistDrawer();
      updateWishlistIcon();
    });
  }
  
  // Wishlist drawer events
  dom.wishlistIcon.addEventListener('click', function() {
    dom.wishlistDrawer.classList.add('open');
    dom.wishlistOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderWishlistDrawer();
  });
  dom.wishlistClose.addEventListener('click', function() {
    dom.wishlistDrawer.classList.remove('open');
    dom.wishlistOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
  dom.wishlistOverlay.addEventListener('click', function() {
    dom.wishlistDrawer.classList.remove('open');
    dom.wishlistOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  // Initial state
  updateCartIcon();
  updateMobileBar();
  updateWishlistIcon();
  
  // Keyboard escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (dom.cartDrawer.classList.contains('open')) closeCart();
      if (dom.wishlistDrawer.classList.contains('open')) {
        dom.wishlistDrawer.classList.remove('open');
        dom.wishlistOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
      closeCheckoutModal();
    }
  });
  
  console.log('🌸 ByAsa Store loaded!');
}

document.addEventListener('DOMContentLoaded', init);

