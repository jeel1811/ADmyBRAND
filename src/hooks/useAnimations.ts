import { useState, useEffect, useRef, useMemo } from 'react';
import {
  useMotionValue,
  useSpring,
  useInView as useFramerInView,
  useAnimation,
} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// import { getStaggeredDelay } from '@/lib/utils';

interface UseAnimationOnScrollProps {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
  rootMargin?: string;
}

export function useAnimationOnScroll({
  threshold = 0.2,
  triggerOnce = true,
  delay = 0,
  rootMargin = '0px',
}: UseAnimationOnScrollProps = {}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce, rootMargin });

  useEffect(() => {
    if (inView) {
      const timeoutId = setTimeout(() => {
        controls.start('visible');
      }, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [controls, inView, delay]);

  return { ref, controls, inView };
}

interface UseStaggeredAnimationProps {
  itemCount: number;
  staggerDelay?: number;
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

export function useStaggeredAnimation({
  itemCount,
  staggerDelay = 0.1,
  threshold = 0.1,
  triggerOnce = true,
  rootMargin = '0px',
}: UseStaggeredAnimationProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce, rootMargin });

  // Create item controls using useMemo to avoid creating them in useEffect
  const itemControls = useMemo(() => {
    return Array.from({ length: itemCount }, () => useAnimation());
  }, [itemCount]);

  useEffect(() => {
    if (inView && itemControls.length === itemCount) {
      controls.start('visible');
      itemControls.forEach((control, index) => {
        const delayInSeconds = 0.1 + index * staggerDelay;
        setTimeout(() => {
          control.start('visible');
        }, delayInSeconds * 1000);
      });
    }
  }, [controls, inView, itemCount, staggerDelay, itemControls]);

  return {
    containerRef: ref,
    containerControls: controls,
    itemControls: itemControls,
    inView,
  };
}

interface UseParallaxProps {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  threshold?: number;
}

export function useParallax({
  speed = 0.5,
  direction = 'up',
  threshold = 0,
}: UseParallaxProps = {}) {
  const [ref, inView] = useInView({ threshold, triggerOnce: false });
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!inView) return;

    const handleScroll = () => {
      if (!elementRef.current) return;

      const element = elementRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = elementCenter - viewportCenter;
      const newOffset = distanceFromCenter * speed * -0.1;
      setOffset(newOffset);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [inView, speed]);

  const combinedRef = (node: HTMLElement | null) => {
    elementRef.current = node;
    ref(node);
  };

  const style = {
    transform:
      direction === 'up' || direction === 'down'
        ? `translateY(${direction === 'down' ? -offset : offset}px)`
        : `translateX(${direction === 'right' ? -offset : offset}px)`,
    transition: 'transform 0.1s ease-out',
  };

  return { ref: combinedRef, style, inView };
}

interface UseCursorFollowProps {
  intensity?: number;
}

export function useCursorFollow({
  intensity = 0.05,
}: UseCursorFollowProps = {}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = ref.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;
      x.set(mouseX * intensity);
      y.set(mouseY * intensity);
    };

    ref.addEventListener('mousemove', handleMouseMove);
    return () => ref.removeEventListener('mousemove', handleMouseMove);
  }, [ref, intensity, x, y]);

  return {
    ref: setRef,
    style: {
      transform: `translate(${springX.get()}px, ${springY.get()}px)`,
      x: springX,
      y: springY,
    },
    x: springX,
    y: springY,
  };
}

interface UseHoverAnimationProps {
  scale?: number;
  rotate?: number;
  y?: number;
  x?: number;
  duration?: number;
}

export function useHoverAnimation({
  scale = 1.05,
  rotate = 0,
  y = 0,
  x = 0,
  duration = 0.3,
}: UseHoverAnimationProps = {}) {
  const [isHovered, setIsHovered] = useState(false);

  const hoverAnimation = {
    scale: isHovered ? scale : 1,
    rotate: isHovered ? rotate : 0,
    y: isHovered ? y : 0,
    x: isHovered ? x : 0,
    transition: { duration },
  };

  return {
    hoverAnimation,
    isHovered,
    hoverHandlers: {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
    },
  };
}

interface UseScrollAnimationProps {
  threshold?: number;
  once?: boolean;
}

export function useScrollAnimation({
  threshold = 0.1,
  once = true,
}: UseScrollAnimationProps = {}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useFramerInView(ref, { amount: threshold, once });

  const animation = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.5,
      },
    },
  };

  return {
    ref,
    inView: isInView,
    animation,
    animate: isInView ? 'visible' : 'hidden',
  };
}
