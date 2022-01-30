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
  }

  destroy() {
    this.view.removeElement();
  }

  onNotesListChanged = (notes) => {
    this.view.renderNotes(notes);
  };
}
