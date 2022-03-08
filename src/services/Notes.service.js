import ApiService from './Api.service';

export default class NotesService extends ApiService {
  constructor(baseUrl, authService) {
    super(baseUrl);
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
    const token = `Bearer ${this.authService.getToken()}`;
    const data = await this.get('notes', token);

    return this.transformData(data);
  }

  async addNote(noteData) {
    const token = `Bearer ${this.authService.getToken()}`;
    const data = await this.post('notes', noteData, token);
    const newNote = { ...data, id: data._id };
    delete newNote._id;
    return newNote;
  }

  async editNote(noteData) {
    const editedNote = { ...noteData, _id: noteData.id };
    delete editedNote.id;
    const token = `Bearer ${this.authService.getToken()}`;
    const data = await this.put('notes', editedNote, token);
    const updatedNote = { ...data, id: data._id };
    delete updatedNote._id;
    return updatedNote;
  }

  async removeNote(id) {
    const token = `Bearer ${this.authService.getToken()}`;
    const data = await this.delete(`notes/${id}`, token);
    const deletedNote = { ...data, id: data._id };
    delete deletedNote._id;
    return deletedNote;
  }
}
