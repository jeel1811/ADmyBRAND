'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ButtonLink } from '@/components/ui/ButtonLink';
// import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';
// import { useSmoothScroll } from '@/hooks/useSmoothScroll';

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
  // const scrollToSection = useSmoothScroll();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const menuItemVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
        scrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-700/20'
          : 'bg-white/80 dark:bg-transparent backdrop-blur-sm'
      )}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] to-[#00F0FF] neon-text mr-2">
              ADmyBRAND
            </span>

            <span className="text-sm font-medium px-2 py-1 rounded-md bg-primary-teal/10 dark:bg-primary-teal/20 text-primary-teal dark:text-primary-teal border border-primary-teal/20 dark:border-primary-teal/30">
              AI Suite
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) =>
            item.isButton ? (
              <ButtonLink
                key={item.label}
                href={item.href}
                variant={item.variant || 'primary'}
                size="md"
              >
                {item.label}
              </ButtonLink>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'text-gray-700 dark:text-gray-200 hover:text-primary-teal dark:hover:text-primary-teal font-medium transition-colors relative group'
                )}
                onClick={(e) => {
                  e.preventDefault();
                  const targetId = item.href.substring(1);
                  const targetElement = document.getElementById(targetId);
                  if (targetElement) {
                    window.scrollTo({
                      top: targetElement.offsetTop - 100, // Offset for header height
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-teal group-hover:w-full transition-all duration-300" />
              </Link>
            )
          )}
          {/* <ThemeToggle /> */}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden space-x-4">
          {/* <ThemeToggle /> */}
          <button
            onClick={toggleMenu}
            className="relative z-10 p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col justify-center items-center">
              <span
                className={cn(
                  'block w-6 h-0.5 bg-gray-700 dark:bg-gray-200 transition-all duration-300 ease-out',
                  isOpen ? 'rotate-45 translate-y-1.5' : 'mb-1.5'
                )}
              />
              <span
                className={cn(
                  'block w-6 h-0.5 bg-gray-700 dark:bg-gray-200 transition-all duration-300 ease-out',
                  isOpen ? 'opacity-0' : 'mb-1.5'
                )}
              />
              <span
                className={cn(
                  'block w-6 h-0.5 bg-gray-700 dark:bg-gray-200 transition-all duration-300 ease-out',
                  isOpen ? '-rotate-45 -translate-y-1.5' : ''
                )}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-white dark:bg-gray-900 z-40 flex flex-col md:hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <div className="flex flex-col items-center justify-center h-full space-y-8 p-8">
                {navItems.map((item) => (
                  <motion.div key={item.label} variants={menuItemVariants}>
                    {item.isButton ? (
                      <ButtonLink
                        href={item.href}
                        variant={item.variant || 'primary'}
                        size="lg"
                        onClick={() => setIsOpen(false)}
                        className="w-full"
                      >
                        {item.label}
                      </ButtonLink>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsOpen(false);
                          const targetId = item.href.substring(1);
                          const targetElement = document.getElementById(targetId);
                          if (targetElement) {
                            window.scrollTo({
                              top: targetElement.offsetTop - 100,
                              behavior: 'smooth'
                            });
                          }
                        }}
                        className="text-2xl font-heading font-medium text-gray-800 dark:text-gray-100 hover:text-primary-teal dark:hover:text-primary-teal transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}