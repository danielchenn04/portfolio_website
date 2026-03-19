'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';

// Pure crossfade — no horizontal slide. Sliding reveals the fixed canvas
// background mid-transition, making it look like the dots reset each navigation.
const variants = {
  hidden: { opacity: 0 },
  enter:  { opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  exit:   { opacity: 0, transition: { duration: 0.15, ease: 'easeIn' } },
};

const reducedVariants = {
  hidden: { opacity: 0 },
  enter:  { opacity: 1, transition: { duration: 0.1 } },
  exit:   { opacity: 0, transition: { duration: 0.08 } },
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname          = usePathname();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        variants={shouldReduceMotion ? reducedVariants : variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        style={{ minHeight: '100vh' }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
