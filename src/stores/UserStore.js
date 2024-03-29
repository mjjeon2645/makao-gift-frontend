import { apiService } from '../services/ApiService';
import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.name = '';
    this.userId = '';
    this.amount = 0;

    this.signUpState = '';
    this.loginState = '';

    this.errorMessage = '';
  }

  clearUserState() {
    this.name = '';
    this.userId = '';
    this.amount = 0;
    this.signUpState = '';
    this.loginState = '';
    this.errorMessage = '';
  }

  async login({ userId, password }) {
    try {
      const {
        accessToken, name, amount,
      } = await apiService.postSession({ userId, password });

      this.userId = userId;
      this.name = name;
      this.amount = amount;

      this.publish();

      return accessToken;
    } catch (e) {
      const message = e.response.data;
      this.changeLoginState('error', { errorMessage: message });
      return '';
    }
  }

  async fetchBalance() {
    try {
      const { balance } = await apiService.fetchBalance();

      this.amount = balance;

      this.publish();
    } catch (e) {
      //
    }
  }

  async signUp({
    name, userId, password, checkPassword,
  }) {
    try {
      await apiService.requestSignUp({
        name, userId, password, checkPassword,
      });
      this.publish();
    } catch (e) {
      const message = e.response.data;

      if (message === '해당 아이디는 사용할 수 없습니다') {
        this.changeSignUpState('duplicated', { errorMessage: message });
      }

      if (message === '비밀번호가 일치하지 않습니다') {
        this.changeSignUpState('error', { errorMessage: message });
      }
    }
  }

  changeSignUpState(state, { errorMessage = '' } = {}) {
    this.signUpState = state;
    this.errorMessage = errorMessage;
    this.publish();
  }

  changeLoginState(state, { errorMessage = '' } = {}) {
    this.loginState = state;
    this.errorMessage = errorMessage;
    this.publish();
  }

  get isUserIdDuplicated() {
    return this.signUpState === 'duplicated';
  }

  get isCheckPasswordRight() {
    return this.signUpState === 'error';
  }
}

export const userStore = new UserStore();
