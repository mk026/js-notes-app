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
    this.todoListView.showEditTodoTitleForm(id, title);
  }

  setOnAddTodo(handler) {
    this.addTodoView.onAddTodo = handler;
  }

  setOnEditTodoTitle(handler) {
    this.todoListView.onEditTodoTitle = handler;
  }

  setOnSaveEditedTodoTitle(handler) {
    this.todoListView.setOnSaveEditedTodoTitle(handler);
  }

  setOnChangeTodoStatus(handler) {
    this.todoListView.onChangeTodoStatus = handler;
  }

  setOnDeleteTodo(handler) {
    this.todoListView.onDeleteTodo = handler;
  }

  attachShowAddTodoFormHandler() {
    this.element
      .querySelector('#show-add-todo')
      .addEventListener('click', this.showAddTodoForm);
  }

  removeShowAddTodoFormHandler() {
    this.element
      .querySelector('#show-add-todo')
      .removeEventListener('click', this.showAddTodoForm);
  }
}
