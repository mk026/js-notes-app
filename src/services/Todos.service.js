import ApiService from './Api.service';

export default class TodosService extends ApiService {
  constructor(baseUrl, authService) {
    super(baseUrl);
    this.authService = authService;
  }

  async getTodos() {
    const token = this.authService.getToken();
    const data = await this.get('todos', token);
    return data.map(({ _id, title, completed }) => ({
      _id: `todo_${_id}`,
      title,
      completed,
    }));
  }

  async addTodo(todoData) {
    const token = this.authService.getToken();
    const data = await this.post('todos', todoData, token);
    const newTodo = { ...data, _id: `todo_${data._id}` };
    return newTodo;
  }

  async editTodo(todoData) {
    const editedTodo = { ...todoData, _id: todoData._id.replace(/^todo_/, '') };
    const token = this.authService.getToken();
    const data = await this.put('todos', editedTodo, token);
    const updatedTodo = { ...data, _id: `todo_${data._id}` };
    return updatedTodo;
  }

  async removeTodo(id) {
    const token = this.authService.getToken();
    const data = await this.delete(`todos/${id.replace(/^todo_/, '')}`, token);
    const deletedTodo = { ...data, _id: `todo_${data._id}` };
    return deletedTodo;
  }
}
