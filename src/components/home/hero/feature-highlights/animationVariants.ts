
import { Variants } from 'framer-motion';

export const fadeInStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      delay: 0.1 + delay * 0.1
    }
  })
};

export const bounceAnimation = {
  animate: { 
    scale: [1, 1.1, 1],
    transition: { 
      duration: 2,
      repeat: Infinity,
    }
  }
};
