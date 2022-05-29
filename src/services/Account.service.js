import { ApiEndpoints } from '../config';
import ApiService from './Api.service';

export default class AccountService extends ApiService {
  constructor(baseUrl, authService) {
    super(baseUrl);
    this.authService = authService;
  }

  async changeName(newName) {
    const token = this.authService.getToken();
    const data = await this.put(ApiEndpoints.USERS, { name: newName }, token);
    return data;
  }

  async changeEmail(newEmail) {
    const token = this.authService.getToken();
    const data = await this.put(ApiEndpoints.USERS, { email: newEmail }, token);
    return data;
  }

  async changePassword(oldPassword, newPassword) {
    const token = this.authService.getToken();
    const data = await this.put(
      ApiEndpoints.USERS,
      { oldPassword, newPassword },
      token
    );
    return data;
  }
}
