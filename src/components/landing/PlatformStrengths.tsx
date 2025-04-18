
import { motion } from "framer-motion";

// The animation variant with correct repeatType value
export const pulseAnimation = {
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

// Export a default component (empty) to resolve the import error
const PlatformStrengths = () => {
  return null;
};

export default PlatformStrengths;
