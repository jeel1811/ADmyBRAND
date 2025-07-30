'use client';

import { forwardRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

// Helper types to exclude conflicting HTML props for motion components
type MotionDivProps = Omit<React.HTMLAttributes<HTMLDivElement>, 
  'onDrag' | 'onDragEnd' | 'onDragEnter' | 'onDragExit' | 'onDragLeave' | 'onDragOver' | 'onDragStart' | 'onDrop' |
  'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onTransitionEnd'
>;

type MotionHeadingProps = Omit<React.HTMLAttributes<HTMLHeadingElement>, 
  'onDrag' | 'onDragEnd' | 'onDragEnter' | 'onDragExit' | 'onDragLeave' | 'onDragOver' | 'onDragStart' | 'onDrop' |
  'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onTransitionEnd'
>;

type MotionParagraphProps = Omit<React.HTMLAttributes<HTMLParagraphElement>, 
  'onDrag' | 'onDragEnd' | 'onDragEnter' | 'onDragExit' | 'onDragLeave' | 'onDragOver' | 'onDragStart' | 'onDrop' |
  'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onTransitionEnd'
>;

export interface CardProps extends MotionDivProps {
  variant?: 'default' | 'feature' | 'testimonial' | 'pricing';
  isHoverable?: boolean;
  isGlass?: boolean;
}

// Define the Card component type with its subcomponents
type CardComponent = React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> & {
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  Description: typeof CardDescription;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
}

const Card = forwardRef<HTMLDivElement, CardProps>((
  {
    className,
    variant = 'default',
    isHoverable = false,
    isGlass = false,
    children
  },
  ref
) => {
  // Base card styles
  const baseStyles = 'rounded-xl overflow-hidden';
  
  // Variant styles
  const variantStyles = {
    default: 'bg-white dark:bg-neutral-800 shadow-md p-6',
    feature: 'bg-white dark:bg-neutral-800 shadow-lg p-6 flex flex-col items-center text-center',
    testimonial: 'bg-white dark:bg-neutral-800 shadow-md p-6 border-l-4 border-primary-teal',
    pricing: 'bg-white dark:bg-neutral-800 shadow-xl p-8 flex flex-col',
  };
  
  // Glass effect
  const glassStyle = isGlass ? 'glass' : '';
  
  // Hover effect
  const hoverStyle = isHoverable ? 'glass-hover transition-all duration-300 hover:-translate-y-1 hover:shadow-xl' : '';
  
  // Combine all styles
  const cardStyles = cn(
    baseStyles,
    variantStyles[variant],
    glassStyle,
    hoverStyle,
    className
  );
  
  // Enhanced animation variants
  const cardAnimations: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.5,
        delay: 0.1,
      }
    },
    hover: isHoverable ? {
      y: -8,
      scale: 1.03,
      boxShadow: '0 25px 30px -12px rgba(0, 0, 0, 0.15), 0 10px 20px -8px rgba(0, 0, 0, 0.1)',
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 20 
      }
    } : {},
    tap: isHoverable ? {
      y: -2,
      scale: 0.98,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 30 
      }
    } : {}
  };

  return (
    <motion.div
      ref={ref}
      className={cardStyles}
      initial="hidden"
      whileInView="visible"
      whileHover={isHoverable ? "hover" : undefined}
      whileTap={isHoverable ? "tap" : undefined}
      viewport={{ once: true, margin: '-50px' }}
      variants={cardAnimations}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = 'Card';

// Card subcomponents with enhanced animations
const CardHeader = forwardRef<HTMLDivElement, MotionDivProps>(({
  className,
  ...props
},
ref
) => (
  <motion.div
    ref={ref}
    className={cn('mb-4', className)}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1, duration: 0.3 }}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLHeadingElement, MotionHeadingProps>(({
  className,
  ...props
},
ref
) => (
  <motion.h3
    ref={ref}
    className={cn('text-xl font-semibold tracking-tight', className)}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2, duration: 0.3 }}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<HTMLParagraphElement, MotionParagraphProps>(({
  className,
  ...props
},
ref
) => (
  <motion.p
    ref={ref}
    className={cn('text-sm text-neutral-500 dark:text-neutral-400', className)}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3, duration: 0.3 }}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<HTMLDivElement, MotionDivProps>(({
  className,
  ...props
},
ref
) => (
  <motion.div
    ref={ref}
    className={cn('', className)}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 30 }}
    {...props}
  />
));
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, MotionDivProps>(({
  className,
  ...props
},
ref
) => (
  <motion.div
    ref={ref}
    className={cn('mt-auto pt-4', className)}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 30 }}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

// Assign subcomponents to Card
(Card as CardComponent).Header = CardHeader;
(Card as CardComponent).Title = CardTitle;
(Card as CardComponent).Description = CardDescription;
(Card as CardComponent).Content = CardContent;
(Card as CardComponent).Footer = CardFooter;

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };