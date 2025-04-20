let products = [
  { id: 1, name: "Laptop", price: 1000, category: "Electronics", stock: 5 },
  { id: 2, name: "Headphones", price: 200, category: "Electronics", stock: 15 },
  { id: 3, name: "T-shirt", price: 20, category: "Apparel", stock: 50 },
];

// Save products to localStorage
function setToLocal(p) {
  localStorage.setItem('products', JSON.stringify(p));
}

// Get products from localStorage
function getFromLocal() {
  return JSON.parse(localStorage.getItem('products')) || [];
}

// Render the product list
function renderList(productArray) {
  document.getElementById('productList').innerHTML = productArray.map((product) => `
    <div class="col-sm-6">
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">Price: $${product.price}</p>
          <p class="card-text">Category: ${product.category}</p>
          <p class="card-text">Stock: ${product.stock}</p>
          <button class="btn btn-primary mr-2" onclick="editProduct(${product.id})">Edit</button>
          <button class="btn btn-danger" onclick="deleteProd(${product.id})">Delete</button>
        </div>
      </div>
    </div>
  `).join('');
}

let editId = null;  // Track product being edited

// Add or update product
function addNewPro() {
  const name = document.getElementById('productName').value.trim();
  const price = parseFloat(document.getElementById('productPrice').value);
  const category = document.getElementById('productCategory').value.trim();
  const stock = parseInt(document.getElementById('productStock').value);

  if (!name || isNaN(price) || !category || isNaN(stock)) {
    alert('Please fill out all fields correctly.');
    return;
  }

  let productsFromLocal = getFromLocal();

  if (editId !== null) {
    // Update existing product
    const index = productsFromLocal.findIndex(p => p.id === editId);
    if (index !== -1) {
      productsFromLocal[index] = {
        id: editId,
        name: name,
        price: price,
        category: category,
        stock: stock
      };
      editId = null;
      document.getElementById('mainButton').textContent = "Add Product";
    }
  } else {
    // Add new product
    const newProduct = {
      id: Date.now(),
      name: name,
      price: price,
      category: category,
      stock: stock
    };
    productsFromLocal.push(newProduct);
  }

  setToLocal(productsFromLocal);
  renderList(productsFromLocal);
  clearForm();
}

// Filter by product name
function filterProducts() {
  const key = document.getElementById('filterKey').value.trim().toLowerCase();
  const productsFromLocal = getFromLocal();
  const filteredProducts = productsFromLocal.filter(p => p.name.toLowerCase() === key);

  renderList(filteredProducts);
}

// Filter by product category
function filterCategory() {
  const key = document.getElementById('filterKey').value.trim().toLowerCase();
  const productsFromLocal = getFromLocal();
  const filteredProducts = productsFromLocal.filter(p => p.category.toLowerCase() === key);

  renderList(filteredProducts);
}

// Delete a product
function deleteProd(id) {
  let productsFromLocal = getFromLocal();
  const index = productsFromLocal.findIndex(p => p.id === id);

  if (index !== -1) {
    productsFromLocal.splice(index, 1);
    setToLocal(productsFromLocal);
    renderList(productsFromLocal);
  }
}

// Edit a product
function editProduct(id) {
  const productsFromLocal = getFromLocal();
  const product = productsFromLocal.find(p => p.id === id);

  if (product) {
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productStock').value = product.stock;

    editId = id; // store id for update
    document.getElementById('mainButton').textContent = "Update Product";
  }
}

// Clear form after add/update
function clearForm() {
  document.getElementById('productName').value = "";
  document.getElementById('productPrice').value = "";
  document.getElementById('productCategory').value = "";
  document.getElementById('productStock').value = "";
  document.getElementById('filterKey').value = "";
}

if (!localStorage.getItem('products')) {
  setToLocal(products);
}

renderList(getFromLocal());
