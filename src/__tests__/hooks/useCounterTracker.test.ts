import { renderHook, act } from '@testing-library/react';
import { useCounterTracker } from '../../lib/hooks/useCounterTracker';
import { vi } from 'vitest';
import { CounterTracker } from '../../lib/types';

describe('useCounterTracker', () => {
  let result: {
    current: {
      state: CounterTracker;
      incrementCountAndSetLastClick: () => void;
    };
  };

  beforeEach(() => {
    // Initialize the hook before each test
    const hook = renderHook(() => useCounterTracker());
    result = hook.result;
  });
  beforeAll(() => {
    // Mock Date.now to return a consistent timestamp
    vi.spyOn(Date, 'now').mockImplementation(() => 1680000000000);
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });
  it('should initialize with with initial state values', () => {
    // const { result } = renderHook(() => useCounterTracker());

    expect(result.current.state.count).toBe(0);
    expect(result.current.state.lastClick).toBe(null);
  });

  it('should increment the count and update last clicked timestamp', () => {
    // const { result } = renderHook(() => useCounterTracker());

    act(() => {
      result.current.incrementCountAndSetLastClick();
    });

    expect(result.current.state.count).toBe(1);
    expect(result.current.state.lastClick).toBe(1680000000000);
  });
  it('should update the lastClick timestamp on consecutive calls', () => {
    // const { result } = renderHook(() => useCounterTracker());

    act(() => {
      result.current.incrementCountAndSetLastClick();
    });

    expect(result.current.state.count).toBe(1);
    expect(result.current.state.lastClick).toBe(1680000000000);

    // Simulate a different timestamp
    vi.spyOn(Date, 'now').mockImplementation(() => 1680000001000);

    act(() => {
      result.current.incrementCountAndSetLastClick();
    });

    expect(result.current.state.count).toBe(2);
    expect(result.current.state.lastClick).toBe(1680000001000);
  });
});
