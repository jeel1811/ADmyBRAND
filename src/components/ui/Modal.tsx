'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  showCloseButton = true,
  closeOnOutsideClick = true,
  closeOnEsc = true,
  size = 'md',
}: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Handle mounting on client side only
  useEffect(() => {
    setIsMounted(true);
    
    // Add body scroll lock when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeOnEsc, isOpen, onClose]);

  // Handle outside click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOutsideClick && overlayRef.current === e.target) {
      onClose();
    }
  };

  // Size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-[90vw] max-h-[90vh]',
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2, delay: 0.1 }
    }
  };

  const modalVariants = {
    hidden: { 
      scale: 0.9,
      opacity: 0,
      y: 20
    },
    visible: { 
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { 
        type: 'spring',
        damping: 25,
        stiffness: 300,
        duration: 0.3
      }
    },
    exit: { 
      scale: 0.9,
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  // Don't render on server
  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={handleOverlayClick}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className={cn(
              'relative bg-white dark:bg-neutral-800 rounded-xl shadow-xl overflow-hidden',
              sizeClasses[size],
              className
            )}
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {showCloseButton && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 rounded-full text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
            
            <div className="p-6">
              {title && (
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
              )}
              {description && (
                <p className="text-neutral-500 dark:text-neutral-400 mb-4">{description}</p>
              )}
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

// Modal subcomponents
export const ModalHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-4', className)} {...props} />
);

export const ModalBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('my-4', className)} {...props} />
);

export const ModalFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-6 flex justify-end gap-3', className)} {...props} />
);