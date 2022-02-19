export default class AuthService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
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

  async signup(name, email, password) {
    try {
      const response = await fetch(`${this.baseUrl}/signup`, {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      this.setToken(data.token);
    } catch (error) {
      console.log(error);
    }
  }

  async signin(email, password) {
    try {
      const response = await fetch(`${this.baseUrl}/signin`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      this.setToken(data.token);
    } catch (error) {
      console.log(error);
    }
  }

  signout() {}
}
