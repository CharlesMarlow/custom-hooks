import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useMousePosition } from '../../lib/hooks/useMousePosition';

describe.only('useMousePosition', () => {
  let result: { current: { xPosition: number; yPosition: number } };

  beforeEach(() => {
    // Initialize the hook before each test
    const hook = renderHook(() => useMousePosition());
    result = hook.result;
  });
  it('should initialize with initial state values', () => {
    expect(result.current.xPosition).toBe(0);
    expect(result.current.yPosition).toBe(0);
  });

  it('should update position on mousemove event', () => {
    // Spy on window.addEventListener to mock the event
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    expect(result.current).toEqual({ xPosition: 0, yPosition: 0 });

    // Simulate mouse move
    act(() => {
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 100,
        clientY: 200,
      });
      window.dispatchEvent(mouseEvent);
    });

    // Assert new values
    expect(result.current).toEqual({ xPosition: 100, yPosition: 200 });

    // Cleanup spy
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('should clean up event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useMousePosition());
    unmount();

    // Ensure the event listener is removed on unmount
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'mousemove',
      expect.any(Function)
    );

    // Cleanup spy
    removeEventListenerSpy.mockRestore();
  });
});
