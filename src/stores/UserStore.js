import { apiService } from '../services/ApiService';

export default class UserStore {
  constructor() {
    this.listeners = new Set();

    this.name = '';
    this.userId = '';
    this.amount = 0;

    this.signUpState = '';
    this.loginState = '';

    this.errorMessage = '';
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

  clearState() {
    this.name = '';
    this.userId = '';
    this.amount = 0;
    this.signUpState = '';
    this.loginState = '';
    this.errorMessage = '';
  }

  // 이런게 필요한건가?????
  setAmount(amount) {
    this.amount = amount;
    this.publish();
  }

  async login({ userId, password }) {
    try {
      const {
        accessToken, name, amount,
      } = await apiService.postSession({ userId, password });

      // TODO. 추후 signup에서 쓰는 userId와 충돌이 생기지 않는지 확인해야 함
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
