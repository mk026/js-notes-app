export default class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getNotes() {
    try {
      const response = await fetch(`${this.baseUrl}/notes`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  addNote() {}

  editNote() {}

  removeNote() {}

  getTodos() {}

  addTodo() {}

  editTodo() {}

  removeTodo() {}
}
