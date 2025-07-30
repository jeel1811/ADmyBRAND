'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { BillingToggle } from '@/components/ui/BillingToggle';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { cn } from '@/lib/utils';

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: PricingFeature[];
  cta: string;
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    description: 'Perfect for small businesses and solo marketers.',
    monthlyPrice: 99,
    annualPrice: 79,
    features: [
      { name: 'AI Campaign Creation', included: true },
      { name: 'Up to 3 Ad Platforms', included: true },
      { name: 'Basic Analytics', included: true },
      { name: 'Email Support', included: true },
      { name: 'Cross-Channel Optimization', included: false },
      { name: 'Predictive Analytics', included: false },
      { name: 'Custom Integrations', included: false },
      { name: 'Dedicated Account Manager', included: false },
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Professional',
    description: 'Ideal for growing marketing teams and agencies.',
    monthlyPrice: 249,
    annualPrice: 199,
    features: [
      { name: 'AI Campaign Creation', included: true },
      { name: 'Unlimited Ad Platforms', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: 'Priority Support', included: true },
      { name: 'Cross-Channel Optimization', included: true },
      { name: 'Predictive Analytics', included: true },
      { name: 'Custom Integrations', included: false },
      { name: 'Dedicated Account Manager', included: false },
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For large organizations with complex marketing needs.',
    monthlyPrice: 499,
    annualPrice: 399,
    features: [
      { name: 'AI Campaign Creation', included: true },
      { name: 'Unlimited Ad Platforms', included: true },
      { name: 'Advanced Analytics', included: true },
      { name: '24/7 Premium Support', included: true },
      { name: 'Cross-Channel Optimization', included: true },
      { name: 'Predictive Analytics', included: true },
      { name: 'Custom Integrations', included: true },
      { name: 'Dedicated Account Manager', included: true },
    ],
    cta: 'Contact Sales',
  },
];

interface PricingProps {
  className?: string;
}

export function Pricing({ className }: PricingProps) {
  const [isAnnual, setIsAnnual] = useState(true);

  const toggleBilling = () => {
    setIsAnnual(!isAnnual);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section
      id="pricing"
      className={cn('py-20 bg-gradient-to-b from-gray-50/90 via-white/90 to-gray-50/90 dark:from-gray-900/90 dark:via-gray-800/90 dark:to-gray-900/90 relative overflow-hidden', className)}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary-500/5 dark:bg-primary-400/5 blur-3xl"
          animate={{
            x: [0, 20, -20, 0],
            y: [0, -30, 30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-primary-400/5 dark:bg-primary-300/5 blur-3xl"
          animate={{
            x: [0, -40, 40, 0],
            y: [0, 40, -40, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </div>
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
              Choose the plan that&apos;s right for your business. All plans include a 14-day free trial.
            </p>

            <div className="flex justify-center items-center">
              <BillingToggle 
                isAnnual={isAnnual} 
                onChange={toggleBilling} 
                showSaveBadge={true}
                savePercentage={20}
                size="md"
              />
            </div>
          </div>
        </ScrollReveal>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {pricingPlans.map((plan, index) => (
            <ScrollReveal key={plan.name} delay={index * 0.1}>
              <PricingCard plan={plan} isAnnual={isAnnual} />
            </ScrollReveal>
          ))}
        </motion.div>

        <ScrollReveal delay={0.4}>
          <div className="mt-16 text-center max-w-3xl mx-auto p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
            <h3 className="text-xl font-heading font-semibold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
              Need a custom solution?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4">
              Contact our sales team for a tailored plan that meets your specific requirements.
            </p>
            <ButtonLink href="#contact" variant="secondary" size="lg" className="hover:bg-primary-500 hover:text-white dark:hover:bg-primary-400 transition-colors">
              Contact Sales
            </ButtonLink>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function PricingCard({ plan, isAnnual }: { plan: PricingPlan; isAnnual: boolean }) {
  const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

  return (
    <Card
      variant="pricing"
      isHoverable={true}
      className={cn(
        'h-full transition-all duration-300 overflow-visible bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700',
        plan.popular && 'scale-105 shadow-xl z-10 border-primary-500/50 dark:border-primary-400/50'
      )}
    >
      {plan.popular && (
        <motion.div 
          className="absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-500 dark:bg-primary-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 20 }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: '0 4px 12px rgba(var(--color-primary-500-rgb), 0.25)' 
          }}
        >
          Most Popular
        </motion.div>
      )}
      <div className="p-6 pb-4 relative z-10">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent mb-2">{plan.name}</h3>
        <p className="text-gray-600 dark:text-gray-300">{plan.description}</p>
        <motion.div 
          className="mt-4 mb-2"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
        >
          <motion.div 
            className="flex items-baseline"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ 
              repeat: 0, 
              repeatType: "reverse", 
              duration: 0.8,
              delay: 1
            }}
          > 
            <span className="text-4xl font-bold text-primary-500 dark:text-primary-400">${price}</span>
            <span className="text-neutral-500 dark:text-neutral-400 ml-2">/mo</span>
          </motion.div>
          {isAnnual && (
            <motion.div 
              className="text-sm text-primary-600 dark:text-primary-300 mt-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Billed annually (${price * 12}/year)
            </motion.div>
          )}
        </motion.div>
      </div>
      <div className="px-6 py-4">
        <motion.ul 
          className="space-y-3 mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
              }
            },
            hidden: {}
          }}
        >
          {plan.features.map((feature) => (
            <motion.li
              key={feature.name}
              className={cn(
                'flex items-center',
                !feature.included && 'text-neutral-400 dark:text-neutral-500'
              )}
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { type: 'spring', stiffness: 300, damping: 20 }
                }
              }}
              whileHover={feature.included ? { x: 5 } : {}}
            >
              {feature.included ? (
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary-500 dark:text-primary-400 mr-2 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </motion.svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-neutral-400 mr-2 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              {feature.name}
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <div className="px-6 pb-6 pt-2">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          <ButtonLink
            variant={plan.popular ? 'primary' : 'secondary'}
            size="lg"
            className="w-full"
            href={plan.name === 'Enterprise' ? '#contact' : '#get-started'}
          >
            {plan.cta}
          </ButtonLink>
        </motion.div>
      </div>
    </Card>
  );
}