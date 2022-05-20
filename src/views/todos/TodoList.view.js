import AbstractView from '../Abstract.view';
import EditTodoView from './EditTodo.view';
import classes from '../../styles/Todos.module.css';

export default class TodoListView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
    this.editTodoView = new EditTodoView();
  }

  getTemplate() {
    return `
      <ul class="${classes.todos__list}"></ul>
    `;
  }

  getTodoTemplate(todo) {
    const checked = todo.completed ? 'checked' : '';

    return `
      <li class="${classes.todo}" id="${todo._id}">
        <div>
          <input class="${classes.todo__status}" type="checkbox" ${checked}/>
          <h3 class="${classes.todo__title}">${todo.title}</h3>
        </div>
        <div>
          <button class="${classes.btn} ${classes['btn--edit']}">Edit</button>
          <button class="${classes.btn} ${classes['btn--delete']}">Delete</button>
        </div>
      </li>
    `;
  }

  mount(container, todos) {
    const todosList = todos.map(this.getTodoTemplate).join('');
    this.element.innerHTML = todosList;

    container.appendChild(this.element, 'afterbegin');

    this.attachEditTodoTitleHandler();
    this.attachChangeTodoStatusHandler();
    this.attachDeleteTodoHandler();
  }

  unmount() {
    this.removeEditTodoTitleHandler();
    this.removeChangeTodoStatusHandler();
    this.removeDeleteTodoHandler();

    this.element.remove();
  }

  setOnEditTodoTitle(handler) {
    this.onEditTodoTitle = handler;
  }

  setOnSaveEditedTodoTitle(handler) {
    this.editTodoView.setOnSaveEditedTodo(handler);
  }

  setOnChangeTodoStatus(handler) {
    this.onChangeTodoStatus = handler;
  }

  setOnDeleteTodo(handler) {
    this.onDeleteTodo = handler;
  }

  showEditTodoTitleForm(id, title) {
    this.editedTodo = this.element.querySelector(
      `#${id} .${classes.todo__title}`
    );

    this.editTodoView.mount(this.editedTodo, title);
  }

  closeEditTodoTitleForm = () => {
    if (this.editedTodo) {
      this.editTodoView.unmount();
      this.editedTodo = null;
    }
  };

  showEditTodoError(msg) {
    this.editTodoView.showError(msg);
  }

  editTodoTitleHandler = (event) => {
    if (event.target.classList.contains(classes['btn--edit'])) {
      const todoId = event.target.parentElement.parentElement.id;
      this.onEditTodoTitle(todoId);
    }
  };

  deleteTodoHandler = (event) => {
    if (event.target.classList.contains(classes['btn--delete'])) {
      if (this.editedTodo) {
        this.editTodoView.unmount();
      }
      const todoId = event.target.parentElement.id;
      this.onDeleteTodo(todoId);
    }
  };

  changeTodoStatusHandler = (event) => {
    if (event.target.classList.contains(classes.todo__status)) {
      const todoId = event.target.parentElement.id;

      this.onChangeTodoStatus(todoId);
    }
  };

  attachEditTodoTitleHandler() {
    this.element.addEventListener('click', this.editTodoTitleHandler);
  }

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

  removeEditTodoTitleHandler() {
    this.element.removeEventListener('click', this.editTodoTitleHandler);
  }
}
