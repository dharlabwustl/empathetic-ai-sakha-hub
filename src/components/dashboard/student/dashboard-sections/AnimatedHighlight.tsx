
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnimatedHighlightProps {
  message: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  className?: string;
  arrowDirection?: 'up' | 'down' | 'left' | 'right';
}

const AnimatedHighlight: React.FC<AnimatedHighlightProps> = ({
  message,
  position = 'top-right',
  className = '',
  arrowDirection = 'down'
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left': return 'top-0 left-0 -translate-y-full -translate-x-2';
      case 'top-right': return 'top-0 right-0 -translate-y-full translate-x-2';
      case 'bottom-left': return 'bottom-0 left-0 translate-y-full -translate-x-2';
      case 'bottom-right': return 'bottom-0 right-0 translate-y-full translate-x-2';
      case 'top-center': return 'top-0 left-1/2 -translate-y-full -translate-x-1/2';
      case 'bottom-center': return 'bottom-0 left-1/2 translate-y-full -translate-x-1/2';
      default: return 'top-0 right-0 -translate-y-full translate-x-2';
    }
  };

  const getArrowRotation = () => {
    switch (arrowDirection) {
      case 'up': return 'rotate-180';
      case 'left': return 'rotate-90';
      case 'right': return '-rotate-90';
      default: return 'rotate-0';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 10 }}
        transition={{ duration: 0.5 }}
        className={`absolute z-50 ${getPositionClasses()} ${className}`}
      >
        {/* Highlight bubble */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              '0 4px 20px rgba(239, 68, 68, 0.3)',
              '0 8px 40px rgba(239, 68, 68, 0.5)',
              '0 4px 20px rgba(239, 68, 68, 0.3)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg shadow-lg max-w-xs"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className={`text-white ${getArrowRotation()}`}
              >
                <ArrowDown className="h-4 w-4" />
              </motion.div>
              <span className="text-sm font-semibold">{message}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="h-6 w-6 p-0 text-white hover:bg-white/20"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          
          {/* Pulsing glow effect */}
          <motion.div
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-400 rounded-lg -z-10 blur-sm"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedHighlight;
