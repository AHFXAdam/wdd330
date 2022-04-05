var a = (t, o, r) =>
  new Promise((u, s) => {
    var i = (e) => {
        try {
          n(r.next(e));
        } catch (c) {
          s(c);
        }
      },
      m = (e) => {
        try {
          n(r.throw(e));
        } catch (c) {
          s(c);
        }
      },
      n = (e) => (e.done ? u(e.value) : Promise.resolve(e.value).then(i, m));
    n((r = r.apply(t, o)).next());
  });
import { getNumberItemsInCart as d, loadHeaderFooter as l } from './utils.js';
export function updateCartNumber() {
  return a(this, null, function* () {
    const t = d();
    if (t > 0)
      (document.querySelector('.num-items-in-cart').innerHTML = t),
        document.querySelector('.num-items-in-cart').classList.remove('hide');
    else {
      document.querySelector('.num-items-in-cart').classList.add('hide');
      try {
        document.querySelector('.cart-total').classList.add('hide');
      } catch (o) {
        return;
      }
    }
  });
}
export function runAll() {
  return a(this, null, function* () {
    yield l(), updateCartNumber();
  });
}
runAll();
