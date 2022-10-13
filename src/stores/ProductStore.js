import { apiService } from '../services/ApiService';
import Store from './Store';

export default class ProductStore extends Store {
  constructor() {
    super();

    this.products = [];
    this.product = {};

    this.productsTotalPageNumbers = [];

    this.volume = 1;
    this.totalPrice = 0;
  }

  clearProductState() {
    this.volume = 1;
    this.totalPrice = 0;
  }

  async fetchProducts() {
    // 이 작업이 왜 필요한거지?
    // this.products = [];
    // this.publish();

    this.clearProductState();

    const { products, totalPageNumbers } = await apiService.fetchProducts();
    this.products = products;
    this.productsTotalPageNumbers = [...Array(totalPageNumbers)].map((_, index) => index + 1);

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
}

export const productStore = new ProductStore();
