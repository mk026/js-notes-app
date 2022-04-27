import AbstractView from '../Abstract.view';
import AddNoteView from './AddNote.view';
import NoteListView from './NoteList.view';
import EditNoteView from './EditNote.view';
import classes from '../../styles/Notes.module.css';

export default class NotesView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
    this.addNoteView = new AddNoteView();
    this.noteListView = new NoteListView();
    this.editNoteView = new EditNoteView();
  }

  get formContainer() {
    return this.element.querySelector(`.${classes.notes__form}`);
  }

  get listContainer() {
    return this.element.querySelector(`.${classes.notes__list}`);
  }

  getTemplate() {
    return `
      <div class="${classes.notes}">
        <h2 class="${classes.notes__title}">Notes</h2>
        <div class="${classes.notes__controls}">
          <button id="show-add-note">Add new note</button>
        </div>
        <div class="${classes.notes__form}"></div>
        <div class="${classes.notes__list}"></div>
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

  showAddNoteError(msg) {
    this.addNoteView.showError(msg);
  }

  showEditNoteError(msg) {
    this.editNoteView.showError(msg);
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
    this.addNoteView.setOnAddNote(handler);
  }

  setOnEditNote(handler) {
    this.onEditNote = handler;
  }

  setOnSaveEditedNote(handler) {
    this.editNoteView.setOnSaveEditedNote(handler);
  }

  setOnDeleteNote(handler) {
    this.noteListView.setOnDeleteNote(handler);
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
