import { renderHook, act } from '@testing-library/react';
import { useCounter } from '../../lib/hooks/useCounter';

describe.only('useCounter', () => {
  let result: {
    current: { count: number; increment: () => void; decrement: () => void };
  };

  beforeEach(() => {
    // Setup the hook before each test
    const hookResult = renderHook(() => useCounter());
    result = hookResult.result;
  });

  it('should initialize with a count of 0', () => {
    expect(result.current.count).toBe(0);
  });

  it('should increment the count', () => {
    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it('should decrement the count', () => {
    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(-1);
  });

  it('should increment and decrement correctly in sequence', () => {
    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.decrement();
    });

    expect(result.current.count).toBe(1);
  });
});
