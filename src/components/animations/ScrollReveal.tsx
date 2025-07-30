'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

export interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom' | 'flip' | 'rotate';
  delay?: number;
  duration?: number;
  threshold?: number;
  margin?: string;
  once?: boolean;
  staggerChildren?: boolean;
  staggerDelay?: number;
  staggerChildrenSelector?: string;
}

export function ScrollReveal({
  children,
  className,
  animation = 'fade',
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  margin = '0px',
  once = true,
  staggerChildren = false,
  staggerDelay = 0.1,
  staggerChildrenSelector,
}: ScrollRevealProps) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once,
    rootMargin: margin,
  });

  // Animation variants
  const getVariants = () => {
    const baseTransition = {
      duration,
      delay,
      ease: 'easeOut' as const,
    };

    // Use any type to avoid complex framer-motion typing issues
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const variants: any = {
      hidden: {},
      visible: {},
    };

    switch (animation) {
      case 'fade':
        variants.hidden = { opacity: 0 };
        variants.visible = { 
          opacity: 1, 
          transition: baseTransition 
        };
        break;
      case 'slide-up':
        variants.hidden = { opacity: 0, y: 50 };
        variants.visible = { 
          opacity: 1, 
          y: 0, 
          transition: staggerChildren ? {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          } : baseTransition
        };
        break;
      case 'slide-down':
        variants.hidden = { opacity: 0, y: -50 };
        variants.visible = { 
          opacity: 1, 
          y: 0, 
          transition: staggerChildren ? {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          } : baseTransition
        };
        break;
      case 'slide-left':
        variants.hidden = { opacity: 0, x: 50 };
        variants.visible = { 
          opacity: 1, 
          x: 0, 
          transition: staggerChildren ? {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          } : baseTransition
        };
        break;
      case 'slide-right':
        variants.hidden = { opacity: 0, x: -50 };
        variants.visible = { 
          opacity: 1, 
          x: 0, 
          transition: staggerChildren ? {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          } : baseTransition
        };
        break;
      case 'zoom':
        variants.hidden = { opacity: 0, scale: 0.8 };
        variants.visible = { 
          opacity: 1, 
          scale: 1, 
          transition: staggerChildren ? {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          } : baseTransition
        };
        break;
      case 'flip':
        variants.hidden = { opacity: 0, rotateY: 90 };
        variants.visible = { 
          opacity: 1, 
          rotateY: 0, 
          transition: staggerChildren ? {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          } : baseTransition
        };
        break;
      case 'rotate':
        variants.hidden = { opacity: 0, rotate: -15 };
        variants.visible = { 
          opacity: 1, 
          rotate: 0, 
          transition: staggerChildren ? {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          } : baseTransition
        };
        break;
      default:
        variants.hidden = { opacity: 0 };
        variants.visible = { opacity: 1, transition: baseTransition };
    }

    return variants;
  };

  // Child variants for staggered animations
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      variants={getVariants() as any}
    >
      {staggerChildren && staggerChildrenSelector ? (
        // Apply staggered animation to specific child elements
        <>
          {Array.isArray(children) ? (
            children.map((child, index) => {
              if (React.isValidElement(child)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return React.cloneElement(child as React.ReactElement<any>, {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ...(child.props as any),
                  key: index,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  className: cn((child.props as any).className, staggerChildrenSelector),
                  variants: childVariants,
                });
              }
              return child;
            })
          ) : (
            children
          )}
        </>
      ) : (
        // No staggering, just render children
        children
      )}
    </motion.div>
  );
}

export interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  threshold?: number;
  margin?: string;
  once?: boolean;
}

export function StaggerContainer({
  children,
  className,
  delay = 0,
  staggerDelay = 0.1,
  threshold = 0.1,
  margin = '0px',
  once = true,
}: StaggerContainerProps) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once,
    rootMargin: margin,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom' | 'flip' | 'rotate';
}

export function StaggerItem({
  children,
  className,
  animation = 'slide-up',
}: StaggerItemProps) {
  // Animation variants
  const getVariants = () => {
    switch (animation) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      case 'slide-up':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              y: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
            },
          },
        };
      case 'slide-down':
        return {
          hidden: { opacity: 0, y: -20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              y: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
            },
          },
        };
      case 'slide-left':
        return {
          hidden: { opacity: 0, x: 20 },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: {
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
            },
          },
        };
      case 'slide-right':
        return {
          hidden: { opacity: 0, x: -20 },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: {
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
            },
          },
        };
      case 'zoom':
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
              scale: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
            },
          },
        };
      case 'flip':
        return {
          hidden: { opacity: 0, rotateY: 90 },
          visible: { 
            opacity: 1, 
            rotateY: 0,
            transition: {
              rotateY: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
            },
          },
        };
      case 'rotate':
        return {
          hidden: { opacity: 0, rotate: -15 },
          visible: { 
            opacity: 1, 
            rotate: 0,
            transition: {
              rotate: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
            },
          },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  return (
    <motion.div
      className={cn(className)}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      variants={getVariants() as any}
    >
      {children}
    </motion.div>
  );
}