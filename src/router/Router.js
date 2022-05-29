import { AccessMode, Paths } from '../config';

export default class Router {
  constructor(routes, authService) {
    this.routes = routes;
    this.authService = authService;
    this.activeRoute = null;

    window.addEventListener('popstate', () => {
      this.navigateTo(location.href, false);

      this.changeActiveLink(location.href);
    });
  }

  getAuthRoutes() {
    return this.routes.filter((route) => route.access !== AccessMode.UNAUTH);
  }

  getUnauthRoutes() {
    return this.routes.filter((route) => route.access !== AccessMode.AUTH);
  }

  setChangeActiveLinkHandler(handler) {
    this.changeActiveLink = handler;
  }

  checkAccess(path) {
    const routeAccess = this.routes.find((route) => route.path == path).access;
    const hasToken = this.authService.getToken();

    if (routeAccess === AccessMode.ALL) {
      return true;
    }
    if (routeAccess === AccessMode.AUTH && hasToken) {
      return true;
    }
    if (routeAccess === AccessMode.UNAUTH && !hasToken) {
      return true;
    }
    return false;
  }

  navigateTo = (url, pushState = true) => {
    let routePath = url.replace(/^.*\//, Paths.HOME);

    if (!this.checkAccess(routePath)) {
      history.replaceState(null, null, Paths.HOME);
      pushState = false;
      routePath = Paths.HOME;
    }

    if (this.activeRoute) {
      this.activeRoute.controller.destroy();
    }
    this.activeRoute = this.routes.find((route) => route.path == routePath);

    if (pushState) {
      history.pushState(null, null, url);
    }

    this.activeRoute.controller.init();
  };
}
