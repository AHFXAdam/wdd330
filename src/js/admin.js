import ExternalServices from './externalServices';
import { alertMessage, removeAllAlerts } from './utils.js';

export default class Admin {
  constructor(outputSelector) {
    this.mainElement = document.querySelector(outputSelector);
    this.token = null;
    this.services = new ExternalServices();
  }
  async login(creds, next) {
    try {
      const token = await this.services.loginRequest(creds);
      this.token = token;
      if (next) {
        next();
      }
    } catch (err) {
      removeAllAlerts();
      alertMessage('Invalid Email/Password. Please Try again');
    }
  }

  showLogin() {
    const loginForm = document.createElement('form');
    const main = document.querySelector('main');
    loginForm.innerHTML = `<label for='email'>Email</label><input type='text' name='email' id='email' value='user1@email.com'>
        <label for='password'>Password</label><input type='password' value='user1' name='password' id='password'>
        <input type='submit' value='Login'>
        `;
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const creds = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
      };
      this.login(creds, this.showOrders.bind(this));
    });
    main.appendChild(loginForm);
  }
  async showOrders() {
    const orders = await this.services.getOrders(this.token);
    console.log(orders[0].items);
    const ordersTable = document.createElement('table');
    const main = document.querySelector('main');
    ordersTable.innerHTML = orders
      .map((order) =>
        order.id != undefined &&
        order.orderDate != undefined &&
        order.items != undefined &&
        order.orderTotal != undefined
          ? `<tr><td>${order.id}</td><td>${new Date(
              order.orderDate
            ).toLocaleDateString('en-US')}</td><td>${
              order.items.length
            }</td><td>${order.orderTotal}</td></tr>`
          : ''
      )
      .join('');
    main.appendChild(ordersTable);
  }
}
const adminner = new Admin();
adminner.showLogin();
