import AbstractView from '../Abstract.view';
import AddTodoView from './AddTodo.view';
import TodoListView from './TodoList.view';
import classes from '../../styles/Todos.module.css';

export default class TodosView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
    this.addTodoView = new AddTodoView();
    this.todoListView = new TodoListView();
  }

  get formContainer() {
    return this.element.querySelector(`.${classes['todos__form-container']}`);
  }

  get listContainer() {
    return this.element.querySelector(`.${classes['todos__list-container']}`);
  }

  getTemplate() {
    return `
      <div class="${classes.todos}">
        <h2 class="${classes.todos__title}">Todos</h2>
        <div class="${classes.todos__controls}">
          <button id="show-add-todo">Add new todo</button>
        </div>
        <div class="${classes['todos__form-container']}"></div>
        <div class="${classes['todos__list-container']}"></div>
      </div>
    `;
  }

  renderTodos(todos) {
    this.todoListView.mount(this.listContainer, todos);
  }

  showAddTodoForm = () => {
    this.addTodoView.mount(this.formContainer);
  };

  showEditTodoTitleForm(id, title) {
    this.todoListView.showEditTodoTitleForm(id, title);
  }

  showAddTodoError(msg) {
    this.addTodoView.showError(msg);
  }

  showEditTodoError(msg) {
    this.todoListView.showEditTodoError(msg);
  }

  setOnAddTodo(handler) {
    this.addTodoView.setOnAddTodo(handler);
  }

  setOnEditTodoTitle(handler) {
    this.todoListView.setOnEditTodoTitle(handler);
  }

  setOnSaveEditedTodoTitle(handler) {
    this.todoListView.setOnSaveEditedTodoTitle(handler);
  }

  setOnChangeTodoStatus(handler) {
    this.todoListView.setOnChangeTodoStatus(handler);
  }

  setOnDeleteTodo(handler) {
    this.todoListView.setOnDeleteTodo(handler);
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
