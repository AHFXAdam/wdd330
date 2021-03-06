import { updateBreadCrumbs, setLocalStorage } from './utils.js';
// import { updateCartNumber } from './header.js';
export default class productDetails {
  constructor(productId, dataSource, sc) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.sc = sc;
  }

  async init(parentElement = 'product-detail', breadCrumb = true) {
    this.details = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails(parentElement);
    if (breadCrumb) {
      updateBreadCrumbs(
        `<a href="/product-listing/?category=${this.details.Category}">${this.details.Category}</a> | ${this.details.NameWithoutBrand}`
      );
    }

    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    // once we have the product details we can render out the HTML
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document
      .getElementById('addToCart')
      .addEventListener('click', () => this.sc.addToCart(this));
    // .addEventListener('click', this.sc.addToCart.bind(this));
  }

  // async addToCart(e) {
  //   // const products = await this.dataSource.getData();
  //   // console.log(products);
  //   // const product = products.find((item) => item.Id === e.target.dataset.id);

  //   const current_prod = JSON.parse(localStorage.getItem('so-cart')) || [];
  //   const output = [...current_prod, this.details];
  //   setLocalStorage('so-cart', output);
  //   updateCartNumber();
  //   document.querySelector('.cart').classList.add('cart-animate');
  //   setTimeout(function () {
  //     document.querySelector('.cart').classList.remove('cart-animate');
  //   }, 2000);
  //   // window.location.assign('/cart.html');
  // }

  renderProductDetails(id) {
    // console.log(id);
    const output = `
        <h3>${this.details.Brand.Name}</h3>
        <h2 class="divider">${this.details.NameWithoutBrand}</h2>
        <picture>
        <source media="(min-width:500px)" srcset="${
          this.details.Images.PrimaryExtraLarge
        }">
        <img
          class="divider"
          alt="${this.details.Name}"
          src="${this.details.Images.PrimaryLarge}"
        />
      </picture>         


        <p class="product-card__price">$${this.details.ListPrice}</p>
        <p>Regular Price: <del>$${this.details.SuggestedRetailPrice.toFixed(
          2
        )}</del></p>
        <p>Discount: <b>$${(
          this.details.SuggestedRetailPrice - this.details.ListPrice
        ).toFixed(2)}</b></p>
        <p class="product__color">${this.details.Colors[0].ColorName}</p>
        <p class="product__description">
          ${this.details.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${
            this.details.Id
          }">Add to Cart</button>
        </div>`;
    document.getElementById(id).innerHTML = output;
  }
}
