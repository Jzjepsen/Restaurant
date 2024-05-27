import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PaymentPage from './Payment';  // Correct the import to match the actual file

const mockFetch = (response, success = true) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: success,
      json: () => Promise.resolve(response),
    })
  );
};

describe('PaymentPage Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    mockFetch({});
    render(<PaymentPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error message on fetch failure', async () => {
    mockFetch({}, false);
    render(<PaymentPage />);
    await waitFor(() => expect(screen.getByText('Error: Failed to fetch payment data')).toBeInTheDocument());
  });

  test('renders payment data correctly on fetch success', async () => {
    const mockData = {
      paymentId: '123',
      orderId: '456',
      amount: '78.90',
      totalAmount: '100.00',
    };
    mockFetch(mockData);
    render(<PaymentPage />);

    await waitFor(() => expect(screen.getByText('Payment Details')).toBeInTheDocument());
    expect(screen.getByText(`Payment details for ID: ${mockData.paymentId}`)).toBeInTheDocument();
    expect(screen.getByText(`Order ID: ${mockData.orderId}`)).toBeInTheDocument();
    expect(screen.getByText(`Amount: ${mockData.amount}`)).toBeInTheDocument();
    expect(screen.getByText(`Total Amount: ${mockData.totalAmount}`)).toBeInTheDocument();
  });
});
