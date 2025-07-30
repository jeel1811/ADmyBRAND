'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  isButton?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
}

const navItems: NavItem[] = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
  { label: 'Get Started Free', href: '#get-started', isButton: true, variant: 'primary' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offset = targetId === 'contact' ? 200 : 100;
      const elementTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementTop - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-30 transition-all duration-300',
        scrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-700/20 py-2'
          : 'bg-white/80 dark:bg-transparent backdrop-blur-sm py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-2xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] to-[#00F0FF]">
              ADmyBRAND
            </span>
            <span className="text-sm font-medium px-2 py-1 rounded-md bg-primary-teal/10 dark:bg-primary-teal/20 text-primary-teal border border-primary-teal/20">
              AI Suite
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) =>
                item.isButton ? (
                  <ButtonLink
                    key={item.label}
                    href={item.href}
                    variant={item.variant || 'primary'}
                    size="sm"
                    className="whitespace-nowrap"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                  >
                    {item.label}
                  </ButtonLink>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-gray-700 dark:text-gray-200 hover:text-primary-teal dark:hover:text-primary-teal font-medium transition-colors duration-200 relative group"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-teal group-hover:w-full transition-all duration-300" />
                  </Link>
                )
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-primary-teal focus:outline-none focus:ring-2 focus:ring-primary-teal"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 relative">
              <span
                className={cn(
                  'absolute block w-6 h-0.5 bg-current transform transition duration-300 ease-in-out',
                  isOpen ? 'rotate-45 translate-y-2' : 'translate-y-0'
                )}
              />
              <span
                className={cn(
                  'absolute block w-6 h-0.5 bg-current transform transition duration-300 ease-in-out translate-y-2',
                  isOpen ? 'opacity-0' : 'opacity-100'
                )}
              />
              <span
                className={cn(
                  'absolute block w-6 h-0.5 bg-current transform transition duration-300 ease-in-out',
                  isOpen ? '-rotate-45 translate-y-2' : 'translate-y-4'
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Full Screen Backdrop */}
            <motion.div 
              className="fixed inset-0 z-[99998] bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 99998
              }}
            />
            
            {/* Mobile Menu Content */}
            <motion.div
              className="fixed inset-0 z-[99999] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 md:hidden"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ 
                opacity: 0, 
                scale: 0.95, 
                y: -20,
                transition: { 
                  duration: 0.25, 
                  ease: "easeIn"
                }
              }}
              transition={{ 
                duration: 0.4, 
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 400,
                damping: 40
              }}
              style={{ 
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 99999,
                width: '100vw',
                height: '100vh'
              }}
            >
            {/* Mobile Menu Container */}
            <motion.div 
              className="flex flex-col h-full w-full relative"
              exit={{
                opacity: 0,
                y: -30,
                transition: { duration: 0.2, ease: "easeIn" }
              }}
            >
              {/* Header with Logo and Close */}
              <motion.div 
                className="flex items-center justify-between p-6 border-b border-gray-700/50 bg-gray-800/30 backdrop-blur-sm"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
              >
                <motion.div 
                  className="flex items-center space-x-2"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <span className="text-2xl font-bold text-[#00F0FF] drop-shadow-lg">
                    ADmyBRAND
                  </span>
                  <motion.span 
                    className="text-sm font-medium px-2 py-1 rounded-md bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 shadow-lg shadow-[#00F0FF]/10"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
                  >
                    AI Suite
                  </motion.span>
                </motion.div>
                
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-3 text-white hover:text-[#00F0FF] transition-all duration-300 hover:bg-white/10 rounded-full hover:scale-110"
                  aria-label="Close menu"
                  initial={{ x: 30, opacity: 0, rotate: 90 }}
                  animate={{ x: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                  className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#00F0FF]/5 rounded-full blur-3xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                ></motion.div>
                <motion.div 
                  className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-[#0BC5EA]/5 rounded-full blur-3xl"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                ></motion.div>
                <motion.div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#00F0FF]/10 rounded-full blur-2xl"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                ></motion.div>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 flex flex-col justify-center px-8 relative z-10">
                <motion.nav 
                  className="space-y-6"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                >
                  {[
                    { href: '#features', label: 'Features' },
                    { href: '#pricing', label: 'Pricing' },
                    { href: '#testimonials', label: 'Testimonials' },
                    { href: '#faq', label: 'FAQ' },
                    { href: '#contact', label: 'Contact' }
                  ].map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ 
                        delay: 0.4 + (index * 0.1), 
                        duration: 0.5,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ 
                        x: 15, 
                        scale: 1.03,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href={item.href}
                        className="block text-3xl font-semibold text-white hover:text-[#00F0FF] transition-all duration-300 py-3 border-l-4 border-transparent hover:border-[#00F0FF] pl-6 hover:pl-10 hover:shadow-lg hover:shadow-[#00F0FF]/20 relative overflow-hidden group"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsOpen(false);
                          handleNavClick(item.href);
                        }}
                      >
                        <span className="relative z-10">{item.label}</span>
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-[#00F0FF]/10 to-transparent opacity-0 group-hover:opacity-100"
                          layoutId="navHover"
                          transition={{ duration: 0.3 }}
                        />
                      </Link>
                    </motion.div>
                  ))}
                  
                  <motion.div 
                    className="pt-8"
                    initial={{ y: 30, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 0.9, 
                      duration: 0.6,
                      type: "spring",
                      stiffness: 150
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.button
                      className="w-full bg-gradient-to-r from-[#00F0FF] to-[#0BC5EA] text-gray-900 font-bold py-6 px-8 rounded-2xl text-2xl hover:shadow-2xl hover:shadow-[#00F0FF]/30 transition-all duration-300 relative overflow-hidden group"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                        handleNavClick('#get-started');
                      }}
                      whileHover={{
                        boxShadow: "0 25px 50px -12px rgba(0, 240, 255, 0.4)",
                      }}
                    >
                      <motion.span 
                        className="relative z-10"
                        animate={{ 
                          textShadow: [
                            "0 0 0px rgba(0,0,0,0)",
                            "0 0 10px rgba(0,240,255,0.5)",
                            "0 0 0px rgba(0,0,0,0)"
                          ]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        Get Started Free
                      </motion.span>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-[#0BC5EA] to-[#00F0FF] opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-white opacity-0"
                        animate={{
                          opacity: [0, 0.1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.button>
                  </motion.div>
                </motion.nav>
              </div>

              {/* Footer */}
              <motion.div 
                className="p-6 border-t border-gray-700/50 bg-gray-800/20 backdrop-blur-sm"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <motion.div 
                  className="text-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.4 }}
                >
                  <p className="text-gray-400 text-sm">
                    © 2025 ADmyBRAND. All rights reserved.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
