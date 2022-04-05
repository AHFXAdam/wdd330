var d = (s, e, o) =>
  new Promise((a, r) => {
    var t = (n) => {
        try {
          c(o.next(n));
        } catch (l) {
          r(l);
        }
      },
      p = (n) => {
        try {
          c(o.throw(n));
        } catch (l) {
          r(l);
        }
      },
      c = (n) => (n.done ? a(n.value) : Promise.resolve(n.value).then(t, p));
    c((o = o.apply(s, e)).next());
  });
function h(s) {
  if (s.ok) return s.json();
  throw new Error('Bad Response');
}
export default class i {
  constructor(e = '../') {
    this._path = e + 'json/alerts.json';
  }
  getData() {
    return fetch(this._path)
      .then(h)
      .then((e) => e);
  }
  renderAlerts(e) {
    return d(this, null, function* () {
      const o = yield this.getData();
      let a = document.createElement('section');
      o.forEach((r) => {
        let t = document.createElement('p');
        (t.style.backgroundColor = r.background),
          (t.style.color = r.color),
          (t.style.padding = '10px'),
          (t.innerHTML = r.message),
          a.appendChild(t);
      }),
        e.prepend(a);
    });
  }
}
