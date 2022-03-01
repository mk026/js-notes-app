import AbstractView from './Abstract.view';
import ChangeNameView from './ChangeName.view';

export default class AccountView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
    this.changeNameView = new ChangeNameView();
  }

  getTemplate() {
    return `
      <div class="account">
        <h2>Account</h2>
        <div class="account__container">
          <h3 class="account__name"></h3>
          <p class="account__email"></p>
        </div>
        <div class="account__controls">
          <button id="change-name">Change name</button>
          <button id="change-email">Change email</button>
          <button id="change-password">Change password</button>
        </div>
        <div class="account__form-container"></div>
        <button id="signout">Signout</button>
      </div>
    `;
  }

  getChangeEmailFormTemplate() {
    return `
      <form id="change-email-form">
        <label for="new-email">New email</label>
        <input id="new-email" type="text"/>
        <button id="save-new-email" type="submit">Save</button>
        <button id="cancel-new-email">Cancel</button>
      </form>
    `;
  }

  getChangePasswordFormTemplate() {
    return `
      <form id="change-password-form">
        <label for="old-password">Old password</label>
        <input id="old-password" type="password"/>
        <label for="new-password">New password</label>
        <input id="new-password" type="password"/>
        <label for="confirm-password">Confirm new password</label>
        <input id="confirm-password" type="password"/>
        <button id="save-new-password" type="submit">Save</button>
        <button id="cancel-new-password">Cancel</button>
      </form>
    `;
  }

  renderAccountInfo(info) {
    this.element.querySelector('.account__name').innerText = info.name;
    this.element.querySelector('.account__email').innerText = info.email;
  }

  showChangeNameForm = () => {
    this.changeNameView.mount(
      this.element.querySelector('.account__form-container')
    );
  };

  showChangeEmailForm = () => {
    this.element.querySelector('.account__form-container').innerHTML =
      this.getChangeEmailFormTemplate();

    this.attachSaveNewEmailHandler();
    this.attachCancelChangeEmailHandler();
  };

  closeChangeEmailForm = () => {
    this.element.querySelector('.account__form-container').innerHTML = '';
  };

  showChangePasswordForm = () => {
    this.element.querySelector('.account__form-container').innerHTML =
      this.getChangePasswordFormTemplate();

    this.attachSaveNewPasswordHandler();
    this.attachCancelChangePasswordHandler();
  };

  closeChangePasswordForm = () => {
    this.element.querySelector('.account__form-container').innerHTML = '';
  };

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

  attachCancelChangeEmailHandler() {
    this.element
      .querySelector('#cancel-new-email')
      .addEventListener('click', this.closeChangeEmailForm);
  }

  attachCancelChangePasswordHandler() {
    this.element
      .querySelector('#cancel-new-password')
      .addEventListener('click', this.closeChangePasswordForm);
  }

  setOnChangeName(handler) {
    this.changeNameView.setOnChangeName(handler);
  }

  setOnChangeEmail(handler) {
    this.onChangeEmail = handler;
  }

  setOnChangePassword(handler) {
    this.onChangePassword = handler;
  }

  setOnSignout(handler) {
    this.onSignout = handler;
  }

  saveNewEmailHandler = (event) => {
    event.preventDefault();

    const newEmail = this.element.querySelector('#new-email').value;
    this.onChangeEmail(newEmail);
  };

  saveNewPasswordHandler = (event) => {
    event.preventDefault();

    const oldPassword = this.element.querySelector('#old-password').value;
    const newPassword = this.element.querySelector('#new-password').value;
    const confirmPassword =
      this.element.querySelector('#confirm-password').value;
    this.onChangePassword(oldPassword, newPassword, confirmPassword);
  };

  signoutHandler = () => {
    this.onSignout();
  };

  attachSaveNewEmailHandler() {
    this.element
      .querySelector('#change-email-form')
      .addEventListener('submit', this.saveNewEmailHandler);
  }

  attachSaveNewPasswordHandler() {
    this.element
      .querySelector('#change-password-form')
      .addEventListener('submit', this.saveNewPasswordHandler);
  }

  attachSignoutHandler() {
    this.element
      .querySelector('#signout')
      .addEventListener('click', this.signoutHandler);
  }
}
