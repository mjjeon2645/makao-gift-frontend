import { render, screen } from '@testing-library/react';
import ProductsList from './ProductsList';

test('ProductsList', () => {
  render(<ProductsList />);

  // TODO. 상품이 있을 때와 없을 때의 경우로 나누어 테스트 진행 가능해야 함

  screen.getByText('상품이 존재하지 않습니다');

  screen.getByText('인기선물을 한 자리에 모았어요');
});
