'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useFormWithValidation, contactFormSchema, ContactFormValues } from '@/hooks/useFormWithValidation';
import { Button } from '@/components/ui/Button';
import { Input, TextArea } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { cn } from '@/lib/utils';

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formHover, setFormHover] = useState(false);
  
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
      setShowSuccessModal(true);
      reset();
    }
  });

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
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

  return (
    <>
      <section
        id="contact"
        className={cn('py-20 bg-gradient-to-b from-gray-50/90 via-white/90 to-gray-50/90 dark:from-gray-900/90 dark:via-gray-800/90 dark:to-gray-900/90 relative overflow-hidden', className)}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary-teal/10 dark:bg-primary-teal/5 blur-3xl"
            animate={{
              x: formHover ? [0, 30, -30, 0] : [0, 20, -20, 0],
              y: formHover ? [0, -40, 40, 0] : [0, -30, 30, 0],
              scale: formHover ? [1, 1.2, 0.8, 1] : [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: formHover ? 12 : 15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-accent-purple/10 dark:bg-accent-purple/5 blur-3xl"
            animate={{
              x: formHover ? [0, -50, 50, 0] : [0, -40, 40, 0],
              y: formHover ? [0, 50, -50, 0] : [0, 40, -40, 0],
              scale: formHover ? [1, 0.8, 1.2, 1] : [1, 0.9, 1.1, 1],
            }}
            transition={{
              duration: formHover ? 18 : 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gray-900 dark:text-white"
              variants={itemVariants}
            >
              Get in Touch
            </motion.h2>
            <motion.p 
              className="text-xl text-neutral-600 dark:text-neutral-300"
              variants={itemVariants}
            >
              Have questions about our AI Suite? Fill out the form below and our team will get back to you shortly.
            </motion.p>
          </motion.div>

          <motion.div
            className="max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div 
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-100 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl p-8 relative z-10"
              variants={itemVariants}
              onHoverStart={() => setFormHover(true)}
              onHoverEnd={() => setFormHover(false)}
            >
              <form onSubmit={handleSubmitWithValidation} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <Input
                    label="Name"
                    placeholder="Your name"
                    error={errors.name?.message}
                    isSuccess={touchedFields.name && !errors.name}
                    className="bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary-teal focus:ring-primary-teal/20 dark:focus:border-primary-teal dark:focus:ring-primary-teal/20"
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
                    className="bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary-teal focus:ring-primary-teal/20 dark:focus:border-primary-teal dark:focus:ring-primary-teal/20"
                    {...register('email')}
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Input
                    label="Company (Optional)"
                    placeholder="Your company name"
                    className="bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary-teal focus:ring-primary-teal/20 dark:focus:border-primary-teal dark:focus:ring-primary-teal/20"
                    {...register('company')}
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <TextArea
                    label="Message"
                    placeholder="Tell us what you're looking for..."
                    rows={5}
                    error={errors.message?.message}
                    isSuccess={touchedFields.message && !errors.message}
                    className="bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-primary-teal focus:ring-primary-teal/20 dark:focus:border-primary-teal dark:focus:ring-primary-teal/20"
                    {...register('message')}
                  />
                </motion.div>
                
                {submitError && (
                  <motion.div 
                    className="p-4 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-300 text-sm"
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
                    disabled={isSubmitting}
                    className="w-full md:w-auto min-w-[200px] bg-gradient-to-r from-primary-teal to-primary-indigoLight hover:from-primary-teal/90 hover:to-primary-indigoLight/90 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Send Message
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex justify-center items-center space-x-6 text-sm text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Response within 24 hours</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Your data is secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Free consultation</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Modal
        isOpen={showSuccessModal}
        onClose={closeSuccessModal}
        title="Message Sent!"
        description="Thank you for reaching out. Our team will contact you shortly."
        size="md"
      >
        <motion.div 
          className="flex justify-center mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Button 
            onClick={closeSuccessModal} 
            variant="primary"
            className="bg-gradient-to-r from-primary-teal to-primary-indigoLight text-white"
          >
            Close
          </Button>
        </motion.div>
      </Modal>
    </>
  );
}
