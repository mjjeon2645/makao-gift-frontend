import { fireEvent, render, screen } from '@testing-library/react';
import Header from './Header';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate() {
    return navigate;
  },
}));

const context = describe;

describe('Header', () => {
  function renderHeader() {
    render(
      <Header />,
    );
  }

  it('renders "store" link', () => {
    renderHeader();

    screen.getByText('스토어');
  });

  context('with logged in', () => {
    beforeEach(() => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));
    });

    it('renders "로그아웃" button', () => {
      renderHeader();

      screen.getByText(/내 잔액/);
      fireEvent.click(screen.getByText('로그아웃'));
      expect(navigate).toBeCalledWith('/');
    });
  });

  context('without logged in', () => {
    beforeEach(() => {
      localStorage.removeItem('accessToken');
    });

    it('renders "로그인" button', () => {
      renderHeader();

      screen.getByText('회원가입');
      screen.getByText('로그인');
    });
  });
});
