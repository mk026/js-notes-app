import AbstractView from './Abstract.view';

export default class EditNoteView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
  }

  getTemplate() {
    return `
      <div>
        <form id="edit-note-form">
          <label for="edit-note-title">Title</label>
          <textarea id="edit-note-title"></textarea>
          <label for="edit-note-content">Content</label>
          <textarea id="edit-note-content"/></textarea>
          <button type="submit">Save</button>
          <button type="button" id="close-edit-note-form">Cancel</button>
        </form>
      </div>
    `;
  }

  mount(container, note) {
    this.setInitialValues(note);
    container.appendChild(this.element, 'afterbegin');

    this.attachSaveEditedNoteHandler();
    this.attachCancelEditedNoteHandler();
  }

  unmount() {
    this.element.remove();
  }

  setInitialValues(note) {
    this.element.querySelector('#edit-note-title').value = note.title;
    this.element.querySelector('#edit-note-content').value = note.content;
  }

  closeEditNoteForm = () => {
    this.removeSaveEditedNoteHandler();
    this.removeCancelEditedNoteHandler();

    this.unmount();
  };

  saveEditedNoteHandler = (event) => {
    event.preventDefault();

    const title = this.element.querySelector('#edit-note-title').value;
    const content = this.element.querySelector('#edit-note-content').value;
    const editDate = new Date().toLocaleDateString();

    this.onSaveEditedNote({ title, content, editDate });
    this.closeEditNoteForm();
  };

  attachSaveEditedNoteHandler() {
    this.element.addEventListener('submit', this.saveEditedNoteHandler);
  }

  attachCancelEditedNoteHandler() {
    this.element
      .querySelector('#close-edit-note-form')
      .addEventListener('click', this.closeEditNoteForm);
  }

  removeSaveEditedNoteHandler() {
    this.element.removeEventListener('submit', this.saveEditedNoteHandler);
  }

  removeCancelEditedNoteHandler() {
    this.element
      .querySelector('#close-edit-note-form')
      .removeEventListener('click', this.closeEditNoteForm);
  }
}
