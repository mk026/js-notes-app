export default class HomeController {
  constructor(appRoot, view, authService, accountService) {
    this.appRoot = appRoot;
    this.view = view;
    this.authService = authService;
    this.accountService = accountService;
  }

  async init() {
    this.appRoot.insertAdjacentElement('beforeend', this.view.getElement());

    const hasToken = this.authService.getToken();
    if (hasToken) {
      const { name } = await this.accountService.getAccountInfo();
      this.view.showAuthMessage(name);
    } else {
      this.view.showUnauthMessage();
    }
  }

  destroy() {
    this.view.removeElement();
  }
}
