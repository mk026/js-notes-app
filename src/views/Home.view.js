import AbstractView from './Abstract.view';

export default class HomeView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
  }

  get msgContainer() {
    return this.element.querySelector('.home__welcome-msg');
  }

  getTemplate() {
    return `
      <div class="home">
        <h2>Home</h2>
        <div class="home__content">
          <h3 class="home__welcome-msg"></h3>
        </div>
      </div>
    `;
  }

  showUnauthMessage() {
    this.msgContainer.innerText =
      'You are not signed in. Please sign in or sign up to use this app';
  }

  showAuthMessage(name) {
    this.msgContainer.innerText = `Welcome, ${name}`;
  }
}
