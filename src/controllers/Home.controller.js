export default class HomeController {
  constructor(appRoot, view, authService, accountService) {
    this.appRoot = appRoot;
    this.view = view;
    this.authService = authService;
    this.accountService = accountService;
  }

  init() {
    this.appRoot.insertAdjacentElement('beforeend', this.view.getElement());
  }

  destroy() {
    this.view.removeElement();
  }
}
