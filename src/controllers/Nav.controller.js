export default class NavController {
  constructor(appRoot, view, router) {
    this.appRoot = appRoot;
    this.view = view;
    this.router = router;
  }

  init() {
    this.appRoot.insertAdjacentElement('afterbegin', this.view.getElement());
    this.view.renderRoutes(this.router.getRoutes());
  }

  destroy() {
    this.view.removeElement();
  }
}
