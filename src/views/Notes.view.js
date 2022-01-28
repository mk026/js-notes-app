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
}
