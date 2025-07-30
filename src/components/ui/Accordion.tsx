'use client';

import { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type AccordionContextType = {
  activeIndex: number | number[] | null;
  setActiveIndex: (index: number | number[] | null) => void;
  allowMultiple: boolean;
};

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultIndex?: number;
  allowMultiple?: boolean;
  children: React.ReactNode;
}

export function Accordion({
  defaultIndex = -1,
  allowMultiple = false,
  className,
  children,
  ...props
}: AccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | number[] | null>(
    defaultIndex >= 0 ? defaultIndex : allowMultiple ? [] : null
  );

  return (
    <AccordionContext.Provider value={{ activeIndex, setActiveIndex, allowMultiple }}>
      <div className={cn('space-y-2', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion compound components must be used within an Accordion component');
  }
  return context;
}

export interface AccordionItemProps {
  title: React.ReactNode;
  index: number;
  isDisabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function AccordionItem({
  title,
  index,
  isDisabled = false,
  className,
  children,
}: AccordionItemProps) {
  const { activeIndex, setActiveIndex, allowMultiple } = useAccordionContext();
  const isActive = allowMultiple 
    ? Array.isArray(activeIndex) && activeIndex.includes(index) 
    : activeIndex === index;

  const toggleAccordion = () => {
    if (isDisabled) return;

    if (allowMultiple) {
      // Handle multiple open items
      if (Array.isArray(activeIndex)) {
        if (activeIndex.includes(index)) {
          setActiveIndex(activeIndex.filter((i) => i !== index));
        } else {
          setActiveIndex([...activeIndex, index]);
        }
      } else {
        setActiveIndex([index]);
      }
    } else {
      // Handle single open item
      setActiveIndex(isActive ? null : index);
    }
  };

  // Animation variants
  const contentVariants = {
    hidden: { 
      height: 0,
      opacity: 0,
      transition: { 
        height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: 0.2 }
      } 
    },
    visible: { 
      height: 'auto',
      opacity: 1,
      transition: { 
        height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: 0.2, delay: 0.1 }
      } 
    }
  } as const;

  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  };

  return (
    <motion.div
      whileHover={{ scale: isActive ? 1 : 1.005 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={cn(
        'border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300',
        isActive && 'shadow-md',
        isDisabled && 'opacity-60 cursor-not-allowed',
        className
      )}
    >
      <button
        type="button"
        onClick={toggleAccordion}
        disabled={isDisabled}
        className={cn(
          'flex justify-between items-center w-full p-5 text-left',
          'focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-colors duration-200',
          isActive 
            ? 'bg-gradient-to-r from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-800/80 text-primary-600 dark:text-primary-400' 
            : 'bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800/80'
        )}
        aria-expanded={isActive}
      >
        <span className={cn(
          "font-medium text-lg",
          isActive 
            ? "text-gray-800 dark:text-gray-200" 
            : "text-gray-800 dark:text-gray-200"
        )}>{title}</span>
        <motion.span
          animate={isActive ? 'open' : 'closed'}
          variants={iconVariants}
          transition={{ duration: 0.3 }}
          className={cn(
            "flex items-center justify-center h-6 w-6 rounded-full",
            isActive 
              ? "bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400" 
              : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={contentVariants}
            className="overflow-hidden"
          >
            <motion.div 
              className="p-5 pt-2 border-t border-neutral-100 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}