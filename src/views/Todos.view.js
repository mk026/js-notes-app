import AbstractView from './Abstract.view';

export default class TodosView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
  }

  getTemplate() {
    return `
      <div class="todos">
        <h2>Todos</h2>
        <ul class="todos__list">
        </ul>
      </div>
    `;
  }

  getTodoTemplate(todo) {
    return `
      <li class="todos__list__el" id="${todo.id}">
        <h3 class="todo__title">${todo.title}</h3>
        <input type="checkbox" ${todo.completed ? 'checked' : ''}/>
        <button class="edit-todo-title">Edit</button>
        <button class="delete-todo">Delete</button>
      </li>
    `;
  }

  getEditTodoTitleForm(title) {
    return `
      <form id="edit-todo-title-form">
        <input id="new-todo-title" type="text" value="${title}"/>
        <button type="submit">Save</button>
        <button id="close-edit-todo-title-form">Cancel</button>
      </form>
    `;
  }

  renderTodos(todos) {
    const todosListContainer = this.element.querySelector('.todos__list');
    const todosList = todos.map(this.getTodoTemplate);
    todosListContainer.innerHTML = todosList.join('');
  }

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
  };

  setOnEditTodoTitle(handler) {
    this.onEditTodoTitle = handler;
  }

  setOnSaveEditedTodoTitle(handler) {
    this.onSaveEditedTodoTitle = handler;
  }

  setOnDeleteTodo(handler) {
    this.onDeleteTodo = handler;
  }

  editTodoTitleHandler = (event) => {
    if (event.target.classList.contains('edit-todo-title')) {
      const todoId = event.target.parentElement.id;
      this.onEditTodoTitle(todoId);
    }
  };

  saveEditedTodoTitleHandler = (event) => {
    event.preventDefault();

    const newTitle = this.element.querySelector('#new-todo-title').value;

    this.closeEditTodoTitleForm();
    this.onSaveEditedTodoTitle(newTitle);
  };

  deleteTodoHandler = (event) => {
    if (event.target.classList.contains('delete-todo')) {
      const todoId = event.target.parentElement.id;
      this.onDeleteTodo(todoId);
    }
  };

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

  attachDeleteTodoHandler() {
    this.element.addEventListener('click', this.deleteTodoHandler);
  }

  removeDeleteTodoHandler() {
    this.element.removeEventListener('click', this.deleteTodoHandler);
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
