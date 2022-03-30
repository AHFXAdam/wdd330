function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function getCartContents() {
  let markup = '';
  try {
    const cartItems = JSON.parse(localStorage.getItem('so-cart'));
    // console.log(cartItems);
    const htmlItems = cartItems.map((item) => renderCartItem(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
    document.querySelector('.product-list').innerHTML = renderCartItem(
      cartItems
    );
  } catch (e) {
    console.log('No Items in Cart');
  }
}

function renderCartItem(item) {
  // console.log(item);
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
  console.log(newItem);
  return newItem;
}

getCartContents();
