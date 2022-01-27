export default class NavController {
  constructor(appRoot, view, routes) {
    this.appRoot = appRoot;
    this.view = view;
    this.routes = routes;
  }

  init() {
    this.appRoot.insertAdjacentElement('afterbegin', this.view.getElement());
    this.view.renderRoutes(this.routes);
  }

  destroy() {
    this.view.removeElement();
  }
}
