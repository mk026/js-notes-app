export default class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  transformData(data) {
    return data.map(({ _id, title, content }) => ({
      id: _id,
      title,
      content,
    }));
  }

  async getNotes() {
    try {
      const response = await fetch(`${this.baseUrl}/notes`);
      const data = await response.json();
      return this.transformData(data);
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
