import { render, screen } from '@testing-library/react';
import Container from './container';

test('renders learn react link', () => {
  render(<Container />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
