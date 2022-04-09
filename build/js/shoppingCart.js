var n=(i,t,e)=>new Promise((r,a)=>{var o=c=>{try{s(e.next(c))}catch(l){a(l)}},m=c=>{try{s(e.throw(c))}catch(l){a(l)}},s=c=>c.done?r(c.value):Promise.resolve(c.value).then(o,m);s((e=e.apply(i,t)).next())});import{updateCartNumber as d}from"./header.js";import{setLocalStorage as u}from"./utils.js";export default class p{getLocalStorage(t){return JSON.parse(localStorage.getItem(t))}addToCart(t){return n(this,null,function*(){const e=t.details;let r=(yield JSON.parse(localStorage.getItem("so-cart")))||[],a=this.itemInCart(e,r);var o;a!=-1?o=a:(t.details.quantity=1,o=[...r,t.details]),u("so-cart",o),d(),document.querySelector(".cart").classList.add("cart-animate"),setTimeout(function(){document.querySelector(".cart").classList.remove("cart-animate")},2e3)})}removeFromCart(t){const e=t.target.dataset.id,r=this.getLocalStorage("so-cart"),a=[];for(const o of r)o.Id!=e&&a.push(o);localStorage.setItem("so-cart",JSON.stringify(a)),this.getCartContents(),d()}itemInCart(t,e){for(let r of e)if(t.Id==r.Id)return r.quantity+=1,e;return-1}getCartContents(){try{const t=this.getLocalStorage("so-cart");if(t.length==0)document.querySelector(".product-list").innerHTML="<p>No items currently in your cart</p>";else{const e=this.calcTotal();document.querySelector(".cart-total").innerHTML="$"+e.toFixed(2),document.querySelector(".cart-footer").classList.remove("hide");const r=t.map(a=>this.renderCartItem(a));document.querySelector(".product-list").innerHTML=r.join(""),document.querySelectorAll(".remove").forEach(a=>a.addEventListener("click",o=>this.removeFromCart(o)))}}catch(t){document.querySelector(".product-list").innerHTML="<p>No items currently in your cart</p>"}}calcTotal(){const t=this.getLocalStorage("so-cart");let e=0;for(let r of t)e+=r.ListPrice*r.quantity;return e}getTotalCartItems(){return this.getLocalStorage("so-cart").length}renderCartItem(t){const e=`<li class="cart-card divider">
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
        <p class="cart-card__quantity">qty: ${t.quantity}</p>
        <p class="cart-card__price">$${t.FinalPrice}</p>
      </li>`;return e}packageItems(){const t=this.getLocalStorage("so-cart"),e=t.map(r=>this.smallItem(r));return e}smallItem(t){return{id:t.Id,name:t.Name,price:t.FinalPrice,quantity:t.quantity}}}
