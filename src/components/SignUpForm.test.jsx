import { fireEvent, render, screen } from '@testing-library/react';

import { ThemeProvider } from 'styled-components';

import defaultTheme from '../styles/defaultTheme';
import SignUpForm from './SignUpForm';

let isUserIdDuplicated;
let errorMessage;

const context = describe;

describe('SignUpForm', () => {
  const register = jest.fn();
  const watch = jest.fn();
  const handleSubmit = jest.fn();
  const errors = jest.fn();
  const onSubmit = jest.fn();

  function renderSignUpForm() {
    render(
      <ThemeProvider theme={defaultTheme}>
        <SignUpForm
          register={register}
          watch={watch}
          handleSubmit={handleSubmit}
          errors={errors}
          onSubmit={onSubmit}
          isUserIdDuplicated={isUserIdDuplicated}
          errorMessage={errorMessage}
        />
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

      expect(handleSubmit).toBeCalled();
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

      expect(errors).toBeTruthy();
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

      expect(errors).toBeTruthy();
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

      expect(errors).toBeTruthy();
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

      expect(errors).toBeTruthy();
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

      expect(errors).toBeTruthy();
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

      expect(isUserIdDuplicated).toBeTruthy();
      expect(errorMessage).toBeTruthy();
    });
  });
});
