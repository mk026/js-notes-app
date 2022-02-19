export default class TodosService {
  constructor(baseUrl, authService) {
    this.baseUrl = baseUrl;
    this.authService = authService;
  }

  async getTodos() {
    try {
      const token = `Bearer ${this.authService.getToken()}`;
      const response = await fetch(`${this.baseUrl}/todos`, {
        headers: { Authorization: token },
      });
      const data = await response.json();
      return data.map(({ _id, title, completed }) => ({
        id: `todo_${_id}`,
        title,
        completed,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async addTodo(todoData) {
    try {
      const token = `Bearer ${this.authService.getToken()}`;
      const response = await fetch(`${this.baseUrl}/todos`, {
        method: 'POST',
        body: JSON.stringify(todoData),
        headers: { 'Content-Type': 'application/json', Authorization: token },
      });
      const data = await response.json();
      const newTodo = { ...data, id: `todo_${data._id}` };
      delete newTodo._id;
      return newTodo;
    } catch (error) {
      console.log(error);
    }
  }

  async editTodo(todoData) {
    const editedTodo = { ...todoData, _id: todoData.id.replace(/^todo_/, '') };
    delete editedTodo.id;
    try {
      const token = `Bearer ${this.authService.getToken()}`;
      const response = await fetch(`${this.baseUrl}/todos`, {
        method: 'PUT',
        body: JSON.stringify(editedTodo),
        headers: { 'Content-Type': 'application/json', Authorization: token },
      });
      const data = await response.json();
      const updatedTodo = { ...data, id: `todo_${data._id}` };
      delete updatedTodo._id;
      return updatedTodo;
    } catch (error) {
      console.log(error);
    }
  }

  async removeTodo(id) {
    try {
      const token = `Bearer ${this.authService.getToken()}`;
      const response = await fetch(
        `${this.baseUrl}/todos/${id.replace(/^todo_/, '')}`,
        {
          method: 'DELETE',
          headers: { Authorization: token },
        }
      );
      const data = await response.json();
      const deletedTodo = { ...data, id: `todo_${data._id}` };
      delete deletedTodo._id;
      return deletedTodo;
    } catch (error) {
      console.log(error);
    }
  }
}
