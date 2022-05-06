import Alert from './alert.js';
import Newsletter from './newsletter.js';
import Register from './register.js';

const alerts = new Alert();
alerts.renderAlerts(document.querySelector('main'));
new Newsletter();
new Register();
