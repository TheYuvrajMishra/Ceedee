import { type FC } from 'react';
import { FlaskConical, Factory, Recycle } from 'lucide-react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface IconProps {
  className?: string;
}

export type IconComponent = FC<IconProps>;

export interface Slide {
  url: string;
  alt: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
}

export interface Stat {
  number: string;
  label: string;
  icon: IconComponent;
}

// Props for components that use carousel data
export interface CarouselProps {
  slides: Slide[];
  currentIndex: number;
}

// Props for the carousel controls component
export interface CarouselControlsProps extends CarouselProps {
  goToSlide: (index: number) => void;
}


// ============================================================================
// CONSTANT DATA
// ============================================================================

export const SLIDES_DATA: Slide[] = [
  { 
    url: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=2070&auto=format&fit=crop', 
    alt: 'Abstract network of glowing blue polymer chains', 
    eyebrow: 'A Venbro Polymers Initiative',
    headline: 'Engineering Excellence in Every Molecule', 
    subheadline: "We design high-performance polymers for the world's most demanding applications." 
  },
  { 
    url: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop', 
    alt: 'Scientist working in a modern polymer research laboratory', 
    eyebrow: 'Advanced Research & Development',
    headline: 'Innovation Driven by Science', 
    subheadline: 'Our state-of-the-art facilities are dedicated to pushing the boundaries of material science.' 
  },
  { 
    url: 'https://i.ytimg.com/vi/UGXKaH9k75M/maxresdefault.jpg', 
    alt: 'Eco-friendly product made from recycled polymers', 
    eyebrow: 'Commitment to Sustainability',
    headline: 'Sustainable Solutions for Tomorrow', 
    subheadline: 'Developing environmentally responsible materials for a circular economy.' 
  },
];

export const STATS_DATA: Stat[] = [
  { number: '50+', label: 'Years of Combined Experience', icon: FlaskConical },
  { number: '1,200+', label: 'Innovative Products Delivered', icon: Factory },
  { number: '95%', label: 'Use of Recycled Materials', icon: Recycle },
];