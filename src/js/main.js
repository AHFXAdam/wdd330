import ProductData from '/js/productData.js';
import ProductList from '/js/productList.js';
import Alert from '/js/alert.js';

const dataSource = new ProductData('tents', '');
const alerts = new Alert();
alerts.renderAlerts(document.querySelector('main'));
const product_list = new ProductList(
  dataSource,
  document.querySelector('.product-list'),
  'tents'
);
product_list.init();
