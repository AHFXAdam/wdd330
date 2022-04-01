import ProductData from './productData.js';
import ProductList from './productList.js';

const dataSource = new ProductData('tents', '');
const product_list = new ProductList(
  dataSource,
  document.querySelector('.product-list'),
  'tents'
);
product_list.init();
