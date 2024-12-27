import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useDebounce } from '../../lib/hooks/useDebounce';

vi.useFakeTimers();

describe('useDebounce', () => {
  it('should initialize with the given input value', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebounce('test', callback, 500));

    expect(result.current[0]).toBe('test');
  });

  it('should update debounced value after the specified wait time', () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(
      ({ input }) => useDebounce(input, callback, 500),
      { initialProps: { input: 'test' } }
    );

    // Update the input value
    rerender({ input: 'updated' });

    // Before wait time
    expect(result.current[0]).toBe('test');
    expect(callback).toHaveBeenCalled();

    // Fast-forward timers
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // After wait time
    expect(result.current[0]).toBe('updated');
    expect(callback).toHaveBeenCalledWith('updated');
  });

  it('should clear the timeout on input change', async () => {
    vi.useFakeTimers();

    const callback = vi.fn();
    const { result } = renderHook(() => useDebounce('initial', callback, 500));

    // Check initial state before debounce
    expect(result.current[0]).toBe('initial');
    expect(callback).toHaveBeenCalled();

    // Before debounce completes
    expect(callback).toHaveBeenCalled();

    // Fast-forward timers by 500ms (debounce time)
    vi.advanceTimersByTime(500);

    // Callback should be called with 'initial' (debounced value)
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('initial');
  });

  it('should call cleanup when unmounted', () => {
    const callback = vi.fn();
    const { unmount, rerender } = renderHook(
      ({ input }) => useDebounce(input, callback, 500),
      { initialProps: { input: 'test' } }
    );

    // Simulate input change and partial debounce period
    rerender({ input: 'updated' });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Unmount the hook before debounce period completes
    unmount();

    // Ensure no further callback is called after unmount
    const callCountAfterUnmount = callback.mock.calls.length;

    // Advance timers to complete the debounce period
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledTimes(callCountAfterUnmount);
  });
});
