import { useState, useEffect, useCallback, type SetStateAction } from 'react';

/**
 * Tracks the mouse position on the screen.
 */
export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
};

/**
 * Manages the state and autoplay functionality for a carousel.
 * @param itemCount The total number of items in the carousel.
 * @param autoplayDelay The delay in milliseconds for autoplay.
 */
export const useCarousel = (itemCount: number, autoplayDelay = 7000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev === itemCount - 1 ? 0 : prev + 1));
  }, [itemCount]);

  const goToSlide = (slideIndex: SetStateAction<number>) => setCurrentIndex(slideIndex);

  useEffect(() => {
    if (autoplayDelay > 0) {
      const interval = setInterval(nextSlide, autoplayDelay);
      return () => clearInterval(interval);
    }
  }, [nextSlide, autoplayDelay]);

  return { currentIndex, goToSlide };
};