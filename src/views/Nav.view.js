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

  getRouteTemplate(route) {
    return `<li><a href="${route.path}" class="nav__link">${route.name}</a></li>`;
  }

  renderRoutes(routes) {
    const navListContainer = this.element.querySelector('.nav__list');
    const navList = routes.map(this.getRouteTemplate);
    navListContainer.innerHTML = navList.join('');
  }

  setActiveLink = (href) => {
    this.element.querySelectorAll('.nav__link').forEach((link) => {
      if (link.href == href) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  setLinkClickHandler(handler) {
    this.element.addEventListener('click', handler);
  }
}
