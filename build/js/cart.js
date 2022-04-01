function getLocalStorage(t){return JSON.parse(localStorage.getItem(t))}function removeFromCart(t){const e=t.target.dataset.id,r=getLocalStorage("so-cart"),c=[];for(const o of r)o.Id!=e&&c.push(o);localStorage.setItem("so-cart",JSON.stringify(c)),getCartContents()}function getCartContents(){let t="";try{const e=getLocalStorage("so-cart");if(e.length==0)document.querySelector(".product-list").innerHTML="<p>No items currently in your cart</p>";else{const r=calcTotal(e);console.log(r),document.querySelector(".cart-total").innerHTML+=r.toFixed(2),document.querySelector(".cart-footer").classList.remove("hide");const c=e.map(o=>renderCartItem(o));document.querySelector(".product-list").innerHTML=c.join(""),document.querySelectorAll(".remove").forEach(o=>o.addEventListener("click",a=>removeFromCart(a)))}}catch(e){document.querySelector(".product-list").innerHTML="<p>No items currently in your cart</p>",console.log("No Items in Cart"+e)}}function calcTotal(t){let e=0;for(let r of t)e+=r.ListPrice;return e}function renderCartItem(t){const e=`<li class="cart-card divider">
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
</li>`;return console.log(e),e}getCartContents();
