let currentCategory = '';
let whatsappPhone = '9101780136'; // Fallback

// Load products on page load
document.addEventListener('DOMContentLoaded', () => {
  fetchConfig();
  loadProducts();
});

async function fetchConfig() {
  try {
    const response = await fetch('/api/config');
    const config = await response.json();
    whatsappPhone = config.whatsappPhone;
  } catch (error) {
    console.error('Error loading config:', error);
  }
}

async function loadProducts() {
  try {
    const url = currentCategory ? `/api/products/category/${currentCategory}` : '/api/products';
    const response = await fetch(url);
    const products = await response.json();
    
    displayProducts(products);
  } catch (error) {
    console.error('Error loading products:', error);
    document.getElementById('productsGrid').innerHTML = '<div class="loading">Error loading products. Please try again.</div>';
  }
}

function displayProducts(products) {
  const productsGrid = document.getElementById('productsGrid');
  
  if (products.length === 0) {
    productsGrid.innerHTML = '<div class="loading">No bouquets in this category yet.</div>';
    return;
  }
  
  productsGrid.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.title}" class="product-image" onerror="this.src='https://via.placeholder.com/280x250?text=Bouquet'">
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-title">${product.title}</h3>
        <p class="product-description">${product.description}</p>
        ${product.price && product.price !== '0' ? `<div class="product-price">₹${product.price}</div>` : ''}
        <div class="product-footer">
          <a href="https://wa.me/${whatsappPhone}?text=Hi! I'm interested in the ${encodeURIComponent(product.title)} bouquet from Guwahati Flowers%0A%0AImage: ${encodeURIComponent(product.image)}" target="_blank" class="whatsapp-btn">
            💬 Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

function filterByCategory(category) {
  currentCategory = category;
  
  // Update active filter button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  loadProducts();
}
