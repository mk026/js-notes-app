export default class NotesController {
  constructor(appRoot, view, model) {
    this.appRoot = appRoot;
    this.view = view;
    this.model = model;
  }

  async init() {
    this.appRoot.insertAdjacentElement('beforeend', this.view.getElement());
    this.view.renderNotes(await this.model.getNotes());
    this.model.setOnNotesListChanged(this.onNotesListChanged);

    this.view.setOnAddNote(this.onAddNote);
    this.view.attachShowAddNoteFormHandler();

    this.view.setOnEditNote(this.onEditNote);
    this.view.setOnSaveEditedNote(this.onSaveEditedNote);
    this.view.attachEditNoteHandler();

    this.view.setOnDeleteNote(this.onDeleteNote);
  }

  destroy() {
    this.view.removeShowAddNoteFormHandler();
    this.view.removeEditNoteHandler();
    this.view.removeElement();
  }

  onNotesListChanged = (notes) => {
    this.view.renderNotes(notes);
  };

  onAddNote = (note) => {
    if (!note.title.trim().length) {
      this.view.showAddNoteError('Note title should not be empty');
      return;
    }
    if (!note.content.trim().length) {
      this.view.showAddNoteError('Note content should not be empty');
      return;
    }
    this.model.addNote({
      author: 'Author name',
      ...note,
    });
  };

  onEditNote = (id) => {
    this.view.showEditNoteForm(this.model.getNoteById(id));
    this.editedNoteId = id;
  };

  onSaveEditedNote = (newData) => {
    if (!newData.title.trim().length) {
      this.view.showEditNoteError('Note title should not be empty');
      return;
    }
    if (!newData.content.trim().length) {
      this.view.showEditNoteError('Note content should not be empty');
      return;
    }
    this.model.editNote(this.editedNoteId, newData);
  };

  onDeleteNote = (noteId) => {
    this.model.removeNote(noteId);
  };
}
