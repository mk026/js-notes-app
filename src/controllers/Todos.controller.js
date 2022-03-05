export default class TodosController {
  constructor(appRoot, view, model) {
    this.appRoot = appRoot;
    this.view = view;
    this.model = model;
  }

  async init() {
    this.appRoot.insertAdjacentElement('beforeend', this.view.getElement());
    this.view.renderTodos(await this.model.getTodos());
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
    if (!todo.title.trim().length) {
      this.view.showAddTodoError('Todo title should not be empty');
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
    if (!newTitle.trim().length) {
      this.view.showEditTodoError('Todo title should not be empty');
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
