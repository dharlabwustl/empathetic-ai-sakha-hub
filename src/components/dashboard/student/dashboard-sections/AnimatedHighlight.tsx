
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnimatedHighlightProps {
  text: string;
  storageKey: string;
  className?: string;
  arrowPosition?: 'left' | 'right' | 'top' | 'bottom';
  delay?: number;
}

const AnimatedHighlight: React.FC<AnimatedHighlightProps> = ({
  text,
  storageKey,
  className = '',
  arrowPosition = 'left',
  delay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasBeenClosed = localStorage.getItem(storageKey) === 'true';
    if (!hasBeenClosed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [storageKey, delay]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(storageKey, 'true');
  };

  const getArrowStyles = () => {
    switch (arrowPosition) {
      case 'top':
        return 'top-[-12px] left-1/2 transform -translate-x-1/2';
      case 'bottom':
        return 'bottom-[-12px] left-1/2 transform -translate-x-1/2';
      case 'right':
        return 'right-[-12px] top-1/2 transform -translate-y-1/2 rotate-90';
      default:
        return 'left-[-12px] top-1/2 transform -translate-y-1/2';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`absolute z-50 ${className}`}
        >
          <div className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg shadow-lg border-2 border-white">
            {/* Animated Arrow */}
            <motion.div
              className={`absolute ${getArrowStyles()}`}
              animate={{
                x: arrowPosition === 'left' ? [-5, 5, -5] : 0,
                y: arrowPosition === 'top' ? [-5, 5, -5] : arrowPosition === 'bottom' ? [5, -5, 5] : 0,
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ArrowRight className="h-4 w-4 text-white" />
            </motion.div>

            {/* Text with pulsing effect */}
            <motion.span
              className="text-sm font-bold"
              animate={{
                textShadow: [
                  "0 0 8px rgba(255,255,255,0.5)",
                  "0 0 16px rgba(255,255,255,0.8)",
                  "0 0 8px rgba(255,255,255,0.5)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {text}
            </motion.span>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="ml-2 h-6 w-6 p-0 text-white hover:bg-white/20"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedHighlight;
