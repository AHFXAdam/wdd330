import { setLocalStorage, alertMessage, removeAllAlerts } from './utils.js';

export default class Newsletter {
  constructor() {
    this.listeners();
  }

  registerForNewsletter() {
    console.log('registering');
    const data = this.gatherData();
    console.log(data);
    alertMessage(
      `${data.email} has successfully registered for the newsletter`
    );
  }

  gatherData() {
    const data = { email: document.querySelector('#newsletter-email').value };
    return data;
  }

  listeners() {
    document
      .querySelector('.newsletter button')
      .addEventListener('click', (e) => {
        e.preventDefault();
        if (document.querySelector('form.newsletter').checkValidity()) {
          this.registerForNewsletter();
        } else {
          document.querySelector('form').reportValidity();
        }
        // console.log(this);
      });
  }
}
