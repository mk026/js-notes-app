import AbstractView from './Abstract.view';

export default class NavView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
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
}
