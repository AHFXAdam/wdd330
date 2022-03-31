function getLocalStorage(r){return JSON.parse(localStorage.getItem(r))}function getCartContents(){let r="";try{const t=JSON.parse(localStorage.getItem("so-cart")),a=t.map(c=>renderCartItem(c));document.querySelector(".product-list").innerHTML=a.join("")}catch(t){document.querySelector(".product-list").innerHTML="<p>No items currently in your cart</p>"}}function renderCartItem(r){const t=`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${r.Image}"
      alt="${r.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${r.Name}</h2>
  </a>
  <p class="cart-card__color">${r.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${r.FinalPrice}</p>
</li>`;return console.log(t),t}getCartContents();
