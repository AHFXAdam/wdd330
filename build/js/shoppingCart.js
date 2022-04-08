import{updateCartNumber as c}from"./header.js";export default class s{getLocalStorage(t){return JSON.parse(localStorage.getItem(t))}removeFromCart(t){const e=t.target.dataset.id,r=this.getLocalStorage("so-cart"),a=[];for(const o of r)o.Id!=e&&a.push(o);localStorage.setItem("so-cart",JSON.stringify(a)),this.getCartContents(),c()}getCartContents(){try{const t=this.getLocalStorage("so-cart");if(t.length==0)document.querySelector(".product-list").innerHTML="<p>No items currently in your cart</p>";else{const e=this.calcTotal();document.querySelector(".cart-total").innerHTML+=e.toFixed(2),document.querySelector(".cart-footer").classList.remove("hide");const r=t.map(a=>this.renderCartItem(a));document.querySelector(".product-list").innerHTML=r.join(""),document.querySelectorAll(".remove").forEach(a=>a.addEventListener("click",o=>this.removeFromCart(o)))}}catch(t){document.querySelector(".product-list").innerHTML="<p>No items currently in your cart</p>"}}calcTotal(){const t=this.getLocalStorage("so-cart");let e=0;for(let r of t)e+=r.ListPrice;return e}getTotalCartItems(){return this.getLocalStorage("so-cart").length}renderCartItem(t){const e=`<li class="cart-card divider">
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
      </li>`;return e}packageItems(){const t=this.getLocalStorage("so-cart"),e=t.map(r=>this.smallItem(r));return e}smallItem(t){return{id:t.Id,name:t.Name,price:t.FinalPrice,quantity:1}}}
