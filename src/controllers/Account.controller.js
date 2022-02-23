export default class AccountController {
  constructor(appRoot, view, accountService) {
    this.appRoot = appRoot;
    this.view = view;
    this.accountService = accountService;
  }

  init() {
    this.appRoot.insertAdjacentElement('beforeend', this.view.getElement());

    this.view.setOnSignout(this.onSignout);
    this.view.attachSignoutHandler();
  }

  destroy() {
    this.view.removeElement();
  }

  onSignout = () => {
    this.accountService.signout();
  };
}
