/**
 * SILHOUETTE STUDIO SPA LOGIC
 * Modern Fashion Single Page Application
 */

// --- DATA STORE ---
const products = [
    // Women - Minimalistic Pastel Clothing
    { id: 1, name: "Soft Lavender Midi Dress", price: 7200, category: "women", image: "https://image.pollinations.ai/prompt/minimalist%20soft%20lavender%20midi%20dress%20simple%20elegant%20pastel%20white%20background%208k", description: "Effortless elegance in soft lavender. Perfect for any occasion." },
    { id: 2, name: "Blush Pink Oversized Shirt", price: 4800, category: "women", image: "https://image.pollinations.ai/prompt/minimalist%20blush%20pink%20oversized%20shirt%20simple%20clean%20pastel%20white%20background%208k", description: "Relaxed sophistication in soft blush pink. Versatile and chic." },
    { id: 3, name: "Mint Green Slip Dress", price: 6500, category: "women", image: "https://image.pollinations.ai/prompt/minimalist%20mint%20green%20slip%20dress%20simple%20elegant%20pastel%20white%20background%208k", description: "Delicate and feminine. A timeless piece in soft mint." },
    { id: 4, name: "Cream Linen T-Shirt", price: 3900, category: "women", image: "https://image.pollinations.ai/prompt/minimalist%20cream%20linen%20tshirt%20simple%20clean%20pastel%20white%20background%208k", description: "Essential basics in premium linen. Effortlessly stylish." },
    { id: 5, name: "Soft Peach Maxi Dress", price: 8200, category: "women", image: "https://image.pollinations.ai/prompt/minimalist%20soft%20peach%20maxi%20dress%20simple%20flowing%20pastel%20white%20background%208k", description: "Flowing elegance in soft peach. Make a statement with simplicity." },

    // Perfumes (Unique Images)
    { id: 6, name: "Midnight Rose Elixir", price: 12500, category: "perfumes", image: "https://image.pollinations.ai/prompt/luxury%20dark%20rose%20perfume%20bottle%20elegant%20black%20glass%20white%20background", description: "A mysterious blend of dark rose and amber. Captivate the night." },
    { id: 7, name: "Golden Amber Oud", price: 18900, category: "perfumes", image: "https://image.pollinations.ai/prompt/luxury%20golden%20amber%20oud%20perfume%20bottle%20opulent%20gold%20glass%20white%20background", description: "Rich, warm, and opulent. A scent for those who command attention." },
    { id: 8, name: "Vanilla Orchid", price: 9500, category: "perfumes", image: "https://image.pollinations.ai/prompt/luxury%20vanilla%20orchid%20perfume%20bottle%20glass%20elegant%20white%20background", description: "Sweet, floral, and utterly romantic. A delicate embrace." },
    { id: 9, name: "Citrus Breeze", price: 8500, category: "perfumes", image: "https://image.pollinations.ai/prompt/fresh%20citrus%20perfume%20bottle%20lemon%20orange%20luxury%20white%20background", description: "Fresh, invigorating, and crisp. The perfect scent for sunny days." },

    // Bags
    { id: 10, name: "Soft Blush Bucket Bag", price: 18500, category: "bags", image: "https://image.pollinations.ai/prompt/minimalist%20soft%20blush%20pink%20bucket%20bag%20simple%20design%20luxury%20white%20background%208k", description: "Modern and chic. The perfect everyday companion." },
    { id: 11, name: "Evening Sparkle Clutch", price: 15500, category: "bags", image: "https://image.pollinations.ai/prompt/minimalist%20soft%20pink%20clutch%20bag%20simple%20elegant%20luxury%20white%20background%208k", description: "The perfect accessory for your night out. Shimmer and shine." },
    { id: 12, name: "Chic Crossbody", price: 12000, category: "bags", image: "https://image.pollinations.ai/prompt/minimalist%20soft%20cream%20crossbody%20bag%20simple%20gold%20chain%20luxury%20white%20background%208k", description: "Compact yet stylish. Keep your essentials close in luxury." },

    // Shoes (Women's Boots)
    { id: 13, name: "Soft Beige Ankle Boots", price: 8900, category: "shoes", image: "https://image.pollinations.ai/prompt/soft%20beige%20suede%20ankle%20boots%20women%20luxury%20fashion%20studio%20photography%20white%20background%208k", description: "Elegant ankle boots in soft beige suede. Perfect for any occasion." },
    { id: 14, name: "Cream Leather Knee Boots", price: 12500, category: "shoes", image: "https://image.pollinations.ai/prompt/cream%20leather%20knee%20high%20boots%20women%20luxury%20designer%20white%20background%208k", description: "Sophisticated knee-high boots in premium cream leather." },
    { id: 15, name: "Blush Pink Combat Boots", price: 7800, category: "shoes", image: "https://image.pollinations.ai/prompt/blush%20pink%20combat%20boots%20women%20soft%20pastel%20luxury%20fashion%20white%20background%208k", description: "Edgy yet feminine combat boots in soft blush pink." },
    { id: 16, name: "Ivory Chelsea Boots", price: 9200, category: "shoes", image: "https://image.pollinations.ai/prompt/ivory%20white%20chelsea%20boots%20women%20luxury%20minimalist%20design%20white%20background%208k", description: "Classic Chelsea boots in pristine ivory. Timeless elegance." },
];

