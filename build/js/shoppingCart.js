import{updateCartNumber as s}from"./header.js";export default class l{getLocalStorage(t){return JSON.parse(localStorage.getItem(t))}removeFromCart(t){const e=t.target.dataset.id,a=this.getLocalStorage("so-cart"),o=[];for(const r of a)r.Id!=e&&o.push(r);localStorage.setItem("so-cart",JSON.stringify(o)),this.getCartContents(),s()}getCartContents(){let t="";try{const e=this.getLocalStorage("so-cart");if(e.length==0)document.querySelector(".product-list").innerHTML="<p>No items currently in your cart</p>";else{const a=this.calcTotal(e);document.querySelector(".cart-total").innerHTML+=a.toFixed(2),document.querySelector(".cart-footer").classList.remove("hide");const o=e.map(r=>this.renderCartItem(r));document.querySelector(".product-list").innerHTML=o.join(""),document.querySelectorAll(".remove").forEach(r=>r.addEventListener("click",c=>this.removeFromCart(c)))}}catch(e){document.querySelector(".product-list").innerHTML="<p>No items currently in your cart</p>"}}calcTotal(t){let e=0;for(let a of t)e+=a.ListPrice;return e}renderCartItem(t){const e=`<li class="cart-card divider">
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
