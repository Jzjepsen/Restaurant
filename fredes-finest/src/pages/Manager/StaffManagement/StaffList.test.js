import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StaffList from './StaffList';

const mockStaff = [
    { id: 1, firstName: 'John', lastName: 'Doe', age: 30, email: 'john@example.com', role: 'Manager' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', age: 25, email: 'jane@example.com', role: 'Waiter' },
];

describe('StaffList', () => {
    test('renders correctly with staff members', () => {
        render(<StaffList staff={mockStaff} />);

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('Age: 30')).toBeInTheDocument();
        expect(screen.getByText('Age: 25')).toBeInTheDocument();
        expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
        expect(screen.getByText('Email: jane@example.com')).toBeInTheDocument();
        expect(screen.getByText('Role: Manager')).toBeInTheDocument();
        expect(screen.getByText('Role: Waiter')).toBeInTheDocument();
    });

    test('handles remove button click', () => {
        render(<StaffList staff={mockStaff} />);

        const removeButtons = screen.getAllByText('Remove');
        fireEvent.click(removeButtons[0]);

        expect(screen.getByText('You clicked the button to remove staff member with ID: 1')).toBeInTheDocument();
    });

    test('handles edit button click', () => {
        render(<StaffList staff={mockStaff} />);

        const editButtons = screen.getAllByText('Edit');
        fireEvent.click(editButtons[0]);

        expect(screen.getByText('You clicked the button to edit staff member with ID: 1')).toBeInTheDocument();
    });
});
