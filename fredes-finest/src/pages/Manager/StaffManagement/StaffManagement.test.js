import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StaffManagement from './StaffManagement';

describe('StaffManagement', () => {
    test('renders correctly with staff list and create staff form', () => {
        render(<StaffManagement />);

        expect(screen.getByText('Staff List')).toBeInTheDocument();
        expect(screen.getByText('Søren Hansen')).toBeInTheDocument();
        expect(screen.getByText('Marcus Milo')).toBeInTheDocument();
        expect(screen.getByText('Rasmus Pedersen')).toBeInTheDocument();
        expect(screen.getByText('Add a new staff member')).toBeInTheDocument();
    });
});
