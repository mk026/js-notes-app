import ApiService from './Api.service';

export default class NotesService extends ApiService {
  constructor(baseUrl, authService) {
    super(baseUrl);
    this.authService = authService;
  }

  async getNotes() {
    const token = this.authService.getToken();
    const notes = await this.get('notes', token);

    return notes;
  }

  async addNote(noteData) {
    const token = this.authService.getToken();
    const newNote = await this.post('notes', noteData, token);
    return newNote;
  }

  async editNote(editedNote) {
    const token = this.authService.getToken();
    const updatedNote = await this.put('notes', editedNote, token);
    return updatedNote;
  }

  async removeNote(id) {
    const token = this.authService.getToken();
    const deletedNote = await this.delete(`notes/${id}`, token);
    return deletedNote;
  }
}
