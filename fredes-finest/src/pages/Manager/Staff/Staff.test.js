import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Staff from './Staff';

describe('Staff Component', () => {
  test('renders Staff component with correct title', () => {
    render(<Staff />);
    expect(screen.getByText('Staff Overview')).toBeInTheDocument();
  });
});
