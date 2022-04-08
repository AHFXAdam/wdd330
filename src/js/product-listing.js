import ExternalServices from './externalServices';
import ProductList from './productList.js';
import { getParams } from './utils.js';
const category = getParams('category');

const dataSource = new ExternalServices(category);
const product_list = new ProductList(
  dataSource,
  document.querySelector('.product-list'),
  category
);
product_list.init();
