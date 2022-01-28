export default class NotesController {
  constructor(appRoot, view) {
    this.appRoot = appRoot;
    this.view = view;
  }

  init() {
    this.appRoot.insertAdjacentElement('beforeend', this.view.getElement());
  }

  destroy() {
    this.view.removeElement();
  }
}