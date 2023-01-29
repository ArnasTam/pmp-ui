import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from 'src/pages/home_page/home_page';
import renderWithProviders from 'src/test/test_utils';

describe('HomePage', () => {
  it('should render placeholder text ', () => {
    renderWithProviders(<HomePage />);
    const linkElement = screen.getByText('placeholder');
    expect(linkElement).toBeInTheDocument();
  });
});
