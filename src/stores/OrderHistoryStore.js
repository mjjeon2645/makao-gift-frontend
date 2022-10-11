import { apiService } from '../services/ApiService';

export default class OrderHistoryStore {
  constructor() {
    this.listeners = new Set();

    this.orderHistories = [];
    this.orderHistory = {};

    this.historiesTotalPageNumbers = [];
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

  clearOrderHistoryState() {
    this.orderHistories = [];
    this.orderHistory = {};
  }

  async fetchOrderHistories() {
    const { orderHistories, totalPageNumbers } = await apiService.requestOrderHistories();
    this.orderHistories = orderHistories;

    this.historiesTotalPageNumbers = [...Array(totalPageNumbers)]
      .map((_, index) => index + 1);

    this.publish();
  }

  async changeHistoriesPageNumber(number) {
    this.orderHistories = await apiService.requestHistoriesChangePage(number);
    this.publish();
  }

  async fetchOrderHistory(id) {
    const data = await apiService.requestOrderHistory(id);
    this.orderHistory = data;
    this.publish();
  }
}

export const orderHistoryStore = new OrderHistoryStore();
