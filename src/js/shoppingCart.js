import { updateCartNumber } from './header.js';
import { setLocalStorage } from './utils.js';

export default class shoppingCart {
  getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  async addToCart(e) {
    // const products = await this.dataSource.getData();
    // console.log(products);
    // const product = products.find((item) => item.Id === e.target.dataset.id);
    const itemToAdd = e.details;
    let items = (await JSON.parse(localStorage.getItem('so-cart'))) || [];
    let itemIsInCart = this.itemInCart(itemToAdd, items);
    var output;
    if (itemIsInCart != -1) {
      output = itemIsInCart;
      //current_prod[this.itemInCart(e.details)]
    } else {
      e.details.quantity = 1;
      output = [...items, e.details];
    }

    setLocalStorage('so-cart', output);
    updateCartNumber();
    document.querySelector('.cart').classList.add('cart-animate');
    setTimeout(function () {
      document.querySelector('.cart').classList.remove('cart-animate');
    }, 2000);
    // window.location.assign('/cart.html');
  }

  removeFromCart(e) {
    // console.log(this);
    const idToRemove = e.target.dataset.id;
    // console.log(idToRemove);
    const items = this.getLocalStorage('so-cart');
    const out = [];
    for (const item of items) {
      if (item.Id != idToRemove) {
        out.push(item);
      }
    }
    localStorage.setItem('so-cart', JSON.stringify(out));

    this.getCartContents();
    updateCartNumber();
  }

  itemInCart(item, items) {
    for (let i of items) {
      if (item.Id == i.Id) {
        i.quantity += 1;
        return items;
      }
    }
    return -1;
  }

  getCartContents() {
    // let markup = '';
    try {
      const cartItems = this.getLocalStorage('so-cart');
      // console.log(cartItems);
      if (cartItems.length == 0) {
        document.querySelector('.product-list').innerHTML =
          '<p>No items currently in your cart</p>';
      } else {
        const total = this.calcTotal();
        // console.log(total);
        document.querySelector('.cart-total').innerHTML =
          '$' + total.toFixed(2);
        document.querySelector('.cart-footer').classList.remove('hide');
        const htmlItems = cartItems.map((item) => this.renderCartItem(item));
        document.querySelector('.product-list').innerHTML = htmlItems.join('');
        // setClick(".remove",removeFromCart.bind(this))
        // document.querySelectorAll(".box").forEach(box =>
        //   box.addEventListener("click", () => box.classList.toggle("red"))
        // )
        document
          .querySelectorAll('.remove')
          .forEach((button) =>
            button.addEventListener('click', (e) => this.removeFromCart(e))
          );
        // .addEventListener('click', this.addToCart.bind(this));
        // document.querySelector('.product-list').innerHTML = renderCartItem(
        //   cartItems
        // );
      }
    } catch (e) {
      document.querySelector('.product-list').innerHTML =
        '<p>No items currently in your cart</p>';
      // console.log('No Items in Cart' + e);
    }
  }

  calcTotal() {
    const items = this.getLocalStorage('so-cart');
    let total = 0;
    for (let item of items) {
      total += item.ListPrice * item.quantity;
    }
    return total;
  }

  getTotalCartItems() {
    return this.getLocalStorage('so-cart').length;
  }

  renderCartItem(item) {
    // console.log(item);
    const newItem = `<li class="cart-card divider">
        <a href="/product_pages/product-details.html?product=${item.Id}" class="cart-card__image">
          <img
            src="${item.Images.PrimaryMedium}"
            alt="${item.Name}"
          />
        </a>
        <div>
        <a href="/product_pages/product-details.html?product=${item.Id}">
          <h2 class="card__name">${item.Name}</h2>
        </a>
        <span class='remove' data-id="${item.Id}">REMOVE</span>
        </div>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity">qty: ${item.quantity}</p>
        <p class="cart-card__price">$${item.FinalPrice}</p>
      </li>`;
    // console.log(newItem);
    return newItem;
  }

  // takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
  packageItems() {
    const items = this.getLocalStorage('so-cart');
    const outItems = items.map((item) => this.smallItem(item));
    return outItems;
    // console.log(outItems);

    // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  }

  smallItem(item) {
    // console.log(item);
    return {
      id: item.Id,
      name: item.Name,
      price: item.FinalPrice,
      quantity: item.quantity,
    };
  }
}
