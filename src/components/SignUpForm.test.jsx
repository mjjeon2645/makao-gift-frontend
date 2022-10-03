import { render, screen } from '@testing-library/react';
import SignUpForm from './SignUpForm';

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return {};
  },
}));

test('SignUpForm', () => {
  render(<SignUpForm />);

  screen.getByText('SIGN UP');

  screen.getByLabelText('이름 :');

  screen.getByLabelText('아이디 :');

  screen.getByLabelText('비밀번호 :');

  screen.getByLabelText('비밀번호 확인 :');

  screen.getByText('회원가입');
});
