'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormWithValidation, contactFormSchema, ContactFormValues } from '@/hooks/useFormWithValidation';
import { Button } from '@/components/ui/Button';
import { Input, TextArea } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    formState: { errors, touchedFields },
    reset,
    isSubmitting,
    submitError,
    handleSubmitWithValidation
  } = useFormWithValidation<ContactFormValues>({
    schema: contactFormSchema,
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: ''
    },
    mode: 'onChange',
    onSubmit: async (data) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', data);
      
      // Show success animation
      setShowSuccessAnimation(true);
      setIsSubmitted(true);
      
      // Hide success animation and close modal after 3 seconds
      setTimeout(() => {
        setShowSuccessAnimation(false);
        setIsSubmitted(false);
        reset();
        onClose();
      }, 3000);
    }
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 30,
        stiffness: 400,
        mass: 0.8
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.15,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Success animation variants
  const successVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 500,
        damping: 25
      }
    }
  };

  const checkmarkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pt-20 pb-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className={cn(
              "relative w-full max-w-xl mx-auto my-4",
              "bg-white/10 dark:bg-gray-900/10 backdrop-blur-3xl",
              "border border-white/20 dark:border-gray-700/30 rounded-3xl shadow-2xl",
              "overflow-hidden max-h-[80vh]"
            )}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Simplified background decorative elements for better performance */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              <div className="absolute top-1/4 right-1/4 w-24 h-24 rounded-full bg-primary-teal/15 dark:bg-primary-teal/8 blur-2xl" />
              <div className="absolute bottom-1/4 left-1/3 w-32 h-32 rounded-full bg-accent-purple/15 dark:bg-accent-purple/8 blur-2xl" />
            </div>

            {/* Header with fixed positioning */}
            <div className="sticky top-0 z-20 flex items-center justify-between p-4 border-b border-white/10 dark:border-gray-700/20 bg-white/5 dark:bg-gray-900/5 backdrop-blur-xl">
              <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">
                Get in Touch
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 dark:bg-gray-900/10 hover:bg-white/20 dark:hover:bg-gray-900/20 border border-white/20 dark:border-gray-700/30 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group backdrop-blur-xl"
                aria-label="Close contact form"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Form Content with scroll */}
            <div className="max-h-[calc(80vh-80px)] overflow-y-auto p-4 relative z-10 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
              <AnimatePresence mode="wait">
                {showSuccessAnimation ? (
                  // Success Animation
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center py-12"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={successVariants}
                  >
                    <motion.div
                      className="w-20 h-20 rounded-full bg-green-500/20 dark:bg-green-400/20 backdrop-blur-sm flex items-center justify-center mb-6 border border-green-500/30 dark:border-green-400/30"
                      variants={successVariants}
                    >
                      <svg
                        className="w-10 h-10 text-green-600 dark:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <motion.path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                          variants={checkmarkVariants}
                        />
                      </svg>
                    </motion.div>
                    <motion.h4
                      className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Message Sent Successfully!
                    </motion.h4>
                    <motion.p
                      className="text-gray-600 dark:text-gray-300 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Thank you for reaching out. Our team will contact you shortly.
                    </motion.p>
                    <motion.div
                      className="flex space-x-2 mt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-primary-teal rounded-full"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                ) : (
                  // Contact Form
                  <motion.div
                    key="form"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                  >
                    <motion.p 
                      className="text-center text-gray-600 dark:text-gray-300 mb-8 text-lg"
                      variants={itemVariants}
                    >
                      Have questions about our AI Suite? Fill out the form below and our team will get back to you shortly.
                    </motion.p>
                  
                    <form onSubmit={handleSubmitWithValidation} className="space-y-6">
                      <motion.div variants={itemVariants}>
                        <Input
                          label="Name"
                          placeholder="Your name"
                          error={errors.name?.message}
                          isSuccess={touchedFields.name && !errors.name}
                          className="bg-white/10 dark:bg-gray-900/10 border-white/20 dark:border-gray-700/30 text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400 focus:border-primary-teal focus:ring-primary-teal/20 backdrop-blur-sm"
                          {...register('name')}
                        />
                      </motion.div>
                      
                      <motion.div variants={itemVariants}>
                        <Input
                          label="Email"
                          type="email"
                          placeholder="your.email@example.com"
                          error={errors.email?.message}
                          isSuccess={touchedFields.email && !errors.email}
                          className="bg-white/10 dark:bg-gray-900/10 border-white/20 dark:border-gray-700/30 text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400 focus:border-primary-teal focus:ring-primary-teal/20 backdrop-blur-sm"
                          {...register('email')}
                        />
                      </motion.div>
                      
                      <motion.div variants={itemVariants}>
                        <Input
                          label="Company (Optional)"
                          placeholder="Your company name"
                          className="bg-white/10 dark:bg-gray-900/10 border-white/20 dark:border-gray-700/30 text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400 focus:border-primary-teal focus:ring-primary-teal/20 backdrop-blur-sm"
                          {...register('company')}
                        />
                      </motion.div>
                      
                      <motion.div variants={itemVariants}>
                        <TextArea
                          label="Message"
                          placeholder="Tell us what you're looking for..."
                          rows={4}
                          error={errors.message?.message}
                          isSuccess={touchedFields.message && !errors.message}
                          className="bg-white/10 dark:bg-gray-900/10 border-white/20 dark:border-gray-700/30 text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400 focus:border-primary-teal focus:ring-primary-teal/20 backdrop-blur-sm"
                          {...register('message')}
                        />
                      </motion.div>
                      
                      {submitError && (
                        <motion.div 
                          className="p-4 rounded-xl bg-red-500/10 dark:bg-red-500/20 border border-red-500/30 dark:border-red-500/40 text-red-700 dark:text-red-300 text-sm backdrop-blur-sm"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          {submitError}
                        </motion.div>
                      )}
                      
                      <motion.div 
                        className="flex justify-center pt-4"
                        variants={itemVariants}
                      >
                        <Button 
                          type="submit" 
                          variant="primary" 
                          size="lg" 
                          isLoading={isSubmitting}
                          disabled={isSubmitting || isSubmitted}
                          className="w-full bg-gradient-to-r from-primary-teal to-primary-indigoLight hover:from-primary-teal/90 hover:to-primary-indigoLight/90 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/20"
                        >
                          Send Message
                        </Button>
                      </motion.div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
