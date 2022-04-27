import AbstractView from '../Abstract.view';
import ChangeNameView from './ChangeName.view';
import ChangeEmailView from './ChangeEmail.view';
import ChangePasswordView from './ChangePassword.view';
import classes from '../../styles/Account.module.css';

export default class AccountView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
    this.changeNameView = new ChangeNameView();
    this.changeEmailView = new ChangeEmailView();
    this.changePasswordView = new ChangePasswordView();
  }

  get formContainer() {
    return this.element.querySelector(`.${classes.account__form}`);
  }

  getTemplate() {
    return `
      <div class="${classes.account}">
        <h2 class="${classes.account__title}">Account</h2>
        <div class="${classes.account__info}">
          <h3 class="${classes.account__name}"></h3>
          <p class="${classes.account__email}"></p>
        </div>
        <div class="${classes.account__controls}">
          <button id="change-name">Change name</button>
          <button id="change-email">Change email</button>
          <button id="change-password">Change password</button>
          <button id="signout">Signout</button>
        </div>
        <div class="${classes.account__form}"></div>
      </div>
    `;
  }

  renderAccountInfo(info) {
    this.element.querySelector(`.${classes.account__name}`).innerText =
      info.name;
    this.element.querySelector(`.${classes.account__email}`).innerText =
      info.email;
  }

  showChangeNameForm = () => {
    this.changeNameView.mount(this.formContainer);
  };

  showChangeEmailForm = () => {
    this.changeEmailView.mount(this.formContainer);
  };

  showChangePasswordForm = () => {
    this.changePasswordView.mount(this.formContainer);
  };

  showChangeNameError(msg) {
    this.changeNameView.showError(msg);
  }

  showChangeEmailError(msg) {
    this.changeEmailView.showError(msg);
  }

  showChangePasswordError(msg) {
    this.changePasswordView.showError(msg);
  }

  attachChangeNameHandler() {
    this.element
      .querySelector('#change-name')
      .addEventListener('click', this.showChangeNameForm);
  }

  attachChangeEmailHandler() {
    this.element
      .querySelector('#change-email')
      .addEventListener('click', this.showChangeEmailForm);
  }

  attachChangePasswordHandler() {
    this.element
      .querySelector('#change-password')
      .addEventListener('click', this.showChangePasswordForm);
  }

  setOnChangeName(handler) {
    this.changeNameView.setOnChangeName(handler);
  }

  setOnChangeEmail(handler) {
    this.changeEmailView.setOnChangeEmail(handler);
  }

  setOnChangePassword(handler) {
    this.changePasswordView.setOnChangePassword(handler);
  }

  setOnSignout(handler) {
    this.onSignout = handler;
  }

  signoutHandler = () => {
    this.onSignout();
  };

  attachSignoutHandler() {
    this.element
      .querySelector('#signout')
      .addEventListener('click', this.signoutHandler);
  }

  removeSignoutHandler() {
    this.element
      .querySelector('#signout')
      .removeEventListener('click', this.signoutHandler);
  }

  removeChangeNameHandler() {
    this.element
      .querySelector('#change-name')
      .removeEventListener('click', this.showChangeNameForm);
  }

  removeChangeEmailHandler() {
    this.element
      .querySelector('#change-email')
      .removeEventListener('click', this.showChangeEmailForm);
  }

  removeChangePasswordHandler() {
    this.element
      .querySelector('#change-password')
      .removeEventListener('click', this.showChangePasswordForm);
  }
}
