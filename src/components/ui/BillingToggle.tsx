'use client';

import { motion } from 'framer-motion';
import { ToggleSwitch } from '@/components/ui/ToggleSwitch';
import { cn } from '@/lib/utils';

export interface BillingToggleProps {
  isAnnual: boolean;
  onChange: (isAnnual: boolean) => void;
  className?: string;
  showSaveBadge?: boolean;
  savePercentage?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function BillingToggle({
  isAnnual,
  onChange,
  className,
  size = 'md',
}: BillingToggleProps) {
  return (
    <div className={cn('relative flex items-center justify-center h-12', className)}>
      <motion.div 
        className="flex items-center justify-center space-x-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.span 
          className={cn(
            'text-sm font-medium transition-colors duration-300 w-16 text-center',
            !isAnnual ? 'text-primary-teal font-bold' : 'text-neutral-500 dark:text-neutral-400'
          )}
          // Remove x movement to prevent layout shift
        >
          Monthly
        </motion.span>
        
        <ToggleSwitch
          isChecked={isAnnual}
          onChange={onChange}
          size={size}
        />
        
        <motion.span 
          className={cn(
            'text-sm font-medium transition-colors duration-300 w-16 text-center',
            isAnnual ? 'text-primary-teal font-bold' : 'text-neutral-500 dark:text-neutral-400'
          )}
          // Remove x movement to prevent layout shift
        >
          Annual
        </motion.span>
      </motion.div>
      
      {/* Position the badge absolutely to prevent layout shifts */}
      {/* <AnimatePresence>
        {isAnnual && showSaveBadge && (
          <motion.span 
            className="absolute right-0 top-0 -mt-2 -mr-2 inline-flex items-center rounded-full bg-primary-teal/10 px-3 py-1 text-xs font-medium text-primary-teal border border-primary-teal/20 shadow-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          >
            Save {savePercentage}%
          </motion.span>
        )}
      </AnimatePresence> */}
    </div>
  );
}