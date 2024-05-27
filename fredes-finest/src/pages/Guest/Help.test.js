// Help.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import HelpPage from './Help';
import '@testing-library/jest-dom/extend-expect';

describe('HelpPage', () => {
  it('renders the help page with FAQs', () => {
    render(<HelpPage />);

    expect(screen.getByText('Help & FAQ')).toBeInTheDocument();
    expect(screen.getByText('What are your opening hours?')).toBeInTheDocument();
    expect(screen.getByText('Do you have vegan or gluten-free options?')).toBeInTheDocument();
    expect(screen.getByText('Can I make a reservation?')).toBeInTheDocument();
    expect(screen.getByText('Do you offer delivery or takeout?')).toBeInTheDocument();
    expect(screen.getByText('Is there parking available?')).toBeInTheDocument();
    expect(screen.getByText('Can I bring my own wine?')).toBeInTheDocument();
    expect(screen.getByText('What forms of payment do you accept?')).toBeInTheDocument();
    expect(screen.getByText('Do you have outdoor seating?')).toBeInTheDocument();
    expect(screen.getByText('Can you accommodate large groups or private events?')).toBeInTheDocument();

    expect(screen.getByText('+45 2330 5149')).toBeInTheDocument();
    expect(screen.getByText('fredes-finest@staff.com')).toBeInTheDocument();
  });
});
