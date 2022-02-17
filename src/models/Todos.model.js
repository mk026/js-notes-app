export default class TodosModel {
  constructor(apiService) {
    this.todos = [];
    this.apiService = apiService;
  }

  setOnTodosListChanged(handler) {
    this.onTodosListChanged = handler;
  }

  update(todos) {
    this.onTodosListChanged(todos);
  }

  async getTodos() {
    this.todos = await this.apiService.getTodos();
    return this.todos;
  }

  getTodoById(id) {
    return this.todos.find((todo) => todo.id == id);
  }

  async addTodo(todo) {
    const newTodo = await this.apiService.addTodo(todo);
    this.todos.push(newTodo);
    this.update(this.todos);
  }

  async editTodoTitle(id, newTitle) {
    const editedTodo = this.getTodoById(id);
    editedTodo.title = newTitle;
    const updatedTodo = await this.apiService.editTodo(editedTodo);
    this.todos = this.todos.map((todo) => (todo.id == id ? updatedTodo : todo));
    this.update(this.todos);
  }

  async changeTodoStatus(id) {
    const editedTodo = this.getTodoById(id);
    editedTodo.completed = !editedTodo.completed;
    const updatedTodo = await this.apiService.editTodo(editedTodo);
    this.todos = this.todos.map((todo) => (todo.id == id ? updatedTodo : todo));
    this.update(this.todos);
  }

  async removeTodo(id) {
    const deletedTodo = await this.apiService.removeTodo(id);
    this.todos = this.todos.filter((todo) => todo.id != deletedTodo.id);
    this.update(this.todos);
  }
}
