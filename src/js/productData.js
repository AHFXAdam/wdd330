function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  constructor(category) {
    this._category = category;
    // console.log(window.location.origin);
    this._path = `${window.location.origin}/json/${this._category}.json`;
  }

  getData() {
    return fetch(this._path)
      .then(convertToJson)
      .then((data) => data);
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }

  //   addToCart(e) {
  //     const product = findProductById(e);
  //     const current_prod = JSON.parse(localStorage.getItem('so-cart')) || [];
  //     const output = [...current_prod, product];
  //     setLocalStorage('so-cart', output);
  //   }
}
