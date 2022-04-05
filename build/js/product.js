import t from './productData.js';
import o from './productDetails.js';
import { getParams as r } from './utils.js';
const a = new t('tents'),
  c = r('product'),
  s = new o(c, a);
s.init();
