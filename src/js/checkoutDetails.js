export default class checkoutDetails {
  constructor(sc) {
    this.sc = sc;
    this.init();
  }

  init() {
    document.querySelector(
      '.cart_info div span'
    ).innerHTML = this.sc.getTotalCartItems();
    document.querySelector(
      '#checkout_subtotal'
    ).innerHTML = `$${this.sc.calcTotal().toFixed(2)}`;
  }

  addZipUpdate(zip_element) {
    zip_element.addEventListener('change', (e) => {
      console.log('changed zip');
      document.querySelector(
        '#checkout_shipping'
      ).innerHTML = this.calcShipping().toFixed(2);
      document.querySelector(
        '#checkout_tax'
      ).innerHTML = this.calcTax().toFixed(2);
      document.querySelector(
        '#checkout_total'
      ).innerHTML = this.calcFinalTotal().toFixed(2);
    });
  }

  calcShipping() {
    const totalItems = this.sc.getTotalCartItems();
    const totalShipping = (totalItems - 1) * 2 + 10;
    return totalShipping;
  }
  calcTax() {
    return Math.round(this.sc.calcTotal() * 6, 2) / 100;
  }
  calcFinalTotal() {
    return this.sc.calcTotal() + this.calcShipping() + this.calcTax();
  }

  getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}
