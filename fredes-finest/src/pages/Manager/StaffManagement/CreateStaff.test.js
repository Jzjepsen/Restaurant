import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateStaff from './CreateStaff';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
    })
);

describe('CreateStaff', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('renders correctly', () => {
        render(<CreateStaff />);

        expect(screen.getByText('Add a new staff member')).toBeInTheDocument();
        expect(screen.getByLabelText('First name:')).toBeInTheDocument();
        expect(screen.getByLabelText('Last name:')).toBeInTheDocument();
        expect(screen.getByLabelText('Staff age:')).toBeInTheDocument();
        expect(screen.getByLabelText('Staff email:')).toBeInTheDocument();
        expect(screen.getByLabelText('Staff role:')).toBeInTheDocument();
        expect(screen.getByText('Add staff')).toBeInTheDocument();
    });

    test('adds a new staff member when the form is submitted', async () => {
        render(<CreateStaff />);

        fireEvent.change(screen.getByLabelText('First name:'), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText('Last name:'), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText('Staff age:'), { target: { value: '30' } });
        fireEvent.change(screen.getByLabelText('Staff email:'), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText('Staff role:'), { target: { value: 'Manager' } });

        fireEvent.click(screen.getByText('Add staff'));

        expect(fetch).toHaveBeenCalledWith('http://localhost:8000/staff', expect.objectContaining({
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: 'John',
                lastName: 'Doe',
                age: '30',
                email: 'john@example.com',
                role: 'Manager',
            }),
        }));

        expect(await screen.findByText('Adding staff...')).toBeInTheDocument();
    });
});
