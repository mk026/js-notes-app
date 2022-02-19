export default class NotesService {
  constructor(baseUrl, authService) {
    this.baseUrl = baseUrl;
    this.authService = authService;
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
}
