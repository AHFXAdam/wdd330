import { getNumberItemsInCart, loadHeaderFooter } from './utils';

export async function updateCartNumber() {
  const numItems = getNumberItemsInCart();
  // console.log(numItems);
  if (numItems > 0) {
    document.querySelector('.num-items-in-cart').innerHTML = numItems;
    document.querySelector('.num-items-in-cart').classList.remove('hide');
  } else {
    document.querySelector('.num-items-in-cart').classList.add('hide');
    try {
      document.querySelector('.cart-total').classList.add('hide');
    } catch (e) {
      return;
    }
  }
}
export async function runAll() {
  await loadHeaderFooter();
  updateCartNumber();
}
runAll();
