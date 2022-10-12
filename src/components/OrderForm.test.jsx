import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../styles/defaultTheme';
import OrderForm from './OrderForm';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

const context = describe;

describe('OrderForm', () => {
  function renderOrderForm() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <OrderForm />
      </ThemeProvider>
    ));
  }

  context('order with correct information', () => {
    it('order success!', () => {
      renderOrderForm();
      fireEvent.change(screen.getByLabelText('받는 분 성함*'), {
        target: { value: '이서진' },
      });

      fireEvent.change(screen.getByLabelText('받는 분 주소*'), {
        target: { value: '서울시 양천구' },
      });

      fireEvent.change(screen.getByLabelText('받는 분께 보내는 메세지'), {
        target: { value: '서진아 생일 축하해~' },
      });

      fireEvent.click(screen.getByText('선물하기'));

      waitFor(() => {
        expect(navigate).toBeCalledWith('/orders');
      });
    });
  });

  context('order with incorrect information', () => {
    it('order failed with wrong receiver', () => {
      renderOrderForm();
      fireEvent.change(screen.getByLabelText('받는 분 성함*'), {
        target: { value: 'xxx' },
      });

      fireEvent.change(screen.getByLabelText('받는 분 주소*'), {
        target: { value: '서울시 양천구' },
      });

      fireEvent.change(screen.getByLabelText('받는 분께 보내는 메세지'), {
        target: { value: '서진아 생일 축하해~' },
      });

      fireEvent.click(screen.getByText('선물하기'));

      waitFor(() => {
        screen.getByText('성함을 다시 확인해주세요');
      });
    });

    it('order failed with empty receiver and address', () => {
      renderOrderForm();
      fireEvent.change(screen.getByLabelText('받는 분 성함*'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('받는 분 주소*'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('받는 분께 보내는 메세지'), {
        target: { value: '서진아 생일 축하해~' },
      });

      fireEvent.click(screen.getByText('선물하기'));

      waitFor(() => {
        screen.getByText('성함을 입력해주세요');
        screen.getByText('주소를 입력해주세요');
      });
    });
  });
});
