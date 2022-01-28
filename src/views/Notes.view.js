export default class NotesView {
  constructor() {
    this.element = this.getElement();
  }

  createElement(template) {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement.firstElementChild;
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

  getElement() {
    if (this.element) {
      return this.element;
    }
    this.element = this.createElement(this.getTemplate());
    return this.element;
  }

  removeElement() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
