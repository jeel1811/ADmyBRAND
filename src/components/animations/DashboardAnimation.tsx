'use client';

import { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DashboardAnimationProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}

export function DashboardAnimation({
  className,
  width = '100%',
  height = 'auto',
  style,
}: DashboardAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();

  // Animate dashboard elements when in view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

  // Animation variants for floating elements
  // const floatingVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       delay: 0.3,
  //       duration: 0.6,
  //       ease: "easeOut",
  //     },
  //   },
  // };

  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden rounded-xl', className)}
      style={{ width, height, ...style }}
    >
      {/* Dashboard Background with Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 z-10" />
      
      {/* SVG Dashboard */}
      <div className="relative w-full h-full z-0">
        <object
          type="image/svg+xml"
          data="/dashboard.svg"
          className="w-full h-full"
          aria-label="Interactive dashboard visualization"
        >
          {/* Fallback content */}
          <div className="w-full h-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 rounded-xl">
            <p className="text-neutral-500">Dashboard Visualization</p>
          </div>
        </object>
      </div>

      

      

      {/* Animated Pulse Effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-primary-500/10 z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}