import AbstractView from '../Abstract.view';

export default class SignupView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
  }

  get errorContainer() {
    return this.element.querySelector('.error-container');
  }

  getTemplate() {
    return `
      <form class="signup-form">
        <label for="name">Name</label>
        <input id="name" type="text"/>
        <label for="email">Email</label>
        <input id="email" type="email"/>
        <label for="password">Password</label>
        <input id="password" type="password"/>
        <label for="confirm-password">Confirm password</label>
        <input id="confirm-password" type="password"/>
        <button type="submit">Sign up</button>
        <div class="error-container"></div>
      </form>
    `;
  }

  setOnSignup(handler) {
    this.onSignup = handler;
  }

  mount(container) {
    container.appendChild(this.element, 'afterbegin');

    this.attachSignupHandler();
  }

  unmount() {
    this.removeSignupHandler();

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

  signupHandler = (event) => {
    event.preventDefault();

    const name = this.element.querySelector('#name').value;
    const email = this.element.querySelector('#email').value;
    const password = this.element.querySelector('#password').value;

    this.onSignup(name, email, password);
  };

  attachSignupHandler() {
    this.element.addEventListener('submit', this.signupHandler);
  }

  removeSignupHandler() {
    this.element.removeEventListener('submit', this.signupHandler);
  }
}
