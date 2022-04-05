var r = (o, a, t) =>
  new Promise((i, c) => {
    var l = (e) => {
        try {
          d(t.next(e));
        } catch (s) {
          c(s);
        }
      },
      u = (e) => {
        try {
          d(t.throw(e));
        } catch (s) {
          c(s);
        }
      },
      d = (e) => (e.done ? i(e.value) : Promise.resolve(e.value).then(l, u));
    d((t = t.apply(o, a)).next());
  });
import { setLocalStorage as n } from './utils.js';
import { updateCartNumber as p } from './header.js';
export default class h {
  constructor(a, t) {
    (this.productId = a), (this.product = {}), (this.dataSource = t);
  }
  init() {
    return r(this, null, function* () {
      (this.details = yield this.dataSource.findProductById(this.productId)),
        this.renderProductDetails('product-detail'),
        document
          .getElementById('addToCart')
          .addEventListener('click', this.addToCart.bind(this));
    });
  }
  addToCart(a) {
    return r(this, null, function* () {
      const t = JSON.parse(localStorage.getItem('so-cart')) || [],
        i = [...t, this.details];
      n('so-cart', i),
        p(),
        document.querySelector('.cart').classList.add('cart-animate'),
        setTimeout(function () {
          document.querySelector('.cart').classList.remove('cart-animate');
        }, 2e3);
    });
  }
  renderProductDetails(a) {
    const t = `
        <h3>${this.details.Brand.Name}</h3>
        <h2 class="divider">${this.details.NameWithoutBrand}</h2>
        <img
          class="divider"
          src="${this.details.Image}"
          alt="${this.details.Name}"
        />

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
    document.getElementById(a).innerHTML = t;
  }
}
