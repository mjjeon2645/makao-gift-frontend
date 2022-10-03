import { apiService } from '../services/ApiService';

export default class UserStore {
  constructor() {
    this.listeners = new Set();

    this.name = '';
    this.userId = '';
    this.amount = 0;
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);
  }

  publish() {
    this.listeners.forEach((listener) => listener());
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

  async signUp({
    name, userId, password, checkPassword,
  }) {
    try {
      const data = await apiService.requestSignUp({
        name, userId, password, checkPassword,
      });

      this.name = data.name;
      this.userId = data.userId;
      this.amount = data.amount;

      return { data };
    } catch (e) {
      return '';
    }
  }
}

export const userStore = new UserStore();
