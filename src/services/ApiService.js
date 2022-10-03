/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async postSession({ userId, password }) {
    const url = `${baseUrl}/session`;
    const { data } = await axios.post(url, { userId, password });

    return data;
  }

  async requestSignUp({
    name, userId, password, checkPassword,
  }) {
    const url = `${baseUrl}/users`;
    const { data } = await axios.post(url, {
      name, userId, password, checkPassword,
    });

    return data;
  }
}

export const apiService = new ApiService();
