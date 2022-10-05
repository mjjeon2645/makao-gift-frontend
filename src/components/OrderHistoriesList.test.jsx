import { render, screen } from '@testing-library/react';
import OrderHistoriesList from './OrderHistoriesList';

test('Order Histories List', () => {
  render(<OrderHistoriesList />);

  // TODO. 내가 주문한 내역이 없을 때와 아닐 떄를 구분해주어야 함

  screen.getByText(/내가 주문한 내역/);

  // screen.getByText('내가 주문한 내역이 없습니다');

  // screen.getByText('내가 주문한 내역입니다');
});
