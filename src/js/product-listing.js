import ProductData from './productData.js';
import ProductList from './productList.js';
import { getParams } from './utils.js';
const category = getParams('category');

const dataSource = new ProductData(category);
const product_list = new ProductList(
  dataSource,
  document.querySelector('.product-list'),
  category
);
product_list.init();
