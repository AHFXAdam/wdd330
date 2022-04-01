import { renderList } from './utils';

export default class ProductList {
  constructor(dataSource, targetElement, category) {
    this.dataSource = dataSource;
    this.targetElement = targetElement;
    this.category = category;
  }

  async init() {
    let list = await this.dataSource.getData();
    // console.log(list);
    list = this.filterList(list);
    const template = document.getElementById('product-card-template');
    renderList(template, this.targetElement, list, this.prepareTemplate);
  }

  filterList(list) {
    const myArray = ['985RF', '880RR', '985PR', '344YJ'];
    const products = list.filter((item) => myArray.includes(item.Id));
    return products;
  }

  prepareTemplate(clone, product) {
    clone.querySelector('a').href += product.Id;
    clone.querySelector('img').src = product.Image;
    clone.querySelector('img').alt += item.Image.replace('../', '');
    clone.querySelector('.card__brand').innerHTML = product.Brand.Name;
    clone.querySelector('.card__name').innerHTML = product.NameWithoutBrand;
    clone.querySelector('.product-card__price').innerHTML += product.ListPrice;
    return clone;
  }
}
