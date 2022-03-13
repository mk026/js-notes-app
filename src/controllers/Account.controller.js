import { validateEmail, validatePassword, validateInput } from '../utils';

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
    const nameError = validateInput(newName, 'Name');
    if (nameError) {
      this.view.showChangeNameError(nameError);
      return;
    }
    await this.accountService.changeName(newName);
  };

  onChangeEmail = async (newEmail) => {
    const emailError = validateEmail(newEmail);
    if (emailError) {
      this.view.showChangeEmailError(emailError);
      return;
    }
    await this.accountService.changeEmail(newEmail);
  };

  onChangePassword = async (oldPassword, newPassword, confirmPassword) => {
    const passwordError = validatePassword(newPassword, 8, 100);
    if (passwordError) {
      this.view.showChangePasswordError(passwordError);
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
