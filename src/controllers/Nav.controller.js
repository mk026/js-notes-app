export default class NavController {
  constructor(appRoot, view, router, authService) {
    this.appRoot = appRoot;
    this.view = view;
    this.router = router;
    this.authService = authService;
  }

  init() {
    this.router.setChangeActiveLinkHandler(this.view.setActiveLink);
    const isRouteProtected = this.router
      .getRoutes()
      .find(
        (route) => route.path == location.href.replace(/^.*\//, '/')
      ).authOnly;

    if (isRouteProtected && this.authService.getToken()) {
      this.router.navigateTo(location.href, false);
    } else if (!isRouteProtected) {
      this.router.navigateTo(location.href, false);
    } else {
      this.router.navigateTo('/', false);
    }

    this.authService.setOnAuthStatusChange(this.onAuthStatusChange);

    this.appRoot.insertAdjacentElement('afterbegin', this.view.getElement());
    this.renderNavLinks();

    this.view.setLinkClickHandler(this.linkClickHandler);
    this.view.setActiveLink(location.href);
  }

  renderNavLinks() {
    if (this.authService.getToken()) {
      this.view.renderRoutes(this.router.getRoutes());
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
