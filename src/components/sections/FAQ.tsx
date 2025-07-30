'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactFormModal } from '../ui/ContactFormModal';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
  category: 'features' | 'integration' | 'support' | 'security';
}

const faqItems: FAQItem[] = [
  {
    question: 'How does the AI-powered campaign creation work?',
    answer: 'Our AI analyzes your historical campaign data, industry benchmarks, and current market trends to generate optimized ad campaigns. It learns from your best performers and continuously improves its recommendations based on real-time performance data. You can either use the AI suggestions as-is or modify them to your preferences before launching.',
    category: 'features'
  },
  {
    question: 'Can I integrate with my existing marketing tools?',
    answer: 'Yes, ADmyBRAND AI Suite integrates seamlessly with major advertising platforms (Google Ads, Meta, LinkedIn, TikTok, etc.), analytics tools (Google Analytics, Adobe Analytics), CRM systems (Salesforce, HubSpot), and marketing automation platforms. We offer both native integrations and API access for custom connections.',
    category: 'integration'
  },
  {
    question: 'Is there a free trial available?',
    answer: 'Yes, we offer a 14-day free trial with full access to all features. No credit card is required to start your trial. After the trial period, you can choose from our flexible pricing plans based on your needs and budget.',
    category: 'features'
  },
  {
    question: 'How secure is my marketing data on your platform?',
    answer: 'Security is our top priority. We use industry-standard encryption for all data in transit and at rest. Our platform is SOC 2 Type II certified, GDPR compliant, and undergoes regular security audits. We never share your data with third parties, and you retain full ownership of all your information.',
    category: 'security'
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'All plans include email and chat support with our technical team. Business and Enterprise plans also include dedicated account managers, priority support, and regular strategy sessions. We also provide comprehensive documentation, video tutorials, and a knowledge base to help you get the most out of our platform.',
    category: 'support'
  },
  {
    question: 'How often do you release new features?',
    answer: 'We follow an agile development process with major feature releases every quarter and smaller updates and improvements released continuously. Our roadmap is partially influenced by customer feedback, and Enterprise customers can request custom features to meet their specific needs.',
    category: 'features'
  },
  {
    question: 'Do you offer white-label solutions?',
    answer: 'Yes, our Enterprise plan includes white-label options where you can customize the platform with your branding, domain, and user experience. This is perfect for agencies looking to offer AI-powered marketing solutions under their own brand.',
    category: 'features'
  },
  {
    question: 'What analytics and reporting features are included?',
    answer: 'Our platform provides comprehensive analytics including campaign performance metrics, audience insights, conversion tracking, ROI analysis, and predictive analytics. You can create custom dashboards, schedule automated reports, and export data in various formats.',
    category: 'features'
  }
];

const categoryColors = {
  features: 'from-primary-teal/20 to-primary-indigoLight/20',
  integration: 'from-accent-purple/20 to-primary-teal/20',
  support: 'from-primary-indigoLight/20 to-accent-purple/20',
  security: 'from-green-400/20 to-primary-teal/20'
};

const categoryIcons = {
  features: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  integration: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
    </svg>
  ),
  support: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
  ),
  security: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  )
};

interface FAQProps {
  className?: string;
}

export function FAQ({ className }: FAQProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };
  return (
    <section
      id="faq"
      className={cn('py-20 bg-gradient-to-b from-gray-50/90 via-white/90 to-gray-50/90 dark:from-gray-900/90 dark:via-gray-800/90 dark:to-gray-900/90 relative overflow-hidden', className)}
    >
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary-teal/8 dark:bg-primary-teal/4 blur-3xl"
          animate={{
            x: [0, 60, -60, 0],
            y: [0, -80, 80, 0],
            scale: [1, 1.3, 0.7, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-accent-purple/8 dark:bg-accent-purple/4 blur-3xl"
          animate={{
            x: [0, -50, 50, 0],
            y: [0, 60, -60, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-primary-indigoLight/6 dark:bg-primary-indigoLight/3 blur-2xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            scale: { duration: 15, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-primary-teal/10 dark:bg-primary-teal/5 rounded-full px-4 py-2 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <svg className="w-5 h-5 text-primary-teal" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-primary-teal">FAQ</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-heading font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Everything you need to know about the ADmyBRAND AI Suite. Can&apos;t find what you&apos;re looking for? 
            <br className="hidden md:block" />
            <span className="text-primary-teal font-medium">Reach out to our team.</span>
          </motion.p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="grid gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                className={cn(
                  "group relative overflow-hidden rounded-2xl transition-all duration-300",
                  openItems.includes(index) 
                    ? "bg-white/95 dark:bg-gray-800/95 shadow-2xl" 
                    : "bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-800/80 shadow-lg hover:shadow-xl"
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ scale: 1.02 }}
              >
                {/* Gradient background based on category */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-20 transition-opacity duration-300",
                  categoryColors[item.category],
                  hoveredCard === index || openItems.includes(index) ? "opacity-30" : "opacity-10"
                )} />
                
                {/* Border gradient */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-teal/20 via-transparent to-accent-purple/20 p-[1px]">
                  <div className="h-full w-full rounded-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm" />
                </div>
                
                <div className="relative z-10 p-6">
                  {/* Question Header */}
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={cn(
                          "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                          `bg-gradient-to-br ${categoryColors[item.category]} border border-white/20 dark:border-gray-700/20`,
                          hoveredCard === index || openItems.includes(index) ? "scale-110 shadow-lg" : ""
                        )}>
                          <span className="text-primary-teal">
                            {categoryIcons[item.category]}
                          </span>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-teal transition-colors duration-200">
                            {item.question}
                          </h3>
                        </div>
                      </div>
                      
                      <motion.div
                        className="flex-shrink-0 ml-4"
                        animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 group-hover:bg-primary-teal/10 dark:group-hover:bg-primary-teal/20 flex items-center justify-center transition-all duration-200">
                          <svg 
                            className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-primary-teal transition-colors duration-200" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </motion.div>
                    </div>
                  </button>
                  
                  {/* Answer Content */}
                  <AnimatePresence>
                    {openItems.includes(index) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <motion.div 
                          className="pt-6 pl-14"
                          initial={{ y: -10 }}
                          animate={{ y: 0 }}
                          exit={{ y: -10 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                        >
                          <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Contact CTA */}
        <motion.div 
          id="contact"
          className="mt-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div 
            className="relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-teal/20 via-primary-indigoLight/20 to-accent-purple/20 blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
            
            {/* Main card */}
            <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 rounded-3xl p-8 text-center shadow-2xl">
              <motion.div
                className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-teal to-primary-indigoLight flex items-center justify-center"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </motion.div>
              
              <h3 className="text-2xl font-heading font-bold mb-3 text-gray-900 dark:text-white">
                Still have questions?
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                Our team of experts is here to help you get started with the ADmyBRAND AI Suite. 
                Get personalized answers and guidance tailored to your needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  onClick={openContactModal}
                  className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-primary-teal to-primary-indigoLight hover:from-primary-teal/90 hover:to-primary-indigoLight/90 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>Contact Our Team</span>
                  </span>
                  
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-indigoLight to-accent-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </motion.button>
                
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Average response time: 2 hours</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Form Modal - Conditionally rendered for better performance */}
        {isContactModalOpen && (
          <ContactFormModal
            isOpen={isContactModalOpen}
            onClose={closeContactModal}
          />
        )}
      </div>
    </section>
  );
}