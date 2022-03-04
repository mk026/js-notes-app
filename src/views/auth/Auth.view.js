import AbstractView from '../Abstract.view';
import SigninView from './Signin.view';
import SignupView from './Signup.view';

export default class AuthView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
    this.signupView = new SignupView();
    this.signinView = new SigninView();
  }

  get formContainer() {
    return this.element.querySelector('.auth__form-container');
  }

  getTemplate() {
    return `
      <div class="auth">
        <h2>Auth</h2>
        <div class="auth__controls">
          <button id="switch-to-signin">Signin</button>
          <button id="switch-to-signup">Signup</button>
        </div>
        <div class="auth__form-container"></div>
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
