import OrderStore from './OrderStore';

const context = describe;

describe('OrderStore => Order', () => {
  let orderStore;

  beforeEach(() => {
    orderStore = new OrderStore();
  });

  context('Order with correct Information', () => {
    it('order success!', async () => {
      await orderStore.order(
        {
          receiver: '이서진',
          address: '서울시',
          message: '생일축하해~',
          productId: 1,
          volume: 1,
          totalPrice: 10_000,
        },
      );

      expect(orderStore.amount).toBeTruthy();
    });
  });

  context('Order with incorrect Information', () => {
    it('order fail with wrong receiver', async () => {
      await orderStore.order(
        {
          receiver: 'xxx',
          address: '서울시',
          message: '생일축하해~',
          productId: 1,
          volume: 1,
          totalPrice: 10_000,
        },
      );

      expect(orderStore.amount).toBeFalsy();
    });

    it('order fail with low amount', async () => {
      await orderStore.order(
        {
          receiver: '이서진',
          address: '서울시',
          message: '생일축하해~',
          productId: 2,
          volume: 1,
          totalPrice: 60_000,
        },
      );

      expect(orderStore.amount).toBeFalsy();
    });
  });
});
