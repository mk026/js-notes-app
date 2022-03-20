import {
  validateEmail,
  validatePassword,
  validateInput,
} from '../utils/validation';

import { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from '../config';

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
    const passwordError = validatePassword(
      password,
      PASSWORD_MIN_LENGTH,
      PASSWORD_MAX_LENGTH
    );
    const nameError = validateInput(name, 'Name');
    if (emailError) {
      this.view.showSignupError(emailError);
      return;
    }
    if (passwordError) {
      this.view.showSignupError(passwordError);
      return;
    }
    if (nameError) {
      this.view.showSignupError(nameError);
      return;
    }
    await this.authService.signup(name, email, password);
  };

  onSignin = async (email, password) => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
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
