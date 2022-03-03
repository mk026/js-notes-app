import AbstractView from '../Abstract.view';

export default class ChangePasswordView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
  }

  get errorContainer() {
    return this.element.querySelector('.error-container');
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
        <div class="error-container"></div>
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
    this.removeSaveNewPasswordHandler();
    this.removeCancelChangePasswordHandler();

    this.unmount();
  };

  setOnChangePassword(handler) {
    this.onChangePassword = handler;
  }

  showError(msg) {
    this.errorContainer.classList.add('show');
    this.errorContainer.innerText = msg;
  }

  hideError() {
    this.errorContainer.classList.remove('show');
    this.errorContainer.innerText = '';
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

  attachCancelChangePasswordHandler() {
    this.element
      .querySelector('#cancel-new-password')
      .addEventListener('click', this.closeChangePasswordForm);
  }

  removeSaveNewPasswordHandler() {
    this.element.removeEventListener('submit', this.saveNewPasswordHandler);
  }

  removeCancelChangePasswordHandler() {
    this.element
      .querySelector('#cancel-new-password')
      .removeEventListener('click', this.closeChangePasswordForm);
  }
}
