export default class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(endPoint) {
    try {
      const response = await fetch(`${this.baseUrl}/${endPoint}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async post(endPoint, body) {
    try {
      const response = await fetch(`${this.baseUrl}/${endPoint}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async put(endPoint, body) {
    try {
      const response = await fetch(`${this.baseUrl}/${endPoint}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(endPoint) {
    try {
      const response = await fetch(`${this.baseUrl}/${endPoint}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
