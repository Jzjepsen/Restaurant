import { renderHook } from '@testing-library/react-hooks';
import useFetch from './useFetch';

describe('useFetch', () => {
    test('fetches data successfully', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ data: 'test data' }),
                ok: true,
            })
        );

        const { result, waitForNextUpdate } = renderHook(() => useFetch('test-url'));

        await waitForNextUpdate();

        expect(result.current.data).toEqual({ data: 'test data' });
        expect(result.current.isPending).toBe(false);
        expect(result.current.error).toBe(null);
    });

    test('handles fetch error', async () => {
        global.fetch = jest.fn(() =>
            Promise.reject(new Error('fetch error'))
        );

        const { result, waitForNextUpdate } = renderHook(() => useFetch('test-url'));

        await waitForNextUpdate();

        expect(result.current.data).toBe(null);
        expect(result.current.isPending).toBe(false);
        expect(result.current.error).toBe('fetch error');
    });
});
