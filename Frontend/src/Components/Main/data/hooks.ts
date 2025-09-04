import { useState, useEffect, useCallback, useRef, type SetStateAction } from 'react';

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
 * Provides scroll-based animation values for an element.
 * Returns a progress value (0-1) based on how much the element has been scrolled through the viewport.
 * @param startOffset The point in the viewport where the animation starts (0 = bottom, 1 = top)
 * @param endOffset The point in the viewport where the animation ends
 */
export const useScrollAnimation = (startOffset = 0, endOffset = 0.6) => {
  const [progress, setProgress] = useState(0);
  const elementRef = useRef<HTMLElement>(null);

  const handleScroll = useCallback(() => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Calculate the distance the element needs to travel for the animation to complete.
    // This is based on the element's height and the viewport offsets.
    const animationDistance = (endOffset - startOffset) * viewportHeight + rect.height;
    
    // Calculate how far the top of the element is from the animation start trigger point.
    const scrollDistance = (1 - startOffset) * viewportHeight - rect.top;

    // Calculate and clamp the progress value between 0 and 1.
    const currentProgress = Math.max(0, Math.min(1, scrollDistance / animationDistance));
    
    setProgress(currentProgress);
  }, [startOffset, endOffset]);

  useEffect(() => {
    // Initial calculation
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  return { progress, elementRef };
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