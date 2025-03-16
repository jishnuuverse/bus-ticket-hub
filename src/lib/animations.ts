
import { useEffect, useState } from "react";

type AnimationOptions = {
  duration?: number;
  delay?: number;
  easing?: string;
};

export function usePageTransition(isVisible: boolean = true, options: AnimationOptions = {}) {
  const { duration = 300, delay = 0, easing = "ease" } = options;
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  const style = {
    animation: isVisible
      ? `fade-in ${duration}ms ${easing} ${delay}ms forwards, 
         slide-up ${duration * 1.2}ms ${easing} ${delay}ms forwards`
      : `fade-out ${duration}ms ${easing} forwards`,
    opacity: 0,
  };

  return { shouldRender, style };
}

export function useAnimatedMount(delay: number = 0) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return isMounted;
}

export const pageTransitions = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: {
    duration: 0.3,
    ease: [0.22, 1, 0.36, 1],
  },
};
