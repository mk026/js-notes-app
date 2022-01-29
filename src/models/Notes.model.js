export default class NotesModel {
  constructor(notes) {
    this.notes = notes;
  }

  getNotes() {
    return this.notes;
  }

  addNote(note) {
    this.notes.push(note);
  }

  removeNote(id) {
    this.notes = this.notes.filter((note) => note.id != id);
  }
}
