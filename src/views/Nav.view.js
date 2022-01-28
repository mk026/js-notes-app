export default class NavView {
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
      <nav class="nav">
        <ul class="nav__list">
        </ul>
      </nav>
    `;
  }

  renderRoutes(routes) {
    const navListContainer = this.element.querySelector('.nav__list');
    const navList = routes
      .map(
        (route) =>
          `<li><a href="${route.path}" class="nav__link">${route.name}</a></li>`
      )
      .join('');
    const newNavListContainer = document.createElement('ul');
    newNavListContainer.classList.add('nav__list');
    newNavListContainer.insertAdjacentHTML('beforeend', navList);
    navListContainer.replaceWith(newNavListContainer);
  }

  setLinkClickHandler(handler) {
    this.element.addEventListener('click', handler);
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
