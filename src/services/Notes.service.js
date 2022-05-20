import { ApiEndpoints } from '../config';
import ApiService from './Api.service';

export default class NotesService extends ApiService {
  constructor(baseUrl, authService) {
    super(baseUrl);
    this.authService = authService;
  }

  async getNotes() {
    const token = this.authService.getToken();
    const notes = await this.get(ApiEndpoints.NOTES, token);

    return notes;
  }

  async addNote(noteData) {
    const token = this.authService.getToken();
    const newNote = await this.post(ApiEndpoints.NOTES, noteData, token);
    return newNote;
  }

  async editNote(editedNote) {
    const token = this.authService.getToken();
    const updatedNote = await this.put(ApiEndpoints.NOTES, editedNote, token);
    return updatedNote;
  }

  async removeNote(id) {
    const token = this.authService.getToken();
    const deletedNote = await this.delete(`${ApiEndpoints.NOTES}/${id}`, token);
    return deletedNote;
  }
}
