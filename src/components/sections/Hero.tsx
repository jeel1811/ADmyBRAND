'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { VideoModal } from '@/components/ui/VideoModal';
import { ParticleBackground } from '@/components/animations/ParticleBackground';
import { DashboardAnimation } from '@/components/animations/DashboardAnimation';
import { cn } from '@/lib/utils';

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const openVideoModal = () => setIsVideoModalOpen(true);
  const closeVideoModal = () => setIsVideoModalOpen(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 20,
        delay: 0.2,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
  };

  return (
    <section
      className={cn(
        'relative min-h-screen flex items-center justify-center overflow-hidden py-20',
        'bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900',
        className
      )}
      ref={containerRef}
    >
      {/* Enhanced Background Elements for Light Mode */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Light mode decorative gradients */}
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 rounded-full bg-primary-teal/8 dark:bg-primary-teal/4 blur-3xl"
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -80, 80, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-accent-purple/8 dark:bg-accent-purple/4 blur-3xl"
          animate={{
            x: [0, -60, 60, 0],
            y: [0, 70, -70, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-primary-indigoLight/6 dark:bg-primary-indigoLight/3 blur-2xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.15, 1],
          }}
          transition={{
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            scale: { duration: 20, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>

      {/* Particle Background */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-60">
        <ParticleBackground />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            className="text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6 text-gray-900 dark:text-white"
              variants={itemVariants}
            >
              Your{' '}
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#00F0FF] to-[#FF00F0] neon-text">
                AI Co-Pilot
              </span>{' '}
              for Smarter, Faster Ad Campaigns
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0"
              variants={itemVariants}
            >
              Unify planning, booking, and analytics across all channels with our AI-powered marketing command center.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
              variants={buttonVariants}
            >
              <ButtonLink
                variant="primary"
                size="lg"
                href="#get-started"
                className="w-full sm:w-auto"
              >
                Get Started Free
              </ButtonLink>

              <Button
                variant="secondary"
                size="lg"
                onClick={openVideoModal}
                className="w-full sm:w-auto"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              >
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Dashboard Visualization */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, type: 'spring', stiffness: 100 }}
          >
            <div className="relative aspect-video max-w-2xl mx-auto">
              {/* Interactive Dashboard Animation */}
              <div className="absolute inset-0 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden shadow-2xl">
                <DashboardAnimation className="w-full h-full" />
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 p-4 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="h-2 w-16 bg-green-500 rounded-full mb-2" />
                <div className="h-2 w-12 bg-green-300 rounded-full mb-2" />
                <div className="h-2 w-14 bg-green-400 rounded-full" />
                <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">+24%</div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-28 h-28 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 p-4 shadow-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-primary-teal" />
                  <div className="h-2 w-12 bg-primary-teal/30 rounded-full" />
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-accent-purple" />
                  <div className="h-2 w-8 bg-accent-purple/30 rounded-full" />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-gray-500" />
                  <div className="h-2 w-10 bg-gray-300 rounded-full" />
                </div>
                <div className="absolute bottom-2 right-2 text-xs font-medium text-gray-700 dark:text-gray-300">Media Mix</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll to explore</span>
        <motion.div
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center p-1"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <motion.div className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full" />
        </motion.div>
      </motion.div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={closeVideoModal}
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="ADmyBrand AI Suite Demo"
      />
    </section>
  );
}