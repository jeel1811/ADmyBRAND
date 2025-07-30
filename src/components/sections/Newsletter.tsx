'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useFormWithValidation, newsletterSchema, NewsletterFormValues } from '@/hooks/useFormWithValidation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

interface NewsletterProps {
  className?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  compact?: boolean;
}

export function Newsletter({
  className,
  title = 'Stay Updated',
  description = 'Subscribe to our newsletter for the latest updates and insights.',
  buttonText = 'Subscribe',
  compact = false,
}: NewsletterProps) {
  const [subscribed, setSubscribed] = useState(false);

  const {
    register,
    formState: { errors, touchedFields },
    reset,
    isSubmitting,
    handleSubmitWithValidation,
  } = useFormWithValidation<NewsletterFormValues>({
    schema: newsletterSchema,
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
    onSubmit: async (data) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log('Newsletter subscription:', data);
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        reset();
      }, 5000);
    },
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className={cn(
        'w-full rounded-xl',
        compact ? 'p-0' : 'p-6 glass',
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
    >
      {!compact && (
        <>
          <motion.h3
            className="text-2xl font-heading font-semibold mb-2"
            variants={itemVariants}
          >
            {title}
          </motion.h3>
          <motion.p
            className="text-neutral-600 dark:text-neutral-300 mb-6"
            variants={itemVariants}
          >
            {description}
          </motion.p>
        </>
      )}

      <motion.form
        onSubmit={handleSubmitWithValidation}
        className={cn(
          'flex flex-col sm:flex-row gap-3',
          compact ? 'items-start' : 'items-end'
        )}
        variants={itemVariants}
      >
        <div className="flex-1 w-full">
          <Input
            label={compact ? undefined : 'Email Address'}
            placeholder="your.email@example.com"
            type="email"
            error={errors.email?.message}
            isSuccess={touchedFields.email && !errors.email}
            {...register('email')}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size={compact ? 'md' : 'lg'}
          isLoading={isSubmitting}
          disabled={isSubmitting || subscribed}
          className={compact ? 'mt-0' : 'mt-0'}
        >
          {buttonText}
        </Button>
      </motion.form>

      {subscribed && (
        <motion.div
          className="mt-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm flex items-center"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={successVariants}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 flex-shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Thank you for subscribing! Check your inbox soon.</span>
        </motion.div>
      )}
    </motion.div>
  );
}