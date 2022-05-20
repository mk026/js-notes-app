import { ApiEndpoints } from '../config';
import ApiService from './Api.service';

export default class AuthService extends ApiService {
  constructor(baseUrl) {
    super(baseUrl);
    this.token = this.getStoredToken();
  }

  getToken() {
    return this.token;
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getStoredToken() {
    return localStorage.getItem('token');
  }

  setOnAuthStatusChange(handler) {
    this.onAuthStatusChange = handler;
  }

  async signup(name, email, password) {
    const data = await this.post(ApiEndpoints.SIGNUP, {
      name,
      email,
      password,
    });
    this.setToken(data.token);
    this.onAuthStatusChange();
  }

  async signin(email, password) {
    const data = await this.post(ApiEndpoints.SIGNIN, { email, password });
    this.setToken(data.token);
    this.onAuthStatusChange();
  }

  signout() {
    this.token = null;
    localStorage.removeItem('token');
    this.onAuthStatusChange();
  }
}
