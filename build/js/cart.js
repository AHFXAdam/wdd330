import{updateCartNumber as l}from"./header.js";function a(t){return JSON.parse(localStorage.getItem(t))}function d(t){const e=t.target.dataset.id,c=a("so-cart"),o=[];for(const r of c)r.Id!=e&&o.push(r);localStorage.setItem("so-cart",JSON.stringify(o)),s(),l()}function s(){let t="";try{const e=a("so-cart");if(e.length==0)document.querySelector(".product-list").innerHTML="<p>No items currently in your cart</p>";else{const c=i(e);document.querySelector(".cart-total").innerHTML+=c.toFixed(2),document.querySelector(".cart-footer").classList.remove("hide");const o=e.map(r=>u(r));document.querySelector(".product-list").innerHTML=o.join(""),document.querySelectorAll(".remove").forEach(r=>r.addEventListener("click",n=>d(n)))}}catch(e){document.querySelector(".product-list").innerHTML="<p>No items currently in your cart</p>"}}function i(t){let e=0;for(let c of t)e+=c.ListPrice;return e}function u(t){const e=`<li class="cart-card divider">
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
</li>`;return e}s();
