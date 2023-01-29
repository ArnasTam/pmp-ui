import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const renderWithProviders = (component: React.ReactNode) =>
  render(<BrowserRouter>{component}</BrowserRouter>);

export default renderWithProviders;
