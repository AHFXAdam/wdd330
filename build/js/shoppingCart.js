import{updateCartNumber as c}from"./header.js";export default class s{getLocalStorage(t){return JSON.parse(localStorage.getItem(t))}removeFromCart(t){const e=t.target.dataset.id,a=this.getLocalStorage("so-cart"),r=[];for(const o of a)o.Id!=e&&r.push(o);localStorage.setItem("so-cart",JSON.stringify(r)),this.getCartContents(),c()}getCartContents(){try{const t=this.getLocalStorage("so-cart");if(t.length==0)document.querySelector(".product-list").innerHTML="<p>No items currently in your cart</p>";else{const e=this.calcTotal();document.querySelector(".cart-total").innerHTML+=e.toFixed(2),document.querySelector(".cart-footer").classList.remove("hide");const a=t.map(r=>this.renderCartItem(r));document.querySelector(".product-list").innerHTML=a.join(""),document.querySelectorAll(".remove").forEach(r=>r.addEventListener("click",o=>this.removeFromCart(o)))}}catch(t){document.querySelector(".product-list").innerHTML="<p>No items currently in your cart</p>"}}calcTotal(){const t=this.getLocalStorage("so-cart");let e=0;for(let a of t)e+=a.ListPrice;return e}getTotalCartItems(){return this.getLocalStorage("so-cart").length}renderCartItem(t){const e=`<li class="cart-card divider">
        <a href="/product_pages/product-details.html?product=${t.Id}" class="cart-card__image">
          <img
            src="${t.Images.PrimaryMedium}"
            alt="${t.Name}"
          />
        </a>
        <div>
        <a href="/product_pages/product-details.html?product=${t.Id}">
          <h2 class="card__name">${t.Name}</h2>
        </a>
        <span class='remove' data-id="${t.Id}">REMOVE</span>
        </div>
        <p class="cart-card__color">${t.Colors[0].ColorName}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">$${t.FinalPrice}</p>
      </li>`;return e}}
