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

  addNote(note) {
    this.notes.push(note);
    this.update(this.notes);
  }

  removeNote(id) {
    this.notes = this.notes.filter((note) => note.id != id);
    this.update(this.notes);
  }
}
