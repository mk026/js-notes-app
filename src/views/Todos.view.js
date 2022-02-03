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

  deleteTodoHandler = (event) => {
    if (event.target.classList.contains('delete-todo')) {
      const todoId = event.target.parentElement.id;
      this.onDeleteTodo(todoId);
    }
  };

  attachEditTodoTitleHandler() {
    this.element.addEventListener('click', this.editTodoTitleHandler);
  }

  attachDeleteTodoHandler() {
    this.element.addEventListener('click', this.deleteTodoHandler);
  }

  removeDeleteTodoHandler() {
    this.element.removeEventListener('click', this.deleteTodoHandler);
  }
}
