'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ToggleSwitchProps {
  isChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  labelPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  id?: string;
  leftLabel?: string;
  rightLabel?: string;
}

export function ToggleSwitch({
  isChecked: isCheckedProp,
  onChange,
  label,
  labelPosition = 'right',
  size = 'md',
  disabled = false,
  className,
  id,
  leftLabel,
  rightLabel,
}: ToggleSwitchProps) {
  const [isChecked, setIsChecked] = useState(isCheckedProp || false);

  // Update internal state when prop changes
  useEffect(() => {
    if (isCheckedProp !== undefined) {
      setIsChecked(isCheckedProp);
    }
  }, [isCheckedProp]);

  const handleToggle = () => {
    if (disabled) return;
    
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  // Size variations
  const sizeStyles = {
    sm: {
      track: 'w-8 h-4',
      thumb: 'w-3 h-3',
      translateX: 16,
      label: 'text-sm',
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translateX: 20,
      label: 'text-base',
    },
    lg: {
      track: 'w-14 h-7',
      thumb: 'w-6 h-6',
      translateX: 28,
      label: 'text-lg',
    },
  };

  const selectedSize = sizeStyles[size];

  return (
    <div className={cn('flex items-center', className)}>
      {leftLabel && (
        <span 
          className={cn(
            selectedSize.label,
            'mr-2',
            isChecked ? 'opacity-50' : 'font-medium',
            disabled && 'opacity-50'
          )}
        >
          {leftLabel}
        </span>
      )}
      
      {label && labelPosition === 'left' && (
        <span className={cn(selectedSize.label, 'mr-2', disabled && 'opacity-50')}>{label}</span>
      )}
      
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          'relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors ease-in-out duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-teal focus-visible:ring-opacity-75',
          'border-2 shadow-md',
          selectedSize.track,
          isChecked 
            ? 'bg-primary-teal border-primary-teal/50 shadow-primary-teal/20' 
            : 'bg-neutral-300 dark:bg-neutral-700 border-neutral-400/30 dark:border-neutral-600/50 shadow-neutral-400/10 dark:shadow-black/20',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <span className="sr-only">{label || 'Toggle'}</span>
        <motion.span
          className={cn(
            'absolute top-1/2 -translate-y-1/2 left-0.5 inline-block rounded-full bg-white shadow-lg',
            selectedSize.thumb
          )}
          animate={{ 
            x: isChecked ? selectedSize.translateX : 0,
            scale: isChecked ? 1.1 : 1,
            boxShadow: isChecked 
              ? '0 0 10px 1px rgba(20, 184, 166, 0.4)' 
              : '0 1px 3px 0px rgba(0, 0, 0, 0.1)',
          }}
          whileHover={{ scale: isChecked ? 1.15 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
            mass: 0.6
          }}
        />
      </button>
      
      {label && labelPosition === 'right' && (
        <span className={cn(selectedSize.label, 'ml-2', disabled && 'opacity-50')}>{label}</span>
      )}
      
      {rightLabel && (
        <span 
          className={cn(
            selectedSize.label,
            'ml-2',
            isChecked ? 'font-medium' : 'opacity-50',
            disabled && 'opacity-50'
          )}
        >
          {rightLabel}
        </span>
      )}
    </div>
  );
}

// PricingToggle component has been moved to BillingToggle.tsx