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
export function addSearch() {
  const search_btn = document.querySelector('.search_btn');
  search_btn.addEventListener('click', (e) => {
    console.log('fired');
    const search_term = document.querySelector('.search input').value;
    document.location.assign(`/product-listing/?q=${search_term}`);
  });
}
export async function runAll() {
  await loadHeaderFooter();
  updateCartNumber();
  addSearch();
  // new Register();
}
runAll();
