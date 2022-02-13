import AbstractView from './Abstract.view';

export default class AddTodo extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
  }

  getTemplate() {
    return `
      <ul class="todos__list"></ul>
    `;
  }

  getTodoTemplate(todo) {
    return `
      <li class="todos__list__el" id="${todo.id}">
        <h3 class="todo__title">${todo.title}</h3>
        <input class="change-todo-status" type="checkbox" ${
          todo.completed ? 'checked' : ''
        }/>
        <button class="edit-todo-title">Edit</button>
        <button class="delete-todo">Delete</button>
      </li>
    `;
  }

  mount(container, todos) {
    const todosList = todos.map(this.getTodoTemplate).join('');
    this.element.innerHTML = todosList;

    container.appendChild(this.element, 'afterbegin');

    this.attachChangeTodoStatusHandler();
    this.attachDeleteTodoHandler();
  }

  unmount() {
    this.removeChangeTodoStatusHandler();
    this.removeDeleteTodoHandler();

    this.element.remove();
  }

  deleteTodoHandler = (event) => {
    if (event.target.classList.contains('delete-todo')) {
      if (this.editedTodo) {
        this.closeEditTodoTitleForm();
      }
      const todoId = event.target.parentElement.id;
      this.onDeleteTodo(todoId);
    }
  };

  changeTodoStatusHandler = (event) => {
    if (event.target.classList.contains('change-todo-status')) {
      const todoId = event.target.parentElement.id;

      this.onChangeTodoStatus(todoId);
    }
  };

  attachDeleteTodoHandler() {
    this.element.addEventListener('click', this.deleteTodoHandler);
  }

  attachChangeTodoStatusHandler() {
    this.element.addEventListener('change', this.changeTodoStatusHandler);
  }

  removeChangeTodoStatusHandler() {
    this.element.removeEventListener('change', this.changeTodoStatusHandler);
  }

  removeDeleteTodoHandler() {
    this.element.removeEventListener('click', this.deleteTodoHandler);
  }
}
