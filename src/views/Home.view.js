export default class Home {
  constructor() {
    this.element = this.createElement(this.getTemplate());
  }

  createElement(template) {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement.firstElementChild;
  }

  getTemplate() {
    return `
      <div class="home">
        <h2>Home</h2>
      </div>
    `;
  }

  getElement() {
    return this.element;
  }

  removeElement() {
    this.element.remove();
    this.element = null;
  }
}
