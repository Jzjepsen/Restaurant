import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ManagerMenuView from './ManagerMenuView';
import { useMenu } from '../../../services/MenuContext';

jest.mock('../../../services/MenuContext', () => ({
  useMenu: jest.fn(),
}));

const mockMenuItems = [
  { id: '1', name: 'Pizza', soldOut: false },
  { id: '2', name: 'Pasta', soldOut: false },
];

describe('ManagerMenuView Component', () => {
  beforeEach(() => {
    useMenu.mockReturnValue({
      menuItems: mockMenuItems,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders ManagerMenuView component', () => {
    render(<ManagerMenuView />);
    expect(screen.getByText('Configure menu')).toBeInTheDocument();
  });

  test('renders menu items correctly', () => {
    render(<ManagerMenuView />);
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Pasta')).toBeInTheDocument();
  });

  test('renders CreateMenu component', () => {
    render(<ManagerMenuView />);
    expect(screen.getByText('Add a new dish to the menu')).toBeInTheDocument();
  });
});
