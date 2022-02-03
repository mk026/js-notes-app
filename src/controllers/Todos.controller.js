export default class TodosController {
  constructor(appRoot, view, model) {
    this.appRoot = appRoot;
    this.view = view;
    this.model = model;
  }

  init() {
    this.appRoot.insertAdjacentElement('beforeend', this.view.getElement());
    this.view.renderTodos(this.model.getTodos());
    this.model.setOnTodosListChanged(this.onTodosListChanged);

    this.view.setOnDeleteTodo(this.onDeleteTodo);
    this.view.attachDeleteTodoHandler();

    this.view.setOnEditTodoTitle(this.onEditTodoTitle);
    this.view.setOnSaveEditedTodoTitle(this.onSaveEditedTodoTitle);
    this.view.attachEditTodoTitleHandler();
  }

  destroy() {
    this.view.removeEditTodoTitleHandler();
    this.view.removeDeleteTodoHandler();
    this.view.removeElement();
  }

  onTodosListChanged = (todos) => {
    this.view.renderTodos(todos);
  };

  onEditTodoTitle = (id) => {
    this.editedTodoId = id;
    const todoTitle = this.model.getTodoById(id).title;
    this.view.showEditTodoTitleForm(id, todoTitle);
  };

  onSaveEditedTodoTitle = (newTitle) => {
    this.model.editTodoTitle(this.editedTodoId, newTitle);
  };

  onDeleteTodo = (id) => {
    this.model.removeTodo(id);
  };
}
