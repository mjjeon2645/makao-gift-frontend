import { fireEvent, render, screen } from '@testing-library/react';

import { ThemeProvider } from 'styled-components';

import defaultTheme from '../styles/defaultTheme';
import LoginForm from './LoginForm';

test('LoginForm', () => {
  const onSubmit = jest.fn();
  const register = jest.fn();
  const handleSubmit = jest.fn();
  const handleSignupClick = jest.fn();
  const errors = jest.fn();

  render(
    <ThemeProvider theme={defaultTheme}>
      <LoginForm
        onSubmit={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        signupClick={handleSignupClick}
      />
    </ThemeProvider>,
  );

  screen.getByText('USER LOGIN');

  fireEvent.change(screen.getByPlaceholderText('아이디'), {
    target: { value: 'mjjeon2645' },
  });

  fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
    target: { value: '123qweQWE$' },
  });

  fireEvent.click(screen.getByText('로그인하기'));

  expect(handleSubmit).toBeCalled();
});
