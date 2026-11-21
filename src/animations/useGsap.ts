import { useLayoutEffect, useEffect, type DependencyList, type RefObject } from 'react';
import { gsap } from '@/lib/gsap';

const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Scoped GSAP context: every tween / ScrollTrigger created inside `fn`
 * is automatically reverted & killed on unmount or when deps change.
 */
export function useGsap(scope: RefObject<HTMLElement>, fn: (ctx: gsap.Context) => void | (() => void), deps: DependencyList = []) {
  useIso(() => {
    if (!scope.current) return;
    let cleanup: void | (() => void);
    const ctx = gsap.context((self) => { cleanup = fn(self); }, scope);
    return () => { cleanup?.(); ctx.revert(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
