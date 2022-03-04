import AbstractView from '../Abstract.view';

export default class AddNoteView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
  }

  get errorContainer() {
    return this.element.querySelector('.error-container');
  }

  getTemplate() {
    return `
      <form id="add-note">
        <label for="new-note-title">Title</label>
        <textarea id="new-note-title"></textarea>
        <label for="new-note-content">Content</label>
        <textarea id="new-note-content"/></textarea>
        <button type="submit">Save</button>
        <button id="close-new-note">Cancel</button>
        <div class="error-container"></div>
      </form>
    `;
  }

  mount(container) {
    container.appendChild(this.element, 'afterbegin');

    this.attachAddNoteHandler();
    this.attachCloseAddNoteFormHandler();
  }

  unmount() {
    this.element.remove();
  }

  setOnAddNote(handler) {
    this.onAddNote = handler;
  }

  showError(msg) {
    this.errorContainer.classList.add('show');
    this.errorContainer.innerText = msg;
  }

  hideError() {
    this.errorContainer.classList.remove('show');
    this.errorContainer.innerText = '';
  }

  addNoteHandler = (event) => {
    event.preventDefault();

    const title = this.element.querySelector('#new-note-title').value;
    const content = this.element.querySelector('#new-note-content').value;
    const date = new Date().toLocaleDateString();

    this.onAddNote({ title, content, date });
    this.closeAddNoteForm();
  };

  closeAddNoteForm = () => {
    this.removeAddNoteHandler();
    this.removeCloseAddNoteFormHandler();

    this.unmount();
  };

  attachAddNoteHandler() {
    this.element.addEventListener('submit', this.addNoteHandler);
  }

  attachCloseAddNoteFormHandler() {
    this.element
      .querySelector('#close-new-note')
      .addEventListener('click', this.closeAddNoteForm);
  }

  removeAddNoteHandler() {
    this.element.removeEventListener('submit', this.addNoteHandler);
  }

  removeCloseAddNoteFormHandler() {
    this.element
      .querySelector('#close-new-note')
      .removeEventListener('click', this.closeAddNoteForm);
  }
}
