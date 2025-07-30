'use client';

import { Carousel } from '@/components/ui/Carousel';
import { Card} from '@/components/ui/Card';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Testimonial {
  quote: string;
  author: {
    name: string;
    title: string;
    company: string;
    avatar?: string;
  };
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "ADmyBRAND's AI Suite has completely transformed our digital marketing strategy. We've seen a 43% increase in ROAS across all channels within just two months of implementation.",
    author: {
      name: 'Sarah Johnson',
      title: 'CMO',
      company: 'TechVision Inc.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    },
    rating: 5,
  },
  {
    quote: "The cross-channel optimization feature is a game-changer. It's like having an expert media buyer working 24/7 to ensure our budget is always allocated to the best-performing channels.",
    author: {
      name: 'Michael Chen',
      title: 'Digital Marketing Director',
      company: 'GrowthWave',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    },
    rating: 5,
  },
  {
    quote: "What impressed me most was how quickly the AI adapted to our specific industry. Within weeks, it was generating insights that would have taken our team months to discover manually.",
    author: {
      name: 'Jessica Rivera',
      title: 'Head of Growth',
      company: 'Elevate Retail',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    },
    rating: 4,
  },
  {
    quote: "The natural language insights feature has democratized data analysis across our marketing team. Now everyone can understand performance trends without needing to be a data scientist.",
    author: {
      name: 'David Okafor',
      title: 'VP of Marketing',
      company: 'Horizon Financial',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    },
    rating: 5,
  },
  {
    quote: "We've been able to reduce our campaign setup time by 75% while improving performance. The ROI on this platform has been exceptional for our agency and our clients.",
    author: {
      name: 'Emma Thompson',
      title: 'Agency Owner',
      company: 'Catalyst Marketing Group',
      avatar: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face',
    },
    rating: 5,
  },
];

// Company logos for the trusted by section
const companyLogos = [
  { name: 'Shopify', logo: 'https://logos-world.net/wp-content/uploads/2020/11/Shopify-Logo.png' },
  { name: 'Slack', logo: 'https://logos-world.net/wp-content/uploads/2020/10/Slack-Logo-700x394.png' },
  { name: 'Spotify', logo: 'https://logos-world.net/wp-content/uploads/2020/10/Spotify-Logo-500x281.png' },
  { name: 'Stripe', logo: 'https://logos-world.net/wp-content/uploads/2021/03/Stripe-Logo.png' },
  { name: 'Zoom', logo: 'https://logos-world.net/wp-content/uploads/2021/03/Zoom-Logo-500x281.png' },
];

interface TestimonialsProps {
  className?: string;
}

export function Testimonials({ className }: TestimonialsProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <section
      id="testimonials"
      className={cn('py-20 bg-gradient-to-b from-gray-50/90 via-white/90 to-gray-50/90 dark:from-gray-900/90 dark:via-gray-800/90 dark:to-gray-900/90 relative overflow-hidden', className)}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary-500/5 dark:bg-primary-400/5 blur-3xl"
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
          className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-primary-400/5 dark:bg-primary-300/5 blur-3xl"
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
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Trusted by Marketing Leaders
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300">
              See how companies are transforming their marketing with our AI Suite.
            </p>
          </div>
        </ScrollReveal>

        {/* Company Logos */}
        <ScrollReveal delay={0.1}>
          <motion.div 
            className="flex flex-wrap justify-center gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {companyLogos.map((company, index) => (
              <motion.div 
                key={index} 
                className="flex flex-col items-center"
                variants={logoVariants}
              >
                <div className="w-32 h-16 relative mb-2">
                  <Image 
                    src={company.logo} 
                    alt={company.name} 
                    fill 
                    className="object-contain" 
                  />
                </div>
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  {company.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="max-w-5xl mx-auto">
            <Carousel
              autoPlay
              interval={5000}
              showArrows
              showDots
              infiniteLoop
              animationVariant="fade"
              className="max-w-5xl mx-auto"
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </Carousel>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <AvatarGroup testimonials={testimonials} />
            </div>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 font-medium">
              Join <span className="text-primary-600 dark:text-primary-400 font-bold">hundreds of satisfied marketers</span> using ADmyBRAND AI Suite
            </p>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-100 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="p-8 flex flex-col h-full">
        <div className="mb-6">
          <StarRating rating={testimonial.rating} />
        </div>
        <blockquote className="text-xl font-medium mb-8 flex-grow text-gray-700 dark:text-gray-200 leading-relaxed">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <div className="flex items-center">
          {testimonial.author.avatar ? (
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-primary-100 dark:border-primary-800 shadow-md">
              <Image src={testimonial.author.avatar} alt={testimonial.author.name} width={48} height={48} />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-teal to-primary-indigoLight flex items-center justify-center text-white font-bold text-xl mr-4 shadow-lg ring-2 ring-white/50 dark:ring-gray-800/50">
              {testimonial.author.name.charAt(0)}
            </div>
          )}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{testimonial.author.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {testimonial.author.title}, {testimonial.author.company}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star key={i} filled={i < rating} />
      ))}
    </div>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`w-6 h-6 ${filled ? 'text-yellow-400 dark:text-yellow-300' : 'text-gray-300 dark:text-gray-600'}`}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function AvatarGroup({ testimonials }: { testimonials: Testimonial[] }) {
  const visibleAvatars = 5;
  const displayedTestimonials = testimonials.slice(0, visibleAvatars);
  const remainingCount = testimonials.length - visibleAvatars;

  return (
    <div className="flex -space-x-3">
      {displayedTestimonials.map((testimonial, index) => (
        <div 
          key={index} 
          className="w-14 h-14 rounded-full overflow-hidden border-3 border-white dark:border-gray-800 shadow-lg relative hover:scale-110 transition-transform duration-200 z-10 hover:z-20 ring-2 ring-primary-teal/20"
          style={{ zIndex: displayedTestimonials.length - index }}
        >
          {testimonial.author.avatar ? (
            <Image 
              src={testimonial.author.avatar} 
              alt={testimonial.author.name} 
              fill 
              className="object-cover" 
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-teal to-primary-indigoLight flex items-center justify-center text-white font-bold text-lg">
              {testimonial.author.name.charAt(0)}
            </div>
          )}
        </div>
      ))}
      {remainingCount > 0 && (
        <div className="w-14 h-14 rounded-full border-3 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-300 shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 ring-2 ring-primary-teal/20">
          +{remainingCount}
        </div>
      )}
    </div>
  );
}