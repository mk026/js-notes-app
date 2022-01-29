export default class Router {
  constructor(routes) {
    this.routes = routes;
    this.activeRoute = null;

    window.addEventListener('popstate', () => {
      this.navigateTo(location.href, false);
    });
  }

  getRoutes() {
    return this.routes;
  }

  navigateTo = (url, pushState = true) => {
    if (this.activeRoute) {
      this.activeRoute.controller.destroy();
    }
    this.activeRoute = this.routes.find(
      (route) => route.path == url.replace(/^.*\//, '/')
    );

    if (pushState) {
      history.pushState(null, null, url);
    }

    this.activeRoute.controller.init();
  };
}
