import { validateInput } from '../utils/validation';
import { TODO_TITLE_MIN_LENGTH, TODO_TITLE_MAX_LENGTH } from '../config';

export default class TodosController {
  constructor(appRoot, view, model) {
    this.appRoot = appRoot;
    this.view = view;
    this.model = model;
  }

  async init() {
    this.appRoot.insertAdjacentElement('beforeend', this.view.getElement());
    this.view.showLoading();
    this.view.renderTodos(await this.model.getTodos());
    this.view.hideLoading();
    this.model.setOnTodosListChanged(this.onTodosListChanged);

    this.view.setOnAddTodo(this.onAddTodo);
    this.view.attachShowAddTodoFormHandler();

    this.view.setOnDeleteTodo(this.onDeleteTodo);

    this.view.setOnEditTodoTitle(this.onEditTodoTitle);
    this.view.setOnSaveEditedTodoTitle(this.onSaveEditedTodoTitle);

    this.view.setOnChangeTodoStatus(this.onChangeTodoStatus);
  }

  destroy() {
    this.view.removeShowAddTodoFormHandler();
    this.view.removeElement();
  }

  onTodosListChanged = (todos) => {
    this.view.renderTodos(todos);
  };

  onAddTodo = (todo) => {
    const titleError = validateInput(todo.title, 'Todo title');
    if (titleError) {
      this.view.showAddTodoError(titleError);
      return false;
    }
    this.model.addTodo({
      completed: false,
      ...todo,
    });
    return true;
  };

  onEditTodoTitle = (id) => {
    this.editedTodoId = id;
    const todoTitle = this.model.getTodoById(id).title;
    this.view.showEditTodoTitleForm(id, todoTitle);
  };

  onSaveEditedTodoTitle = (newTitle) => {
    const titleError = validateInput(
      newTitle,
      'Todo title',
      TODO_TITLE_MIN_LENGTH,
      TODO_TITLE_MAX_LENGTH
    );
    if (titleError) {
      this.view.showEditTodoError(titleError);
      return false;
    }
    this.model.editTodoTitle(this.editedTodoId, newTitle);
    return true;
  };

  onChangeTodoStatus = (id) => {
    this.model.changeTodoStatus(id);
  };

  onDeleteTodo = (id) => {
    this.model.removeTodo(id);
  };
}
