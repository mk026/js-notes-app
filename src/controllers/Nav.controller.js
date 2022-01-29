export default class NavController {
  constructor(appRoot, view, router) {
    this.appRoot = appRoot;
    this.view = view;
    this.router = router;
  }

  init() {
    this.router.navigateTo(location.href, false);

    this.appRoot.insertAdjacentElement('afterbegin', this.view.getElement());
    this.view.renderRoutes(this.router.getRoutes());
    this.view.setLinkClickHandler(this.linkClickHandler);
  }

  destroy() {
    this.view.removeElement();
  }

  linkClickHandler = (event) => {
    if (event.target.nodeName == 'A') {
      event.preventDefault();

      this.router.navigateTo(event.target.href);
    }
  };
}
