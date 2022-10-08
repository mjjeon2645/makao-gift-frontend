import { apiService } from '../services/ApiService';
import { userStore } from './UserStore';

export default class ProductStore {
  constructor() {
    this.listeners = new Set();

    this.products = [];
    this.product = {};

    this.productsTotalPageNumbers = [];

    this.volume = 1;
    this.totalPrice = 0;

    this.orderHistories = [];
    this.orderHistory = {};

    this.historiesTotalPageNumbers = [];

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

  clearState() {
    this.volume = 1;
    this.totalPrice = 0;
    this.orderHistories = [];
    this.orderHistory = {};
    this.amountState = '';
    this.errorMessage = '';
  }

  async fetchProducts() {
    // 이 작업이 왜 필요한거지?
    // this.products = [];
    // this.publish();
    this.amountState = '';
    this.volume = 1;

    const { products, totalPageNumbers } = await apiService.fetchProducts();
    this.products = products;
    this.productsTotalPageNumbers = [...Array(totalPageNumbers)].map((_, index) => index + 1);

    this.publish();
  }

  async changeHistoriesPageNumber(number) {
    this.orderHistories = await apiService.requestHistoriesChangePage(number);
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

    userStore.fetchBalance();

    this.publish();
  }

  async fetchOrderHistories() {
    const { orderHistories, totalPageNumbers } = await apiService.requestOrderHistories();
    this.orderHistories = orderHistories;

    this.historiesTotalPageNumbers = [...Array(totalPageNumbers)]
      .map((_, index) => index + 1);

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
