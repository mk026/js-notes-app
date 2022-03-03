export default class AccountController {
  constructor(appRoot, view, accountService) {
    this.appRoot = appRoot;
    this.view = view;
    this.accountService = accountService;
  }

  async init() {
    this.appRoot.insertAdjacentElement('beforeend', this.view.getElement());

    this.view.setOnChangeName(this.onChangeName);
    this.view.setOnChangeEmail(this.onChangeEmail);
    this.view.setOnChangePassword(this.onChangePassword);
    this.view.setOnSignout(this.onSignout);
    this.view.attachSignoutHandler();
    this.view.attachChangeNameHandler();
    this.view.attachChangeEmailHandler();
    this.view.attachChangePasswordHandler();

    const accountInfo = await this.accountService.getAccountInfo();
    this.view.renderAccountInfo(accountInfo);
  }

  destroy() {
    this.view.removeSignoutHandler();
    this.view.removeElement();
  }

  onChangeName = async (newName) => {
    if (!newName.trim().length) {
      this.view.showChangeNameError('Name should not be empty');
      return;
    }
    await this.accountService.changeName(newName);
  };

  onChangeEmail = async (newEmail) => {
    if (!newEmail.trim().length) {
      this.view.showChangeEmailError('Email should not be empty');
      return;
    }
    await this.accountService.changeEmail(newEmail);
  };

  onChangePassword = async (oldPassword, newPassword, confirmPassword) => {
    if (!newPassword.trim().length) {
      this.view.showChangePasswordError('Password should not be empty');
      return;
    }
    if (newPassword !== confirmPassword) {
      this.view.showChangePasswordError('Passwords are not equal');
      return;
    }
    await this.accountService.changePassword(oldPassword, newPassword);
  };

  onSignout = () => {
    this.accountService.signout();
  };
}
