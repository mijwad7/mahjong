/**
 * Framer Motion variant presets shared across the app.
 * Import the variant you need rather than re-defining animations per component.
 */

/** Standard page fade-in transition. */
export const pageFade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

/** Card deal — flips in from the deck position. */
export const cardDeal = {
  initial: { opacity: 0, rotateY: 90, scale: 0.85 },
  animate: {
    opacity: 1, rotateY: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.25 } },
};

/** Stagger children: wrap a list in this container so children animate in sequence. */
export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

/** Subtle fade-up for list items inside a staggerContainer. */
export const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

/** Bounce scale for result feedback (win/lose flash). */
export const resultPop = {
  initial: { scale: 0.6, opacity: 0 },
  animate: {
    scale: 1, opacity: 1,
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.2 } },
};

/** Modal overlay background. */
export const modalOverlay = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

/** Modal panel — slides up from below. */
export const modalPanel = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  animate: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 350, damping: 28 },
  },
  exit: { opacity: 0, y: 40, scale: 0.95, transition: { duration: 0.2 } },
};

/** Pulse highlight for number changes (score, hand value). */
export const numberFlash = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.15, 1],
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
};
