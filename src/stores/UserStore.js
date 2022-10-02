import { apiService } from '../services/ApiService';

export default class UserStore {
  constructor() {
    this.name = '';
    this.userId = '';
    this.amount = 0;
    this.orderHistory = [];
  }

  async login({ userId, password }) {
    try {
      const {
        accessToken, name, amount, orderHistory,
      } = await apiService.postSession({ userId, password });

      this.name = name;
      this.amount = amount;
      this.orderHistory = orderHistory;

      // TODO. return을 안해주면 어떻게되나..?
      return accessToken;
    } catch (e) {
      return '';
    }
  }
}
