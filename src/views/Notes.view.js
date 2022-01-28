class Notes {
  constructor() {
    this.element = this.createElement(this.getTemplate());
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
    return this.element;
  }

  removeElement() {
    this.element.remove();
    this.element = null;
  }
}

export default Notes;
