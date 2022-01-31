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
    this.view.setAddNoteHandler(this.onAddNote);
    this.view.attachAddNoteHandler();
  }

  destroy() {
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
}
