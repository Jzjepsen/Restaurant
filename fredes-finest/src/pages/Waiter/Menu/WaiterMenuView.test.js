import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WaiterMenuView from './WaiterMenuView';
import { useMenu } from '../../../services/MenuContext';
import Menu from '../../../Components/Menu/Menu';

// Mock the Menu component
jest.mock('../../../Components/Menu/Menu', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked Menu Component</div>),
}));

// Mock the useMenu hook
jest.mock('../../../services/MenuContext', () => ({
  useMenu: jest.fn(),
}));

describe('WaiterMenuView Component', () => {
  const mockMenuItems = [
    { id: '1', name: 'Pizza', soldOut: false },
    { id: '2', name: 'Pasta', soldOut: true },
  ];

  beforeEach(() => {
    useMenu.mockReturnValue({
      menuItems: mockMenuItems,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders WaiterMenuView component', () => {
    render(<WaiterMenuView />);
    
    // Debug to check the DOM structure
    screen.debug();

    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Mocked Menu Component')).toBeInTheDocument();
  });

  test('passes menuItems and showSoldOutStatus props to Menu component', () => {
    render(<WaiterMenuView />);

    expect(Menu).toHaveBeenCalledWith(
      { menuItems: mockMenuItems, showSoldOutStatus: true },
      {}
    );
  });
});
