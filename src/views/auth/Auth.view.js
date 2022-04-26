import AbstractView from '../Abstract.view';
import SigninView from './Signin.view';
import SignupView from './Signup.view';
import classes from '../../styles/Auth.module.css';

export default class AuthView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
    this.signupView = new SignupView();
    this.signinView = new SigninView();
  }

  get formContainer() {
    return this.element.querySelector(`.${classes.auth__container}`);
  }

  getTemplate() {
    return `
      <div class="${classes.auth}">
        <h2 class="${classes.auth__title}">Account</h2>
        <div class="${classes.auth__controls}">
          <button id="switch-to-signin" class="${classes.auth__switch}">Signin</button>
          <button id="switch-to-signup" class="${classes.auth__switch}">Signup</button>
        </div>
        <div class="${classes.auth__container}"></div>
      </div>
    `;
  }

  setOnSignup(handler) {
    this.signupView.setOnSignup(handler);
  }

  setOnSignin(handler) {
    this.signinView.setOnSignin(handler);
  }

  renderSignupForm = () => {
    this.signupView.mount(this.formContainer);

    this.attachSwitchToSigninHandler();
  };

  renderSigninForm = () => {
    this.signinView.mount(this.formContainer);

    this.attachSwitchToSignupHandler();
  };

  showSignupError(msg) {
    this.signupView.showError(msg);
  }

  showSigninError(msg) {
    this.signinView.showError(msg);
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
}
