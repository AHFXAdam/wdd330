import ExternalServices from './externalServices';
import productDetails from './productDetails.js';
import shoppingCart from './shoppingCart';
import { getParams } from './utils.js';

export default class Modal {
  /* From https://codepen.io/Alecaddd/pen/XgdKjB */
  constructor(callback) {
    this.triggers = document.querySelectorAll('.js-modal');
    this.close = document.querySelectorAll('.js-close-modal');
    this.modals = document.querySelectorAll('.modal');
    this.modalInners = document.querySelectorAll('.modal-inner');
    if (callback) {
      this.callback = callback;
    } else {
      this.callback = Modal.customFunction;
    }
    this.listeners();
  }

  listeners() {
    window.addEventListener('keydown', this.keyDown);

    this.triggers.forEach((el) => {
      el.addEventListener('click', this.openModal.bind(this), false);
    });

    this.modals.forEach((el) => {
      el.addEventListener('transitionend', this.revealModal, false);
      el.addEventListener('click', this.backdropClose, false);
    });

    this.close.forEach((el) => {
      el.addEventListener('click', Modal.hideModal, false);
    });

    this.modalInners.forEach((el) => {
      el.addEventListener('transitionend', this.closeModal, false);
    });
  }

  keyDown(e) {
    if (27 === e.keyCode && document.body.classList.contains('modal-body')) {
      Modal.hideModal();
    }
  }

  backdropClose(el) {
    if (!el.target.classList.contains('modal-visible')) {
      return;
    }

    let backdrop =
      el.currentTarget.dataset.backdrop !== undefined
        ? el.currentTarget.dataset.backdrop
        : true;

    if (backdrop === true) {
      Modal.hideModal();
    }
  }

  static hideModal() {
    let modalOpen = document.querySelector('.modal.modal-visible');

    modalOpen.querySelector('.modal-inner').classList.remove('modal-reveal');
    document
      .querySelector('.modal-body')
      .addEventListener('transitionend', Modal.modalBody, false);
    document.body.classList.add('modal-fadeOut');
  }

  closeModal(el) {
    if (
      'opacity' === el.propertyName &&
      !el.target.classList.contains('modal-reveal')
    ) {
      document
        .querySelector('.modal.modal-visible')
        .classList.remove('modal-visible');
    }
  }

  static async otherFunction() {
    console.log('here');
  }

  static async customFunction(productId) {
    // const productId = "15UGY";
    const dataSource = new ExternalServices();
    const sc = new shoppingCart();
    const product = new productDetails(productId, dataSource, sc);
    product.init('modal-info', false);

    console.log('here');
    // const services = new ExternalServices();
    // const list = await services.findProductById("15UGY");
    // console.log(list);
    // const modal_header = document.querySelector('.modal-content h3');
    // modal_header.innerHTML = `${list.Name}`;
    // const modal_info = document.querySelector('#modal-info');
    // modal_info.innerHTML = `${list.Name}`;
  }

  openModal(el, customFunction) {
    console.log(el, this.callback);
    this.callback(el.currentTarget.dataset.id);
    if (!el.currentTarget.dataset.modal) {
      console.error('No data-modal attribute defined!');
      return;
    }

    let modalID = el.currentTarget.dataset.modal;
    let modal = document.getElementById(modalID);

    document.body.classList.add('modal-body');
    modal.classList.add('modal-visible');
  }

  revealModal(el) {
    if (
      'opacity' === el.propertyName &&
      el.target.classList.contains('modal-visible')
    ) {
      el.target.querySelector('.modal-inner').classList.add('modal-reveal');
    }
  }

  static modalBody(el) {
    if (
      'opacity' === el.propertyName &&
      el.target.classList.contains('modal') &&
      !el.target.classList.contains('modal-visible')
    ) {
      document.body.classList.remove('modal-body', 'modal-fadeOut');
    }
  }
}
