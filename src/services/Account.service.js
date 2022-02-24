export default class AccountService {
  constructor(baseUrl, authService) {
    this.baseUrl = baseUrl;
    this.authService = authService;
  }

  async getAccountInfo() {
    try {
      const token = `Bearer ${this.authService.getToken()}`;
      const resposne = await fetch(`${this.baseUrl}/user`, {
        headers: { Authorization: token },
      });
      const data = await resposne.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  changeName() {}

  changeEmail() {}

  changePassword() {}

  signout() {
    this.authService.signout();
  }
}
