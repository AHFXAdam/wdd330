var r=(o,e,t)=>new Promise((d,c)=>{var l=a=>{try{s(t.next(a))}catch(i){c(i)}},u=a=>{try{s(t.throw(a))}catch(i){c(i)}},s=a=>a.done?d(a.value):Promise.resolve(a.value).then(l,u);s((t=t.apply(o,e)).next())});import{setLocalStorage as n}from"./utils.js";export default class p{constructor(e,t){this.productId=e,this.product={},this.dataSource=t}init(){return r(this,null,function*(){this.details=yield this.dataSource.findProductById(this.productId),this.renderProductDetails("product-detail"),document.getElementById("addToCart").addEventListener("click",this.addToCart.bind(this))})}addToCart(e){return r(this,null,function*(){const t=JSON.parse(localStorage.getItem("so-cart"))||[],d=[...t,this.details];n("so-cart",d),document.querySelector(".cart").classList.add("cart-animate"),setTimeout(function(){document.querySelector(".cart").classList.remove("cart-animate")},2e3)})}renderProductDetails(e){console.log(e);const t=`
        <h3>${this.details.Brand.Name}</h3>
        <h2 class="divider">${this.details.NameWithoutBrand}</h2>
        <img
          class="divider"
          src="${this.details.Image}"
          alt="${this.details.Name}"
        />

        <p class="product-card__price">$${this.details.ListPrice}</p>
        <p>Regular Price: <del>$${this.details.SuggestedRetailPrice.toFixed(2)}</del></p>
        <p class="product__color">${this.details.Colors[0].ColorName}</p>
        <p class="product__description">
          ${this.details.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.details.Id}">Add to Cart</button>
        </div>`;document.getElementById(e).innerHTML=t}}
