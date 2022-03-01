import AbstractView from './Abstract.view';

export default class ChangePasswordView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
  }

  getTemplate() {
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

  mount(container) {
    container.appendChild(this.element, 'afterbegin');

    this.attachSaveNewPasswordHandler();
    this.attachCancelChangePasswordHandler();
  }

  unmount() {
    this.element.remove();
  }

  closeChangePasswordForm = () => {
    this.unmount();
  };

  attachCancelChangePasswordHandler() {
    this.element
      .querySelector('#cancel-new-password')
      .addEventListener('click', this.closeChangePasswordForm);
  }

  setOnChangePassword(handler) {
    this.onChangePassword = handler;
  }

  saveNewPasswordHandler = (event) => {
    event.preventDefault();

    const oldPassword = this.element.querySelector('#old-password').value;
    const newPassword = this.element.querySelector('#new-password').value;
    const confirmPassword =
      this.element.querySelector('#confirm-password').value;
    this.onChangePassword(oldPassword, newPassword, confirmPassword);
  };

  attachSaveNewPasswordHandler() {
    this.element.addEventListener('submit', this.saveNewPasswordHandler);
  }
}
