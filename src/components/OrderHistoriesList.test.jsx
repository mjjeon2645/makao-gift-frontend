import { fireEvent, render, screen } from '@testing-library/react';
import OrderHistoriesList from './OrderHistoriesList';

const context = describe;

describe('Order Histories List', () => {
  const handleHistoryClick = jest.fn();
  const handlePageNumberClick = jest.fn();

  let orderHistories;
  let historiesTotalPageNumbers;

  function renderOrderHistoriesList() {
    render(
      <OrderHistoriesList
        handleHistoryClick={handleHistoryClick}
        handlePageNumberClick={handlePageNumberClick}
        orderHistories={orderHistories}
        historiesTotalPageNumbers={historiesTotalPageNumbers}
      />,
    );
  }

  context('주문한 내역이 없을 때', () => {
    beforeEach(() => {
      orderHistories = [];
      historiesTotalPageNumbers = [];
    });

    it('주문 내역을 확인할 수 없음', () => {
      renderOrderHistoriesList();

      screen.getByText('내가 주문한 내역이 없습니다');
    });
  });

  context('주문한 내역이 있을 때', () => {
    beforeEach(() => {
      orderHistories = [
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
      ];
      historiesTotalPageNumbers = [1, 2];
    });

    it('주문 내역 확인 가능함', () => {
      renderOrderHistoriesList();

      screen.getByText('내가 주문한 내역입니다');
      screen.getByText('To. 이서진');
      screen.getByText('새로나온 아이폰 14');
      screen.getByText('1');

      fireEvent.click(screen.getByText('새로나온 아이폰 14'));

      expect(handleHistoryClick).toBeCalled();

      fireEvent.click(screen.getByText('2'));

      expect(handleHistoryClick).toBeCalled();
    });
  });
});
