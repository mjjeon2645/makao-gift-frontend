import { apiService } from '../services/ApiService';
import Store from './Store';

export default class OrderStore extends Store {
  constructor() {
    super();

    this.amount = 0;

    this.balanceState = '';
    this.errorMessage = '';
  }

  clearOrderState() {
    this.balanceState = '';
    this.errorMessage = '';
  }

  async order({
    receiver, address, message, productId, volume, totalPrice,
  }) {
    try {
      const { amount } = await apiService.requestOrder({
        receiver, address, message, productId, volume, totalPrice,
      });
      this.amount = amount;

      this.publish();
    } catch (e) {
      //
    }
  }

  changeBalanceState(state) {
    this.balanceState = state;
    this.publish();
  }

  get isLowBalance() {
    return this.balanceState === 'low';
  }
}

export const orderStore = new OrderStore();
