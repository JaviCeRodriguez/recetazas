import { AxiosResponse } from 'axios';

import { Api } from './api';

export class AuthApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async register(email: string, password: string): Promise<AxiosResponse> {
    try {
      const response = await this.api.axios.post('/auth/register', {
        email,
        password,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async requestVerifyToken(email: string): Promise<AxiosResponse> {
    try {
      const response = await this.api.axios.post('/auth/request-verify-token', {
        email,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async verify(token: string): Promise<AxiosResponse> {
    try {
      const response = await this.api.axios.post('/auth/verify', {
        token,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async login(username: string, password: string): Promise<AxiosResponse> {
    try {
      const body = new FormData();
      body.append('username', username);
      body.append('password', password);
      const response = await this.api.axios({
        method: 'POST',
        url: '/auth/jwt/login',
        data: body,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        this.api.setToken(response.data.access_token);
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<AxiosResponse> {
    try {
      const response = await this.api.axios.post('/auth/jwt/logout');
      return response;
    } catch (error) {
      throw error;
    }
  }
}
