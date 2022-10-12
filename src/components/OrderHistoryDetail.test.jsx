import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';

import OrderHistoryDetail from './OrderHistoryDetail';

const navigate = jest.fn();

const fetchOrderHistory = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
  useLocation: () => ({
    state: 0,
  }),
}));

jest.mock('../hooks/useOrderHistoryStore', () => () => ({
  fetchOrderHistory: () => fetchOrderHistory,
  orderHistory: {
    address: '서울시 양천구',
    id: 0,
    imgSource: 'https://user-images.githubusercontent.com/104840243/194968445-034616c3-7ec9-46ec-8601-87ffb2239d4d.png',
    manufacturer: 'GIVENCHY',
    message: '서진아 생일축하해~',
    orderedDate: '2022-10-12',
    productName: '누구나 좋아하는 지방시 선물세트',
    receiver: '이서진',
    totalPrice: 10000,
    volume: 1,
  },
}));

describe('OrderHistoryDetail', () => {
  function renderOrderHistoryDetail() {
    render(
      <ThemeProvider theme={defaultTheme}>
        <OrderHistoryDetail />
      </ThemeProvider>,
    );
  }

  it('상품 세부정보를 볼 수 있음', () => {
    renderOrderHistoryDetail();

    screen.getByText('GIVENCHY');
    screen.getByText('누구나 좋아하는 지방시 선물세트');

    screen.getByText('구매수량');

    screen.getByText('총 상품금액');
    screen.getByText('10,000원');

    screen.getByText('구매일');
    screen.getByText('2022-10-12');

    screen.getByText('받는 분');
    screen.getByText('이서진');

    screen.getByText('받는 분 주소');
    screen.getByText('서울시 양천구');

    screen.getByText('받는 분께 보내는 메세지');
    screen.getByText('서진아 생일축하해~');

    fireEvent.click(screen.getByText('주문 목록 보기'));

    expect(navigate).toBeCalledWith('/orders');
  });
});
