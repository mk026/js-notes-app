import AbstractView from './Abstract.view';
import AddNoteView from './AddNote.view';
import NoteListView from './NoteList.view';
import EditNoteView from './EditNote.view';

export default class NotesView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
    this.addNoteView = new AddNoteView();
    this.noteListView = new NoteListView();
    this.editNoteView = new EditNoteView();
  }

  get formContainer() {
    return this.element.querySelector('.notes__form-container');
  }

  get listContainer() {
    return this.element.querySelector('.notes__list-container');
  }

  getTemplate() {
    return `
      <div class="notes">
        <h2>Notes</h2>
        <div class="notes__controls">
          <button id="show-add-note">Add new note</button>
        </div>
        <div class="notes__form-container"></div>
        <div class="notes__list-container"></div>
      </div>
    `;
  }

  renderNotes(notes) {
    this.noteListView.mount(this.listContainer, notes);
  }

  showAddNoteForm = () => {
    this.addNoteView.mount(this.formContainer);
  };

  showEditNoteForm(note) {
    this.editNoteView.mount(this.formContainer, note);
  }

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
    this.editNoteView.onSaveEditedNote = handler;
  }

  setOnDeleteNote(handler) {
    this.noteListView.onDeleteNote = handler;
  }

  editNoteHandler = (event) => {
    if (event.target.classList.contains('edit-note')) {
      const noteId = event.target.parentElement.id;
      this.onEditNote(noteId);
    }
  };

  attachEditNoteHandler() {
    this.element.addEventListener('click', this.editNoteHandler);
  }

  removeEditNoteHandler() {
    this.element.removeEventListener('click', this.editNoteHandler);
  }
}
