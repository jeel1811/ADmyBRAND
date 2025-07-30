# ADmyBRAND AI Suite - Comprehensive Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Component Library](#component-library)
6. [Hooks & Utilities](#hooks--utilities)
7. [Styling & Theming](#styling--theming)
8. [Development Setup](#development-setup)

## Project Overview

ADmyBRAND AI Suite is a cutting-edge, AI-powered marketing command center built with Next.js 15.4.4 and React 19.1.0. The platform provides unified planning, booking, and analytics for omnichannel advertising campaigns, empowering marketers to create, optimize, and scale their advertising efforts with unprecedented efficiency.

### Target Users
- Marketing professionals and agencies
- Digital advertising teams
- Performance marketers
- Small to enterprise-level businesses

## Architecture

### Frontend Architecture
The application follows a modern React architecture pattern with:
- **Component-Based Design**: Modular, reusable components
- **Hooks-Based State Management**: Custom hooks for complex logic
- **Context API**: Theme and global state management
- **Server-Side Rendering**: Next.js App Router for optimal performance
- **TypeScript**: Full type safety across the application

### Design Patterns
- **Compound Component Pattern**: Used in Card and Carousel components
- **Provider Pattern**: Theme and context management
- **Hook Pattern**: Custom hooks for reusable logic
- **Higher-Order Components**: Animation and scroll reveal wrappers

### File Organization
```
src/
├── app/                    # Next.js App Router (Pages & Layouts)
├── components/             # Reusable Components
│   ├── animations/         # Animation-specific components
│   ├── layout/            # Layout components (Header, Footer)
│   ├── sections/          # Page sections (Hero, Features, etc.)
│   └── ui/                # Base UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and configurations
├── styles/                # Additional styles (if any)
└── types/                 # TypeScript type definitions
```

## Tech Stack

### Core Technologies
- **Framework**: Next.js 15.4.4 with App Router
- **UI Library**: React 19.1.0
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **Animation**: Framer Motion 12.x
- **3D Graphics**: Three.js with React Three Fiber
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Context API

### Development Tools
- **Linting**: ESLint with Next.js configuration
- **Package Manager**: npm/yarn/pnpm/bun
- **Build Tool**: Next.js built-in bundler
- **CSS Processing**: PostCSS with Tailwind

### Key Dependencies
```json
{
  "dependencies": {
    "@hookform/resolvers": "^5.2.0",
    "@react-three/drei": "^10.6.1",
    "@react-three/fiber": "^9.3.0",
    "clsx": "^2.1.1",
    "framer-motion": "^12.23.11",
    "lottie-react": "^2.4.1",
    "next": "15.4.4",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "react-hook-form": "^7.61.1",
    "react-intersection-observer": "^9.16.0",
    "styled-components": "^6.1.19",
    "tailwind-merge": "^3.3.1",
    "three": "^0.178.0",
    "zod": "^4.0.11"
  }
}
```

## Project Structure

### Detailed File Structure
```
admybrand-ai-suite/
├── .next/                          # Next.js build output
├── public/                         # Static assets
│   ├── images/                     # Image assets
│   │   └── testimonials/           # Testimonial images
│   ├── dashboard.svg               # Dashboard icon
│   ├── file.svg                    # File icon
│   ├── globe.svg                   # Globe icon
│   ├── next.svg                    # Next.js logo
│   ├── vercel.svg                  # Vercel logo
│   └── window.svg                  # Window icon
├── src/
│   ├── app/
│   │   ├── favicon.ico             # Site favicon
│   │   ├── globals.css             # Global styles and CSS variables
│   │   ├── layout.tsx              # Root layout with metadata
│   │   └── page.tsx                # Home page component
│   ├── assets/
│   │   ├── images/                 # Additional image assets
│   │   └── lottie/                 # Lottie animation files
│   ├── components/
│   │   ├── ThemeProvider.tsx       # Theme context provider
│   │   ├── animations/             # Animation components
│   │   │   ├── DashboardAnimation.tsx
│   │   │   ├── LottieAnimation.tsx
│   │   │   ├── ParticleBackground.tsx
│   │   │   └── ScrollReveal.tsx
│   │   ├── layout/                 # Layout components
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   │   ├── sections/               # Page sections
│   │   │   ├── ContactForm.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Newsletter.tsx
│   │   │   ├── Pricing.tsx
│   │   │   └── Testimonials.tsx
│   │   └── ui/                     # Base UI components
│   │       ├── Accordion.tsx
│   │       ├── Avatar.tsx
│   │       ├── BillingToggle.tsx
│   │       ├── Button.tsx
│   │       ├── ButtonLink.tsx
│   │       ├── Card.tsx
│   │       ├── Carousel.tsx
│   │       ├── ContactFormModal.tsx
│   │       ├── Input.tsx
│   │       ├── Modal.tsx
│   │       ├── ThemeToggle.tsx
│   │       ├── ToggleSwitch.tsx
│   │       └── VideoModal.tsx
│   ├── hooks/                      # Custom React hooks
│   │   ├── useAnimations.ts
│   │   ├── useFeatureAnimation.ts
│   │   ├── useFormWithValidation.ts
│   │   ├── useSmoothScroll.ts
│   │   └── useTheme.ts
│   ├── lib/                        # Utility functions
│   │   ├── utils.ts                # Common utilities
│   │   └── utils/                  # Additional utility modules
│   ├── styles/                     # Additional styles
│   └── types/                      # TypeScript type definitions
├── eslint.config.mjs               # ESLint configuration
├── next-env.d.ts                   # Next.js TypeScript declarations
├── next.config.ts                  # Next.js configuration
├── package.json                    # Project dependencies and scripts
├── postcss.config.mjs              # PostCSS configuration
├── README.md                       # Project README
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
└── tsconfig.tsbuildinfo           # TypeScript build info
```

## Component Library

### Layout Components

#### Header (`src/components/layout/Header.tsx`)
The main navigation component with:
- **Responsive Design**: Mobile-first with hamburger menu
- **Scroll Effect**: Background blur and shadow on scroll
- **Theme Integration**: Works with theme context
- **Smooth Scrolling**: Integrated scroll behavior
- **Animation**: Framer Motion transitions

**Key Features:**
- Sticky positioning with backdrop blur
- Mobile menu with slide animations
- Theme-aware styling
- Accessibility support

**Usage:**
```tsx
import { Header } from '@/components/layout/Header';

export default function Layout() {
  return (
    <div>
      <Header />
      {/* Rest of your layout */}
    </div>
  );
}
```

#### Footer (`src/components/layout/Footer.tsx`)
Site footer with links and company information.

### Section Components

#### Hero (`src/components/sections/Hero.tsx`)
Main landing section featuring:
- **Animated Typography**: Staggered text animations
- **3D Dashboard Preview**: Interactive dashboard visualization
- **Particle Background**: Dynamic particle effects
- **Call-to-Action Buttons**: Primary and secondary actions
- **Video Modal Integration**: Product demo integration

**Animation Features:**
- Staggered entrance animations
- Hover effects on interactive elements
- Responsive design breakpoints
- Performance-optimized animations

#### Features (`src/components/sections/Features.tsx`)
Showcase of AI-powered platform features with:
- Feature cards with icons and descriptions
- Scroll-triggered animations
- Responsive grid layout

#### Pricing (`src/components/sections/Pricing.tsx`)
Subscription plans section with:
- **Billing Toggle**: Monthly/Annual switching
- **Feature Comparison**: Detailed plan comparison
- **Popular Plan Highlighting**: Visual emphasis on recommended plan
- **Custom Enterprise Option**: Contact form integration

#### Testimonials (`src/components/sections/Testimonials.tsx`)
Customer success stories with:
- **Carousel Implementation**: Auto-rotating testimonials
- **Avatar Integration**: Customer photos and company logos
- **Rating System**: Star ratings and metrics
- **Responsive Design**: Mobile-optimized layout

#### FAQ (`src/components/sections/FAQ.tsx`)
Frequently asked questions with:
- **Accordion Interface**: Expandable Q&A sections
- **Search Functionality**: Filter questions
- **Category Organization**: Grouped by topic

### UI Components

#### Card (`src/components/ui/Card.tsx`)
Flexible card component with compound pattern:

**Variants:**
- `default`: Basic card styling
- `feature`: Feature showcase cards
- `testimonial`: Testimonial-specific styling
- `pricing`: Pricing plan cards

**Features:**
- Glass morphism effects
- Hover animations
- Compound component pattern
- TypeScript-first design

**Usage:**
```tsx
import { Card } from '@/components/ui/Card';

function FeatureCard() {
  return (
    <Card variant="feature" isHoverable isGlass>
      <Card.Header>
        <Card.Title>Feature Title</Card.Title>
        <Card.Description>Feature description</Card.Description>
      </Card.Header>
      <Card.Content>
        {/* Content */}
      </Card.Content>
      <Card.Footer>
        {/* Footer content */}
      </Card.Footer>
    </Card>
  );
}
```

#### Button (`src/components/ui/Button.tsx`)
Primary button component with:
- **Multiple Variants**: Primary, secondary, ghost, outline
- **Size Options**: Small, medium, large
- **Loading States**: Built-in spinner
- **Icon Support**: Leading and trailing icons
- **Accessibility**: Full keyboard and screen reader support

#### Input (`src/components/ui/Input.tsx`)
Form input components including:
- Text inputs with validation states
- Textarea component
- Label integration
- Error message display
- Custom styling options

#### Modal (`src/components/ui/Modal.tsx`)
Reusable modal system with:
- **Portal Rendering**: Renders outside component tree
- **Focus Management**: Keyboard navigation
- **Backdrop Click**: Close on outside click
- **Animation**: Smooth enter/exit transitions
- **Accessibility**: ARIA labels and keyboard support

#### Carousel (`src/components/ui/Carousel.tsx`)
Advanced carousel component with:
- **Auto-play Support**: Configurable intervals
- **Navigation Controls**: Arrows and dots
- **Touch/Swipe Support**: Mobile-friendly
- **Animation Variants**: Slide, fade, zoom, scale
- **Infinite Loop**: Seamless looping

**Usage:**
```tsx
import { Carousel } from '@/components/ui/Carousel';

function TestimonialCarousel() {
  return (
    <Carousel autoPlay interval={5000} showArrows showDots>
      <Carousel.Item>Content 1</Carousel.Item>
      <Carousel.Item>Content 2</Carousel.Item>
      <Carousel.Item>Content 3</Carousel.Item>
    </Carousel>
  );
}
```

### Animation Components

#### ParticleBackground (`src/components/animations/ParticleBackground.tsx`)
Interactive particle system using Three.js:
- WebGL-based particle rendering
- Mouse interaction effects
- Performance optimization
- Responsive to theme changes

#### DashboardAnimation (`src/components/animations/DashboardAnimation.tsx`)
3D dashboard visualization:
- Three.js integration
- Interactive elements
- Responsive design
- Performance monitoring

#### ScrollReveal (`src/components/animations/ScrollReveal.tsx`)
Scroll-triggered animations:
- Intersection Observer API
- Customizable animation variants
- Performance optimized
- Threshold configuration

## Hooks & Utilities

### Custom Hooks

#### useFormWithValidation (`src/hooks/useFormWithValidation.ts`)
Enhanced form handling with Zod validation:

**Features:**
- React Hook Form integration
- Zod schema validation
- Loading states
- Error handling
- Success feedback

**Common Schemas:**
```typescript
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const newsletterSchema = z.object({
  email: emailSchema,
});
```

**Usage:**
```typescript
const {
  register,
  formState: { errors },
  handleSubmitWithValidation,
  isSubmitting,
} = useFormWithValidation({
  schema: contactFormSchema,
  onSubmit: async (data) => {
    // Handle form submission
  },
});
```

#### useTheme (`src/hooks/useTheme.ts`)
Theme management hook:
- Light/dark mode switching
- System preference detection
- Local storage persistence
- CSS variable updates

#### useAnimations (`src/hooks/useAnimations.ts`)
Animation utilities and presets:
- Common animation variants
- Performance optimizations
- Responsive animations

#### useSmoothScroll (`src/hooks/useSmoothScroll.ts`)
Smooth scrolling functionality:
- Scroll to element by ID
- Customizable easing
- Offset calculations

### Utility Functions (`src/lib/utils.ts`)

#### Class Name Utilities
```typescript
// Combines class names and merges Tailwind classes
export function cn(...inputs: ClassValue[]): string

// Creates staggered animation delays
export function getStaggeredDelay(index: number, baseDelay?: number, staggerAmount?: number): string
```

#### Formatting Utilities
```typescript
// Format numbers as currency
export function formatCurrency(amount: number, currency?: string): string

// Format dates
export function formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string

// Format numbers with locale
export function formatNumber(num: number, options?: Intl.NumberFormatOptions): string
```

#### Validation Utilities
```typescript
// Email validation
export function isValidEmail(email: string): boolean

// URL validation
export function isValidUrl(url: string): boolean

// Phone number validation
export function isValidPhoneNumber(phone: string): boolean
```

## Styling & Theming

### Tailwind CSS Configuration

The project uses Tailwind CSS 4.x with extensive customization:

#### Custom Color Palette
```javascript
colors: {
  primary: {
    deepIndigo: 'var(--primary-deep-indigo)',
    teal: 'var(--primary-teal)',
    indigoLight: 'var(--primary-indigo-light)',
    tealLight: 'var(--primary-teal-light)',
  },
  accent: {
    purple: 'var(--accent-purple)',
    pink: 'var(--accent-pink)',
  },
  neutral: {
    50: 'var(--neutral-50)',
    // ... full neutral scale
    900: 'var(--neutral-900)',
  },
  glass: {
    background: 'var(--glass-background)',
    border: 'var(--glass-border)',
    shadow: 'var(--glass-shadow)',
  },
}
```

#### Typography
Multiple font families with CSS variables:
```javascript
fontFamily: {
  sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
  heading: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
  mono: ['var(--font-roboto)', 'monospace'],
  display: ['var(--font-ibm-plex)', 'system-ui', 'sans-serif'],
}
```

### CSS Variables & Theming

#### Global CSS Variables (`src/app/globals.css`)
```css
:root {
  /* Colors */
  --primary-deep-indigo: #1a1b5d;
  --primary-teal: #0bc5ea;
  --primary-indigo-light: #6366f1;
  --primary-teal-light: #22d3ee;
  
  /* Glass morphism */
  --glass-background: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-shadow: rgba(0, 0, 0, 0.1);
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, var(--primary-deep-indigo), var(--primary-teal));
  --gradient-secondary: linear-gradient(135deg, var(--accent-purple), var(--accent-pink));
}

[data-theme="dark"] {
  --glass-background: rgba(0, 0, 0, 0.2);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-shadow: rgba(0, 0, 0, 0.3);
}
```

#### Utility Classes
```css
/* Glass morphism effects */
.glass {
  background: var(--glass-background);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 4px 30px var(--glass-shadow);
}

/* Animation utilities */
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out forwards;
}
```

## Development Setup

### Prerequisites
- Node.js 18.0 or higher
- npm, yarn, pnpm, or bun
- Git for version control

### Installation
```bash
# Clone the repository
git clone https://github.com/jeel1811/ADmyBRAND.git

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Environment Configuration
Create a `.env.local` file:
```env
# API Configuration
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_API_KEY=your_api_key

# Authentication (if applicable)
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Database (if applicable)
DATABASE_URL=your_database_url

# Analytics (if applicable)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### Available Scripts
```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting
npm run lint

# Type checking
npx tsc --noEmit
```

### Development Workflow
1. **Start development server**: `npm run dev`
2. **Open browser**: Navigate to `http://localhost:3000`
3. **Make changes**: Edit files in the `src` directory
4. **Hot reload**: Changes are automatically reflected
5. **Build for production**: `npm run build`
6. **Test production build**: `npm run start`

