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

  getNoteTemplate(note) {
    return `
      <li class="notes__list__el" id="${note.id}">
        <h3>${note.title}</h3>
        <p>${note.content}</p>
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

  setAddNoteHandler(handler) {
    this.addNoteHandler = handler;
  }

  setDeleteNoteHandler(handler) {
    this.deleteNoteHandler = handler;
  }

  attachAddNoteHandler() {
    this.element
      .querySelector('#add-note')
      .addEventListener('submit', (event) => {
        event.preventDefault();

        const title = this.element.querySelector('#new-note-title').value;
        const content = this.element.querySelector('#new-note-content').value;
        const date = new Date().toLocaleDateString();

        this.addNoteHandler({ title, content, date });
      });
  }

  attachDeleteNoteHandler() {
    this.element.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-note')) {
        const noteId = event.target.parentElement.id;
        this.deleteNoteHandler(noteId);
      }
    });
  }
}
