
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnimatedHighlightProps {
  id: string;
  message: string;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  className?: string;
  arrowDirection?: 'up' | 'down' | 'left' | 'right';
}

const AnimatedHighlight: React.FC<AnimatedHighlightProps> = ({
  id,
  message,
  position = 'top-right',
  className = '',
  arrowDirection = 'down'
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenHighlight = localStorage.getItem(`highlight_${id}_dismissed`) === 'true';
    if (!hasSeenHighlight) {
      setIsVisible(true);
    }
  }, [id]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(`highlight_${id}_dismissed`, 'true');
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return '-top-16 left-0';
      case 'top-right':
        return '-top-16 right-0';
      case 'bottom-left':
        return '-bottom-16 left-0';
      case 'bottom-right':
        return '-bottom-16 right-0';
      default:
        return '-top-16 right-0';
    }
  };

  const getArrowRotation = () => {
    switch (arrowDirection) {
      case 'up':
        return 'rotate-180';
      case 'left':
        return 'rotate-90';
      case 'right':
        return '-rotate-90';
      default:
        return '';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          transition={{ duration: 0.4 }}
          className={`absolute z-50 ${getPositionClasses()} ${className}`}
        >
          <div className="relative bg-gradient-to-r from-orange-500 to-pink-500 text-white p-3 rounded-lg shadow-lg max-w-48">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleClose}
              className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-white text-gray-600 hover:bg-gray-100 rounded-full"
            >
              <X className="h-3 w-3" />
            </Button>
            
            <p className="text-xs font-medium pr-4">{message}</p>
            
            <motion.div
              animate={{
                y: [0, 5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`absolute top-full left-1/2 transform -translate-x-1/2 text-orange-500 ${getArrowRotation()}`}
            >
              <ArrowDown className="h-4 w-4" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedHighlight;
