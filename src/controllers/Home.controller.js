export default class HomeController {
  constructor(appRoot, view, authService, userModel) {
    this.appRoot = appRoot;
    this.view = view;
    this.authService = authService;
    this.userModel = userModel;
  }

  init() {
    this.appRoot.insertAdjacentElement('beforeend', this.view.getElement());

    const hasToken = this.authService.getToken();
    if (hasToken) {
      const { name } = this.userModel.getUser();
      this.view.showAuthMessage(name);
    } else {
      this.view.showUnauthMessage();
    }
  }

  destroy() {
    this.view.removeElement();
  }
}
