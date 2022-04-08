import ExternalServices from './externalServices.js';

// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}
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
    document
      .querySelector('#checkout_button')
      .addEventListener('click', (event) => {
        event.preventDefault();
        this.checkout(document.querySelector('form'));
      });
    this.ex = new ExternalServices();
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

  async checkout(form) {
    console.log(form);
    const data = formDataToJSON(form);
    // we could fix this everywhere, but why?
    delete Object.assign(data, { cardNumber: data.card_number })['card_number'];
    delete Object.assign(data, { fname: data.f_name })['f_name'];
    delete Object.assign(data, { lname: data.l_name })['l_name'];
    delete Object.assign(data, { code: data.sec_code })['sec_code'];
    data['items'] = this.sc.packageItems();
    data['orderTotal'] = this.calcFinalTotal().toFixed(2);
    data['shipping'] = this.calcShipping();
    data['tax'] = this.calcTax();
    data['orderDate'] = new Date();
    console.log(data);
    const answer = await this.ex.runPayment(data);
    console.log(answer);
    // build the data object from the calculated fields, the items in the cart, and the information entered into the form

    // {
    //     orderDate: '2021-01-27T18:18:26.095Z',
    //     fname: "John",
    //     lname: "Doe",
    //     street: "123 Main",
    //     city: "Rexburg",
    //     state: "ID",
    //     zip: "83440",
    //     cardNumber: "1234123412341234",
    //     expiration: "8/21",
    //     code: "123",
    //     items: [{
    //       id: "20CXG"
    //       name: "The North Face Pivoter 27 L Backpack"
    //       price: 39.99,
    //       quantity: 1
    //     }, {
    //       id: "14GVF",
    //       name: "Marmot 5°F Rampart Down Sleeping Bag - 650 Fill, Mummy (For Men and Women)",
    //       price: 229.99,
    //       quantity: 1
    //     }],
    //     orderTotal: "298.18",
    //     shipping: 12,
    //     tax: "16.20"
    //   }
    // call the checkout method in our ExternalServices module and send it our data object.
  }
}
