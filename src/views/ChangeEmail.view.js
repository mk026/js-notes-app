import AbstractView from './Abstract.view';

export default class ChangeEmailView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
  }

  getTemplate() {
    return `
      <form id="change-email-form">
        <label for="new-email">New email</label>
        <input id="new-email" type="text"/>
        <button id="save-new-email" type="submit">Save</button>
        <button id="cancel-new-email">Cancel</button>
      </form>
    `;
  }

  mount(container) {
    container.appendChild(this.element, 'afterbegin');

    this.attachSaveNewEmailHandler();
    this.attachCancelChangeEmailHandler();
  }

  unmount() {
    this.element.remove();
  }

  closeChangeEmailForm = () => {
    this.unmount();
  };

  attachCancelChangeEmailHandler() {
    this.element
      .querySelector('#cancel-new-email')
      .addEventListener('click', this.closeChangeEmailForm);
  }

  setOnChangeEmail(handler) {
    this.onChangeEmail = handler;
  }

  saveNewEmailHandler = (event) => {
    event.preventDefault();

    const newEmail = this.element.querySelector('#new-email').value;
    this.onChangeEmail(newEmail);
  };

  attachSaveNewEmailHandler() {
    this.element
      .querySelector('#change-email-form')
      .addEventListener('submit', this.saveNewEmailHandler);
  }
}
