import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import SignUpForm from './SignUpForm';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

const context = describe;

describe('SignUpForm', () => {
  render(<SignUpForm />);

  context('회원가입 시도', () => {
    it('회원가입 성공', () => {
      screen.getByText('SIGN UP');

      fireEvent.change(screen.getByLabelText('이름 :'), {
        target: { value: '전민지' },
      });

      fireEvent.change(screen.getByLabelText('아이디 :'), {
        target: { value: 'mjjeon26457' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 :'), {
        target: { value: '123!@#qweQWE' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인 :'), {
        target: { value: '123!@#qweQWE' },
      });

      fireEvent.click(screen.getByRole('button', { name: '회원가입' }));
      // fireEvent.click(screen.getByText('회원가입'));

      waitFor(() => {
        expect(navigate).toBeCalledWith('/welcome');
      });
    });
  });
});
