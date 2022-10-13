import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { productStore } from '../stores/ProductStore';
import defaultTheme from '../styles/defaultTheme';
import OrderForm from './OrderForm';

const context = describe;

describe('OrderForm', () => {
  const onSubmit = jest.fn();
  const register = jest.fn();
  const handleSubmit = jest.fn();
  const errors = jest.fn();

  function renderOrderForm() {
    render((
      <ThemeProvider theme={defaultTheme}>
        <OrderForm
          onSubmit={onSubmit}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          productStore={productStore}
        />
      </ThemeProvider>
    ));
  }

  context('order with correct information', () => {
    it('order success!', async () => {
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

      expect(handleSubmit).toBeCalled();
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

      expect(errors).toBeTruthy();
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

    expect(errors).toBeTruthy();
  });
});
