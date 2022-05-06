import Modal from './modal.js';
import {
  getLocalStorage,
  setLocalStorage,
  alertMessage,
  removeAllAlerts,
} from './utils.js';

export default class Register {
  constructor() {
    this.listeners();
  }

  //   registerForNewsletter() {
  //     console.log('registering');
  //     const data = this.gatherData();
  //     console.log(data);
  //     alertMessage(
  //       `${data.email} has successfully registered for the newsletter`
  //     );
  //   }

  //   gatherData() {
  //     const data = { email: document.querySelector('#newsletter-email').value };
  //     return data;
  //   }

  listeners() {
    console.log('in listeners');
    let firstTime = getLocalStorage('pageview');
    if (firstTime == null) {
      setLocalStorage('pageview', 2);
      console.log('launch modal');
      const modal2 = new Modal(Modal.otherFunction);
      modal2.openModal({ currentTarget: { dataset: { modal: 'modal-2' } } });
    } else {
      firstTime++;
      setLocalStorage('pageview', firstTime);
    }
    console.log(firstTime);
    // document
    //   .querySelector('.newsletter button')
    //   .addEventListener('click', (e) => {
    //     e.preventDefault();
    //     if (document.querySelector('form.newsletter').checkValidity()) {
    //       this.registerForNewsletter();
    //     } else {
    //       document.querySelector('form').reportValidity();
    //     }
    //     // console.log(this);
    //   });
  }
}
