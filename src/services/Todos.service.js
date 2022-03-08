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
      id: `todo_${_id}`,
      title,
      completed,
    }));
  }

  async addTodo(todoData) {
    const token = this.authService.getToken();
    const data = await this.post('todos', todoData, token);
    const newTodo = { ...data, id: `todo_${data._id}` };
    delete newTodo._id;
    return newTodo;
  }

  async editTodo(todoData) {
    const editedTodo = { ...todoData, _id: todoData.id.replace(/^todo_/, '') };
    delete editedTodo.id;
    const token = this.authService.getToken();
    const data = await this.put('todos', editedTodo, token);
    const updatedTodo = { ...data, id: `todo_${data._id}` };
    delete updatedTodo._id;
    return updatedTodo;
  }

  async removeTodo(id) {
    const token = this.authService.getToken();
    const data = await this.delete(`todos/${id.replace(/^todo_/, '')}`, token);
    const deletedTodo = { ...data, id: `todo_${data._id}` };
    delete deletedTodo._id;
    return deletedTodo;
  }
}
