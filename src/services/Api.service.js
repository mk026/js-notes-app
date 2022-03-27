import { HttpMethod } from '../config';

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
        method: HttpMethod.GET,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async post(endPoint, body, token) {
    try {
      const response = await fetch(`${this.baseUrl}/${endPoint}`, {
        method: HttpMethod.POST,
        body: JSON.stringify(body),
        headers: this.getHeaders(token),
      });
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async put(endPoint, body, token) {
    try {
      const response = await fetch(`${this.baseUrl}/${endPoint}`, {
        method: HttpMethod.PUT,
        body: JSON.stringify(body),
        headers: this.getHeaders(token),
      });
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(endPoint, token) {
    try {
      const response = await fetch(`${this.baseUrl}/${endPoint}`, {
        method: HttpMethod.DELETE,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
