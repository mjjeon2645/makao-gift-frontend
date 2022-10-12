import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import { ThemeProvider } from 'styled-components';

import defaultTheme from '../styles/defaultTheme';
import SignUpForm from './SignUpForm';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

let isUserIdDuplicated;
let errorMessage;

jest.mock('../hooks/useUserStore', () => () => ({
  signUp() {
    return {};
  },
  isUserIdDuplicated,
  errorMessage,
}));

const context = describe;

describe('SignUpForm', () => {
  function renderSignUpForm() {
    render(
      <ThemeProvider theme={defaultTheme}>
        <SignUpForm />
      </ThemeProvider>,
    );
  }

  context('유효한 정보로 회원가입 시도', () => {
    it('회원가입 성공', async () => {
      renderSignUpForm();

      screen.getByText('SIGN UP');

      fireEvent.change(screen.getByLabelText('이름 :'), {
        target: { value: '전민지' },
      });

      fireEvent.change(screen.getByLabelText('아이디 :'), {
        target: { value: 'mjjeon2645' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 :'), {
        target: { value: '123qweQWE$' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인 :'), {
        target: { value: '123qweQWE$' },
      });

      fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

      await waitFor(() => {
        expect(navigate).toBeCalledWith('/welcome');
      });
    });
  });

  context('불완전한 정보로 회원가입 시도', () => {
    it('유효하지 않은 이름을 입력하여 회원가입 실패', async () => {
      renderSignUpForm();

      screen.getByText('SIGN UP');

      fireEvent.change(screen.getByLabelText('이름 :'), {
        target: { value: 'abc' },
      });

      fireEvent.change(screen.getByLabelText('아이디 :'), {
        target: { value: 'mjjeon2645' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 :'), {
        target: { value: '123qweQWE$' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인 :'), {
        target: { value: '123qweQWE$' },
      });

      fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

      await waitFor(() => {
        screen.getByText('이름을 다시 확인해주세요');
      });
    });

    it('패턴에 맞지 않는 아이디를 입력하여 회원가입 실패', () => {
      renderSignUpForm();

      fireEvent.change(screen.getByLabelText('이름 :'), {
        target: { value: '전민지' },
      });

      fireEvent.change(screen.getByLabelText('아이디 :'), {
        target: { value: 'ABCDEFG' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 :'), {
        target: { value: '123qweQWE$' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인 :'), {
        target: { value: '123qweQWE$' },
      });

      fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

      waitFor(() => {
        screen.getByText('아이디를 다시 확인해주세요');
      });
    });

    it('패턴에 맞지 않는 비밀번호를 입력하여 회원가입 실패', async () => {
      renderSignUpForm();

      fireEvent.change(screen.getByLabelText('이름 :'), {
        target: { value: '전민지' },
      });

      fireEvent.change(screen.getByLabelText('아이디 :'), {
        target: { value: 'mjjeon2645' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 :'), {
        target: { value: '1234567890' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인 :'), {
        target: { value: '123qweQWE$' },
      });

      fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

      await waitFor(() => {
        screen.getByText('비밀번호를 다시 확인해주세요');
      });
    });

    it('비밀번호-비밀번호 확인이 일치하지 않아 회원가입 실패', async () => {
      renderSignUpForm();

      fireEvent.change(screen.getByLabelText('이름 :'), {
        target: { value: '전민지' },
      });

      fireEvent.change(screen.getByLabelText('아이디 :'), {
        target: { value: 'mjjeon2645' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 :'), {
        target: { value: '123qweQWE$' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인 :'), {
        target: { value: '123qweQWE$$$' },
      });

      fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

      await waitFor(() => {
        screen.getByText('비밀번호가 일치하지 않습니다');
      });
    });

    it('모든 정보를 누락한 채 회원가입을 시도하여 실패', () => {
      renderSignUpForm();

      fireEvent.change(screen.getByLabelText('이름 :'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('아이디 :'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 :'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인 :'), {
        target: { value: '' },
      });

      fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

      waitFor(() => {
        screen.getByText('이름을 입력해주세요');
        screen.getByText('아이디를 입력해주세요');
        screen.getAllByText('비밀번호를 입력해주세요');
      });
    });

    beforeEach(() => {
      isUserIdDuplicated = 'duplicated';
      errorMessage = '해당 아이디는 사용할 수 없습니다';
    });

    it('기존에 존재하는 아이디로 회원가입을 시도하여 실패', async () => {
      renderSignUpForm();

      fireEvent.change(screen.getByLabelText('이름 :'), {
        target: { value: '전민지' },
      });

      fireEvent.change(screen.getByLabelText('아이디 :'), {
        target: { value: 'mjjeon2645' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 :'), {
        target: { value: '123qweQWE$' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인 :'), {
        target: { value: '123qweQWE$' },
      });

      fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

      await waitFor(() => {
        screen.getByText('해당 아이디는 사용할 수 없습니다');
      });
    });
  });
});
