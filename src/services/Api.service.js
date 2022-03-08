export default class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getHeaders(token) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  }

  async get(endPoint, token) {
    try {
      const response = await fetch(`${this.baseUrl}/${endPoint}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async post(endPoint, body, token) {
    try {
      const response = await fetch(`${this.baseUrl}/${endPoint}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: this.getHeaders(token),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async put(endPoint, body, token) {
    try {
      const response = await fetch(`${this.baseUrl}/${endPoint}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: this.getHeaders(token),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(endPoint, token) {
    try {
      const response = await fetch(`${this.baseUrl}/${endPoint}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
