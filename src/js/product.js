import ProductData from './productData.js';
import productDetails from './productDetails.js';
import { getParams, setLocalStorage, getLocalStorage } from './utils.js';
const dataSource = new ProductData('tents');

const productId = getParams('product');
const product = new productDetails(productId, dataSource);
product.init();
console.log(dataSource.getData());
console.log(dataSource.findProductById(productId));

// console.log(dataSource.getData());

// let products = [];

//   function setLocalStorage(key, data) {
//     localStorage.setItem(key, JSON.stringify(data));
//   }

// get tents data
// function getProductsData() {
//   fetch('../json/tents.json')
//     .then(convertToJson)
//     .then((data) => {
//       products = data;
//     });
// }
// or should we do it this way?
// async function getProductsDataAwait() {
//   products = await fetch("../json/tents.json").then(convertToJson);
// }

// add to cart button event handler
// function addToCart(e) {
//   const product = products.find((item) => item.Id === e.target.dataset.id);
//   const current_prod = JSON.parse(localStorage.getItem('so-cart')) || [];
//   const output = [...current_prod, product];
//   setLocalStorage('so-cart', output);
// }

// getProductsData();
// add listener to Add to Cart button
// document.getElementById('addToCart').addEventListener('click', addToCart);
