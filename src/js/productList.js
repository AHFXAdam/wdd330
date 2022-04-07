import { renderList } from './utils';

export default class ProductList {
  constructor(dataSource, targetElement, category) {
    this.dataSource = dataSource;
    this.targetElement = targetElement;
    this.category = category;
  }

  async init() {
    let list = await this.dataSource.getData(this.category);
    // console.log(list);
    //list = this.filterList(list);
    const template = document.getElementById('product-card-template');
    renderList(template, this.targetElement, list, this.prepareTemplate);
    this.updateHeading(this.category);
  }

  updateHeading(text) {
    document.querySelector(
      '.products>h2'
    ).innerHTML += ` ${text[0].toUpperCase()}${text
      .slice(1)
      .replace('-', ' ')}`;
  }

  filterList(list) {
    const myArray = ['985RF', '880RR', '985PR', '344YJ'];
    const products = list.filter((item) => myArray.includes(item.Id));
    return products;
  }

  prepareTemplate(clone, product) {
    clone.querySelector('a').href += product.Id;
    clone.querySelector('img').src = product.Images.PrimaryLarge;
    clone.querySelector('img').alt += product.Name;
    clone.querySelector('.card__brand').innerHTML = product.Brand.Name;
    clone.querySelector('.card__name').innerHTML = product.NameWithoutBrand;
    clone.querySelector(
      '.product-card__price'
    ).innerHTML += product.ListPrice.toFixed(2);
    clone.querySelector('.product-card__discount_price').innerHTML += (
      product.SuggestedRetailPrice - product.ListPrice
    ).toFixed(2);
    return clone;
  }
}
