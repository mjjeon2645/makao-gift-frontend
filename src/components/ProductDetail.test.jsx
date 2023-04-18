import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';

import ProductDetail from './ProductDetail';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
  useLocation: () => ({
    state: { id: 0 },
  }),
}));

const fetchProduct = jest.fn();
const increaseVolume = jest.fn();
const decreaseVolume = jest.fn();

jest.mock('../hooks/useProductStore', () => () => ({
  // fetchProduct: () => fetchProduct,
  fetchProduct,
  product: {
    description: '따뜻한 커피 한잔으로 마음을 전하세요',
    id: 0,
    imgSource: 'https://user-images.githubusercontent.com/104840243/194969483-7cbd463a-7b8a-4a4f-841a-53c833f27472.png',
    manufacturer: '투썸플레이스',
    name: '투썸플레이스 아메리카노',
    price: 4_900,
  },
  increaseVolume,
  decreaseVolume,
  volume: 3,
  totalPrice: 14_700,
}));

const changeBalanceState = jest.fn();

jest.mock('../hooks/useOrderStore', () => () => ({
  changeBalanceState,
}));

let amount;

jest.mock('../hooks/useUserStore', () => () => ({
  amount,
}));

const context = describe;

describe('Product Detatil', () => {
  function renderProductDetail() {
    render(
      <ThemeProvider theme={defaultTheme}>
        <ProductDetail />
      </ThemeProvider>,
    );
  }

  context('로그인 상태에서 잔액 범위 내에서 물품을 주문', () => {
    beforeEach(() => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));
      amount = 50_000;
    });

    it('주문 성공!', () => {
      renderProductDetail();

      screen.getByText('투썸플레이스 아메리카노');
      screen.getAllByText('4,900원');

      screen.getByText('제조사');
      screen.getByText('투썸플레이스');

      screen.getByText('구매수량');

      fireEvent.click(screen.getByText('+'));
      fireEvent.click(screen.getByText('+'));
      fireEvent.click(screen.getByText('+'));

      expect(increaseVolume).toBeCalledTimes(3);

      fireEvent.click(screen.getByText('-'));
      expect(decreaseVolume).toBeCalled();

      screen.getByText('상품설명');
      screen.getByText('따뜻한 커피 한잔으로 마음을 전하세요');

      screen.getByText('총 상품금액:');
      screen.getByText('14,700원');

      fireEvent.click(screen.getByText('선물하기'));
      expect(changeBalanceState).toBeCalledWith('');
      expect(navigate).toBeCalledWith('/order', { state: { id: 0 } });
    });
  });

  context('잔액보다 더 많은 금액의 물품을 주문', () => {
    beforeEach(() => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));
      amount = 10_000;
    });

    it('주문 실패', () => {
      renderProductDetail();

      screen.getByText('투썸플레이스 아메리카노');
      screen.getAllByText('4,900원');

      screen.getByText('구매수량');

      fireEvent.click(screen.getByText('+'));
      fireEvent.click(screen.getByText('+'));

      screen.getByText('총 상품금액:');
      screen.getByText('14,700원');

      fireEvent.click(screen.getByText('선물하기'));
      expect(changeBalanceState).toBeCalledWith('low');
      waitFor(() => {
        screen.getByText('❌잔액이 부족하여 선물하기가 불가합니다❌');
      });
    });
  });

  context('로그인하지 않은 채로 물품을 주문', () => {
    beforeEach(() => {
      localStorage.setItem('accessToken', JSON.stringify(''));
    });

    it('로그인 페이지로 이동', () => {
      renderProductDetail();

      screen.getByText('투썸플레이스 아메리카노');
      screen.getAllByText('4,900원');

      screen.getByText('구매수량');

      fireEvent.click(screen.getByText('+'));
      fireEvent.click(screen.getByText('+'));

      screen.getByText('총 상품금액:');
      screen.getByText('14,700원');

      fireEvent.click(screen.getByText('선물하기'));
      expect(navigate).toBeCalledWith('/login', { state: { id: 0 } });
    });
  });
});
