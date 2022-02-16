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

  async editNote(noteData) {
    const editedNote = { ...noteData, _id: noteData.id };
    delete editedNote.id;
    try {
      const response = await fetch(`${this.baseUrl}/notes`, {
        method: 'PUT',
        body: JSON.stringify(editedNote),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      const updatedNote = { ...data, id: data._id };
      delete updatedNote._id;
      return updatedNote;
    } catch (error) {
      console.log(error);
    }
  }

  async removeNote(id) {
    try {
      const response = await fetch(`${this.baseUrl}/notes/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      const deletedNote = { ...data, id: data._id };
      delete deletedNote._id;
      return deletedNote;
    } catch (error) {
      console.log(error);
    }
  }

  async getTodos() {
    try {
      const response = await fetch(`${this.baseUrl}/todos`);
      const data = await response.json();
      return data.map(({ _id, title, completed }) => ({
        id: _id,
        title,
        completed,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async addTodo(todoData) {
    try {
      const response = await fetch(`${this.baseUrl}/todos`, {
        method: 'POST',
        body: JSON.stringify(todoData),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      const newTodo = { ...data, id: data._id };
      delete newTodo._id;
      return newTodo;
    } catch (error) {
      console.log(error);
    }
  }

  editTodo() {}

  async removeTodo(id) {
    try {
      const response = await fetch(`${this.baseUrl}/todos/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      const deletedTodo = { ...data, id: data._id };
      delete deletedTodo._id;
      return deletedTodo;
    } catch (error) {
      console.log(error);
    }
  }
}
