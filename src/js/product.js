import ExternalServices from './externalServices';
import productDetails from './productDetails.js';
import shoppingCart from './shoppingCart';
import { getParams } from './utils.js';
const dataSource = new ExternalServices('tents');
const sc = new shoppingCart();
const productId = getParams('product');
const product = new productDetails(productId, dataSource, sc);
product.init();
