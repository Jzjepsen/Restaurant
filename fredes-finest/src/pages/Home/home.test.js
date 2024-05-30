import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from './home';
import Login from '../../Components/Login/Login';

jest.mock('../../Components/Login/Login', () => () => <div>Mocked Login Component</div>);

describe('Home Component', () => {
    test('renders Home component', () => {
        render(<Home />);

     
        expect(screen.getByText('Homepage')).toBeInTheDocument();

       
        expect(screen.getByText('Mocked Login Component')).toBeInTheDocument();
    });
});
