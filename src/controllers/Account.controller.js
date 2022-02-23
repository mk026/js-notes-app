export default class AccountController {
  constructor(appRoot, view, accountService) {
    this.appRoot = appRoot;
    this.view = view;
    this.accountService = accountService;
  }

  init() {
    this.appRoot.insertAdjacentElement('beforeend', this.view.getElement());
  }

  destroy() {
    this.view.removeElement();
  }
}
