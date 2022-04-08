import shoppingCart from './shoppingCart.js';
import checkoutDetails from './checkoutDetails.js';

const sc = new shoppingCart();
const cd = new checkoutDetails(sc);
// const items = sc.getLocalStorage('so-cart');
// cd.init();

cd.addZipUpdate(document.querySelector('#zip'));
