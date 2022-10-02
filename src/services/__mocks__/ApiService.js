// 모킹용
/* eslint-disable class-methods-use-this */

export default class ApiService {
  async postSession({ userId, password }) {
    if (userId === 'mjjeon2645' && password === '123!@#qweQWE') {
      return {
        accessToken: 'ACCESS.TOKEN',
        name: '전민지',
        amount: 50_000,
      };
    }
    throw new Error('Login failed');
  }
}

export const apiService = new ApiService();
