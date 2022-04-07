const baseURL = 'http://157.201.228.93:2992/';

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  constructor() {
    // this._category = category;
    // this._path = path + `json/${this._category}.json`;
  }

  getData(category) {
    return fetch(baseURL + `products/search/${category}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }

  async findProductById(id) {
    return fetch(baseURL + `product/${id}`)
      .then(convertToJson)
      .then((data) => data.Result);
  }

  //   addToCart(e) {
  //     const product = findProductById(e);
  //     const current_prod = JSON.parse(localStorage.getItem('so-cart')) || [];
  //     const output = [...current_prod, product];
  //     setLocalStorage('so-cart', output);
  //   }
}
