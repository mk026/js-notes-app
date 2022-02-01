export default class NotesController {
  constructor(appRoot, view, model) {
    this.appRoot = appRoot;
    this.view = view;
    this.model = model;
  }

  init() {
    this.appRoot.insertAdjacentElement('beforeend', this.view.getElement());
    this.view.renderNotes(this.model.getNotes());
    this.model.setOnNotesListChanged(this.onNotesListChanged);

    this.view.setOnAddNote(this.onAddNote);
    this.view.attachShowAddNoteFormHandler();

    this.view.setOnEditNote(this.onEditNote);
    this.view.setOnSaveEditedNote(this.onSaveEditedNote);
    this.view.attachEditNoteHandler();

    this.view.setOnDeleteNote(this.onDeleteNote);
    this.view.attachDeleteNoteHandler();
  }

  destroy() {
    this.view.removeShowAddNoteFormHandler();
    this.view.removeElement();
  }

  onNotesListChanged = (notes) => {
    this.view.renderNotes(notes);
  };

  onAddNote = (note) => {
    this.model.addNote({
      id: `${new Date().getTime().toString()}`,
      author: 'Author name',
      ...note,
    });
  };

  onEditNote = (id) => {
    this.view.showEditNoteForm(this.model.getNoteById(id));
    this.editedNoteId = id;
  };

  onSaveEditedNote = (newData) => {
    this.model.editNote(this.editedNoteId, newData);
  };

  onDeleteNote = (noteId) => {
    this.model.removeNote(noteId);
  };
}
