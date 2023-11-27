let items = [];

// Add item to cart
function addItemToCart(itemName, itemPrice) {
  const popup = document.getElementById('cart-popup');
  popup.style.display = 'block';
  const item = { name: itemName, price: itemPrice };
  items.push(item);
  saveCart();
  displayItems();
  calculateTotal();
  
  // Show the popup
  
}


// Display items in cart
function displayItems() {
  const itemsList = document.getElementById('items');
  itemsList.innerHTML = '';
  let totalPrice = 0;
  items.forEach(item => {
    const li = document.createElement('li');
    li.innerText = `${item.name}: $${item.price.toFixed(2)}`;
    itemsList.appendChild(li);
    totalPrice += item.price;
  });
  const totalElement = document.getElementById('total');
  totalElement.innerText = totalPrice.toFixed(2);
}

// Calculate total price of cart
function calculateTotal() {
  const total = items.reduce((acc, item) => acc + item.price, 0);
  document.getElementById('total').innerText = total.toFixed(2);
}

// Save cart items to local storage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(items));
}

// Load cart items from local storage
function loadCart() {
  const cart = localStorage.getItem('cart');
  if (cart) {
    items = JSON.parse(cart);
    displayItems();
    calculateTotal();
  }
}

// Clear cart items from local storage
function clearCart() {
  localStorage.removeItem('cart');
  items = [];
  displayItems();
  calculateTotal();
}

// Show checkout message and clear cart
function checkout() {
  const totalElement = document.getElementById('total');
  const totalPrice = totalElement.innerText;

  // Show checkout message overlay
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'block';

  // Show checkout message div
  const messageDiv = document.getElementById('message');
  messageDiv.innerHTML = `
    <p>Order pending. Delivery will take 2 days. Total price: $${totalPrice}</p>
    <p>Thank You!</p>
    <div style="text-align: center;"><button class="btn btn-light" onclick="resetCart()">OK</button></div>
  `;
  messageDiv.style.display = 'block';

  // Clear cart and update display
  clearCart();
}

// Reset cart message overlay and div
function resetCart() {
  const overlay = document.getElementById('overlay');
  const messageDiv = document.getElementById('message');
  overlay.style.display = 'none';
  messageDiv.style.display = 'none';
}

// Close the popup message
function closePopup() {
  const popup = document.getElementById('cart-popup');
  popup.style.display = 'none';
}

// DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Load cart items from local storage
  loadCart();

  // Attach event listener to the checkout button
  document.getElementById('checkout').addEventListener('click', () => {
    checkout();
  });

  // Attach event listener to close the popup
  document.getElementById('popup-close').addEventListener('click', () => {
    closePopup();
  });
});
