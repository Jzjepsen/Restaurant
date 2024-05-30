import { renderHook, act } from '@testing-library/react-hooks';
import useFetch from './useFetch';

global.fetch = jest.fn();

describe('useFetch', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('fetches data correctly', async () => {
        const mockData = { id: '1', name: 'John Doe' };
        fetch.mockResolvedValueOnce({ ok: true, json: async () => mockData });

        const { result, waitForNextUpdate } = renderHook(() => useFetch('https://localhost:7033/api/User'));

        await waitForNextUpdate();

        expect(result.current.data).toEqual(mockData);
        expect(result.current.isPending).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('handles fetch errors gracefully', async () => {
        fetch.mockRejectedValueOnce(new Error('Fetch error'));

        const { result, waitForNextUpdate } = renderHook(() => useFetch('https://localhost:7033/api/User'));

        await waitForNextUpdate();

        expect(result.current.data).toBeNull();
        expect(result.current.isPending).toBe(false);
        expect(result.current.error).toBe('Fetch error');
    });
});
