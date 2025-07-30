'use client';

import { useState, useEffect, useCallback, useRef, Children } from 'react';
import { motion, AnimatePresence, Variants} from 'framer-motion';
import { cn } from '@/lib/utils';

export interface CarouselProps {
  children: React.ReactNode;
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  infiniteLoop?: boolean;
  className?: string;
  slideClassName?: string;
  arrowClassName?: string;
  dotsClassName?: string;
  animationVariant?: 'slide' | 'fade' | 'zoom' | 'scale';
}

// Define interface for Carousel component with Item property
interface CarouselComponent extends React.FC<CarouselProps> {
  Item: React.FC<CarouselItemProps>;
}

export function Carousel({
  children,
  autoPlay = true,
  interval = 5000,
  showArrows = true,
  showDots = true,
  infiniteLoop = true,
  className,
  slideClassName,
  arrowClassName,
  dotsClassName,
  animationVariant = 'slide',
}: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const childrenArray = Children.toArray(children);
  const childrenCount = childrenArray.length;

  // Animation variants
  const variants: Record<string, Variants> = {
    slide: {
      enter: (direction: 'left' | 'right') => ({
        x: direction === 'right' ? '100%' : '-100%',
        opacity: 0,
      }),
      center: {
        x: 0,
        opacity: 1,
        transition: {
          x: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        },
      },
      exit: (direction: 'left' | 'right') => ({
        x: direction === 'right' ? '-100%' : '100%',
        opacity: 0,
        transition: {
          x: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        },
      }),
    } as Variants,
    fade: {
      enter: { opacity: 0 },
      center: { 
        opacity: 1,
        transition: { duration: 0.5 }
      },
      exit: { 
        opacity: 0,
        transition: { duration: 0.5 }
      },
    } as Variants,
    zoom: {
      enter: { opacity: 0, scale: 0.8 },
      center: { 
        opacity: 1, 
        scale: 1,
        transition: {
          scale: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration: 0.3 },
        },
      },
      exit: { 
        opacity: 0, 
        scale: 0.8,
        transition: {
          scale: { duration: 0.2 },
          opacity: { duration: 0.3 },
        },
      },
    } as Variants,
    scale: {
      enter: { opacity: 0, scale: 1.2 },
      center: { 
        opacity: 1, 
        scale: 1,
        transition: {
          scale: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration: 0.3 },
        },
      },
      exit: { 
        opacity: 0, 
        scale: 0.8,
        transition: {
          scale: { duration: 0.2 },
          opacity: { duration: 0.3 },
        },
      },
    } as Variants,
  };

  // Define stopTimer first since startTimer depends on it
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Define startTimer after stopTimer
  const startTimer = useCallback(() => {
    if (childrenCount <= 1) return;
    
    stopTimer();
    timerRef.current = setInterval(() => {
      setDirection('right');
      setActiveIndex((prevIndex) => 
        infiniteLoop || prevIndex < childrenCount - 1 ? (prevIndex + 1) % childrenCount : prevIndex
      );
    }, interval);
  }, [interval, childrenCount, infiniteLoop, stopTimer]);

  // Reset timer when autoPlay or interval changes
  useEffect(() => {
    if (autoPlay && !isPaused) {
      startTimer();
    } else {
      stopTimer();
    }

    return () => stopTimer();
  }, [autoPlay, interval, isPaused, childrenCount, startTimer, stopTimer]);

  const handleNext = useCallback(() => {
    if (childrenCount <= 1) return;
    
    setDirection('right');
    setActiveIndex((prevIndex) => 
      infiniteLoop || prevIndex < childrenCount - 1 ? (prevIndex + 1) % childrenCount : prevIndex
    );
    if (autoPlay) {
      startTimer();
    }
  }, [childrenCount, infiniteLoop, autoPlay, startTimer]);

  const handlePrev = useCallback(() => {
    if (childrenCount <= 1) return;
    
    setDirection('left');
    setActiveIndex((prevIndex) => 
      infiniteLoop || prevIndex > 0 ? (prevIndex - 1 + childrenCount) % childrenCount : prevIndex
    );
    if (autoPlay) {
      startTimer();
    }
  }, [childrenCount, infiniteLoop, autoPlay, startTimer]);

  const handleDotClick = (index: number) => {
    setDirection(index > activeIndex ? 'right' : 'left');
    setActiveIndex(index);
    if (autoPlay) {
      startTimer();
    }
  };

  // Pause autoplay on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div 
      className={cn('relative w-full overflow-hidden', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants[animationVariant]}
            initial="enter"
            animate="center"
            exit="exit"
            className={cn('w-full', slideClassName)}
          >
            {childrenArray[activeIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {showArrows && childrenCount > 1 && (
        <>
          <button
            onClick={handlePrev}
            className={cn(
              'absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-neutral-800/80 text-neutral-800 dark:text-white shadow-md hover:bg-white dark:hover:bg-neutral-700 focus:outline-none z-10',
              arrowClassName
            )}
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            onClick={handleNext}
            className={cn(
              'absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-neutral-800/80 text-neutral-800 dark:text-white shadow-md hover:bg-white dark:hover:bg-neutral-700 focus:outline-none z-10',
              arrowClassName
            )}
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </>
      )}

      {showDots && childrenCount > 1 && (
        <div className={cn(
          'absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 z-10',
          dotsClassName
        )}>
          {childrenArray.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={cn(
                'h-3 rounded-full transition-all duration-300 focus:outline-none border border-gray-300/50 dark:border-gray-600/50 shadow-sm',
                index === activeIndex
                  ? 'bg-primary-teal w-8 border-primary-teal/50'
                  : 'bg-gray-400/70 dark:bg-gray-500/70 hover:bg-gray-500/80 dark:hover:bg-gray-400/80 w-3'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export interface CarouselItemProps {
  children: React.ReactNode;
  className?: string;
}

export function CarouselItem({ children, className }: CarouselItemProps) {
  return (
    <div className={cn('w-full flex-shrink-0', className)}>
      {children}
    </div>
  );
}

// Assign CarouselItem as a property of Carousel
(Carousel as CarouselComponent).Item = CarouselItem;