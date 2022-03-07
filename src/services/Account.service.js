import ApiService from './Api.service';

export default class AccountService extends ApiService {
  constructor(baseUrl, authService) {
    super(baseUrl);
    this.authService = authService;
  }

  async getAccountInfo() {
    const token = `Bearer ${this.authService.getToken()}`;
    const data = await this.get('user', token);
    return data;
  }

  async changeName(newName) {
    const token = `Bearer ${this.authService.getToken()}`;
    const data = await this.put('user', { name: newName }, token);
    return data;
  }

  async changeEmail(newEmail) {
    const token = `Bearer ${this.authService.getToken()}`;
    const data = await this.put('user', { email: newEmail }, token);
    return data;
  }

  async changePassword(oldPassword, newPassword) {
    const token = `Bearer ${this.authService.getToken()}`;
    const data = await this.put(
      'password_update',
      { oldPassword, newPassword },
      token
    );
    return data;
  }

  signout() {
    this.authService.signout();
  }
}
