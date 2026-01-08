import { useEffect, useRef, useState, type RefObject } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

interface UseIntersectionObserverReturn<T extends HTMLElement> {
  ref: RefObject<T | null>;
  isIntersecting: boolean;
  hasIntersected: boolean;
}

export const useIntersectionObserver = <T extends HTMLElement = HTMLElement>({
  threshold = 0.1,
  rootMargin = '100px',
  once = true
}: UseIntersectionObserverProps = {}): UseIntersectionObserverReturn<T> => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        setIsIntersecting(isElementIntersecting);
        
        if (isElementIntersecting && !hasIntersected) {
          setHasIntersected(true);
          if (once) {
            observer.unobserve(element);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, once, hasIntersected]);

  return { ref, isIntersecting, hasIntersected };
};