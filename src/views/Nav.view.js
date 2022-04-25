import AbstractView from './Abstract.view';
import classes from '../styles/Nav.module.css';

export default class NavView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
  }

  getTemplate() {
    return `
      <nav class="${classes.nav}">
        <ul class="${classes.nav__list}">
        </ul>
      </nav>
    `;
  }

  getRouteTemplate(route) {
    return `
      <li class="${classes.nav__el}">
        <a href="${route.path}" class="${classes.nav__link}">${route.name}</a>
      </li>
    `;
  }

  renderRoutes(routes) {
    const navListContainer = this.element.querySelector(
      `.${classes.nav__list}`
    );
    const navList = routes.map(this.getRouteTemplate);
    navListContainer.innerHTML = navList.join('');
  }

  setActiveLink = (href) => {
    this.element.querySelectorAll(`.${classes.nav__link}`).forEach((link) => {
      if (link.href == href) {
        link.classList.add(classes.active);
      } else {
        link.classList.remove(classes.active);
      }
    });
  };

  setLinkClickHandler(handler) {
    this.element.addEventListener('click', handler);
  }
}
