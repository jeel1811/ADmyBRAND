'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
// import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { cn } from '@/lib/utils';
import { useRef, useState, useEffect, TouchEvent } from 'react';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: 'AI-Powered Campaign Creation',
    description: 'Generate high-converting ad campaigns across multiple platforms with our advanced AI that learns from your best performers.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
        <path d="M12 2a10 10 0 0 1 10 10h-10V2z" />
        <path d="M12 12l-8-4.5M12 12V2" />
      </svg>
    ),
  },
  {
    title: 'Cross-Channel Optimization',
    description: 'Automatically allocate budget across channels based on real-time performance data to maximize ROI and campaign effectiveness.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34" />
        <path d="M14 3v4a2 2 0 0 0 2 2h4" />
        <path d="M5 12V7a2 2 0 0 1 2-2h7l5 5v2" />
        <path d="M18 21v-8" />
        <path d="M15 16l3 3 3-3" />
      </svg>
    ),
  },
  {
    title: 'Predictive Analytics',
    description: 'Forecast campaign performance and identify trends before they happen with our machine learning algorithms.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M2 12h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H2v-8z" />
        <path d="M6 8h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6V8z" />
        <path d="M10 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2V4z" />
        <path d="M14 2h2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2V2z" />
        <path d="M18 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2V6z" />
      </svg>
    ),
  },
  {
    title: 'Automated A/B Testing',
    description: 'Continuously test and optimize ad creative, copy, and targeting with our intelligent split testing system.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8" />
        <path d="M15 18h-5" />
        <path d="M10 6h8v4h-8V6Z" />
      </svg>
    ),
  },
  {
    title: 'Unified Dashboard',
    description: 'View all your marketing channels in one place with real-time data synchronization and customizable reporting.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    title: 'Natural Language Insights',
    description: 'Get plain-English explanations of your data and actionable recommendations without needing to be a data scientist.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 9h8" />
        <path d="M8 13h6" />
      </svg>
    ),
  },
];

interface FeaturesProps {
  className?: string;
}

