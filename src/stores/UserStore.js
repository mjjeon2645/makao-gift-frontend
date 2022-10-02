import { apiService } from '../services/ApiService';

export default class UserStore {
  constructor() {
    this.name = '';
    this.userId = '';
    this.amount = 0;
  }

  async login({ userId, password }) {
    try {
      const {
        accessToken, name, amount,
      } = await apiService.postSession({ userId, password });

      this.name = name;
      this.amount = amount;

      // TODO. return을 안해주면 어떻게되나..?
      return accessToken;
    } catch (e) {
      // console.log(e);
      return '';
    }
  }
}
