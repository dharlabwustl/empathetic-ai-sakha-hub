
import { Variants } from 'framer-motion';

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

export const floatAnimation: Variants = {
  initial: { y: 0 },
  animate: (i: number) => ({
    y: [-5, 0, -5],
    transition: {
      delay: i * 0.2,
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }),
  hover: { y: -10, transition: { duration: 0.3 } }
};

export const cardHoverAnimation: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3 } }
};

export const particleAnimation: Variants = {
  initial: { opacity: 0, y: 0 },
  animate: (i: number) => ({
    opacity: [0, 1, 0],
    y: [0, -20, 0],
    transition: {
      delay: i * 0.3,
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  })
};