export function Features({ className }: FeaturesProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Icon container animations
  const iconContainerVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 500,
        damping: 25,
        delay: 0.2,
      }
    },
    active: {
      scale: [1, 1.1, 1.2, 1.1, 1],
      backgroundColor: "var(--color-primary-500)",
      boxShadow: "0 0 25px 8px rgba(var(--color-primary-500-rgb), 0.4)",
      transition: {
        scale: {
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: "easeInOut" as const,
        },
        default: {
          type: 'spring' as const,
          stiffness: 400,
          damping: 8,
        }
      }
    }
  };

  // Icon animations
  const iconVariants = {
    hidden: { opacity: 0, rotate: -30 },
    visible: { 
      opacity: 1, 
      rotate: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 15,
        delay: 0.3,
      }
    },
    active: {
      rotate: [0, -10, 10, -5, 0],
      scale: [1, 1.2, 1.1, 1.15, 1],
      opacity: [0.9, 1, 0.95, 1, 0.9],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut" as const,
      }
    }
  };

  // Auto-rotate carousel every 3 seconds
  useEffect(() => {
    // Start the timer
    const startTimer = () => {
      if (isPaused) return;
      
      // Reset progress
      setProgress(0);
      
      // Start progress interval (updates every 30ms for smooth animation)
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      
      progressIntervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 0;
          return prev + (100 / (3000 / 30)); // Increment to reach 100% in 3 seconds
        });
      }, 30);
      
      // Start slide change timer
      timerRef.current = setInterval(() => {
        setActiveIndex(prevIndex => (prevIndex + 1) % features.length);
        setProgress(0); // Reset progress when slide changes
      }, 3000);
    };
    
    // Clear the timers
    const clearTimers = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
    
    // If paused, clear timers, otherwise start them
    if (isPaused) {
      clearTimers();
    } else {
      startTimer();
    }
    
    // Handle visibility change (pause when tab is inactive)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimers();
      } else if (!isPaused) {
        startTimer();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Clean up on unmount
    return () => {
      clearTimers();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPaused]);

  // Function to handle manual navigation
  const handleCardNavigation = (index: number) => {
    if (index < 0 || index >= features.length) return;
    
    // Reset timers on manual navigation
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    // Reset progress
    setProgress(0);
    
    // Start new progress interval
    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + (100 / (3000 / 30));
      });
    }, 30);
    
    // Start new slide timer
    timerRef.current = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % features.length);
      setProgress(0);
    }, 3000);
    
    // Update active card index
    setActiveIndex(index);
  };
  
  // Manual swipe handling for touch devices
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    
    // Pause the timers while swiping
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  };
  
  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swiped left
      handleCardNavigation(activeIndex + 1);
    }
    
    if (touchStart - touchEnd < -100) {
      // Swiped right
      handleCardNavigation(activeIndex - 1);
    } else {
      // If no significant swipe, restart timers
      if (!timerRef.current) {
        // Reset progress
        setProgress(0);
        
        // Start progress interval
        progressIntervalRef.current = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) return 0;
            return prev + (100 / (3000 / 30));
          });
        }, 30);
        
        // Start slide timer
        timerRef.current = setInterval(() => {
          setActiveIndex(prevIndex => (prevIndex + 1) % features.length);
          setProgress(0);
        }, 3000);
      }
    }
  };

  return (
    <section
      id="features"
      ref={sectionRef}
      className={cn(
        'py-24 bg-gradient-to-b from-gray-50/90 via-white/90 to-gray-50/90 dark:from-gray-900/90 dark:via-gray-800/90 dark:to-gray-900/90 min-h-screen',
        'flex flex-col justify-center relative',
        className
      )}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
        >
          
           <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text">
              Powerful Features for Modern Marketers
            </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Our AI Suite combines cutting-edge technology with intuitive design to transform your marketing workflow.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div 
          ref={containerRef}
          className="relative h-[500px] md:h-[600px] w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Progress Indicator */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2 mb-4">
            {features.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleCardNavigation(idx)}
                className="relative h-3 rounded-full transition-all duration-300 overflow-hidden border border-gray-300/30 dark:border-gray-600/30"
                style={{ 
                  width: idx === activeIndex ? '50px' : '12px',
                  background: idx === activeIndex 
                    ? 'rgba(15, 118, 110, 0.2)' // primary-teal with opacity
                    : 'rgba(156, 163, 175, 0.3)', // gray with better opacity
                }}
                aria-label={`Go to slide ${idx + 1}`}
              >
                {idx === activeIndex && (
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-primary-teal rounded-full shadow-sm"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.03, ease: "linear" }}
                  />
                )}
                {idx !== activeIndex && (
                  <div className="absolute top-0 left-0 h-full w-full bg-gray-400 dark:bg-gray-500 rounded-full opacity-60" />
                )}
              </button>
            ))}
          </div>

          {/* Cards Carousel */}
          <div 
            ref={carouselRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              perspective: '1200px'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Pause indicator */}
            {isPaused && (
              <div className="absolute top-4 right-4 z-50 bg-black/40 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                Paused (hover to control)
              </div>
            )}
            
            <AnimatePresence initial={false}>
              {features.map((feature, index) => {
                // Calculate position based on index relative to active index
                const position = index - activeIndex;
                
                // Calculate x offset for parallax effect - increase offset for better visibility
                const xOffset = position * 80; // Controls how far cards are from each other
                
                // Calculate z offset for 3D effect
                const zOffset = Math.abs(position) * -100;
                
                // Calculate opacity based on distance from active - increase minimum opacity
                const opacity = position === 0 ? 1 : Math.max(0.5, 1 - Math.abs(position) * 0.2);
                
                // Calculate scale based on distance from active - increase minimum scale
                const scale = position === 0 ? 1 : Math.max(0.85, 1 - Math.abs(position) * 0.1);
                
                return (
                  <motion.div
                    key={feature.title}
                    className="absolute w-full max-w-md"
                    initial={{ opacity: 0 }}
                    animate={{
                      x: `calc(${xOffset}% + ${position * 30}px)`,
                      opacity,
                      scale,
                      zIndex: features.length - Math.abs(position),
                      filter: position === 0 ? 'blur(0px)' : `blur(${Math.abs(position) * 1}px)`,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 30,
                      mass: 0.5
                    }}
                    onClick={() => handleCardNavigation(index)}
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: `translateZ(${zOffset}px)`,
                      cursor: position === 0 ? 'default' : 'pointer'
                    }}
                  >
                    <Card 
                      className={`h-full transform transition-all duration-300 
                                bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm 
                                border border-gray-200 dark:border-gray-700 
                                ${position === 0 ? 'border-primary-500/80 dark:border-primary-400/80 shadow-xl shadow-primary-500/20 dark:shadow-primary-400/20' : 'shadow-lg'}
                                overflow-hidden p-4`}
                      variant="feature"
                    >
                      <CardHeader className="pb-4 relative z-10">
                        <motion.div 
                          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-500/30 dark:from-primary-400/20 dark:to-primary-400/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6 shadow-lg shadow-primary-500/10 dark:shadow-primary-400/10"
                          variants={iconContainerVariants}
                          animate={position === 0 ? "active" : "visible"}
                        >
                          <motion.div
                            variants={iconVariants}
                            animate={position === 0 ? "active" : "visible"}
                            className="w-8 h-8"
                          >
                            {feature.icon}
                          </motion.div>
                        </motion.div>
                        <CardTitle className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base md:text-lg text-gray-600 dark:text-gray-300">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                      
                      {/* Background decoration elements with parallax effect */}
                      <motion.div 
                        className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br from-primary-500/10 to-primary-500/30 dark:from-primary-400/15 dark:to-primary-400/40 z-0"
                        animate={{
                          x: position * -5,
                          y: position * 5,
                          scale: position === 0 ? 1.1 : 1,
                          opacity: position === 0 ? 0.8 : 0.5,
                        }}
                        transition={{ duration: 0.8 }}
                      />
                      <motion.div 
                        className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-gradient-to-tr from-gray-400/20 to-gray-200/30 dark:from-gray-500/20 dark:to-gray-400/30 z-0"
                        animate={{
                          x: position * 8,
                          y: position * -3,
                          scale: position === 0 ? 1.2 : 1,
                          opacity: position === 0 ? 0.8 : 0.5,
                        }}
                        transition={{ duration: 0.8 }}
                      />
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between items-center mt-8">
          <motion.button
            onClick={() => handleCardNavigation(activeIndex - 1)}
            className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={activeIndex === 0}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </motion.button>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {activeIndex + 1} / {features.length}
          </div>
          
          <motion.button
            onClick={() => handleCardNavigation(activeIndex + 1)}
            className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={activeIndex === features.length - 1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </motion.button>
        </div>
      </div>
      
      {/* Background Decorations - Fixed position even during card scrolling */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary-500/10 dark:bg-primary-400/10 blur-3xl"
          animate={{
            x: [0, 20, -20, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-primary-400/10 dark:bg-primary-300/10 blur-3xl"
          animate={{
            x: [0, -40, 40, 0],
            y: [0, 40, -40, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-blue-500/5 dark:bg-blue-400/5 blur-3xl"
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -20, 20, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </div>
    </section>
  );
}