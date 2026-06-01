let adminUser = null;
let adminPassword = null;

document.addEventListener('DOMContentLoaded', () => {
  checkAdminSession();
  loadProductsForAdmin();
});

function handleLogin(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      adminUser = username;
      adminPassword = password;
      localStorage.setItem('adminUser', username);
      localStorage.setItem('adminPassword', btoa(password));
      showAdminDashboard();
      loadProductsForAdmin();
    } else {
      showError('loginError', data.message || 'Invalid credentials');
    }
  })
  .catch(error => {
    showError('loginError', 'Login failed. Please try again.');
  });
}

function checkAdminSession() {
  const storedUser = localStorage.getItem('adminUser');
  const storedPassword = localStorage.getItem('adminPassword');
  
  if (storedUser && storedPassword) {
    adminUser = storedUser;
    adminPassword = atob(storedPassword);
    showAdminDashboard();
  }
}

function showAdminDashboard() {
  document.getElementById('loginContainer').classList.remove('show');
  document.getElementById('adminDashboard').classList.add('show');
}

function logout() {
  localStorage.removeItem('adminUser');
  localStorage.removeItem('adminPassword');
  adminUser = null;
  adminPassword = null;
  document.getElementById('loginContainer').classList.add('show');
  document.getElementById('adminDashboard').classList.remove('show');
  document.getElementById('uploadForm').reset();
  document.getElementById('fileName').textContent = '';
}

function updateFileName() {
  const fileInput = document.getElementById('image');
  const fileName = document.getElementById('fileName');
  if (fileInput.files.length > 0) {
    fileName.textContent = fileInput.files[0].name;
  }
}

function handleUpload(event) {
  event.preventDefault();
  
  if (!adminUser || !adminPassword) {
    showError('errorMessage', 'Please login first');
    return;
  }
  
  const formData = new FormData();
  formData.append('username', adminUser);
  formData.append('password', adminPassword);
  formData.append('title', document.getElementById('title').value);
  formData.append('category', document.getElementById('category').value);
  formData.append('price', document.getElementById('price').value);
  formData.append('description', document.getElementById('description').value);
  formData.append('image', document.getElementById('image').files[0]);
  
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Uploading...';
  
  fetch('/api/products', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Upload Bouquet';
    
    if (data.success) {
      showSuccess('successMessage', 'Bouquet uploaded successfully!');
      document.getElementById('uploadForm').reset();
      document.getElementById('fileName').textContent = '';
      loadProductsForAdmin();
      
      // Clear message after 3 seconds
      setTimeout(() => {
        document.getElementById('successMessage').classList.remove('show');
      }, 3000);
    } else {
      showError('errorMessage', data.message || 'Upload failed');
    }
  })
  .catch(error => {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Upload Bouquet';
    showError('errorMessage', 'Upload failed. Please try again.');
    console.error('Upload error:', error);
  });
}

async function loadProductsForAdmin() {
  try {
    const response = await fetch('/api/products');
    const products = await response.json();
    displayProductsTable(products);
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

function displayProductsTable(products) {
  const container = document.getElementById('productsTableContainer');
  
  if (products.length === 0) {
    container.innerHTML = '<div class="empty-state">No bouquets uploaded yet</div>';
    return;
  }
  
  const html = `
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Category</th>
          <th>Price</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${products.map(product => `
          <tr>
            <td>
              <img src="${product.image}" alt="${product.title}" class="product-thumb" onerror="this.src='https://via.placeholder.com/50?text=N/A'">
            </td>
            <td>${product.title}</td>
            <td>${product.category}</td>
            <td>₹${product.price}</td>
            <td>${product.description}</td>
            <td>
              <button class="delete-btn" onclick="deleteProduct('${product._id}')">Delete</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  
  container.innerHTML = html;
}

function deleteProduct(productId) {
  if (!confirm('Are you sure you want to delete this bouquet?')) {
    return;
  }
  
  if (!adminUser || !adminPassword) {
    showError('errorMessage', 'Please login first');
    return;
  }
  
  fetch(`/api/products/${productId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: adminUser,
      password: adminPassword
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      showSuccess('successMessage', 'Bouquet deleted successfully!');
      loadProductsForAdmin();
      setTimeout(() => {
        document.getElementById('successMessage').classList.remove('show');
      }, 3000);
    } else {
      showError('errorMessage', data.message || 'Delete failed');
    }
  })
  .catch(error => {
    showError('errorMessage', 'Delete failed. Please try again.');
  });
}

function showSuccess(elementId, message) {
  const element = document.getElementById(elementId);
  element.textContent = message;
  element.classList.add('show');
}

function showError(elementId, message) {
  const element = document.getElementById(elementId);
  element.textContent = message;
  element.classList.add('show');
}

// Add category styling
const style = document.createElement('style');
style.textContent = `
  #category {
    width: 100%;
    padding: 10px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    font-size: 1rem;
  }
  
  #category:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 5px rgba(233, 30, 99, 0.2);
  }
`;
document.head.appendChild(style);
