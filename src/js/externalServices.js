const baseURL = 'http://157.201.228.93:2992/';

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else if (res.status == '400') {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ExternalServices {
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

  async runPayment(cart_info) {
    console.log(cart_info);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart_info),
    };
    return fetch(baseURL + 'checkout', options)
      .then(convertToJson)
      .then((data) => data)
      .catch((error) => error);
  }

  //   addToCart(e) {
  //     const product = findProductById(e);
  //     const current_prod = JSON.parse(localStorage.getItem('so-cart')) || [];
  //     const output = [...current_prod, product];
  //     setLocalStorage('so-cart', output);
  //   }
}
