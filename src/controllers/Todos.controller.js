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
  }

  destroy() {
    this.view.removeElement();
  }

  onTodosListChanged = (todos) => {
    this.view.renderTodos(todos);
  };
}
