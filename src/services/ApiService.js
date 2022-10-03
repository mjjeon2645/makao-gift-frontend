/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
  async postSession({ userId, password }) {
    const url = `${baseUrl}/session`;
    const { data } = await axios.post(url, { userId, password });

    // TODO. 서버 데리고 왔을 때 뽀개서 줘야하는지 확인해보기
    return data;
  }

  async requestSignUp({
    name, userId, password, checkPassword,
  }) {
    const url = `${baseUrl}/users`;
    const { data } = await axios.post(url, {
      name, userId, password, checkPassword,
    });

    // TODO. 서버 데리고 왔을 때 뽀개서 줘야하는지 확인해보기
    return data;
  }
}

export const apiService = new ApiService();
