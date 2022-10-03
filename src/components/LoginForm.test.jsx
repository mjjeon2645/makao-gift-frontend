import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import server from '../testServer';
import LoginForm from './LoginForm';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

test('LoginForm', async () => {
  render(
    <LoginForm />,
  );

  screen.getByText('USER LOGIN');

  fireEvent.change(screen.getByPlaceholderText('아이디'), {
    target: { value: 'mjjeon2645' },
  });

  fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
    target: { value: '123!@#qweQWE' },
  });

  // fireEvent.click(screen.getByRole('button', { name: '로그인하기' }));
  fireEvent.click(screen.getByText('로그인하기'));

  await waitFor(() => {
    expect(navigate).toBeCalledWith('/');
  });
});
