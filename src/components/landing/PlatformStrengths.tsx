
/* The file has a TypeScript error in the animation variant.
   We need to fix the animation variant by using allowed values for repeatType. */

// The error is in the animation variants, where repeatType should be a specific value rather than any string.
// Let's replace this:
const pulseAnimation = {
  initial: { scale: 1 },
  animate: { 
    scale: [1, 1.05, 1], 
    transition: { 
      duration: 2, 
      repeat: Infinity, 
      repeatType: "loop" // Changed from string to specific allowed value "loop"
    }
  }
};
