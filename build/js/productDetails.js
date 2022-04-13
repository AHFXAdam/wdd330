var o=(r,i,t)=>new Promise((s,c)=>{var l=e=>{try{d(t.next(e))}catch(a){c(a)}},u=e=>{try{d(t.throw(e))}catch(a){c(a)}},d=e=>e.done?s(e.value):Promise.resolve(e.value).then(l,u);d((t=t.apply(r,i)).next())});import{updateBreadCrumbs as h}from"./utils.js";export default class p{constructor(i,t,s){this.productId=i,this.product={},this.dataSource=t,this.sc=s}init(i="product-detail",t=!0){return o(this,null,function*(){this.details=yield this.dataSource.findProductById(this.productId),this.renderProductDetails(i),t&&h(`<a href="/product-listing/?category=${this.details.Category}">${this.details.Category}</a> | ${this.details.NameWithoutBrand}`),document.getElementById("addToCart").addEventListener("click",()=>this.sc.addToCart(this))})}renderProductDetails(i){const t=`
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
        </div>`;document.getElementById(i).innerHTML=t}}
