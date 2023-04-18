import { fireEvent, render, screen } from '@testing-library/react';

import { ThemeProvider } from 'styled-components';

import defaultTheme from '../styles/defaultTheme';
import WelcomePage from './WelcomePage';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

test('WelcomePage', () => {
  render(
    <ThemeProvider theme={defaultTheme}>
      <WelcomePage />
    </ThemeProvider>,
  );

  screen.getByText('회원가입 완료');

  fireEvent.click(screen.getByText('로그인하기'));

  expect(navigate).toBeCalledWith('/login');
});
