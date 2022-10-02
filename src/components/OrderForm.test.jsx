import { render, screen } from '@testing-library/react';
import OrderForm from './OrderForm';

test('OrderForm', () => {
  render(<OrderForm />);

  screen.getByLabelText('받는 분 성함');
  screen.getByText('3~7자까지 한글만 사용 가능');

  screen.getByLabelText('받는 분 주소');
  screen.getByText('주소지를 입력해주세요');

  screen.getByLabelText('받는 분께 보내는 메세지');
  screen.getByText('100글자 이내로 입력해주세요');

  screen.getByText('선물하기');
});
