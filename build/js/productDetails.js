var r=(o,a,t)=>new Promise((s,c)=>{var l=d=>{try{i(t.next(d))}catch(e){c(e)}},u=d=>{try{i(t.throw(d))}catch(e){c(e)}},i=d=>d.done?s(d.value):Promise.resolve(d.value).then(l,u);i((t=t.apply(o,a)).next())});import{setLocalStorage as n}from"./utils.js";export default class p{constructor(a,t){this.productId=a,this.product={},this.dataSource=t}init(){return r(this,null,function*(){this.details=yield this.dataSource.findProductById(this.productId),this.renderProductDetails("product-detail"),document.getElementById("addToCart").addEventListener("click",this.addToCart.bind(this))})}addToCart(a){return r(this,null,function*(){const t=JSON.parse(localStorage.getItem("so-cart"))||[],s=[...t,this.details];n("so-cart",s)})}renderProductDetails(a){const t=`
        <h3>${this.details.Brand.Name}</h3>
        <h2 class="divider">${this.details.NameWithoutBrand}</h2>
        <img
          class="divider"
          src="${this.details.Image}"
          alt="${this.details.Name}"
        />

        <p class="product-card__price">$${this.details.ListPrice}</p>
        <p class="product__color">${this.details.Colors[0].ColorName}</p>
        <p class="product__description">
          ${this.details.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.details.Id}">Add to Cart</button>
        </div>`;document.getElementById(a).innerHTML=t}}
