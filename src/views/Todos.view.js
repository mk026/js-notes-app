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
        <h3>${todo.title}</h3>
        <input type="checkbox" ${todo.completed ? 'checked' : ''}/>
        <button class="delete-todo">Delete</button>
      </li>
    `;
  }

  renderTodos(todos) {
    const todosListContainer = this.element.querySelector('.todos__list');
    const todosList = todos.map(this.getTodoTemplate);
    todosListContainer.innerHTML = todosList.join('');
  }

  setOnDeleteTodo(handler) {
    this.onDeleteTodo = handler;
  }

  deleteTodoHandler = (event) => {
    if (event.target.classList.contains('delete-todo')) {
      const todoId = event.target.parentElement.id;
      this.onDeleteTodo(todoId);
    }
  };

  attachDeleteTodoHandler() {
    this.element.addEventListener('click', this.deleteTodoHandler);
  }
}
