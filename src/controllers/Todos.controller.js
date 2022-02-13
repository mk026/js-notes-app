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
    this.model.addTodo({
      id: `id_${new Date().getTime().toString()}`,
      completed: false,
      ...todo,
    });
  };

  onEditTodoTitle = (id) => {
    this.editedTodoId = id;
    const todoTitle = this.model.getTodoById(id).title;
    this.view.showEditTodoTitleForm(id, todoTitle);
  };

  onSaveEditedTodoTitle = (newTitle) => {
    this.model.editTodoTitle(this.editedTodoId, newTitle);
  };

  onChangeTodoStatus = (id) => {
    this.model.changeTodoStatus(id);
  };

  onDeleteTodo = (id) => {
    this.model.removeTodo(id);
  };
}
