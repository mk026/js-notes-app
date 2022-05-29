export default class UserModel {
  constructor(userService) {
    this.user = null;
    this.userService = userService;
  }

  setOnUserDataChanged(handler) {
    this.onUserDataChanged = handler;
  }

  update(user) {
    this.onUserDataChanged(user);
  }

  getUser() {
    return this.user;
  }

  setUser(user) {
    this.user = user;
  }

  removeUser() {
    this.user = null;
  }

  async changeName(newName) {
    this.user = await this.userService.changeName(newName);
    this.update(this.user);
  }

  async changeEmail(newEmail) {
    this.user = await this.userService.changeEmail(newEmail);
    this.update(this.user);
  }

  async changePassword(oldPassword, newPassword) {
    this.user = await this.userService.changePassword(oldPassword, newPassword);
    this.update(this.user);
  }
}
