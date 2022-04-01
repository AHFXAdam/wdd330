function getLocalStorage(t){return JSON.parse(localStorage.getItem(t))}function removeFromCart(t){const r=t.target.dataset.id,o=getLocalStorage("so-cart"),e=[];for(const c of o)c.Id!=r&&e.push(c);localStorage.setItem("so-cart",JSON.stringify(e)),getCartContents()}function getCartContents(){let t="";try{const r=getLocalStorage("so-cart");if(r.length==0)document.querySelector(".product-list").innerHTML="<p>No items currently in your cart</p>";else{const o=r.map(e=>renderCartItem(e));document.querySelector(".product-list").innerHTML=o.join(""),document.querySelectorAll(".remove").forEach(e=>e.addEventListener("click",c=>removeFromCart(c)))}}catch(r){document.querySelector(".product-list").innerHTML="<p>No items currently in your cart</p>",console.log("No Items in Cart"+r)}}function renderCartItem(t){const r=`<li class="cart-card divider">
  <a href="product_pages/product-details.html?product=${t.Id}" class="cart-card__image">
    <img
      src="${t.Image.replace("../","")}"
      alt="${t.Name}"
    />
  </a>
  <div>
  <a href="product_pages/product-details.html?product=${t.Id}">
    <h2 class="card__name">${t.Name}</h2>
  </a>
  <span class='remove' data-id="${t.Id}">REMOVE</span>
  </div>
  <p class="cart-card__color">${t.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${t.FinalPrice}</p>
</li>`;return console.log(r),r}getCartContents();
