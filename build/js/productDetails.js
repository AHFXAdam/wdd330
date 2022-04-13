var o=(r,e,t)=>new Promise((s,c)=>{var l=i=>{try{d(t.next(i))}catch(a){c(a)}},u=i=>{try{d(t.throw(i))}catch(a){c(a)}},d=i=>i.done?s(i.value):Promise.resolve(i.value).then(l,u);d((t=t.apply(r,e)).next())});import{updateBreadCrumbs as h}from"./utils.js";export default class p{constructor(e,t,s){this.productId=e,this.product={},this.dataSource=t,this.sc=s}init(){return o(this,null,function*(){this.details=yield this.dataSource.findProductById(this.productId),this.renderProductDetails("product-detail"),h(`<a href="/product-listing/?category=${this.details.Category}">${this.details.Category}</a> | ${this.details.NameWithoutBrand}`),document.getElementById("addToCart").addEventListener("click",()=>this.sc.addToCart(this))})}renderProductDetails(e){const t=`
        <h3>${this.details.Brand.Name}</h3>
        <h2 class="divider">${this.details.NameWithoutBrand}</h2>
        <picture>
        <source media="(min-width:500px)" srcset="${this.details.Images.PrimaryExtraLarge}">
        <img
          class="divider"
          alt="${this.details.Name}"
          src="${this.details.Images.PrimaryLarge}"
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
        </div>`;document.getElementById(e).innerHTML=t}}
