import AbstractView from '../Abstract.view';
import EditTodoView from './EditTodo.view';

export default class TodoListView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
    this.editTodoView = new EditTodoView();
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

  setOnSaveEditedTodoTitle(handler) {
    this.editTodoView.setOnSaveEditedTodo(handler);
  }

  showEditTodoTitleForm(id, title) {
    this.editedTodo = this.element.querySelector(`#${id}`);

    this.editTodoView.mount(this.editedTodo, title);
  }

  closeEditTodoTitleForm = () => {
    if (this.editedTodo) {
      this.editTodoView.unmount();
      this.editedTodo = null;
    }
  };

  editTodoTitleHandler = (event) => {
    if (event.target.classList.contains('edit-todo-title')) {
      const todoId = event.target.parentElement.id;
      this.onEditTodoTitle(todoId);
    }
  };

  deleteTodoHandler = (event) => {
    if (event.target.classList.contains('delete-todo')) {
      if (this.editedTodo) {
        this.editTodoView.unmount();
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
