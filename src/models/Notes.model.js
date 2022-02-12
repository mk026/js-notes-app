export default class NotesModel {
  constructor([notes], apiService) {
    this.notes = notes;
    this.apiService = apiService;
  }

  setOnNotesListChanged(handler) {
    this.onNotesListChanged = handler;
  }

  update(notes) {
    this.onNotesListChanged(notes);
  }

  async getNotes() {
    this.notes = await this.apiService.getNotes();
    return this.notes;
  }

  getNoteById(id) {
    return this.notes.find((note) => note.id == id);
  }

  async addNote(note) {
    const newNote = await this.apiService.addNote(note);
    this.notes.push(newNote);
    this.update(this.notes);
  }

  editNote(id, newData) {
    this.notes = this.notes.map((note) =>
      note.id == id ? { ...note, ...newData } : note
    );
    this.update(this.notes);
  }

  removeNote(id) {
    this.notes = this.notes.filter((note) => note.id != id);
    this.update(this.notes);
  }
}
