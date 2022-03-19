export default class Route {
  constructor(name, path, controller, access) {
    this.name = name;
    this.path = path;
    this.controller = controller;
    this.access = access;
  }
}
