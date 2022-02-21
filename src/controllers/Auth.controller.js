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
    this.view.setOnSignout(this.onSignout);

    this.view.renderSignupForm();
    this.view.attachSignoutHandler();
  }

  destroy() {
    this.view.removeElement();
  }

  onSignup = async (name, email, password) => {
    await this.authService.signup(name, email, password);
  };

  onSignin = async (email, password) => {
    await this.authService.signin(email, password);
  };

  onSignout = () => {
    this.authService.signout();
  };
}