// --- STATE MANAGEMENT ---
const state = {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    wishlist: JSON.parse(localStorage.getItem('wishlist')) || [],
    user: null,
};

// --- ROUTER ---
const router = {
    routes: {
        'home': () => renderHome(),
        'perfumes': () => renderCollection('perfumes'),
        'women': () => renderCollection('women'),
        'bags': () => renderCollection('bags'),
        'shoes': () => renderCollection('shoes'),
        'contact': () => renderContact(),
        'login': () => renderLogin(),
        'signup': () => renderSignup(),
        'product': (id) => renderProductDetails(id),
        'faq': () => renderFAQ(),
        'shipping': () => renderShipping(),
        'returns': () => renderReturns(),
        'track-order': () => renderTrackOrder(),
    },

    init() {
        window.addEventListener('hashchange', this.handleRoute.bind(this));
        this.handleRoute(); // Handle initial load
    },

    handleRoute() {
        const hash = window.location.hash.slice(1) || 'home';
        const [route, param] = hash.split('/');

        // Update Active Link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${route}`) {
                link.classList.add('active');
            }
        });

        // Close Mobile Menu
        document.querySelector('.nav-links').classList.remove('active');

        // Page Transition: Fade out current content
        const appElement = document.getElementById('app');
        appElement.classList.add('page-transition-fade-out');

        // Wait for fade out, then update content
        setTimeout(() => {
            // Execute Route
            if (this.routes[route]) {
                this.routes[route](param);
                window.scrollTo(0, 0);
            } else {
                renderHome(); // Default to home
            }

            // Fade in new content
            appElement.classList.remove('page-transition-fade-out');
            appElement.classList.add('page-transition-fade-in');

            // Remove fade-in class after animation
            setTimeout(() => {
                appElement.classList.remove('page-transition-fade-in');
                ui.initAnimations(); // Re-init scroll animations
            }, 400);
        }, 300);
    },

    navigate(path) {
        window.location.hash = path;
    }
};

// --- UI CONTROLLER ---
const ui = {
    app: document.getElementById('app'),

    toggleMenu() {
        const navLinks = document.querySelector('.nav-links');
        const icon = document.querySelector('.hamburger i');
        navLinks.classList.toggle('active');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    },

    toggleCart() {
        document.getElementById('cart-sidebar').classList.toggle('open');
        document.getElementById('cart-overlay').classList.toggle('active');
        cart.render();
    },

    toggleSearch() {
        const modal = document.getElementById('search-modal');
        modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
        if (modal.style.display === 'block') {
            document.getElementById('search-input').focus();
        }
    },

    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        let icon = 'fa-info-circle';
        if (type === 'success') icon = 'fa-check-circle';
        if (type === 'error') icon = 'fa-exclamation-circle';

        toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;

        container.appendChild(toast);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideInRight 0.3s reverse forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    },

    initAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }
};

