import t from './productData.js';
import r from './productList.js';
import e from './alert.js';
const o = new t('tents', ''),
  c = new e();
c.renderAlerts(document.querySelector('main'));
const s = new r(o, document.querySelector('.product-list'), 'tents');
s.init();
