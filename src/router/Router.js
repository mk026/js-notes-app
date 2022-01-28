export default class Router {
  constructor(routes) {
    this.routes = routes;
    this.activeRoute = null;
  }

  getRoutes() {
    return this.routes;
  }

  navigateTo = (url) => {
    if (this.activeRoute) {
      this.activeRoute.controller.destroy();
    }
    this.activeRoute = this.routes.find(
      (route) => route.path == url.replace(/^.*\//, '/')
    );

    this.activeRoute.controller.init();
  };
}
