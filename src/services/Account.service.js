export default class AccountService {
  constructor(baseUrl, authService) {
    this.baseUrl = baseUrl;
    this.authService = authService;
  }

  getName() {}

  getEmail() {}

  changeName() {}

  changeEmail() {}

  changePassword() {}

  signout() {
    this.authService.signout();
  }
}
