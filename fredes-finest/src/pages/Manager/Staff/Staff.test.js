import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Staff from './Staff';

describe('Staff', () => {
    test('renders correctly with title', () => {
        render(<Staff />);

        expect(screen.getByText('Staff Overview')).toBeInTheDocument();
    });
});
