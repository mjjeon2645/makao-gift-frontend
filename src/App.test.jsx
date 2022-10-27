import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('App', () => {
  render((
    <MemoryRouter>
      <App />
    </MemoryRouter>
  ));

  screen.getByText(/무얼 선물할 지 고민이라면/);
});
