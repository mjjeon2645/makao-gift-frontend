import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import { ThemeProvider } from 'styled-components';

import defaultTheme from '../styles/defaultTheme';
import LoginForm from './LoginForm';

const navigate = jest.fn();

// TODO. useLocation이 왜 익명함수로 반환되어서 저 모양으로 나오는지 이해할 것
// TODO. location.state에 따라 로그인 후 이동하는 페이지에 대한 테스트가 가능한가?
jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
  useLocation: () => ({
    state: 1,
  }),
}));

const context = describe;

describe('LoginForm', () => {
  function loginFormLender() {
    render(
      <ThemeProvider theme={defaultTheme}>
        <LoginForm />
      </ThemeProvider>,
    );
  }

  context('login with correct id and password', () => {
    it('login success', () => {
      loginFormLender();

      screen.getByText('USER LOGIN');

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'mjjeon2645' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: '123qweQWE$' },
      });

      fireEvent.click(screen.getByText('로그인하기'));

      waitFor(() => {
        expect(navigate).toBeCalledWith('/');
      });
    });
  });

  context('login with incorrect id and password', () => {
    it('login failed with wrong id', () => {
      loginFormLender();

      screen.getByText('USER LOGIN');

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'mjjeon26457' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: '123qweQWE$' },
      });

      fireEvent.click(screen.getByText('로그인하기'));

      waitFor(() => {
        screen.getByText('아이디 혹은 비밀번호가 맞지 않습니다');
      });
    });

    it('login failed with wrong password', () => {
      loginFormLender();

      screen.getByText('USER LOGIN');

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'mjjeon2645' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: '123qweQWE$$$' },
      });

      fireEvent.click(screen.getByText('로그인하기'));

      waitFor(() => {
        screen.getByText('아이디 혹은 비밀번호가 맞지 않습니다');
      });
    });

    it('login failed with empty id', () => {
      loginFormLender();

      screen.getByText('USER LOGIN');

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: '123qweQWE$' },
      });

      fireEvent.click(screen.getByText('로그인하기'));

      waitFor(() => {
        screen.getByText('아이디를 입력해주세요');
      });
    });

    it('login failed with empty password', () => {
      loginFormLender();

      screen.getByText('USER LOGIN');

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'mjjeon2645' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: '' },
      });

      fireEvent.click(screen.getByText('로그인하기'));

      waitFor(() => {
        screen.getByText('비밀번호를 입력해주세요');
      });
    });
  });
});
