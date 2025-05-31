
import React from 'react';
import { ArrowDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface AnimatedHighlightProps {
  message: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  isVisible: boolean;
  onClose: () => void;
  className?: string;
}

const AnimatedHighlight: React.FC<AnimatedHighlightProps> = ({ 
  message, 
  position, 
  isVisible, 
  onClose, 
  className = '' 
}) => {
  if (!isVisible) return null;

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'absolute -top-16 left-1/2 transform -translate-x-1/2 z-50';
      case 'bottom':
        return 'absolute -bottom-16 left-1/2 transform -translate-x-1/2 z-50';
      case 'left':
        return 'absolute top-1/2 -left-64 transform -translate-y-1/2 z-50';
      case 'right':
        return 'absolute top-1/2 -right-64 transform -translate-y-1/2 z-50';
      default:
        return 'absolute -top-16 left-1/2 transform -translate-x-1/2 z-50';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: position === 'top' ? -20 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: position === 'top' ? -20 : 20 }}
          className={`${getPositionClasses()} ${className}`}
        >
          <div className="relative">
            {/* Arrow Animation */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex justify-center mb-2"
            >
              <div className="bg-blue-500 text-white p-2 rounded-full shadow-lg">
                <ArrowDown className="h-4 w-4" />
              </div>
            </motion.div>
            
            {/* Message Bubble */}
            <div className="bg-blue-500 text-white px-4 py-3 rounded-lg shadow-lg relative">
              <motion.p
                animate={{
                  color: ["#ffffff", "#ffeb3b", "#ffffff"]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-sm font-medium whitespace-nowrap max-w-xs"
              >
                {message}
              </motion.p>
              
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-white text-blue-500 hover:bg-gray-100 rounded-full"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedHighlight;
