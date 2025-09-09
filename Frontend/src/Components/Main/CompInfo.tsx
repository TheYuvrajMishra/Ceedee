import React, { useMemo } from 'react';
import { useScrollAnimation } from './data/hooks';

/**
 * CompInfo component displays company information with scroll-based text animation.
 * The text transitions from light gray to black letter by letter as the user scrolls through the section.
 */
const CompInfo: React.FC = () => {
  // Use the improved scroll animation with better viewport calculations
  const { progress, elementRef } = useScrollAnimation(0, 0.5);

  const text = "Ceedee's Group of companies is an industry leader in providing a range of services in the sphere of various manufacturing and trading enterprises worldwide!";

  // Memoize the calculation. It only recalculates when `progress` or `text` changes.
  const animatedText = useMemo(() => {
    // Split text into words first, then split each word into characters
    const words = text.split(' ');
    let charIndex = 0;
    
    return words.map((word, wordIndex) => {
      const wordChars = word.split('').map((char) => {
        // Each character's "reveal" is tied to a specific point in the overall scroll progress.
        const charRevealThreshold = charIndex / text.length;

        // Determine if the character should be revealed (black) or hidden (light gray).
        const isRevealed = progress >= charRevealThreshold;      
        
        const color = isRevealed ? 'rgb(0, 0, 0)' : 'rgb(156, 163, 168)';

        const charData = { char, color, index: charIndex };
        charIndex++;
        return charData;
      });
      
      // Account for the space after each word (except the last one)
      if (wordIndex < words.length - 1) {
        const spaceRevealThreshold = charIndex / text.length;
        const spaceColor = progress >= spaceRevealThreshold ? 'rgb(0, 0, 0)' : 'rgb(156, 163, 168)';
        charIndex++; // Increment for the space character
        
        return {
          word: wordChars,
          space: { char: ' ', color: spaceColor, index: charIndex - 1 }
        };
      }
      
      return { word: wordChars, space: null };
    });
  }, [progress, text]);

  return (
    <section 
      ref={elementRef}
      className="h-[50vh] bg-white relative raleway-light overflow-hidden"
    >
      {/* Content container */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
              {animatedText.map((wordData, wordIndex) => (
                <span key={wordIndex} className="inline-block" style={{ whiteSpace: 'nowrap' }}>
                  {/* Render each character in the word */}
                  {wordData.word.map(({ char, color, index }) => (
                    <span
                      key={index}
                      style={{ 
                        color,
                        // Improved transition with better cubic-bezier timing function
                        transition: 'color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                      }}
                      className="inline-block"
                    >
                      {char}
                    </span>
                  ))}
                  {/* Render the space after the word if it exists */}
                  {wordData.space && (
                    <span
                      key={wordData.space.index}
                      style={{ 
                        color: wordData.space.color,
                        transition: 'color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                      }}
                      className="inline-block"
                    >
                      {'\u00A0'}
                    </span>
                  )}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
      
      {/* Optional subtle texture overlay for visual interest */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </section>
  );
};

export default CompInfo;
