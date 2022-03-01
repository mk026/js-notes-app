import AbstractView from './Abstract.view';

export default class ChangeNameView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
  }

  getTemplate() {
    return `
      <form id="change-name-form">
        <label for="new-name">New name</label>
        <input id="new-name" type="text"/>
        <button id="save-new-name" type="submit">Save</button>
        <button id="cancel-new-name">Cancel</button>
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
    this.unmount();
  };

  attachCancelChangeNameHandler() {
    this.element
      .querySelector('#cancel-new-name')
      .addEventListener('click', this.closeChangeNameForm);
  }

  setOnChangeName(handler) {
    this.onChangeName = handler;
  }

  saveNewNameHandler = (event) => {
    event.preventDefault();

    const newName = this.element.querySelector('#new-name').value;
    this.onChangeName(newName);
  };

  attachSaveNewNameHandler() {
    this.element
      .querySelector('#change-name-form')
      .addEventListener('submit', this.saveNewNameHandler);
  }
}
