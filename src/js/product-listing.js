import ExternalServices from './externalServices';
import ProductList from './productList.js';
import { getParams } from './utils.js';
const category = getParams('category');
const searchTerm = getParams('q');

const dataSource = new ExternalServices(category);
const product_list = new ProductList(
  dataSource,
  document.querySelector('.product-list'),
  category,
  searchTerm
);
console.log(searchTerm);
product_list.init();
