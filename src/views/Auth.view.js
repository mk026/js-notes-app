import AbstractView from './Abstract.view';

export default class AuthView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
  }

  getTemplate() {
    return `
      <div class="auth">
        <h2>Auth</h2>
        <div class="auth__form-container"></div>
      </div>
    `;
  }

  getSigninForm() {
    return `
      <form class="signin-form">
        <label for="email">Email</label>
        <input id="email" type="email"/>
        <label for="password">Password</label>
        <input id="password" type="password"/>
        <button type="submit">Sign in</button>
      </form>
    `;
  }

  getSignupForm() {
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
      </form>
    `;
  }

  setOnSignup(handler) {
    this.onSignup = handler;
  }

  setOnSignin(handler) {
    this.onSignin = handler;
  }

  renderSignupForm() {
    this.element.querySelector('.auth__form-container').innerHTML =
      this.getSignupForm();

    this.attachSignupHandler();
  }

  renderSigninForm() {
    this.element.querySelector('.auth__form-container').innerHTML =
      this.getSigninForm();

    this.attachSigninHandler();
  }

  signupHandler = (event) => {
    event.preventDefault();

    const name = this.element.querySelector('#name').value;
    const email = this.element.querySelector('#email').value;
    const password = this.element.querySelector('#password').value;

    this.onSignup(name, email, password);
  };

  signinHandler = (event) => {
    event.preventDefault();

    const email = this.element.querySelector('#email').value;
    const password = this.element.querySelector('#password').value;

    this.onSignin(email, password);
  };

  attachSignupHandler() {
    this.element
      .querySelector('.signup-form')
      .addEventListener('submit', this.signupHandler);
  }

  attachSigninHandler() {
    this.element
      .querySelector('.signin-form')
      .addEventListener('submit', this.signinHandler);
  }
}
