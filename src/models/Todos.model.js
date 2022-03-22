export default class TodosModel {
  constructor(todosService) {
    this.todos = [];
    this.todosService = todosService;
  }

  setOnTodosListChanged(handler) {
    this.onTodosListChanged = handler;
  }

  update(todos) {
    this.onTodosListChanged(todos);
  }

  async getTodos() {
    this.todos = await this.todosService.getTodos();
    return this.todos;
  }

  getTodoById(id) {
    return this.todos.find((todo) => todo.id == id);
  }

  async addTodo(todo) {
    const newTodo = await this.todosService.addTodo(todo);
    this.todos.push(newTodo);
    this.update(this.todos);
  }

  async editTodoTitle(id, newTitle) {
    const editedTodo = this.getTodoById(id);
    editedTodo.title = newTitle;
    const updatedTodo = await this.todosService.editTodo(editedTodo);
    this.todos = this.todos.map((todo) => (todo.id == id ? updatedTodo : todo));
    this.update(this.todos);
  }

  async changeTodoStatus(id) {
    const editedTodo = this.getTodoById(id);
    editedTodo.completed = !editedTodo.completed;
    const updatedTodo = await this.todosService.editTodo(editedTodo);
    this.todos = this.todos.map((todo) => (todo.id == id ? updatedTodo : todo));
    this.update(this.todos);
  }

  async removeTodo(id) {
    const deletedTodo = await this.todosService.removeTodo(id);
    this.todos = this.todos.filter((todo) => todo.id != deletedTodo.id);
    this.update(this.todos);
  }
}
