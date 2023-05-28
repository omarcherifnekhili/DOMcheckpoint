const cartItems = document.getElementById('cartItems');
const totalQuantitySpan = document.getElementById('totalQuantity');
const totalPriceSpan = document.getElementById('totalPrice');

let cart = [];

function renderCart() {
  cartItems.innerHTML = '';
  cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('item');

    const imgElement = document.createElement('img');
    imgElement.src = item.image;
    imgElement.alt = item.name;
    itemElement.appendChild(imgElement);

    const infoElement = document.createElement('div');
    infoElement.innerHTML = `
      <h3>${item.name}</h3>
      <p>Price: ${item.price} $</p>
      <div class="quantity">
        <button class="decrement">-</button>
        <span class="quantity-value">${item.quantity}</span>
        <button class="increment">+</button>
      </div>
      <button class="delete">Delete</button>
      <button class="like ${item.liked ? 'liked' : ''}">&#10084;</button>
    `;
    itemElement.appendChild(infoElement);

    cartItems.appendChild(itemElement);
  });

  updateTotalQuantity();
  updateTotalPrice();

  const decrementButtons = document.querySelectorAll('.decrement');
  const incrementButtons = document.querySelectorAll('.increment');
  const deleteButtons = document.querySelectorAll('.delete');
  const likeButtons = document.querySelectorAll('.like');

  decrementButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
        renderCart();
      }
    });
  });

  incrementButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      cart[index].quantity++;
      renderCart();
    });
  });

  deleteButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      cart.splice(index, 1);
      renderCart();
    });
  });

  likeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      cart[index].liked = !cart[index].liked;
      renderCart();
    });
  });
}


function updateTotalQuantity() {
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  totalQuantitySpan.textContent = totalQuantity;
}


function updateTotalPrice() {
  const totalPrice = cart.reduce((total, item) => total + item.quantity * item.price, 0);
  totalPriceSpan.textContent = totalPrice;
}


cart.push({ name: 'Item 1', price: 10, quantity: 3, image: 'image1.jpg', liked: false });
cart.push({ name: 'Item 2', price: 20, quantity: 2, image: 'image2.jpg', liked: true });
cart.push({ name: 'Item 3', price: 15, quantity: 1, image: 'image3.jpg', liked: false });

renderCart();
