export default class AccountController {
  constructor(appRoot, view, accountService) {
    this.appRoot = appRoot;
    this.view = view;
    this.accountService = accountService;
  }

  async init() {
    this.appRoot.insertAdjacentElement('beforeend', this.view.getElement());

    this.view.setOnSignout(this.onSignout);
    this.view.attachSignoutHandler();

    const accountInfo = await this.accountService.getAccountInfo();
    this.view.renderAccountInfo(accountInfo);
  }

  destroy() {
    this.view.removeElement();
  }

  onSignout = () => {
    this.accountService.signout();
  };
}
