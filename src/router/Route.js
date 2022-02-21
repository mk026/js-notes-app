export default class Route {
  constructor(name, path, controller, authOnly = false) {
    this.name = name;
    this.path = path;
    this.controller = controller;
    this.authOnly = authOnly;
  }
}
