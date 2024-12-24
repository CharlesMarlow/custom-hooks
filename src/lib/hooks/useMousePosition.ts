import { useState, useEffect } from 'react';

interface MousePositions {
  xPosition: number;
  yPosition: number;
}

export const useMousePosition = () => {
  const [position, setPosition] = useState<MousePositions>({
    xPosition: 0,
    yPosition: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({
        xPosition: event.clientX,
        yPosition: event.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
};
