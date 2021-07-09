import { render, screen } from '@testing-library/react';
import App from './App';

test('test all routes', () => {
  render(<App />);
  const title = screen.getByText('Order Entry System');
  expect(title).toBeInTheDocument();

  const homeLink = screen.getByText('Home');
  expect(homeLink).toBeInTheDocument();

  const orderLink = screen.getByText('Place Order');
  expect(orderLink).toBeInTheDocument();

  const statsLink = screen.getByText('Stats');
  expect(statsLink).toBeInTheDocument();
});