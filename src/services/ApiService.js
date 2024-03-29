/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async postSession({ userId, password }) {
    const url = `${baseUrl}/session`;
    const { data } = await axios.post(url, { userId, password });

    return data;
  }

  async fetchBalance() {
    const url = `${baseUrl}/session/me`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async requestSignUp({
    name, userId, password, checkPassword,
  }) {
    const url = `${baseUrl}/users`;
    const { data } = await axios.post(url, {
      name, userId, password, checkPassword,
    });

    return data;
  }

  async fetchProducts() {
    const url = `${baseUrl}/products`;
    const { data } = await axios.get(url);
    const { products, totalPageNumbers } = data;
    return { products, totalPageNumbers };
  }

  async requestChangePage(number) {
    const url = `${baseUrl}/products`;
    const params = { page: number };
    const { data } = await axios.get(url, { params });

    return data.products;
  }

  async fetchProduct(id) {
    const url = `${baseUrl}/products/${id}`;
    const { data } = await axios.get(url);

    return data;
  }

  async requestOrder({
    receiver, address, message, productId, volume, totalPrice,
  }) {
    const url = `${baseUrl}/order`;
    const { data } = await axios.post(url, {
      receiver, address, message, productId, volume, totalPrice,
    }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return data;
  }

  async requestOrderHistories() {
    const url = `${baseUrl}/orders`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }

  async requestHistoriesChangePage(number) {
    const url = `${baseUrl}/orders`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
      params: {
        page: number,
      },
    });
    return data.orderHistories;
  }

  async requestOrderHistory(id) {
    const url = `${baseUrl}/orders/${id}`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return data;
  }
}

export const apiService = new ApiService();
