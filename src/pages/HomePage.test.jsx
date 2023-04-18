import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

test('HomePage', () => {
  render(<HomePage />);

  screen.getByText(/무얼 선물할 지 고민이라면/);
  screen.getByText(/마카오 선물하기에서만 볼 수 있는 특별한 아이템/);
});
