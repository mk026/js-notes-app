export default class NotesModel {
  constructor(notesService) {
    this.notes = [];
    this.notesService = notesService;
  }

  setOnNotesListChanged(handler) {
    this.onNotesListChanged = handler;
  }

  update(notes) {
    this.onNotesListChanged(notes);
  }

  async getNotes() {
    this.notes = await this.notesService.getNotes();
    return this.notes;
  }

  getNoteById(id) {
    return this.notes.find((note) => note._id == id);
  }

  async addNote(note) {
    const newNote = await this.notesService.addNote(note);
    this.notes.push(newNote);
    this.update(this.notes);
  }

  async editNote(id, newData) {
    const oldNote = this.getNoteById(id);
    const updatedNote = await this.notesService.editNote({
      ...oldNote,
      ...newData,
    });
    this.notes = this.notes.map((note) =>
      note._id == id ? updatedNote : note
    );
    this.update(this.notes);
  }

  async removeNote(id) {
    const deletedNote = await this.notesService.removeNote(id);
    this.notes = this.notes.filter((note) => note._id != deletedNote._id);
    this.update(this.notes);
  }
}
