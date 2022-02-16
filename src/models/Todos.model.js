export default class TodosModel {
  constructor(todos, apiService) {
    this.todos = todos;
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

  addTodo(todo) {
    this.todos.push(todo);
    this.update(this.todos);
  }

  editTodoTitle(id, newTitle) {
    this.todos = this.todos.map((todo) =>
      todo.id == id ? { ...todo, title: newTitle } : todo
    );
    this.update(this.todos);
  }

  changeTodoStatus(id) {
    this.todos = this.todos.map((todo) =>
      todo.id == id ? { ...todo, completed: !todo.completed } : todo
    );
    this.update(this.todos);
  }

  removeTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id != id);
    this.update(this.todos);
  }
}
