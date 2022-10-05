import { apiService } from '../services/ApiService';

export default class GiftshopStore {
  constructor() {
    this.listeners = new Set();

    this.name = '';
    this.userId = '';
    this.amount = 0;

    this.signUpState = '';
    this.loginState = '';

    this.errorMessage = '';

    this.products = [];
    this.product = {};

    this.volume = 1;
    this.totalPrice = 0;
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
      const message = e.response.data;
      this.changeLoginState('error', { errorMessage: message });
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

  async fetchProducts() {
    // this.products = [];
    // this.publish();

    this.products = await apiService.fetchProducts();
    this.publish();
  }

  async fetchProduct(id) {
    const productInformation = await apiService.fetchProduct(id);
    this.product = productInformation;
    this.totalPrice = productInformation.price;
    this.publish();
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

  increaseVolume() {
    this.volume += 1;
    this.totalPrice = this.volume * this.product.price;
    this.publish();
  }

  decreaseVolume() {
    if (this.volume === 1) {
      return;
    }

    this.volume -= 1;
    this.totalPrice = this.volume * this.product.price;
    this.publish();
  }

  async order({ receiver, address, message }) {
    const productId = this.product.id;
    const { volume } = this;
    const { totalPrice } = this;

    // TODO. 추후 필요할 경우 try-catch.
    const data = await apiService.requestOrder({
      receiver, address, message, productId, volume, totalPrice,
    });
  }

  get isUserIdDuplicated() {
    return this.signUpState === 'duplicated';
  }

  get isCheckPasswordRight() {
    return this.signUpState === 'error';
  }
}

export const giftshopStore = new GiftshopStore();
