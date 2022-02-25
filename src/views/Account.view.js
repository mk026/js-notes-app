import AbstractView from './Abstract.view';

export default class AccountView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
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
        </div>
        <div class="account__form-container"></div>
        <button id="signout">Signout</button>
      </div>
    `;
  }

  getChangeNameFormTemplate() {
    return `
      <form id="change-name-form">
        <label for="new-name">New name</label>
        <input id="new-name" type="text"/>
        <button id="save-new-name" type="submit">Save</button>
        <button id="cancel-new-name">Cancel</button>
      </form>
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

  renderAccountInfo(info) {
    this.element.querySelector('.account__name').innerText = info.name;
    this.element.querySelector('.account__email').innerText = info.email;
  }

  showChangeNameForm = () => {
    this.element.querySelector('.account__form-container').innerHTML =
      this.getChangeNameForm();
  };

  closeChangeNameForm = () => {
    this.element.querySelector('.account__form-container').innerHTML = '';
  };

  showChangeEmailForm = () => {
    this.element.querySelector('.account__form-container').innerHTML =
      this.getChangeEmailFormTemplate();
  };

  closeChangeEmailForm = () => {
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

  setOnChangeName(handler) {
    this.onChangeName = handler;
  }

  setOnChangeEmail(handler) {
    this.onChangeEmail = handler;
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
