export default class AbstractView {
  createElement(template) {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement.firstElementChild;
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

  showLoading(container) {
    this.loading = document.createElement('div');
    this.loading.innerText = 'Loading...';
    container.insertAdjacentElement('afterbegin', this.loading);
  }

  hideLoading() {
    this.loading.remove();
  }
}