// --- CART LOGIC ---
const cart = {
    add(productId, size = 'M') {
        const product = products.find(p => p.id == productId);
        if (!product) return;

        const existingItem = state.cart.find(item => item.id == productId && item.size == size);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            state.cart.push({ ...product, quantity: 1, size });
        }

        this.save();
        this.updateCount();
        ui.showToast(`Added ${product.name} to bag`, 'success');
        this.render(); // Update sidebar if open
    },

    remove(index) {
        state.cart.splice(index, 1);
        this.save();
        this.updateCount();
        this.render();
    },

    save() {
        localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    updateCount() {
        const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelector('.cart-count').innerText = count;
    },

    render() {
        const container = document.getElementById('cart-items');
        const totalEl = document.getElementById('cart-total-amount');

        if (state.cart.length === 0) {
            container.innerHTML = '<p style="text-align:center; color:#999; margin-top:2rem; font-style:italic;">Your shopping bag is empty.</p>';
            totalEl.innerText = 'PKR 0';
            return;
        }

        let total = 0;
        container.innerHTML = state.cart.map((item, index) => {
            total += item.price * item.quantity;
            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>PKR ${item.price.toLocaleString()} x ${item.quantity}</p>
                        <small style="color:#999;">Size: ${item.size}</small>
                        <br>
                        <span class="remove-item" onclick="cart.remove(${index})">Remove</span>
                    </div>
                </div>
            `;
        }).join('');

        totalEl.innerText = `PKR ${total.toLocaleString()}`;
    },

    checkout() {
        if (state.cart.length === 0) {
            ui.showToast('Your bag is empty!', 'error');
            return;
        }
        ui.showToast('Processing your order...', 'info');
        setTimeout(() => {
            state.cart = [];
            this.save();
            this.updateCount();
            this.render();
            ui.toggleCart();
            ui.showToast('Order placed successfully! Thank you.', 'success');
        }, 2000);
    }
};

// --- RENDER FUNCTIONS ---

function renderHome() {
    ui.app.innerHTML = `
        <section class="hero" style="background-image: url('hero-image.png');">
            <div class="hero-content">
                <h1>ELEGANCE<br>REDEFINED</h1>
                <p>Discover the new era of luxury fashion.</p>
                <button class="btn" onclick="router.navigate('women')">Explore Collection</button>
            </div>
        </section>

        <section class="featured reveal">
            <h2 class="section-title">Curated For You</h2>
            <div class="products-grid">
                ${renderProductCard(products[0])}
                ${renderProductCard(products[5])}
                ${renderProductCard(products[9])}
                ${renderProductCard(products[12])}
            </div>
        </section>
    `;
}

function renderCollection(category) {
    const categoryProducts = products.filter(p => p.category === category);

    // Hero Images Mapping
    const heroImages = {
        'women': 'https://image.pollinations.ai/prompt/minimalist%20pastel%20clothing%20boutique%20display%20soft%20colors%20elegant%20interior%20wide%20banner%208k',
        'perfumes': 'perfume_hero.png',
        'bags': 'https://image.pollinations.ai/prompt/high%20end%20luxury%20handbag%20store%20interior%20marble%20floors%20gold%20fixtures%20elegant%20display%20wide%20banner%208k',
        'shoes': 'https://image.pollinations.ai/prompt/luxury%20women%20shoe%20boutique%20display%20soft%20pastel%20boots%20elegant%20interior%20wide%20banner%208k'
    };

    const titles = {
        'women': 'Minimalist Clothing',
        'perfumes': 'Signature Scents',
        'bags': 'Luxury Handbags',
        'shoes': 'Designer Footwear'
    };

    ui.app.innerHTML = `
        <section class="hero" style="height: 50vh; background-image: url('${heroImages[category]}');">
            <div class="hero-content">
                <h1>${titles[category]}</h1>
                <p>Exquisite designs for the discerning.</p>
            </div>
        </section>

        <section class="featured reveal">
            <div class="products-grid">
                ${categoryProducts.map(renderProductCard).join('')}
            </div>
        </section>
    `;
}

function renderProductCard(product) {
    const isWishlisted = state.wishlist.includes(product.id);
    const heartIconClass = isWishlisted ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
    const activeClass = isWishlisted ? 'active' : '';

    return `
        <div class="product-card reveal" onclick="router.navigate('product/${product.id}')">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <button class="wishlist-btn ${activeClass}" onclick="event.stopPropagation(); toggleWishlist(${product.id})">
                    <i class="${heartIconClass}"></i>
                </button>
                <div class="product-overlay">
                    <button class="btn" onclick="event.stopPropagation(); cart.add(${product.id})">Quick Add</button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>PKR ${product.price.toLocaleString()}</p>
            </div>
        </div>
    `;
}

function toggleWishlist(productId) {
    const index = state.wishlist.indexOf(productId);
    if (index === -1) {
        state.wishlist.push(productId);
        ui.showToast('Added to Wishlist', 'success');
    } else {
        state.wishlist.splice(index, 1);
        ui.showToast('Removed from Wishlist', 'success');
    }
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist));

    // Re-render current view to update heart icons
    const hash = window.location.hash.slice(1) || 'home';
    const [route, param] = hash.split('/');
    if (router.routes[route]) {
        router.routes[route](param);
    } else {
        renderHome();
    }
}

function renderProductDetails(id) {
    const product = products.find(p => p.id == id);
    if (!product) return renderHome();

    ui.app.innerHTML = `
        <div class="product-details-container">
            <div class="product-gallery reveal">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info-section reveal">
                <h1 class="product-title">${product.name}</h1>
                <p class="product-price">PKR ${product.price.toLocaleString()}</p>
                <div class="product-description">
                    <p>${product.description}</p>
                    <br>
                    <ul>
                        <li>Category: ${product.category.toUpperCase()}</li>
                        <li>Material: Premium Blend</li>
                        <li>Availability: In Stock</li>
                    </ul>
                </div>

                <div class="product-options">
                    <label>Select Size:</label>
                    <select id="size-select">
                        <option value="S">Small</option>
                        <option value="M" selected>Medium</option>
                        <option value="L">Large</option>
                        <option value="XL">Extra Large</option>
                    </select>
                </div>

                <button class="btn" onclick="cart.add(${product.id}, document.getElementById('size-select').value)">Add to Shopping Bag</button>
            </div>
        </div>
    `;
}

function renderContact() {
    ui.app.innerHTML = `
        <section class="hero" style="height: 50vh; background-image: url('https://image.pollinations.ai/prompt/minimalist%20pastel%20abstract%20soft%20gradient%20pink%20lavender%20cream%20elegant%20wide%20banner%208k');">
            <div class="hero-content">
                <h1>Contact Us</h1>
                <p>We are here to assist you.</p>
            </div>
        </section>

        <div class="form-container reveal">
            <h2 style="text-align: center; margin-bottom: 2rem; color: var(--primary-color);">Send a Message</h2>
            <form onsubmit="handleContact(event)">
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" required>
                </div>
                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" required>
                </div>
                <div class="form-group">
                    <label>Message</label>
                    <textarea rows="5" required></textarea>
                </div>
                <button type="submit" class="btn" style="width: 100%;">Submit Inquiry</button>
            </form>
        </div>
    `;
}

function renderLogin() {
    ui.app.innerHTML = `
        <div class="form-container reveal" style="margin-top: 8rem;">
            <h2 style="text-align: center; margin-bottom: 2rem; color: var(--primary-color);">Client Login</h2>
            <form onsubmit="handleLogin(event)">
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" required>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" required>
                </div>
                <button type="submit" class="btn" style="width: 100%;">Sign In</button>
                <p style="text-align: center; margin-top: 1rem;">New Client? <a href="javascript:void(0)" onclick="router.navigate('signup')" style="color: var(--secondary-color); font-weight: bold;">Create Account</a></p>
            </form>
        </div>
    `;
}

function renderSignup() {
    ui.app.innerHTML = `
        <div class="form-container reveal" style="margin-top: 8rem;">
            <h2 style="text-align: center; margin-bottom: 2rem; color: var(--primary-color);">Register</h2>
            <form onsubmit="handleSignup(event)">
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" required>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" required>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" required>
                </div>
                <button type="submit" class="btn" style="width: 100%;">Create Account</button>
                <p style="text-align: center; margin-top: 1rem;">Already a member? <a href="javascript:void(0)" onclick="router.navigate('login')" style="color: var(--secondary-color); font-weight: bold;">Sign In</a></p>
            </form>
        </div>
    `;
}

function renderFAQ() {
    ui.app.innerHTML = `
        <section class="hero" style="height: 50vh; background-image: url('https://image.pollinations.ai/prompt/minimalist%20pastel%20abstract%20soft%20gradient%20pink%20lavender%20cream%20elegant%20wide%20banner%208k');">
            <div class="hero-content">
                <h1>Frequently Asked Questions</h1>
                <p>Find answers to common questions.</p>
            </div>
        </section>

        <div class="form-container reveal" style="max-width: 900px;">
            <div class="faq-section">
                <div class="faq-item">
                    <h3 style="color: var(--primary-color); margin-bottom: 1rem;">How do I place an order?</h3>
                    <p style="color: #666; line-height: 1.8;">Browse our collections, select your desired items, choose your size, and click "Add to Shopping Bag". Once you're ready, proceed to checkout from your shopping bag.</p>
                </div>
                
                <div class="faq-item" style="margin-top: 2rem;">
                    <h3 style="color: var(--primary-color); margin-bottom: 1rem;">What payment methods do you accept?</h3>
                    <p style="color: #666; line-height: 1.8;">We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and cash on delivery for local orders.</p>
                </div>
                
                <div class="faq-item" style="margin-top: 2rem;">
                    <h3 style="color: var(--primary-color); margin-bottom: 1rem;">How long does delivery take?</h3>
                    <p style="color: #666; line-height: 1.8;">Standard delivery takes 3-5 business days within Pakistan. Express delivery (1-2 business days) is available for major cities.</p>
                </div>
                
                <div class="faq-item" style="margin-top: 2rem;">
                    <h3 style="color: var(--primary-color); margin-bottom: 1rem;">Can I return or exchange items?</h3>
                    <p style="color: #666; line-height: 1.8;">Yes! We offer a 14-day return and exchange policy. Items must be unworn, unwashed, and in original packaging with tags attached. See our <a href="#returns" style="color: var(--secondary-color); font-weight: bold;">Returns Policy</a> for details.</p>
                </div>
                
                <div class="faq-item" style="margin-top: 2rem;">
                    <h3 style="color: var(--primary-color); margin-bottom: 1rem;">How do I track my order?</h3>
                    <p style="color: #666; line-height: 1.8;">Once your order ships, you'll receive a tracking number via email. You can also track your order using our <a href="#track-order" style="color: var(--secondary-color); font-weight: bold;">Track Order</a> page.</p>
                </div>
                
                <div class="faq-item" style="margin-top: 2rem;">
                    <h3 style="color: var(--primary-color); margin-bottom: 1rem;">Do you ship internationally?</h3>
                    <p style="color: #666; line-height: 1.8;">Currently, we only ship within Pakistan. International shipping will be available soon. Subscribe to our newsletter to stay updated!</p>
                </div>
            </div>
        </div>
    `;
}

function renderShipping() {
    ui.app.innerHTML = `
        <section class="hero" style="height: 50vh; background-image: url('https://image.pollinations.ai/prompt/minimalist%20pastel%20abstract%20soft%20gradient%20pink%20lavender%20cream%20elegant%20wide%20banner%208k');">
            <div class="hero-content">
                <h1>Shipping Policy</h1>
                <p>Fast and reliable delivery to your doorstep.</p>
            </div>
        </section>

        <div class="form-container reveal" style="max-width: 900px;">
            <div class="policy-section">
                <h3 style="color: var(--primary-color); margin-bottom: 1.5rem;">Shipping Information</h3>
                
                <div style="margin-bottom: 2rem;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 0.8rem;">Delivery Timeframes</h4>
                    <ul style="color: #666; line-height: 2; padding-left: 1.5rem;">
                        <li><strong>Standard Delivery:</strong> 3-5 business days (PKR 200)</li>
                        <li><strong>Express Delivery:</strong> 1-2 business days (PKR 500)</li>
                        <li><strong>Same-Day Delivery:</strong> Available in Karachi, Lahore, and Islamabad (PKR 800)</li>
                    </ul>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 0.8rem;">Free Shipping</h4>
                    <p style="color: #666; line-height: 1.8;">Enjoy free standard shipping on all orders over PKR 10,000!</p>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 0.8rem;">Order Processing</h4>
                    <p style="color: #666; line-height: 1.8;">Orders are processed within 24 hours on business days. Orders placed on weekends or holidays will be processed the next business day.</p>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 0.8rem;">Tracking Your Order</h4>
                    <p style="color: #666; line-height: 1.8;">Once your order ships, you'll receive a confirmation email with a tracking number. You can track your package using our <a href="#track-order" style="color: var(--secondary-color); font-weight: bold;">Track Order</a> page or directly through our courier partner's website.</p>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 0.8rem;">Shipping Locations</h4>
                    <p style="color: #666; line-height: 1.8;">We currently ship to all major cities and towns across Pakistan. Remote areas may require additional delivery time.</p>
                </div>
                
                <div style="background: #f9f9f9; padding: 1.5rem; border-radius: 8px; margin-top: 2rem;">
                    <p style="color: #666; line-height: 1.8; margin: 0;"><strong>Note:</strong> Delivery times are estimates and may vary during peak seasons or due to unforeseen circumstances. We'll keep you updated on any delays.</p>
                </div>
            </div>
        </div>
    `;
}

function renderReturns() {
    ui.app.innerHTML = `
        <section class="hero" style="height: 50vh; background-image: url('https://image.pollinations.ai/prompt/minimalist%20pastel%20abstract%20soft%20gradient%20pink%20lavender%20cream%20elegant%20wide%20banner%208k');">
            <div class="hero-content">
                <h1>Returns & Exchanges</h1>
                <p>Your satisfaction is our priority.</p>
            </div>
        </section>

        <div class="form-container reveal" style="max-width: 900px;">
            <div class="policy-section">
                <h3 style="color: var(--primary-color); margin-bottom: 1.5rem;">Return Policy</h3>
                
                <div style="margin-bottom: 2rem;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 0.8rem;">14-Day Return Window</h4>
                    <p style="color: #666; line-height: 1.8;">We offer a 14-day return period from the date of delivery. Items must be returned in their original condition with all tags attached.</p>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 0.8rem;">Eligible Items</h4>
                    <ul style="color: #666; line-height: 2; padding-left: 1.5rem;">
                        <li>Unworn and unwashed items</li>
                        <li>Items with original tags and packaging</li>
                        <li>Items without any signs of wear, alterations, or damage</li>
                    </ul>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 0.8rem;">Non-Returnable Items</h4>
                    <ul style="color: #666; line-height: 2; padding-left: 1.5rem;">
                        <li>Perfumes and fragrances (due to hygiene reasons)</li>
                        <li>Sale or clearance items (unless defective)</li>
                        <li>Gift cards</li>
                    </ul>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 0.8rem;">How to Return</h4>
                    <ol style="color: #666; line-height: 2; padding-left: 1.5rem;">
                        <li>Contact our customer service at <strong>support@silhouettestudio.com</strong></li>
                        <li>Provide your order number and reason for return</li>
                        <li>Receive return authorization and shipping instructions</li>
                        <li>Pack items securely with original packaging</li>
                        <li>Ship the package using our prepaid label (for eligible returns)</li>
                    </ol>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 0.8rem;">Refund Process</h4>
                    <p style="color: #666; line-height: 1.8;">Once we receive and inspect your return, we'll process your refund within 5-7 business days. Refunds will be issued to the original payment method.</p>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 0.8rem;">Exchanges</h4>
                    <p style="color: #666; line-height: 1.8;">We're happy to exchange items for a different size or color. Contact us to arrange an exchange, and we'll ship the new item once we receive the original.</p>
                </div>
                
                <div style="background: #f9f9f9; padding: 1.5rem; border-radius: 8px; margin-top: 2rem;">
                    <p style="color: #666; line-height: 1.8; margin: 0;"><strong>Questions?</strong> Contact us at <a href="#contact" style="color: var(--secondary-color); font-weight: bold;">support@silhouettestudio.com</a> or call +92-XXX-XXXXXXX</p>
                </div>
            </div>
        </div>
    `;
}

function renderTrackOrder() {
    ui.app.innerHTML = `
        <section class="hero" style="height: 50vh; background-image: url('https://image.pollinations.ai/prompt/minimalist%20pastel%20abstract%20soft%20gradient%20pink%20lavender%20cream%20elegant%20wide%20banner%208k');">
            <div class="hero-content">
                <h1>Track Your Order</h1>
                <p>Stay updated on your delivery status.</p>
            </div>
        </section>

        <div class="form-container reveal">
            <h2 style="text-align: center; margin-bottom: 2rem; color: var(--primary-color);">Enter Tracking Details</h2>
            <form onsubmit="handleTrackOrder(event)">
                <div class="form-group">
                    <label>Order Number</label>
                    <input type="text" id="order-number" placeholder="e.g., SS-2024-12345" required>
                    <small style="color: #999; display: block; margin-top: 0.5rem;">You can find this in your order confirmation email</small>
                </div>
                <div class="form-group">
                    <label>Email Address</label>
                    <input type="email" id="order-email" placeholder="email@example.com" required>
                    <small style="color: #999; display: block; margin-top: 0.5rem;">The email used when placing the order</small>
                </div>
                <button type="submit" class="btn" style="width: 100%;">Track Order</button>
            </form>
            
            <div id="tracking-result" style="margin-top: 3rem; display: none;">
                <h3 style="color: var(--primary-color); margin-bottom: 1.5rem; text-align: center;">Order Status</h3>
                <div style="background: #f9f9f9; padding: 2rem; border-radius: 12px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #ddd;">
                        <span style="color: #666;">Order Number:</span>
                        <strong id="result-order-number" style="color: var(--primary-color);"></strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #ddd;">
                        <span style="color: #666;">Status:</span>
                        <strong id="result-status" style="color: var(--secondary-color);"></strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #ddd;">
                        <span style="color: #666;">Estimated Delivery:</span>
                        <strong id="result-delivery" style="color: var(--primary-color);"></strong>
                    </div>
                    <div style="margin-top: 2rem;">
                        <h4 style="color: var(--secondary-color); margin-bottom: 1rem;">Tracking Timeline</h4>
                        <div id="tracking-timeline" style="padding-left: 1rem; border-left: 3px solid var(--secondary-color);">
                            <!-- Timeline will be inserted here -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// --- FORM HANDLERS ---
function handleContact(e) {
    e.preventDefault();
    ui.showToast('Inquiry sent. We will contact you shortly.', 'success');
    e.target.reset();
}

function handleLogin(e) {
    e.preventDefault();
    ui.showToast('Welcome back.', 'success');
    setTimeout(() => router.navigate('home'), 1000);
}

function handleSignup(e) {
    e.preventDefault();
    ui.showToast('Account created successfully.', 'success');
    setTimeout(() => router.navigate('login'), 1000);
}

function handleTrackOrder(e) {
    e.preventDefault();

    const orderNumber = document.getElementById('order-number').value;
    const email = document.getElementById('order-email').value;

    // Simulate tracking lookup
    ui.showToast('Looking up your order...', 'info');

    setTimeout(() => {
        // Show tracking result
        const resultDiv = document.getElementById('tracking-result');
        resultDiv.style.display = 'block';

        // Populate with sample data
        document.getElementById('result-order-number').textContent = orderNumber;
        document.getElementById('result-status').textContent = 'In Transit';

        // Calculate estimated delivery (3 days from now)
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 3);
        document.getElementById('result-delivery').textContent = deliveryDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Create timeline
        const timeline = document.getElementById('tracking-timeline');
        timeline.innerHTML = `
            <div style="margin-bottom: 1.5rem; padding-left: 1rem;">
                <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                    <i class="fa-solid fa-circle-check" style="color: var(--secondary-color); margin-right: 0.5rem;"></i>
                    <strong style="color: var(--primary-color);">Order Placed</strong>
                </div>
                <small style="color: #999; padding-left: 1.5rem;">Your order has been confirmed</small>
            </div>
            <div style="margin-bottom: 1.5rem; padding-left: 1rem;">
                <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                    <i class="fa-solid fa-circle-check" style="color: var(--secondary-color); margin-right: 0.5rem;"></i>
                    <strong style="color: var(--primary-color);">Processing</strong>
                </div>
                <small style="color: #999; padding-left: 1.5rem;">Your order is being prepared</small>
            </div>
            <div style="margin-bottom: 1.5rem; padding-left: 1rem;">
                <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                    <i class="fa-solid fa-circle-dot" style="color: var(--secondary-color); margin-right: 0.5rem;"></i>
                    <strong style="color: var(--primary-color);">In Transit</strong>
                </div>
                <small style="color: #999; padding-left: 1.5rem;">Your package is on the way</small>
            </div>
            <div style="margin-bottom: 1.5rem; padding-left: 1rem; opacity: 0.5;">
                <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                    <i class="fa-regular fa-circle" style="color: #ccc; margin-right: 0.5rem;"></i>
                    <strong style="color: #999;">Out for Delivery</strong>
                </div>
                <small style="color: #999; padding-left: 1.5rem;">Pending</small>
            </div>
            <div style="padding-left: 1rem; opacity: 0.5;">
                <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                    <i class="fa-regular fa-circle" style="color: #ccc; margin-right: 0.5rem;"></i>
                    <strong style="color: #999;">Delivered</strong>
                </div>
                <small style="color: #999; padding-left: 1.5rem;">Pending</small>
            </div>
        `;

        // Scroll to result
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        ui.showToast('Order found!', 'success');
    }, 1500);
}

// --- SEARCH LOGIC ---
document.getElementById('search-input').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');

    if (term.length < 2) {
        resultsContainer.innerHTML = '';
        return;
    }

    const matches = products.filter(p => p.name.toLowerCase().includes(term) || p.category.includes(term));

    resultsContainer.innerHTML = matches.map(p => `
        <div class="search-result-item" onclick="router.navigate('product/${p.id}'); ui.toggleSearch()">
            <img src="${p.image}" alt="${p.name}">
            <div>
                <h4>${p.name}</h4>
                <small>PKR ${p.price}</small>
            </div>
        </div>
    `).join('');

    if (matches.length === 0) {
        resultsContainer.innerHTML = '<p style="text-align:center; color:#999; margin-top:2rem;">No matching items found.</p>';
    }
});

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    router.init();
    cart.updateCount();
    ui.initAnimations();
});

// --- LOADING SCREEN ---
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');

    // Fade out loading screen after 1.5 seconds
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
    }, 1500);
});
