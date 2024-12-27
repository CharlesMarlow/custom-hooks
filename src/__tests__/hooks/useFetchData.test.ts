import { renderHook, waitFor } from '@testing-library/react';
import { vi } from 'vitest'; // Vitest for mocking
import { useFetchData } from '../../lib/hooks/useFetchData';

describe('useFetchData', () => {
  afterEach(() => {
    // Restore all mocks after each test
    vi.restoreAllMocks();
  });

  it('should fetch data successfully', async () => {
    // Mock the global fetch function to return a valid Response object
    const mockResponse = { message: 'Success' };
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    } as Response);

    const { result } = renderHook(() =>
      useFetchData<{ message: string }>('/api/data')
    );

    // Check the initial states
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    // Check the state after the fetch completes
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(mockResponse);
      expect(result.current.error).toBeNull();
    });
  });

  it('should handle fetch errors', async () => {
    // Mock the global fetch function to simulate an error
    const mockError = new Error('Network Error');
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(mockError);

    const { result } = renderHook(() =>
      useFetchData<{ message: string }>('/api/data')
    );

    // Check the initial states
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    // Check the state after the fetch fails
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBeNull();
      expect(result.current.error).toContain('Error: Network Error');
    });
  });

  it('should handle HTTP errors (non-OK status)', async () => {
    // Mock the global fetch function to simulate an HTTP error
    const mockResponse = { message: 'Unauthorized' };
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => mockResponse,
    } as Response);

    const { result } = renderHook(() =>
      useFetchData<{ message: string }>('/api/data')
    );

    // Check the initial states
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    // Check the state after the fetch completes with an error status
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBeNull();
      expect(result.current.error).toContain('Error: HTTP Error. Status: 401');
    });
  });
});
