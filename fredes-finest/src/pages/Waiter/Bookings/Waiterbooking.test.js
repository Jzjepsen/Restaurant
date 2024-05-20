import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Bookings from './bookings';

describe('Bookings', () => {
    test('renders correctly with title', () => {
        render(<Bookings />);

        expect(screen.getByText('Bookings')).toBeInTheDocument();
    });
});
