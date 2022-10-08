import { apiService } from '../services/ApiService';

export default class ProductStore {
  constructor() {
    this.listeners = new Set();

    this.products = [];
    this.product = {};

    this.totalPageNumbers = [];

    this.volume = 1;
    this.totalPrice = 0;

    this.orderHistories = [];
    this.orderHistory = {};

    this.amountState = '';

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

  async fetchProducts() {
    // 이 작업이 왜 필요한거지?
    // this.products = [];
    // this.publish();
    this.volume = 1;

    const { products, totalPageNumbers } = await apiService.fetchProducts();
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

    await apiService.requestOrder({
      receiver, address, message, productId, volume, totalPrice,
    });
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

  changeAmountState(state) {
    this.amountState = state;
    this.publish();
  }

  get isLowAmount() {
    return this.amountState === 'low';
  }
}

export const productStore = new ProductStore();
