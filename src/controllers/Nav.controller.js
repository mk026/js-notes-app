export default class NavController {
  constructor(appRoot, view, router, authService) {
    this.appRoot = appRoot;
    this.view = view;
    this.router = router;
    this.authService = authService;
  }

  async init() {
    this.authService.setOnAuthStatusChange(this.onAuthStatusChange);
    await this.authService.checkAuth();

    this.router.setChangeActiveLinkHandler(this.view.setActiveLink);
    this.router.navigateTo(location.href, false);

    this.appRoot.insertAdjacentElement('afterbegin', this.view.getElement());
    this.renderNavLinks();

    this.view.setLinkClickHandler(this.linkClickHandler);
    this.view.setActiveLink(location.href);
  }

  renderNavLinks() {
    if (this.authService.getToken()) {
      this.view.renderRoutes(this.router.getAuthRoutes());
    } else {
      this.view.renderRoutes(this.router.getUnauthRoutes());
    }
  }

  destroy() {
    this.view.removeElement();
  }

  onAuthStatusChange = () => {
    this.router.navigateTo('/');
    this.renderNavLinks();
  };

  linkClickHandler = (event) => {
    if (event.target.nodeName == 'A') {
      event.preventDefault();

      this.router.navigateTo(event.target.href);
      this.view.setActiveLink(event.target.href);
    }
  };
}
