import ProductData from './productData.js';
import ProductList from './productList.js';
import Alert from './alert.js';

const dataSource = new ProductData('tents', '');
const alerts = new Alert();
alerts.renderAlerts(document.querySelector('main'));
const product_list = new ProductList(
  dataSource,
  document.querySelector('.product-list'),
  'tents'
);
product_list.init();
