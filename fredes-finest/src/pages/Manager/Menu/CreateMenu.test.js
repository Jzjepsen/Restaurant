import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateMenu from './CreateMenu';
import { useMenu } from '../../../services/MenuContext';

jest.mock('../../../services/MenuContext', () => ({
  useMenu: jest.fn(),
}));

describe('CreateMenu Component', () => {
  const addMenuItemMock = jest.fn();

  beforeEach(() => {
    useMenu.mockReturnValue({
      addMenuItem: addMenuItemMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders CreateMenu component', () => {
    render(<CreateMenu />);
    expect(screen.getByText('Add a new dish to the menu')).toBeInTheDocument();
  });

  test('allows input of menu item details and submission', () => {
    render(<CreateMenu />);
    
    const nameInput = screen.getByRole('textbox', { name: /Menu name/i });
    const descriptionInput = screen.getByRole('textbox', { name: /Menu Description/i });
    const priceInput = screen.getByRole('spinbutton', { name: /Menu price/i });
    const cookingTimeSelect = screen.getByRole('combobox', { name: /Cooking time/i });

    fireEvent.change(nameInput, { target: { value: 'Burger' } });
    fireEvent.change(descriptionInput, { target: { value: 'A delicious beef burger' } });
    fireEvent.change(priceInput, { target: { value: '10' } });
    fireEvent.change(cookingTimeSelect, { target: { value: '15' } });

    expect(nameInput.value).toBe('Burger');
    expect(descriptionInput.value).toBe('A delicious beef burger');
    expect(priceInput.value).toBe('10');
    expect(cookingTimeSelect.value).toBe('15');

    const addButton = screen.getByText('Add menu');
    fireEvent.click(addButton);

    expect(addMenuItemMock).toHaveBeenCalledWith({
      name: 'Burger',
      description: 'A delicious beef burger',
      price: '10',
      timeToCook: '15',
      isSoldOut: false,
    });
  });
});
