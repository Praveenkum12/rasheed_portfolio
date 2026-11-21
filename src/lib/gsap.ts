import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Flip } from 'gsap/Flip';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, SplitText, Flip, CustomEase);

// Signature eases — used everywhere for a consistent, expensive-feeling motion language.
CustomEase.create('expo', '0.16, 1, 0.3, 1');
CustomEase.create('inout', '0.76, 0, 0.24, 1');
gsap.defaults({ ease: 'expo', duration: 1.1 });

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger, SplitText, Flip };
