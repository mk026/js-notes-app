import { validateEmail, validatePassword } from '../utils';

export default class AuthController {
  constructor(appRoot, view, authService) {
    this.appRoot = appRoot;
    this.view = view;
    this.authService = authService;
  }

  init() {
    this.appRoot.insertAdjacentElement('beforeend', this.view.getElement());

    this.view.setOnSignup(this.onSignup);
    this.view.setOnSignin(this.onSignin);

    this.view.renderSignupForm();
  }

  destroy() {
    this.view.removeElement();
  }

  onSignup = async (name, email, password) => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password, 8, 100);
    if (emailError) {
      this.view.showSignupError(emailError);
      return;
    }
    if (passwordError) {
      this.view.showSignupError(passwordError);
      return;
    }
    if (!name.trim().length) {
      this.view.showSignupError('Name should not be empty');
      return;
    }
    await this.authService.signup(name, email, password);
  };

  onSignin = async (email, password) => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password, 8, 100);
    if (emailError) {
      this.view.showSigninError(emailError);
      return;
    }
    if (passwordError) {
      this.view.showSigninError(passwordError);
      return;
    }
    await this.authService.signin(email, password);
  };
}
