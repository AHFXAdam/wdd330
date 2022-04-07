import ProductData from './productData.js';
import productDetails from './productDetails.js';
import { getParams } from './utils.js';
const dataSource = new ProductData('tents');

const productId = getParams('product');
const product = new productDetails(productId, dataSource);
product.init();
