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
        <button id="signout">Signout</button>
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
        <button id="switch-to-signup">Switch to signup</button>
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
        <button id="switch-to-signin">Switch to signin</button>
      </form>
    `;
  }

  setOnSignup(handler) {
    this.onSignup = handler;
  }

  setOnSignin(handler) {
    this.onSignin = handler;
  }

  setOnSignout(handler) {
    this.onSignout = handler;
  }

  renderSignupForm = () => {
    this.element.querySelector('.auth__form-container').innerHTML =
      this.getSignupForm();

    this.attachSignupHandler();
    this.attachSwitchToSigninHandler();
  };

  renderSigninForm = () => {
    this.element.querySelector('.auth__form-container').innerHTML =
      this.getSigninForm();

    this.attachSigninHandler();
    this.attachSwitchToSignupHandler();
  };

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

  signoutHandler = () => {
    this.onSignout();
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

  attachSwitchToSignupHandler() {
    this.element
      .querySelector('#switch-to-signup')
      .addEventListener('click', this.renderSignupForm);
  }

  attachSwitchToSigninHandler() {
    this.element
      .querySelector('#switch-to-signin')
      .addEventListener('click', this.renderSigninForm);
  }

  attachSignoutHandler() {
    this.element
      .querySelector('#signout')
      .addEventListener('click', this.signoutHandler);
  }
}
