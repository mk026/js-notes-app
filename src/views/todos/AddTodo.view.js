import AbstractView from '../Abstract.view';

export default class AddTodoView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
  }

  get errorContainer() {
    return this.element.querySelector('.error-container');
  }

  getTemplate() {
    return `
      <form id="add-todo">
        <label for="new-todo-title">Title</label>
        <input id="new-todo-title" type="text"/>
        <button type="submit">Save</button>
        <button id="close-new-todo">Cancel</button>
        <div class="error-container"></div>
      </form>
    `;
  }

  mount(container) {
    container.appendChild(this.element, 'afterbegin');

    this.attachAddTodoHandler();
    this.attachCloseAddTodoFormHandler();
  }

  unmount() {
    this.element.remove();
  }

  setOnAddTodo(handler) {
    this.onAddTodo = handler;
  }

  showError(msg) {
    this.errorContainer.classList.add('show');
    this.errorContainer.innerText = msg;
  }

  hideError() {
    this.errorContainer.classList.remove('show');
    this.errorContainer.innerText = '';
  }

  addTodoHandler = (event) => {
    event.preventDefault();

    const title = this.element.querySelector('#new-todo-title').value;
    const date = new Date().toLocaleDateString();

    if (this.onAddTodo({ title, date })) {
      this.closeAddTodoForm();
    }
  };

  closeAddTodoForm = () => {
    this.removeAddTodoHandler();
    this.removeCloseAddTodoFormHandler();
    this.hideError();

    this.unmount();
  };

  attachCloseAddTodoFormHandler() {
    this.element
      .querySelector('#close-new-todo')
      .addEventListener('click', this.closeAddTodoForm);
  }

  removeCloseAddTodoFormHandler() {
    this.element
      .querySelector('#close-new-todo')
      .removeEventListener('click', this.closeAddTodoForm);
  }

  attachAddTodoHandler() {
    this.element.addEventListener('submit', this.addTodoHandler);
  }

  removeAddTodoHandler() {
    this.element.removeEventListener('submit', this.addTodoHandler);
  }
}
