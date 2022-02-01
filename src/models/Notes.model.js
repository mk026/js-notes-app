export default class NotesModel {
  constructor(notes) {
    this.notes = notes;
  }

  setOnNotesListChanged(handler) {
    this.onNotesListChanged = handler;
  }

  update(notes) {
    this.onNotesListChanged(notes);
  }

  getNotes() {
    return this.notes;
  }

  getNoteById(id) {
    return this.notes.find((note) => note.id == id);
  }

  addNote(note) {
    this.notes.push(note);
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
