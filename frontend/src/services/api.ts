import axios, { AxiosInstance } from 'axios';

import { ApiConfig, DEFAULT_API_CONFIG } from './api-config';
import { AuthApi } from './auth';
import { RecipesApi } from './recipes';

export class Api {
  axios!: AxiosInstance;

  token: string | null;

  config: ApiConfig;

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
    this.token = null;
  }

  setup() {
    this.axios = axios.create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: 'application/json',
      },
    });
  }

  setToken(token: string) {
    if (token) {
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      this.token = token;
    }
  }

  removeToken() {
    delete this.axios.defaults.headers.common['Authorization'];
    this.token = null;
  }
}

const baseApi = new Api();
baseApi.setup();
const api = {
  base: baseApi,
  auth: new AuthApi(baseApi),
  recipes: new RecipesApi(baseApi),
};

export default api;
