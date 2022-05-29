import { ApiEndpoints } from '../config';
import ApiService from './Api.service';

export default class AuthService extends ApiService {
  constructor(baseUrl) {
    super(baseUrl);
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

  removeStoredToken() {
    localStorage.removeItem('token');
  }

  setOnAuthStatusChange(handler) {
    this.onAuthStatusChange = handler;
  }

  setUserModel(userModel) {
    this.userModel = userModel;
  }

  async checkAuth() {
    const token = this.getStoredToken();
    if (token) {
      const data = await this.get(ApiEndpoints.CHECK, token);
      if (data.token) {
        this.setToken(data.token);
        this.userModel.setUser(data.user);
      } else {
        this.removeStoredToken();
      }
    }
  }

  async signup(name, email, password) {
    const data = await this.post(ApiEndpoints.SIGNUP, {
      name,
      email,
      password,
    });
    this.setToken(data.token);
    this.userModel.setUser(data.user);
    this.onAuthStatusChange();
  }

  async signin(email, password) {
    const data = await this.post(ApiEndpoints.SIGNIN, { email, password });
    this.setToken(data.token);
    this.userModel.setUser(data.user);
    this.onAuthStatusChange();
  }

  signout() {
    this.token = null;
    localStorage.removeItem('token');
    this.userModel.removeUser();
    this.onAuthStatusChange();
  }
}
