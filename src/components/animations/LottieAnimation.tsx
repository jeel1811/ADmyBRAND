'use client';

import { useRef, useEffect, useState } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

export interface LottieAnimationProps {
  animationData: Record<string, unknown>;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  playOnHover?: boolean;
  playOnView?: boolean;
  speed?: number;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  onComplete?: () => void;
  onLoopComplete?: () => void;
  segments?: [number, number];
  direction?: 1 | -1;
  preserveAspectRatio?: 'xMidYMid meet' | 'xMidYMid slice' | 'xMinYMin slice' | string;
}

export function LottieAnimation({
  animationData,
  className,
  loop = true,
  autoplay = true,
  playOnHover = false,
  playOnView = false,
  speed = 1,
  width,
  height,
  style,
  onComplete,
  onLoopComplete,
  segments,
  direction = 1,
  preserveAspectRatio = 'xMidYMid meet',
}: LottieAnimationProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isHovering, setIsHovering] = useState(false);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  // Handle play/pause based on hover state
  useEffect(() => {
    if (!lottieRef.current) return;

    if (playOnHover) {
      if (isHovering) {
        lottieRef.current.play();
      } else {
        lottieRef.current.pause();
      }
    }
  }, [isHovering, playOnHover]);

  // Handle play/pause based on view state
  useEffect(() => {
    if (!lottieRef.current || !playOnView) return;

    if (inView) {
      lottieRef.current.play();
    } else {
      lottieRef.current.pause();
    }
  }, [inView, playOnView]);

  // Set animation speed
  useEffect(() => {
    if (!lottieRef.current) return;
    lottieRef.current.setSpeed(speed);
  }, [speed]);

  // Set animation direction
  useEffect(() => {
    if (!lottieRef.current) return;
    lottieRef.current.setDirection(direction);
  }, [direction]);

  // Set animation segments if provided
  useEffect(() => {
    if (!lottieRef.current || !segments) return;
    lottieRef.current.playSegments(segments, true);
  }, [segments]);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  return (
    <div
      ref={inViewRef}
      className={cn('relative overflow-hidden', className)}
      style={{ width, height, ...style }}
      onMouseEnter={playOnHover ? handleMouseEnter : undefined}
      onMouseLeave={playOnHover ? handleMouseLeave : undefined}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={autoplay && !playOnHover && !playOnView}
        className="w-full h-full"
        onComplete={onComplete}
        onLoopComplete={onLoopComplete}
        rendererSettings={{
          preserveAspectRatio,
        }}
      />
    </div>
  );
}

export interface LottieScrollPathProps {
  animationData: Record<string, unknown>;
  className?: string;
  scrollSpeed?: number;
  startFrame?: number;
  endFrame?: number;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}

export function LottieScrollPath({
  animationData,
  className,
  scrollSpeed = 1,
  startFrame = 0,
  endFrame,
  width,
  height,
  style,
}: LottieScrollPathProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [totalFrames, setTotalFrames] = useState(0);

  // Get total frames when animation loads
  useEffect(() => {
    if (!lottieRef.current) return;
    
    const frames = lottieRef.current.getDuration(true);
    if (frames !== undefined) {
      setTotalFrames(frames);
    }
  }, [animationData]);

  // Handle scroll-based animation
  useEffect(() => {
    if (!lottieRef.current || !containerRef.current || totalFrames === 0) return;

    const handleScroll = () => {
      if (!containerRef.current || !lottieRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the element is through the viewport (0 to 1)
      let scrollProgress = 1 - (rect.bottom - windowHeight) / (rect.height + windowHeight);
      scrollProgress = Math.max(0, Math.min(1, scrollProgress));
      
      // Calculate the frame to show based on scroll progress
      const effectiveEndFrame = endFrame || totalFrames;
      const effectiveStartFrame = startFrame;
      const frameRange = effectiveEndFrame - effectiveStartFrame;
      const currentFrame = effectiveStartFrame + (scrollProgress * frameRange * scrollSpeed);
      
      lottieRef.current.goToAndStop(currentFrame, true);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalFrames, scrollSpeed, startFrame, endFrame]);

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
      style={{ width, height, ...style }}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoplay={false}
        className="w-full h-full"
      />
    </div>
  );
}