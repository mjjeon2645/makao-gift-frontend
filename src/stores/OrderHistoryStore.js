import { apiService } from '../services/ApiService';

import Store from './Store';

export default class OrderHistoryStore extends Store {
  constructor() {
    super();

    this.orderHistories = [];
    this.orderHistory = {};

    this.historiesTotalPageNumbers = [];
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
    try {
      this.orderHistories = await apiService.requestHistoriesChangePage(number);
      this.publish();
    } catch (e) {
      //
    }
  }

  async fetchOrderHistory(id) {
    try {
      const data = await apiService.requestOrderHistory(id);
      this.orderHistory = data;
      this.publish();
    } catch (e) {
      //
    }
  }
}

export const orderHistoryStore = new OrderHistoryStore();
