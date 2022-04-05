var u = (e, t, n) =>
  new Promise((o, r) => {
    var c = (a) => {
        try {
          i(n.next(a));
        } catch (l) {
          r(l);
        }
      },
      d = (a) => {
        try {
          i(n.throw(a));
        } catch (l) {
          r(l);
        }
      },
      i = (a) => (a.done ? o(a.value) : Promise.resolve(a.value).then(c, d));
    i((n = n.apply(e, t)).next());
  });
export function qs(e, t = document) {
  return t.querySelector(e);
}
export function getLocalStorage(e) {
  return JSON.parse(localStorage.getItem(e));
}
export function getNumberItemsInCart() {
  return getLocalStorage('so-cart').length;
}
export function setLocalStorage(e, t) {
  localStorage.setItem(e, JSON.stringify(t));
}
export function setClick(e, t) {
  qs(e).addEventListener('touchend', (n) => {
    n.preventDefault(), t();
  }),
    qs(e).addEventListener('click', t);
}
export function getParams(e) {
  const t = window.location.search,
    n = new URLSearchParams(t),
    o = n.get(e);
  return o;
}
export function renderList(e, t, n, o) {
  n.forEach((r) => {
    let c = e.content.cloneNode(!0);
    (c = o(c, r)), t.appendChild(c);
  });
}
export function renderWithTemplate(e, t, n, o = void 0) {
  let r = e.content.cloneNode(!0);
  o && (r = o(r, n)), t.appendChild(r);
}
export function loadTemplate(e) {
  return u(this, null, function* () {
    const t = yield fetch(e).then(convertToText),
      n = document.createElement('template');
    return (n.innerHTML = t), n;
  });
}
export function convertToText(e) {
  if (e.ok) return e.text();
  throw new Error('Bad Response');
}
export function loadHeaderFooter() {
  return u(this, null, function* () {
    const e = yield loadTemplate('../partials/header.html'),
      t = yield loadTemplate('../partials/footer.html'),
      n = document.querySelector('header'),
      o = document.querySelector('footer');
    renderWithTemplate(e, n, {}), renderWithTemplate(t, o, {});
  });
}
