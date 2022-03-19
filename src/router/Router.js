import { AccessMode } from '../config';

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

  getRoutes() {
    return this.routes;
  }

  getUnauthRoutes() {
    return this.routes.filter((route) => route.access !== AccessMode.AUTH);
  }

  setChangeActiveLinkHandler(handler) {
    this.changeActiveLink = handler;
  }

  checkAccess(path) {
    const isRouteProtected =
      this.getRoutes().find((route) => route.path == path).access ===
      AccessMode.AUTH;

    if (isRouteProtected && this.authService.getToken()) {
      return true;
    } else if (!isRouteProtected) {
      return true;
    } else {
      return false;
    }
  }

  navigateTo = (url, pushState = true) => {
    let routePath = url.replace(/^.*\//, '/');

    if (!this.checkAccess(routePath)) {
      history.replaceState(null, null, '/');
      pushState = false;
      routePath = '/';
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
