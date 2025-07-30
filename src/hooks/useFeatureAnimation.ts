import { useInView } from 'react-intersection-observer';
import { useAnimation, AnimationControls } from 'framer-motion';
import { useEffect } from 'react';

export function useFeatureAnimation(delay: number = 0): {
  ref: (node?: Element | null) => void;
  controls: AnimationControls;
  inView: boolean;
} {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: 'spring',
          duration: 0.5,
          bounce: 0.3,
          delay: delay,
        },
      });
    }
  }, [controls, inView, delay]);

  return { ref, controls, inView };
}
