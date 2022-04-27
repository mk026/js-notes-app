import AbstractView from '../Abstract.view';
import classes from '../../styles/Notes.module.css';

export default class NoteListView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
  }

  getTemplate() {
    return `
      <ul class="${classes.notes__list}"></ul>
    `;
  }

  getNoteTemplate(note) {
    return `
      <li class="${classes.note}" id="${note.id}">
        <h3 class="${classes.note__title}">${note.title}</h3>
        <p class="${classes.note__content}">${note.content}</p>
        <button class="${classes.btn} ${classes['btn--edit']}">Edit</button>
        <button class="${classes.btn} ${classes['btn--delete']}">Delete</button>
      </li>
    `;
  }

  mount(container, notes) {
    const notesList = notes.map(this.getNoteTemplate).join('');
    this.element.innerHTML = notesList;

    container.appendChild(this.element, 'afterbegin');

    this.attachEditNoteHandler();
    this.attachDeleteNoteHandler();
  }

  unmount() {
    this.removeEditNoteHandler();
    this.removeDeleteNoteHandler();

    this.element.remove();
  }

  setOnEditNote(handler) {
    this.onEditNote = handler;
  }

  setOnDeleteNote(handler) {
    this.onDeleteNote = handler;
  }

  editNoteHandler = (event) => {
    if (event.target.classList.contains(classes['btn--edit'])) {
      const noteId = event.target.parentElement.id;
      this.onEditNote(noteId);
    }
  };

  deleteNoteHandler = (event) => {
    if (event.target.classList.contains(classes['btn--delete'])) {
      const noteId = event.target.parentElement.id;
      this.onDeleteNote(noteId);
    }
  };

  attachEditNoteHandler() {
    this.element.addEventListener('click', this.editNoteHandler);
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
}
