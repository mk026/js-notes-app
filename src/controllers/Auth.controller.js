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
    if (!name.trim().length) {
      this.view.showSignupError('Name should not be empty');
      return;
    }
    if (!email.trim().length) {
      this.view.showSignupError('Email should not be empty');
      return;
    }
    if (!password.trim().length) {
      this.view.showSignupError('Password should not be empty');
      return;
    }
    await this.authService.signup(name, email, password);
  };

  onSignin = async (email, password) => {
    if (!email.trim().length) {
      this.view.showSigninError('Email should not be empty');
      return;
    }
    if (!password.trim().length) {
      this.view.showSigninError('Password should not be empty');
      return;
    }
    await this.authService.signin(email, password);
  };
}
