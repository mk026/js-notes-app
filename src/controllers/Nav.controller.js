export default class NavController {
  constructor(appRoot, view) {
    this.appRoot = appRoot;
    this.view = view;
  }

  init() {
    this.appRoot.insertAdjacentElement('afterbegin', this.view.getElement());
  }

  destroy() {
    this.view.removeElement();
  }
}
