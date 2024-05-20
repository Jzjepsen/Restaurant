import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ManagerOverview from './Overview';

describe('ManagerOverview', () => {
    test('renders correctly with title and description', () => {
        render(<ManagerOverview />);

        expect(screen.getByText('Manager Overview')).toBeInTheDocument();
        expect(screen.getByText('This is the Manager Overview page. Here, you can view and manage manager-specific information and tasks.')).toBeInTheDocument();
    });
});
