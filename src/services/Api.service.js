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

  async addNote(noteData) {
    try {
      const response = await fetch(`${this.baseUrl}/notes`, {
        method: 'POST',
        body: JSON.stringify(noteData),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      const newNote = { ...data, id: data._id };
      delete newNote._id;
      return newNote;
    } catch (error) {
      console.log(error);
    }
  }

  editNote() {}

  removeNote() {}

  getTodos() {}

  addTodo() {}

  editTodo() {}

  removeTodo() {}
}
