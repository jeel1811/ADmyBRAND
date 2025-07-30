'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  target?: string;
  rel?: string;
  prefetch?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>((
  {
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled,
    children,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    href,
    target,
    rel,
    prefetch,
    ...props
  },
  ref
) => {
  // Base button styles
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-teal/50 focus-visible:ring-2 focus-visible:ring-primary-teal/50';
  
  // Size variations
  const sizeStyles = {
    sm: 'text-sm px-4 py-2 h-9',
    md: 'text-base px-5 py-2.5 h-11',
    lg: 'text-lg px-6 py-3 h-12',
  };
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-primary-deepIndigo text-white hover:bg-primary-indigoLight shadow-md hover:shadow-lg active:shadow-sm animate-pulse-subtle',
    secondary: 'bg-transparent border border-primary-teal text-primary-deepIndigo hover:bg-primary-teal/10 hover:border-primary-tealLight',
    ghost: 'bg-transparent text-primary-deepIndigo hover:bg-neutral-100 dark:hover:bg-neutral-800',
  };
  
  // Loading and disabled styles
  const stateStyles = (isLoading || disabled) 
    ? 'opacity-70 cursor-not-allowed pointer-events-none' 
    : 'cursor-pointer';
  
  // Full width style
  const widthStyle = fullWidth ? 'w-full' : '';
  
  // Combine all styles
  const buttonStyles = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    stateStyles,
    widthStyle,
    className
  );
  
  // Animation variants
  const buttonAnimations = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    },
    initial: {
      scale: 1
    }
  };
  
  // Loading spinner component
  const LoadingSpinner = () => (
    <svg 
      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
  
  // Set default target and rel for external links
  if (href.startsWith('http') && !target) {
    target = '_blank';
  }
  
  if (target === '_blank' && !rel) {
    rel = 'noopener noreferrer';
  }
  
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={buttonAnimations}
    >
      <Link 
        href={href} 
        prefetch={prefetch}
        ref={ref}
        className={buttonStyles}
        target={target}
        rel={rel}
        {...props}
      >
        {isLoading && <LoadingSpinner />}
        {icon && iconPosition === 'left' && !isLoading && (
          <span className="mr-2">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="ml-2">{icon}</span>
        )}
      </Link>
    </motion.div>
  );
});

ButtonLink.displayName = 'ButtonLink';

export { ButtonLink };