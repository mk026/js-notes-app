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
        headers: { 'Content-Type': 'application/json', Authorization: token },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async changeEmail(newEmail) {
    try {
      const token = `Bearer ${this.authService.getToken()}`;
      const response = await fetch(`${this.baseUrl}/user`, {
        method: 'PUT',
        body: JSON.stringify({ email: newEmail }),
        headers: { 'Content-Type': 'application/json', Authorization: token },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  changePassword() {}

  signout() {
    this.authService.signout();
  }
}
