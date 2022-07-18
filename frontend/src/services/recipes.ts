import { AxiosResponse } from 'axios';

import { Api } from './api';

export class RecipesApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async addRecipe(body: any): Promise<AxiosResponse> {
    try {
      const response = await this.api.axios.post('/recipes/', body);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async meRecipes(): Promise<AxiosResponse> {
    try {
      const response = await this.api.axios.get('/recipes/me');
      return response;
    } catch (error) {
      throw error;
    }
  }
}
