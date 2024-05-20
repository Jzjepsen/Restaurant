import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Payment from './Payment';

describe('Payment', () => {
    test('renders correctly with title', () => {
        render(<Payment />);

        expect(screen.getByText('Payment')).toBeInTheDocument();
    });
});
