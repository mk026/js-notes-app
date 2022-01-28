export default class HomeView {
  constructor() {
    this.element = this.getElement();
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
    if (this.element) {
      return this.element;
    }
    this.element = this.createElement(this.getTemplate());
    return this.element;
  }

  removeElement() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
