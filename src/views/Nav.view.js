class NavView {
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
      <nav>
        <ul>
          <li><a>link 01</a></li>
          <li><a>link 02</a></li>
          <li><a>link 03</a></li>
        </ul>
      </nav>
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

export default NavView;
