import Modal from './modal';
import {
  updateBreadCrumbs,
  renderList,
  getLocalStorage,
  setLocalStorage,
} from './utils';

export default class ProductList {
  constructor(dataSource, targetElement, category, search = '') {
    this.dataSource = dataSource;
    this.targetElement = targetElement;
    this.category = category;
    this.search = search;
  }

  async init() {
    // console.log(list);
    //list = this.filterList(list);
    // list = this.sortList(list);
    this.showList();
    if (this.search == null) {
      this.updateHeading(this.category);
    } else {
      this.updateHeading(this.search);
    }

    document
      .querySelector('#sort')
      .addEventListener('click', (err) => this.sortAndShow());
    this.updateSortDropdown();
  }

  updateSortDropdown() {
    try {
      const sorting = getLocalStorage('sorting');
      document.querySelector('#sorting').value = sorting;
    } catch (error) {
      // console.log('Couldn\'t find sorting');
    }
  }

  sortAndShow() {
    this.setSorting(document.querySelector('#sorting').value);
    this.showList();
  }

  async showList() {
    let list = [];
    if (this.search == null) {
      list = await this.dataSource.getData(this.category);
      updateBreadCrumbs(`${this.category}->(${list.length} items)`);
    } else {
      list = await this.getAllProducts();
      list = this.filterListBySearch(list);
      updateBreadCrumbs(`${this.search}->(${list.length} items)`);
    }

    list = this.sortList(list);
    if (list.length == 0) {
      this.targetElement.innerHTML =
        'Sorry, no products found matching your search.';
    } else {
      const template = document.getElementById('product-card-template');
      this.targetElement.innerHTML = '';
      renderList(template, this.targetElement, list, this.prepareTemplate);
    }
    new Modal();
  }

  async getAllProducts() {
    let allProds = [];
    const categories = ['tents', 'backpacks', 'sleeping-bags', 'hammocks'];
    for (let category of categories) {
      let list = await this.dataSource.getData(category);
      allProds = [...allProds, ...list];
    }
    return allProds;
  }

  sortList(list) {
    // console.log(list);
    const sorting = getLocalStorage('sorting');
    switch (sorting) {
      case 'price':
        // console.log('Sort by Price');
        list.sort((a, b) => (a.FinalPrice > b.FinalPrice ? 1 : -1));
        break;
      case 'alpha':
        // console.log('Sort by Alpha');
        list.sort((a, b) => (a.NameWithoutBrand > b.NameWithoutBrand ? 1 : -1));
        break;
      case 'pricedesc':
        // console.log('Sort by Price');
        list.sort((a, b) => (a.FinalPrice < b.FinalPrice ? 1 : -1));
        break;
      case 'alphadesc':
        // console.log('Sort by Alpha');
        list.sort((a, b) => (a.NameWithoutBrand < b.NameWithoutBrand ? 1 : -1));
        break;
      default:
        // console.log('Sort by Default');
        break;
    }
    return list;
  }

  setSorting(value) {
    setLocalStorage('sorting', value);
    // console.log(value);
  }

  updateHeading(text) {
    document.querySelector(
      '.products>div>h2'
    ).innerHTML += ` ${text[0].toUpperCase()}${text
      .slice(1)
      .replace('-', ' ')}`;
  }

  filterList(list) {
    const myArray = ['985RF', '880RR', '985PR', '344YJ'];
    const products = list.filter((item) => myArray.includes(item.Id));
    return products;
  }

  filterListBySearch(list) {
    const products = list.filter((item) =>
      item.Name.toLowerCase().includes(this.search.toLowerCase())
    );
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
    clone
      .querySelector('.product-card button')
      .setAttribute('data-id', product.Id);
    clone
      .querySelector('.product-card button')
      .setAttribute('data-modal', 'modal-1');
    clone.querySelector('.product-card__discount_price').innerHTML += (
      product.SuggestedRetailPrice - product.ListPrice
    ).toFixed(2);
    return clone;
  }
}
