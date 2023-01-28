import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from 'src/pages/home_page/home_page';

describe('HomePage', () => {
  it('should render placeholder text ', () => {
    render(<HomePage />);
    const linkElement = screen.getByText(/placeholder/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('should render logout button ', () => {
    render(<HomePage />);
    const linkElement = screen.getByText(/log out/i);
    expect(linkElement).toBeInTheDocument();
  });
});
