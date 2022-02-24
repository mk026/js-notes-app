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

  async changeName(newName) {
    try {
      const token = `Bearer ${this.authService.getToken()}`;
      const response = await fetch(`${this.baseUrl}/user`, {
        method: 'PUT',
        body: JSON.stringify({ name: newName }),
        headers: { Authorization: token },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  changeEmail() {}

  changePassword() {}

  signout() {
    this.authService.signout();
  }
}
