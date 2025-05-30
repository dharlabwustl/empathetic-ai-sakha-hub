
import React, { useState } from 'react';
import { ArrowDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface HighlightArrowProps {
  message: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  variant?: 'urgent' | 'info' | 'success';
}

const HighlightArrow: React.FC<HighlightArrowProps> = ({ 
  message, 
  position = 'top', 
  className = '',
  variant = 'urgent'
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'urgent':
        return 'bg-red-500 border-red-500';
      case 'info':
        return 'bg-blue-500 border-blue-500';
      case 'success':
        return 'bg-green-500 border-green-500';
      default:
        return 'bg-red-500 border-red-500';
    }
  };

  const getArrowPosition = () => {
    switch (position) {
      case 'top':
        return '-top-16 left-1/2 transform -translate-x-1/2';
      case 'bottom':
        return '-bottom-16 left-1/2 transform -translate-x-1/2';
      case 'left':
        return 'top-1/2 -left-16 transform -translate-y-1/2';
      case 'right':
        return 'top-1/2 -right-16 transform -translate-y-1/2';
      default:
        return '-top-16 left-1/2 transform -translate-x-1/2';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`absolute z-50 ${getArrowPosition()} ${className}`}
        >
          <div className="relative">
            {/* Message Bubble */}
            <div className={`${getVariantStyles()} text-white px-4 py-3 rounded-lg shadow-lg relative`}>
              <motion.div
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex items-center gap-2"
              >
                <motion.p
                  animate={{
                    color: ["#ffffff", "#ffeb3b", "#ffffff"]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-sm font-bold whitespace-nowrap"
                >
                  {message}
                </motion.p>
              </motion.div>
              
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
                className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-white text-gray-600 hover:bg-gray-100 rounded-full"
              >
                <X className="h-3 w-3" />
              </Button>
              
              {/* Arrow pointing down/up based on position */}
              {position === 'top' && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-current"></div>
              )}
              {position === 'bottom' && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-current"></div>
              )}
            </div>

            {/* Animated Arrow Pointer */}
            <motion.div
              animate={{
                y: position === 'top' ? [0, 10, 0] : [0, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex justify-center mt-2"
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className={`${getVariantStyles()} text-white p-2 rounded-full shadow-lg`}
              >
                <ArrowDown className={`h-5 w-5 ${position === 'bottom' ? 'rotate-180' : ''}`} />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HighlightArrow;
