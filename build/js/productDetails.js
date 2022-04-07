var r=(c,i,t)=>new Promise((a,o)=>{var l=e=>{try{s(t.next(e))}catch(d){o(d)}},u=e=>{try{s(t.throw(e))}catch(d){o(d)}},s=e=>e.done?a(e.value):Promise.resolve(e.value).then(l,u);s((t=t.apply(c,i)).next())});import{setLocalStorage as p}from"./utils.js";import{updateCartNumber as n}from"./header.js";export default class h{constructor(i,t){this.productId=i,this.product={},this.dataSource=t}init(){return r(this,null,function*(){this.details=yield this.dataSource.findProductById(this.productId),this.renderProductDetails("product-detail"),document.getElementById("addToCart").addEventListener("click",this.addToCart.bind(this))})}addToCart(i){return r(this,null,function*(){const t=JSON.parse(localStorage.getItem("so-cart"))||[],a=[...t,this.details];p("so-cart",a),n(),document.querySelector(".cart").classList.add("cart-animate"),setTimeout(function(){document.querySelector(".cart").classList.remove("cart-animate")},2e3)})}renderProductDetails(i){const t=`
        <h3>${this.details.Brand.Name}</h3>
        <h2 class="divider">${this.details.NameWithoutBrand}</h2>
        <picture>
        <source media="(min-width:500px)" srcset="${this.details.Image.replace("320","850")}">
        <img
          class="divider"
          alt="${this.details.Name}"
          src="${this.details.Image}"
        />
      </picture>         


        <p class="product-card__price">$${this.details.ListPrice}</p>
        <p>Regular Price: <del>$${this.details.SuggestedRetailPrice.toFixed(2)}</del></p>
        <p>Discount: <b>$${(this.details.SuggestedRetailPrice-this.details.ListPrice).toFixed(2)}</b></p>
        <p class="product__color">${this.details.Colors[0].ColorName}</p>
        <p class="product__description">
          ${this.details.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.details.Id}">Add to Cart</button>
        </div>`;document.getElementById(i).innerHTML=t}}
