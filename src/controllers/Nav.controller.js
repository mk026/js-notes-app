export default class NavController {
  constructor(appRoot, view, router, authService) {
    this.appRoot = appRoot;
    this.view = view;
    this.router = router;
    this.authService = authService;
  }

  init() {
    this.router.setChangeActiveLinkHandler(this.view.setActiveLink);
    this.router.navigateTo(location.href, false);

    this.authService.setOnAuthStatusChange(this.onAuthStatusChange);

    this.appRoot.insertAdjacentElement('afterbegin', this.view.getElement());
    this.view.renderRoutes(this.router.getRoutes());
    this.view.setLinkClickHandler(this.linkClickHandler);
    this.view.setActiveLink(location.href);
  }

  destroy() {
    this.view.removeElement();
  }

  onAuthStatusChange = () => {
    this.router.navigateTo('/');
  };

  linkClickHandler = (event) => {
    if (event.target.nodeName == 'A') {
      event.preventDefault();

      this.router.navigateTo(event.target.href);
      this.view.setActiveLink(event.target.href);
    }
  };
}
