import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import WaiterOverview from './Overview';
import { useNavigate } from 'react-router-dom';

// Mock the useNavigate hook from react-router-dom
const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('WaiterOverview Component', () => {
  beforeEach(() => {
    mockedUseNavigate.mockClear();
  });

  test('renders WaiterOverview component', () => {
    render(
      <MemoryRouter>
        <WaiterOverview />
      </MemoryRouter>
    );

    expect(screen.getByText('Waiter Overview')).toBeInTheDocument();
    expect(screen.getByText('CREATE NEW ORDER')).toBeInTheDocument();
    expect(screen.getByText('RECEIVE PAYMENT')).toBeInTheDocument();
  });

  test('navigates to create new order on button click', () => {
    render(
      <MemoryRouter>
        <WaiterOverview />
      </MemoryRouter>
    );

    const createOrderButton = screen.getByText('CREATE NEW ORDER');
    fireEvent.click(createOrderButton);
    expect(mockedUseNavigate).toHaveBeenCalledWith('/Waiter/Orders/CreateOrder');
  });

  test('navigates to receive payment on button click', () => {
    render(
      <MemoryRouter>
        <WaiterOverview />
      </MemoryRouter>
    );

    const receivePaymentButton = screen.getByText('RECEIVE PAYMENT');
    fireEvent.click(receivePaymentButton);
    expect(mockedUseNavigate).toHaveBeenCalledWith('/Waiter/Payment/Payment');
  });
});
