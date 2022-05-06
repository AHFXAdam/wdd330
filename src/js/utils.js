// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function getNumberItemsInCart() {
  let total = 0;
  const items = getLocalStorage('so-cart');
  for (let item of items) {
    total += item.quantity;
  }
  return total;
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}
export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function updateBreadCrumbs(text) {
  const breadcrumb = document.querySelector('.breadcrumbs');
  breadcrumb.innerHTML = text;
}

export function renderList(template, parentElement, list, callback) {
  list.forEach((product) => {
    let clone = template.content.cloneNode(true);
    //
    clone = callback(clone, product);
    parentElement.appendChild(clone);
  });
}

export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback = undefined
) {
  let clone = template.content.cloneNode(true);
  //
  if (callback) {
    clone = callback(clone, data);
  }
  parentElement.appendChild(clone);
}

export async function loadTemplate(path) {
  const html = await fetch(path).then(convertToText);
  const template = document.createElement('template');
  template.innerHTML = html;
  return template;
}

export function convertToText(res) {
  if (res.ok) {
    return res.text();
  } else {
    throw new Error('Bad Response');
  }
}

export async function loadHeaderFooter() {
  const header = await loadTemplate('../partials/header.html');
  const footer = await loadTemplate('../partials/footer.html');
  const modal = await loadTemplate('../partials/modal.html');
  const header_element = document.querySelector('header');
  const footer_element = document.querySelector('footer');
  const modal_element = document.querySelector('div.modal-holder');
  renderWithTemplate(header, header_element, {});
  renderWithTemplate(footer, footer_element, {});
  if (modal_element) {
    renderWithTemplate(modal, modal_element, {});
  }
}

export function alertMessage(message, scroll = true) {
  let div = document.createElement('div');
  div.classList.add('alert');
  const data = `${message}<span>X</span>`;
  div.innerHTML = data;
  const main = document.querySelector('main');

  div.addEventListener('click', function (e) {
    // console.log(main);
    // console.log(e);
    if (e.target.tagName == 'SPAN') {
      main.removeChild(this);
    }
  });
  main.prepend(div);
  if (scroll) {
    window.scroll(0, 0);
  }
}

export function removeAllAlerts() {
  const allAlerts = document.querySelectorAll('.alert');
  allAlerts.forEach((alert) =>
    document.querySelector('main').removeChild(alert)
  );
}
