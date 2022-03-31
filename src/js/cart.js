// import { setClick } from "./utils";

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function removeFromCart(e) {
  // console.log(this);
  const idToRemove = e.target.dataset.id;
  // console.log(idToRemove);
  const items = getLocalStorage('so-cart');
  const out = [];
  for (const item of items) {
    if (item.Id != idToRemove) {
      out.push(item);
    }
  }
  localStorage.setItem('so-cart', JSON.stringify(out));
  getCartContents();
}

function getCartContents() {
  let markup = '';
  try {
    const cartItems = getLocalStorage('so-cart');
    // console.log(cartItems);
    if (cartItems.length == 0) {
      document.querySelector('.product-list').innerHTML =
        '<p>No items currently in your cart</p>';
    } else {
      const htmlItems = cartItems.map((item) => renderCartItem(item));
      document.querySelector('.product-list').innerHTML = htmlItems.join('');
      // setClick(".remove",removeFromCart.bind(this))
      // document.querySelectorAll(".box").forEach(box =>
      //   box.addEventListener("click", () => box.classList.toggle("red"))
      // )
      document
        .querySelectorAll('.remove')
        .forEach((button) =>
          button.addEventListener('click', (e) => removeFromCart(e))
        );
      // .addEventListener('click', this.addToCart.bind(this));
      // document.querySelector('.product-list').innerHTML = renderCartItem(
      //   cartItems
      // );
    }
  } catch (e) {
    document.querySelector('.product-list').innerHTML =
      '<p>No items currently in your cart</p>';
    console.log('No Items in Cart' + e);
  }
}

function renderCartItem(item) {
  // console.log(item);
  const newItem = `<li class="cart-card divider">
  <a href="product_pages/product-details.html?product=${item.Id}" class="cart-card__image">
    <img
      src="${item.Image.replace("../","")}"
      alt="${item.Name}"
    />
  </a>
  <div>
  <a href="product_pages/product-details.html?product=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <span class='remove' data-id="${item.Id}">REMOVE</span>
  </div>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  console.log(newItem);
  return newItem;
}

getCartContents();
