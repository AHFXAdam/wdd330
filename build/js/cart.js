import{updateCartNumber as l}from"./header.js";function a(t){return JSON.parse(localStorage.getItem(t))}function d(t){const e=t.target.dataset.id,r=a("so-cart"),c=[];for(const o of r)o.Id!=e&&c.push(o);localStorage.setItem("so-cart",JSON.stringify(c)),s(),l()}function s(){let t="";try{const e=a("so-cart");if(e.length==0)document.querySelector(".product-list").innerHTML="<p>No items currently in your cart</p>";else{const r=i(e);console.log(r),document.querySelector(".cart-total").innerHTML+=r.toFixed(2),document.querySelector(".cart-footer").classList.remove("hide");const c=e.map(o=>u(o));document.querySelector(".product-list").innerHTML=c.join(""),document.querySelectorAll(".remove").forEach(o=>o.addEventListener("click",n=>d(n)))}}catch(e){document.querySelector(".product-list").innerHTML="<p>No items currently in your cart</p>",console.log("No Items in Cart"+e)}}function i(t){let e=0;for(let r of t)e+=r.ListPrice;return e}function u(t){const e=`<li class="cart-card divider">
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
</li>`;return console.log(e),e}s();
