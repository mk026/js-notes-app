import ApiService from './Api.service';

export default class AccountService extends ApiService {
  constructor(baseUrl, authService) {
    super(baseUrl);
    this.authService = authService;
  }

  async getAccountInfo() {
    const token = this.authService.getToken();
    const data = await this.get('users', token);
    return data;
  }

  async changeName(newName) {
    const token = this.authService.getToken();
    const data = await this.put('users', { name: newName }, token);
    return data;
  }

  async changeEmail(newEmail) {
    const token = this.authService.getToken();
    const data = await this.put('users', { email: newEmail }, token);
    return data;
  }

  async changePassword(oldPassword, newPassword) {
    const token = this.authService.getToken();
    const data = await this.put('users', { oldPassword, newPassword }, token);
    return data;
  }

  signout() {
    this.authService.signout();
  }
}
