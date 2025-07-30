'use client';

import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Pricing } from '@/components/sections/Pricing';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
// import { ContactForm } from '@/components/sections/ContactForm';
// import { ParticleBackground } from '@/components/animations/ParticleBackground';
// import { useThemeContext } from '@/components/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  return (
    <ThemeProvider>
      <AnimatePresence>
        <motion.div 
          className="flex min-h-screen flex-col relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Header />
          <main className="flex-grow relative z-10">
            <Hero />
            <Features />
            <Pricing />
            <Testimonials />
            <FAQ />
          </main>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}
