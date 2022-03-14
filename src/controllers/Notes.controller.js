import { validateInput } from '../utils/validation';

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
    const titleError = validateInput(note.title, 'Note title');
    const contentError = validateInput(note.content, 'Note content');
    if (titleError) {
      this.view.showAddNoteError(titleError);
      return false;
    }
    if (contentError) {
      this.view.showAddNoteError(contentError);
      return false;
    }
    this.model.addNote({
      author: 'Author name',
      ...note,
    });
    return true;
  };

  onEditNote = (id) => {
    this.view.showEditNoteForm(this.model.getNoteById(id));
    this.editedNoteId = id;
  };

  onSaveEditedNote = (newData) => {
    const titleError = validateInput(newData.title, 'Note title');
    const contentError = validateInput(newData.content, 'Note content');
    if (titleError) {
      this.view.showEditNoteError(titleError);
      return false;
    }
    if (contentError) {
      this.view.showEditNoteError(contentError);
      return false;
    }
    this.model.editNote(this.editedNoteId, newData);
    return true;
  };

  onDeleteNote = (noteId) => {
    this.model.removeNote(noteId);
  };
}
