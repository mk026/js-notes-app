import AbstractView from './Abstract.view';

export default class NotesView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
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

  getAddNoteFormTemlate() {
    return `
      <form id="add-note">
        <label for="new-note-title">Title</label>
        <textarea id="new-note-title"></textarea>
        <label for="new-note-content">Content</label>
        <textarea id="new-note-content"/></textarea>
        <button type="submit">Save</button>
        <button id="close-new-note">Cancel</button>
      </form>
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

  getNoteTemplate(note) {
    return `
      <li class="notes__list__el" id="${note.id}">
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <button class="edit-note">Edit</button>
        <button class="delete-note">Delete</button>
      </li>
    `;
  }

  renderNotes(notes) {
    const notesListContainer = this.element.querySelector('.notes__list');
    const notesList = notes.map(this.getNoteTemplate);
    notesListContainer.innerHTML = notesList.join('');
  }

  showAddNoteForm = () => {
    this.element.querySelector('.notes__form').innerHTML =
      this.getAddNoteFormTemlate();

    this.attachAddNoteHandler();
    this.attachCloseAddNoteFormHandler();
  };

  closeAddNoteForm = () => {
    this.removeAddNoteHandler();
    this.removeCloseAddNoteFormHandler();

    this.element.querySelector('.notes__form').innerHTML = '';
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

  attachCloseAddNoteFormHandler() {
    this.element
      .querySelector('#close-new-note')
      .addEventListener('click', this.closeAddNoteForm);
  }

  removeShowAddNoteFormHandler() {
    this.element
      .querySelector('#show-add-note')
      .removeEventListener('click', this.showAddNoteForm);
  }

  removeCloseAddNoteFormHandler() {
    this.element
      .querySelector('#close-new-note')
      .removeEventListener('click', this.closeAddNoteForm);
  }

  setOnAddNote(handler) {
    this.onAddNote = handler;
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

  addNoteHandler = (event) => {
    event.preventDefault();

    const title = this.element.querySelector('#new-note-title').value;
    const content = this.element.querySelector('#new-note-content').value;
    const date = new Date().toLocaleDateString();

    this.onAddNote({ title, content, date });
    this.closeAddNoteForm();
  };

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

  attachAddNoteHandler() {
    this.element
      .querySelector('#add-note')
      .addEventListener('submit', this.addNoteHandler);
  }

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

  removeAddNoteHandler() {
    this.element
      .querySelector('#add-note')
      .removeEventListener('submit', this.addNoteHandler);
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
