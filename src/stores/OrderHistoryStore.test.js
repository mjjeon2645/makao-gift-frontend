import { waitFor } from '@testing-library/react';
import { apiService } from '../services/ApiService';
import OrderHistoryStore from './OrderHistoryStore';

const context = describe;

describe('OrderHistory => fetchOrderHistories', () => {
  let orderHistoryStore;

  beforeEach(() => {
    orderHistoryStore = new OrderHistoryStore();
  });

  describe('주문내역을 확인하고자 함', () => {
    context('주문 내역이 있을 때', () => {
      it('orderHistories 2건, historiesTotalPaneNumbers 1페이지', () => {
        apiService.setAccessToken('ACCESS.TOKEN');

        expect(orderHistoryStore.orderHistories).toBeTruthy();
        expect(orderHistoryStore.historiesTotalPageNumbers).toBeTruthy();
      });
    });

    context('주문 내역이 없을 때', () => {
      it('orderHistories, historiesTotalPageNumbers 모두 빈 배열', () => {
        apiService.setAccessToken('ACCESS.TOKEN2');

        expect(orderHistoryStore.orderHistories).toStrictEqual([]);
        expect(orderHistoryStore.historiesTotalPageNumbers).toStrictEqual([]);
      });
    });
  });
});

describe('OrderHistory => changePage', () => {
  let orderHistoryStore;

  beforeEach(() => {
    orderHistoryStore = new OrderHistoryStore();
  });

  describe('페이지를 변경하고자 함', () => {
    context('총 2페이지의 주문내역에서 2페이지를 클릭하면', () => {
      it('orderHistories 2건이 출력', () => {
        apiService.setAccessToken('ACCESS.TOKEN');
        orderHistoryStore.changeHistoriesPageNumber(2);

        waitFor(() => {
          expect(orderHistoryStore.orderHistories).toStrictEqual([
            {
              address: '서울시 양천구',
              id: 0,
              imgSource: 'https://user-images.githubusercontent.com/104840243/194969244-b2b64351-0a5e-429d-882b-e27a99ca2b73.png',
              manufacturer: '애플',
              message: '상균아 잘 써!',
              orderedDate: '2022-10-13',
              productName: '새로나온 아이폰 14',
              receiver: '이상균',
              totalPrice: 55000,
              volume: 1,
            },
            {
              address: '서울시 양천구',
              id: 1,
              imgSource: 'https://user-images.githubusercontent.com/104840243/194968445-034616c3-7ec9-46ec-8601-87ffb2239d4d.png',
              manufacturer: 'GIVENCHY',
              message: '서진아 생일축하해~',
              orderedDate: '2022-10-12',
              productName: '누구나 좋아하는 지방시 선물세트',
              receiver: '이서진',
              totalPrice: 10000,
              volume: 1,
            },
          ]);
          expect(orderHistoryStore.historiesTotalPageNumbers).toBeTruthy();
        });
      });
    });
  });
});

describe('OrderHistory => fetchOrderHistory with id 0', () => {
  let orderHistoryStore;

  beforeEach(() => {
    orderHistoryStore = new OrderHistoryStore();
  });

  describe('id = 0인 주문내역을 클릭하고자 함', () => {
    context('id=0인 주문내역을 클릭', () => {
      it('새로나온 아이폰 14, 이상균 님에게 보낸 주문내역을 볼 수 있음', () => {
        apiService.setAccessToken('ACCESS.TOKEN');

        waitFor(() => {
          expect(orderHistoryStore.fetchOrderHistory(0)).toStrictEqual(
            {
              address: '서울시 양천구',
              id: 0,
              imgSource: 'https://user-images.githubusercontent.com/104840243/194969244-b2b64351-0a5e-429d-882b-e27a99ca2b73.png',
              manufacturer: '애플',
              message: '상균아 잘 써!',
              orderedDate: '2022-10-13',
              productName: '새로나온 아이폰 14',
              receiver: '이상균',
              totalPrice: 55000,
              volume: 1,
            },
          );
        });
      });
    });
  });
});
