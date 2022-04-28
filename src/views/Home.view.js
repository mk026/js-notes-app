import AbstractView from './Abstract.view';
import classes from '../styles/Home.module.css';

export default class HomeView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
  }

  get statusContainer() {
    return this.element.querySelector(`.${classes.home__status}`);
  }

  getTemplate() {
    return `
      <div class="${classes.home}">
        <h2 class="${classes.home__title}">Welcome to Notes Application</h2>
        <div class="${classes.home__content}">
          <h3 class="${classes.home__status}"></h3>
        </div>
      </div>
    `;
  }

  showUnauthMessage() {
    this.statusContainer.innerText =
      'You are not signed in. Please sign in or sign up to use this app';
  }

  showAuthMessage(name) {
    this.statusContainer.innerText = `Welcome, ${name}`;
  }

  showLoading() {
    const container = this.element.querySelector(`.${classes.home__content}`);
    super.showLoading(container);
  }
}
