var h = (r, o, t) =>
  new Promise((e, c) => {
    var i = (n) => {
        try {
          s(t.next(n));
        } catch (a) {
          c(a);
        }
      },
      d = (n) => {
        try {
          s(t.throw(n));
        } catch (a) {
          c(a);
        }
      },
      s = (n) => (n.done ? e(n.value) : Promise.resolve(n.value).then(i, d));
    s((t = t.apply(r, o)).next());
  });
function u(r) {
  if (r.ok) return r.json();
  throw new Error('Bad Response');
}
export default class f {
  constructor(o, t = '../') {
    (this._category = o), (this._path = t + `json/${this._category}.json`);
  }
  getData() {
    return fetch(this._path)
      .then(u)
      .then((o) => o);
  }
  findProductById(o) {
    return h(this, null, function* () {
      const t = yield this.getData();
      return t.find((e) => e.Id === o);
    });
  }
}
