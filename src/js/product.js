import ExternalServices from './externalServices';
import productDetails from './productDetails.js';
import { getParams } from './utils.js';
const dataSource = new ExternalServices('tents');

const productId = getParams('product');
const product = new productDetails(productId, dataSource);
product.init();
