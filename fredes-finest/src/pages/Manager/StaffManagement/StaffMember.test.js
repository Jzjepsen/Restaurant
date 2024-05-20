import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import StaffMember from './StaffMember';

const mockStaff = [
    { id: 1, name: 'John Doe', firstName: 'John', lastName: 'Doe', age: 30, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', firstName: 'Jane', lastName: 'Smith', age: 25, email: 'jane@example.com' },
];

describe('StaffMember', () => {
    test('renders correctly with staff members', () => {
        render(
            <Router>
                <StaffMember staffs={mockStaff} />
            </Router>
        );

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('First name: John')).toBeInTheDocument();
        expect(screen.getByText('First name: Jane')).toBeInTheDocument();
        expect(screen.getByText('Last name: Doe')).toBeInTheDocument();
        expect(screen.getByText('Last name: Smith')).toBeInTheDocument();
        expect(screen.getByText('Age: 30')).toBeInTheDocument();
        expect(screen.getByText('Age: 25')).toBeInTheDocument();
        expect(screen.getByText('E-mail: john@example.com')).toBeInTheDocument();
        expect(screen.getByText('E-mail: jane@example.com')).toBeInTheDocument();
    });
});
