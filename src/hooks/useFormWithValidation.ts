import { useState } from 'react';
import { useForm, UseFormProps, FieldValues, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface UseFormWithValidationProps<T extends FieldValues> extends UseFormProps<T> {
  schema: z.ZodType<T>;
  onSubmit: (data: T) => void | Promise<void>;
}

interface UseFormWithValidationReturn<T extends FieldValues> extends UseFormReturn<T> {
  isSubmitting: boolean;
  isSubmitSuccessful: boolean;
  submitError: string | null;
  handleSubmitWithValidation: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export function useFormWithValidation<T extends FieldValues>({
  schema,
  onSubmit,
  ...formProps
}: UseFormWithValidationProps<T>): UseFormWithValidationReturn<T> {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<T>({
    ...formProps,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
  });

  const handleSubmitWithValidation = async (e?: React.BaseSyntheticEvent) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setIsSubmitSuccessful(false);

    try {
      await form.handleSubmit(async (data) => {
        try {
          await onSubmit(data);
          setIsSubmitSuccessful(true);
        } catch (error) {
          setSubmitError(error instanceof Error ? error.message : 'An error occurred');
          console.error('Form submission error:', error);
        }
      })(e);
    } catch (error) {
      setSubmitError('Form validation failed');
      console.error('Form validation error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    ...form,
    isSubmitting,
    isSubmitSuccessful,
    submitError,
    handleSubmitWithValidation,
  };
}

// Common validation schemas
export const emailSchema = z
  .string()
  .min(1, { message: 'Email is required' })
  .email({ message: 'Invalid email address' });

export const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' });

export const nameSchema = z
  .string()
  .min(2, { message: 'Name must be at least 2 characters' })
  .max(50, { message: 'Name must be less than 50 characters' });

export const phoneSchema = z
  .string()
  .min(10, { message: 'Phone number must be at least 10 digits' })
  .regex(/^[0-9+\-\s()]*$/, { message: 'Invalid phone number format' });

export const urlSchema = z
  .string()
  .url({ message: 'Invalid URL format' });

export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  company: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

export const newsletterSchema = z.object({
  email: emailSchema,
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type NewsletterFormValues = z.infer<typeof newsletterSchema>;