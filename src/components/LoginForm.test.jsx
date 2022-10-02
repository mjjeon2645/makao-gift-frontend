import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return {};
  },
}));

test('LoginForm', () => {
  render(
    <LoginForm />,
  );

  screen.getByText('USER LOGIN');

  screen.getByText('로그인하기');
});
