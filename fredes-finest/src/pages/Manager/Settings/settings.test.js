import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Settings from './settings';

describe('Settings', () => {
    test('renders correctly with title', () => {
        render(<Settings />);

        expect(screen.getByText('Settings')).toBeInTheDocument();
    });
});
