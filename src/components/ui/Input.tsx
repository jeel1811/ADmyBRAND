'use client';

import { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  isSuccess?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((
  {
    className,
    label,
    helperText,
    error,
    isSuccess,
    leftIcon,
    rightIcon,
    containerClassName,
    type = 'text',
    id,
    ...props
  },
  ref
) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  // Determine input state for styling
  const hasError = !!error;
  const isSuccessful = !hasError && isSuccess;

  return (
    <div className={cn('space-y-2', containerClassName)}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-neutral-300 dark:text-neutral-200 mb-2"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
            {leftIcon}
          </div>
        )}
        
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(
            'block w-full rounded-lg border bg-neutral-50/50 px-4 py-3 text-neutral-900 transition-all duration-200',
            'placeholder:text-neutral-500 focus:outline-none focus:ring-2 backdrop-blur-sm',
            'dark:bg-neutral-900/60 dark:text-white dark:placeholder:text-neutral-400',
            'shadow-sm hover:shadow-md',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            hasError
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : isSuccessful
              ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
              : isFocused
              ? 'border-primary-teal focus:border-primary-teal focus:ring-primary-teal/20 dark:border-primary-indigoLight dark:focus:border-primary-indigoLight dark:focus:ring-primary-indigoLight/20'
              : 'border-neutral-200 dark:border-neutral-700/60',
            className
          )}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-neutral-500">
            {rightIcon}
          </div>
        )}
        
        {hasError && !rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        
        {isSuccessful && !rightIcon && !hasError && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      
      {(helperText || error) && (
        <p className={cn(
          'text-sm',
          hasError ? 'text-red-500' : 'text-neutral-500 dark:text-neutral-400'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export { Input };

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  isSuccess?: boolean;
  containerClassName?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((
  {
    className,
    label,
    helperText,
    error,
    isSuccess,
    containerClassName,
    id,
    ...props
  },
  ref
) => {
  const [isFocused, setIsFocused] = useState(false);
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

  // Determine textarea state for styling
  const hasError = !!error;
  const isSuccessful = !hasError && isSuccess;

  return (
    <div className={cn('space-y-2', containerClassName)}>
      {label && (
        <label 
          htmlFor={textareaId} 
          className="block text-sm font-medium text-neutral-300 dark:text-neutral-200 mb-2"
        >
          {label}
        </label>
      )}
      
      <textarea
        id={textareaId}
        ref={ref}
        className={cn(
          'block w-full rounded-lg border bg-neutral-50/50 px-4 py-3 text-neutral-900 transition-all duration-200',
          'placeholder:text-neutral-500 focus:outline-none focus:ring-2 min-h-[120px] backdrop-blur-sm',
          'dark:bg-neutral-900/60 dark:text-white dark:placeholder:text-neutral-400',
          'shadow-sm hover:shadow-md resize-none',
          hasError
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            : isSuccessful
            ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
            : isFocused
            ? 'border-primary-teal focus:border-primary-teal focus:ring-primary-teal/20 dark:border-primary-indigoLight dark:focus:border-primary-indigoLight dark:focus:ring-primary-indigoLight/20'
            : 'border-neutral-200 dark:border-neutral-700/60',
          className
        )}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        {...props}
      />
      
      {(helperText || error) && (
        <p className={cn(
          'text-sm',
          hasError ? 'text-red-500' : 'text-neutral-500 dark:text-neutral-400'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';

export { TextArea };