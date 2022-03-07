export default class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(endPoint, token) {
    const headers = token ? { Authorization: token } : {};
    try {
      const response = await fetch(`${this.baseUrl}/${endPoint}`, { headers });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async post(endPoint, body, token) {
    const headers = token
      ? { 'Content-Type': 'application/json', Authorization: token }
      : { 'Content-Type': 'application/json' };
    try {
      const response = await fetch(`${this.baseUrl}/${endPoint}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async put(endPoint, body, token) {
    const headers = token
      ? { 'Content-Type': 'application/json', Authorization: token }
      : { 'Content-Type': 'application/json' };
    try {
      const response = await fetch(`${this.baseUrl}/${endPoint}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(endPoint, token) {
    const headers = token ? { Authorization: token } : {};
    try {
      const response = await fetch(`${this.baseUrl}/${endPoint}`, {
        method: 'DELETE',
        headers,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
