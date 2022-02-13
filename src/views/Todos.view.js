import AbstractView from './Abstract.view';
import AddTodoView from './AddTodo.view';
import TodoListView from './TodoList.view';

export default class TodosView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
    this.addTodoView = new AddTodoView();
    this.todoListView = new TodoListView();
  }

  getTemplate() {
    return `
      <div class="todos">
        <h2>Todos</h2>
        <div class="todos__controls">
          <button id="show-add-todo">Add new todo</button>
        </div>
        <div class="todos__form-container"></div>
        <div class="todos__list-container"></div>
      </div>
    `;
  }

  getEditTodoTitleForm(title) {
    return `
      <form id="edit-todo-title-form">
        <input id="edited-todo-title" type="text" value="${title}"/>
        <button type="submit">Save</button>
        <button id="close-edit-todo-title-form">Cancel</button>
      </form>
    `;
  }

  renderTodos(todos) {
    this.todoListView.mount(
      this.element.querySelector('.todos__list-container'),
      todos
    );
  }

  showAddTodoForm = () => {
    this.addTodoView.mount(
      this.element.querySelector('.todos__form-container')
    );
  };

  showEditTodoTitleForm(id, title) {
    if (this.editedTodo) {
      this.closeEditTodoTitleForm();
    }
    this.editedTodo = this.element.querySelector(`#${id}`);
    this.editedTodoTitle =
      this.editedTodo.querySelector('.todo__title').innerText;

    const editTodoTitleFormContainer = document.createElement('div');
    editTodoTitleFormContainer.innerHTML = this.getEditTodoTitleForm(title);

    this.editedTodo
      .querySelector('.todo__title')
      .replaceWith(editTodoTitleFormContainer.firstElementChild);

    this.attachSaveEditedTodoTitleHandler();
    this.attachCloseEditTodoTitleFormHandler();
  }

  closeEditTodoTitleForm = () => {
    if (this.editedTodo) {
      this.removeSaveEditedTodoTitleHandler();
      this.removeCloseEditTodoTitleFormHandler();

      const todoTitleElement = document.createElement('h3');
      todoTitleElement.classList.add('todo__title');
      todoTitleElement.innerText = this.editedTodoTitle;
      this.editedTodo
        .querySelector('#edit-todo-title-form')
        .replaceWith(todoTitleElement);

      this.editedTodo = null;
      this.editedTodoTitle = null;
    }
  };

  setOnAddTodo(handler) {
    this.addTodoView.onAddTodo = handler;
  }

  setOnEditTodoTitle(handler) {
    this.onEditTodoTitle = handler;
  }

  setOnSaveEditedTodoTitle(handler) {
    this.onSaveEditedTodoTitle = handler;
  }

  setOnChangeTodoStatus(handler) {
    this.todoListView.onChangeTodoStatus = handler;
  }

  setOnDeleteTodo(handler) {
    this.todoListView.onDeleteTodo = handler;
  }

  editTodoTitleHandler = (event) => {
    if (event.target.classList.contains('edit-todo-title')) {
      const todoId = event.target.parentElement.id;
      this.onEditTodoTitle(todoId);
    }
  };

  saveEditedTodoTitleHandler = (event) => {
    event.preventDefault();

    const newTitle = this.element.querySelector('#edited-todo-title').value;

    this.closeEditTodoTitleForm();
    this.onSaveEditedTodoTitle(newTitle);
  };

  attachShowAddTodoFormHandler() {
    this.element
      .querySelector('#show-add-todo')
      .addEventListener('click', this.showAddTodoForm);
  }

  attachCloseEditTodoTitleFormHandler() {
    this.element
      .querySelector('#close-edit-todo-title-form')
      .addEventListener('click', this.closeEditTodoTitleForm);
  }

  attachEditTodoTitleHandler() {
    this.element.addEventListener('click', this.editTodoTitleHandler);
  }

  attachSaveEditedTodoTitleHandler() {
    this.element
      .querySelector('#edit-todo-title-form')
      .addEventListener('submit', this.saveEditedTodoTitleHandler);
  }

  removeShowAddTodoFormHandler() {
    this.element
      .querySelector('#show-add-todo')
      .removeEventListener('click', this.showAddTodoForm);
  }

  removeEditTodoTitleHandler() {
    this.element.removeEventListener('click', this.editTodoTitleHandler);
  }

  removeSaveEditedTodoTitleHandler() {
    this.element
      .querySelector('#edit-todo-title-form')
      .removeEventListener('submit', this.saveEditedTodoTitleHandler);
  }

  removeCloseEditTodoTitleFormHandler() {
    this.element
      .querySelector('#close-edit-todo-title-form')
      .removeEventListener('click', this.closeEditTodoTitleForm);
  }
}
