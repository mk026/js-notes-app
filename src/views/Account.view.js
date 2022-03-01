import AbstractView from './Abstract.view';
import ChangeNameView from './ChangeName.view';
import ChangeEmailView from './ChangeEmail.view';
import ChangePasswordView from './ChangePassword.view';

export default class AccountView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
    this.changeNameView = new ChangeNameView();
    this.changeEmailView = new ChangeEmailView();
    this.changePasswordView = new ChangePasswordView();
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
    this.changeEmailView.mount(
      this.element.querySelector('.account__form-container')
    );
  };

  showChangePasswordForm = () => {
    this.changePasswordView.mount(
      this.element.querySelector('.account__form-container')
    );
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
}
