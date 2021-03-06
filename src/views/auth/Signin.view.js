import AbstractView from '../Abstract.view';

export default class SigninView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
  }

  get errorContainer() {
    return this.element.querySelector('.error-container');
  }

  getTemplate() {
    return `
      <form class="signin-form">
        <label for="email">Email</label>
        <input id="email" type="email"/>
        <label for="password">Password</label>
        <input id="password" type="password"/>
        <button type="submit">Sign in</button>
        <div class="error-container"></div>
      </form>
    `;
  }

  setOnSignin(handler) {
    this.onSignin = handler;
  }

  mount(container) {
    container.appendChild(this.element, 'afterbegin');

    this.attachSigninHandler();
  }

  unmount() {
    this.removeSigninHandler();

    this.element.remove();
  }

  showError(msg) {
    this.errorContainer.classList.add('show');
    this.errorContainer.innerText = msg;
  }

  hideError() {
    this.errorContainer.classList.remove('show');
    this.errorContainer.innerText = '';
  }

  signinHandler = (event) => {
    event.preventDefault();

    const email = this.element.querySelector('#email').value;
    const password = this.element.querySelector('#password').value;

    this.onSignin(email, password);
  };

  attachSigninHandler() {
    this.element.addEventListener('submit', this.signinHandler);
  }

  removeSigninHandler() {
    this.element.removeEventListener('submit', this.signinHandler);
  }
}
