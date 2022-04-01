function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class Alert {
  constructor(path = '../') {
    this._path = path + 'json/alerts.json';
  }

  getData() {
    return fetch(this._path)
      .then(convertToJson)
      .then((data) => data);
  }

  async renderAlerts(parentElement) {
    const alerts = await this.getData();
    let section = document.createElement('section');
    alerts.forEach((alert) => {
      let p = document.createElement('p');
      p.style.backgroundColor = alert.background;
      p.style.color = alert.color;
      p.style.padding = '10px';
      p.innerHTML = alert.message;
      section.appendChild(p);
    });
    parentElement.prepend(section);
  }
}
