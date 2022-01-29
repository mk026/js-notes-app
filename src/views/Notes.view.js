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
        <ul class="notes__list">
        </ul>
      </div>
    `;
  }

  renderNotes(notes) {
    const notesListContainer = this.element.querySelector('.notes__list');
    const notesList = notes.map(
      (note) => `
        <li class="notes__list__el" id="${note.id}">
          <h3>${note.title}</h3>
          <p>${note.content}</p>
        </li>
      `
    );
    const newNotesListContainer = document.createElement('ul');
    newNotesListContainer.classList.add('notes__list');
    newNotesListContainer.insertAdjacentHTML('beforeend', notesList.join(''));
    notesListContainer.replaceWith(newNotesListContainer);
  }
}
