import AbstractView from './Abstract.view';
import AddNoteView from './AddNote.view';

export default class NotesView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
    this.addNoteView = new AddNoteView();
  }

  getTemplate() {
    return `
      <div class="notes">
        <h2>Notes</h2>
        <div class="notes__controls">
          <button id="show-add-note">Add new note</button>
        </div>
        <div class="notes__form"></div>
        <ul class="notes__list">
        </ul>
      </div>
    `;
  }

  getEditNoteTemplate(note) {
    return `
      <div>
        <form id="edit-note-form">
          <label for="edit-note-title">Title</label>
          <textarea id="edit-note-title">${note.title}</textarea>
          <label for="edit-note-content">Content</label>
          <textarea id="edit-note-content"/>${note.content}</textarea>
          <button type="submit">Save</button>
          <button type="button" id="close-edit-note-form">Cancel</button>
        </form>
      </div>
    `;
  }

  renderNotes(notes) {
    const notesListContainer = this.element.querySelector('.notes__list');
    const notesList = notes.map(this.getNoteTemplate);
    notesListContainer.innerHTML = notesList.join('');
  }

  showAddNoteForm = () => {
    this.addNoteView.mount(this.element.querySelector('.notes__form'));
  };

  showEditNoteForm(note) {
    this.element.querySelector('.notes__form').innerHTML =
      this.getEditNoteTemplate(note);

    this.attachSaveEditedNoteHandler();
    this.attachCancelEditedNoteHandler();
  }

  closeEditNoteForm = () => {
    this.removeSaveEditedNoteHandler();
    this.removeCancelEditedNoteHandler();

    this.element.querySelector('.notes__form').innerHTML = '';
  };

  attachShowAddNoteFormHandler() {
    this.element
      .querySelector('#show-add-note')
      .addEventListener('click', this.showAddNoteForm);
  }

  removeShowAddNoteFormHandler() {
    this.element
      .querySelector('#show-add-note')
      .removeEventListener('click', this.showAddNoteForm);
  }

  setOnAddNote(handler) {
    this.addNoteView.onAddNote = handler;
  }

  setOnEditNote(handler) {
    this.onEditNote = handler;
  }

  setOnSaveEditedNote(handler) {
    this.onSaveEditedNote = handler;
  }

  setOnDeleteNote(handler) {
    this.onDeleteNote = handler;
  }

  editNoteHandler = (event) => {
    if (event.target.classList.contains('edit-note')) {
      const noteId = event.target.parentElement.id;
      this.onEditNote(noteId);
    }
  };

  saveEditedNoteHandler = (event) => {
    event.preventDefault();

    const title = this.element.querySelector('#edit-note-title').value;
    const content = this.element.querySelector('#edit-note-content').value;
    const editDate = new Date().toLocaleDateString();

    this.onSaveEditedNote({ title, content, editDate });
    this.closeEditNoteForm();
  };

  deleteNoteHandler = (event) => {
    if (event.target.classList.contains('delete-note')) {
      const noteId = event.target.parentElement.id;
      this.onDeleteNote(noteId);
    }
  };

  attachEditNoteHandler() {
    this.element.addEventListener('click', this.editNoteHandler);
  }

  attachSaveEditedNoteHandler() {
    this.element
      .querySelector('#edit-note-form')
      .addEventListener('submit', this.saveEditedNoteHandler);
  }

  attachCancelEditedNoteHandler() {
    this.element
      .querySelector('#close-edit-note-form')
      .addEventListener('click', this.closeEditNoteForm);
  }

  attachDeleteNoteHandler() {
    this.element.addEventListener('click', this.deleteNoteHandler);
  }

  removeEditNoteHandler() {
    this.element.removeEventListener('click', this.editNoteHandler);
  }

  removeDeleteNoteHandler() {
    this.element.removeEventListener('click', this.deleteNoteHandler);
  }

  removeSaveEditedNoteHandler() {
    this.element
      .querySelector('#edit-note-form')
      .removeEventListener('submit', this.saveEditedNoteHandler);
  }

  removeCancelEditedNoteHandler() {
    this.element
      .querySelector('#close-edit-note-form')
      .removeEventListener('click', this.closeEditNoteForm);
  }
}
