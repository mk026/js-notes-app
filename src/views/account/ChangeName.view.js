import AbstractView from '../Abstract.view';

export default class ChangeNameView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
  }

  get errorContainer() {
    return this.element.querySelector('.error-container');
  }

  getTemplate() {
    return `
      <form id="change-name-form">
        <label for="new-name">New name</label>
        <input id="new-name" type="text"/>
        <button id="save-new-name" type="submit">Save</button>
        <button id="cancel-new-name">Cancel</button>
        <div class="error-container"></div>
      </form>
    `;
  }

  mount(container) {
    container.appendChild(this.element, 'afterbegin');

    this.attachSaveNewNameHandler();
    this.attachCancelChangeNameHandler();
  }

  unmount() {
    this.element.remove();
  }

  closeChangeNameForm = () => {
    this.removeSaveNewNameHandler();
    this.removeCancelChangeNameHandler();
    this.hideError();

    this.unmount();
  };

  setOnChangeName(handler) {
    this.onChangeName = handler;
  }

  showError(msg) {
    this.errorContainer.classList.add('show');
    this.errorContainer.innerText = msg;
  }

  hideError() {
    this.errorContainer.classList.remove('show');
    this.errorContainer.innerText = '';
  }

  saveNewNameHandler = (event) => {
    event.preventDefault();

    const newName = this.element.querySelector('#new-name').value;
    this.onChangeName(newName);
  };

  attachSaveNewNameHandler() {
    this.element.addEventListener('submit', this.saveNewNameHandler);
  }

  attachCancelChangeNameHandler() {
    this.element
      .querySelector('#cancel-new-name')
      .addEventListener('click', this.closeChangeNameForm);
  }

  removeSaveNewNameHandler() {
    this.element.removeEventListener('submit', this.saveNewNameHandler);
  }

  removeCancelChangeNameHandler() {
    this.element
      .querySelector('#cancel-new-name')
      .removeEventListener('click', this.closeChangeNameForm);
  }
}
