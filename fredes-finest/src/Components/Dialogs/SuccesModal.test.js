import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SuccesModal from './SuccesModal';
import Modal from 'react-modal';

Modal.setAppElement(document.createElement('div'));

describe('SuccesModal', () => {
    test('renders correctly when open', () => {
        render(
            <SuccesModal isOpen={true} onRequestClose={jest.fn()} title="Test Title">
                <div>Test Children</div>
            </SuccesModal>
        );

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Children')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /x/i })).toBeInTheDocument();
    });

    test('calls onRequestClose when close button is clicked', () => {
        const onRequestClose = jest.fn();
        render(
            <SuccesModal isOpen={true} onRequestClose={onRequestClose} title="Test Title">
                <div>Test Children</div>
            </SuccesModal>
        );

        fireEvent.click(screen.getByRole('button', { name: /x/i }));
        expect(onRequestClose).toHaveBeenCalledTimes(1);
    });

    test('calls onRequestClose after 15 seconds', () => {
        jest.useFakeTimers();
        const onRequestClose = jest.fn();
        render(
            <SuccesModal isOpen={true} onRequestClose={onRequestClose} title="Test Title">
                <div>Test Children</div>
            </SuccesModal>
        );

        jest.advanceTimersByTime(15000);
        expect(onRequestClose).toHaveBeenCalledTimes(1);
        jest.useRealTimers();
    });

    test('does not call onRequestClose if isOpen is false', () => {
        jest.useFakeTimers();
        const onRequestClose = jest.fn();
        render(
            <SuccesModal isOpen={false} onRequestClose={onRequestClose} title="Test Title">
                <div>Test Children</div>
            </SuccesModal>
        );

        jest.advanceTimersByTime(15000);
        expect(onRequestClose).not.toHaveBeenCalled();
        jest.useRealTimers();
    });
});
