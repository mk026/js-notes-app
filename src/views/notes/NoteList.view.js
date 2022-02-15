import AbstractView from '../Abstract.view';

export default class NoteListView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
  }

  getTemplate() {
    return `
      <ul class="notes__list"></ul>
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

  mount(container, notes) {
    const notesList = notes.map(this.getNoteTemplate).join('');
    this.element.innerHTML = notesList;

    container.appendChild(this.element, 'afterbegin');

    this.attachDeleteNoteHandler();
  }

  unmount() {
    this.removeDeleteNoteHandler();

    this.element.remove();
  }

  deleteNoteHandler = (event) => {
    if (event.target.classList.contains('delete-note')) {
      const noteId = event.target.parentElement.id;
      this.onDeleteNote(noteId);
    }
  };

  attachDeleteNoteHandler() {
    this.element.addEventListener('click', this.deleteNoteHandler);
  }

  removeDeleteNoteHandler() {
    this.element.removeEventListener('click', this.deleteNoteHandler);
  }
}
