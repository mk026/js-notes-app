export default class TodosModel {
  constructor(todos) {
    this.todos = todos;
  }

  setOnTodosListChanged(handler) {
    this.onTodosListChanged = handler;
  }

  update(todos) {
    this.onTodosListChanged(todos);
  }

  getTodos() {
    return this.todos;
  }

  addTodo(todo) {
    this.todos.push(todo);
    this.update(this.todos);
  }

  editTodo(id, newData) {
    this.todos = this.todos.map((todo) =>
      todo.id == id ? { ...todo, ...newData } : todo
    );
    this.update(this.todos);
  }

  removeTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id != id);
    this.update(this.todos);
  }
}
