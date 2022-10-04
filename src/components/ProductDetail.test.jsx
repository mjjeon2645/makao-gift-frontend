import { render, screen } from '@testing-library/react';
import ProductDetail from './ProductDetail';

test('Product Detatil', () => {
  render(<ProductDetail />);

  screen.getByText('제조사');

  screen.getByText('구매수량');

  screen.getByText('상품설명');

  screen.getByText('총 상품금액:');

  screen.getByText('선물하기');
});
