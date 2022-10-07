import { apiService } from '../services/ApiService';

export default class GiftshopStore {
  constructor() {
    this.listeners = new Set();

    this.name = '';
    this.userId = '';
    this.amount = 0;

    this.signUpState = '';
    this.loginState = '';

    this.amountState = '';

    this.errorMessage = '';

    this.products = [];
    this.product = {};

    this.totalPageNumbers = [];

    this.volume = 1;
    this.totalPrice = 0;

    this.orderHistories = [];
    this.orderHistory = {};
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

      // TODO. 추후 signup에서 쓰는 userId와 충돌이 생기지 않는지 확인해야 함
      this.userId = userId;
      this.setAmount(amount);
      this.publish();
      // this.amount = amount;

      // TODO. return을 안해주면 어떻게되나..?
      return accessToken;
    } catch (e) {
      const message = e.response.data;
      this.changeLoginState('error', { errorMessage: message });
      return '';
    }
  }

  setAmount(amount) {
    this.amount = amount;
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
      // this.amount = data.amount;
      this.setAmount(data.amount);
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

  async fetchProducts() {
    // 이 작업이 왜 필요한거지?
    // this.products = [];
    // this.publish();

    const { products, totalPageNumbers } = await apiService.fetchProducts();
    console.log(products);
    console.log('위에거 하나는 스토어쪽 펫치프로덕츠');
    this.products = products;
    this.totalPageNumbers = [...Array(totalPageNumbers)].map((number, index) => index + 1);

    this.publish();
  }

  async changePageNumber(number) {
    this.products = await apiService.requestChangePage(number);
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

  changeAmountState(state) {
    this.amountState = state;
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

    const { amount } = await apiService.requestOrder({
      receiver, address, message, productId, volume, totalPrice,
    });
    this.setAmount(amount);
    this.publish();
  }

  async fetchOrderHistories() {
    const data = await apiService.requestOrderHistories();
    this.orderHistories = data.orderHistories;
    this.publish();
  }

  async fetchOrderHistory(id) {
    const data = await apiService.requestOrderHistory(id);
    this.orderHistory = data;
    this.publish();
  }

  get isUserIdDuplicated() {
    return this.signUpState === 'duplicated';
  }

  get isCheckPasswordRight() {
    return this.signUpState === 'error';
  }

  get isLowAmount() {
    return this.amountState === 'low';
  }
}

export const giftshopStore = new GiftshopStore();
