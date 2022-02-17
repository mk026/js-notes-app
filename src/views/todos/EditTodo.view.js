import AbstractView from '../Abstract.view';

export default class EditTodoView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
  }

  getTemplate() {
    return `
      <form id="edit-todo-title-form">
        <input id="edited-todo-title" type="text"/>
        <button type="submit">Save</button>
        <button id="close-edit-todo-title-form">Cancel</button>
      </form>
    `;
  }

  mount(container, oldTitle) {
    this.editedTodo = container.querySelector('.todo__title');
    this.setInitialInputValue(oldTitle);
    this.editedTodo.replaceWith(this.element);

    this.attachSaveEditedTodoTitleHandler();
    this.attachCloseEditTodoTitleFormHandler();
  }

  unmount() {
    if (this.editedTodo) {
      this.element.replaceWith(this.editedTodo);
      this.editedTodo = null;
    }
  }

  closeEditTodoTitleForm = () => {
    if (this.editedTodo) {
      this.removeSaveEditedTodoTitleHandler();
      this.removeCloseEditTodoTitleFormHandler();
      this.unmount();
    }
  };

  setInitialInputValue(title) {
    this.element.querySelector('#edited-todo-title').value = title;
  }

  setOnSaveEditedTodo(handler) {
    this.onSaveEditedTodoTitle = handler;
  }

  saveEditedTodoTitleHandler = (event) => {
    event.preventDefault();

    const newTitle = this.element.querySelector('#edited-todo-title').value;

    this.closeEditTodoTitleForm();
    this.onSaveEditedTodoTitle(newTitle);
  };

  attachSaveEditedTodoTitleHandler() {
    this.element.addEventListener('submit', this.saveEditedTodoTitleHandler);
  }

  attachCloseEditTodoTitleFormHandler() {
    this.element
      .querySelector('#close-edit-todo-title-form')
      .addEventListener('click', this.closeEditTodoTitleForm);
  }

  removeSaveEditedTodoTitleHandler() {
    this.element.removeEventListener('submit', this.saveEditedTodoTitleHandler);
  }

  removeCloseEditTodoTitleFormHandler() {
    this.element
      .querySelector('#close-edit-todo-title-form')
      .removeEventListener('click', this.closeEditTodoTitleForm);
  }
}