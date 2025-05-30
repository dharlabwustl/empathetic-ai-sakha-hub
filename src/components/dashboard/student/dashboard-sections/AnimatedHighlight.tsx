
import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface AnimatedHighlightProps {
  message: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center';
  color?: 'red' | 'green' | 'blue' | 'orange' | 'purple';
  className?: string;
  onClose?: () => void;
}

const AnimatedHighlight: React.FC<AnimatedHighlightProps> = ({
  message,
  position = 'top-right',
  color = 'red',
  className = '',
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'red':
        return 'bg-red-500 text-white border-red-600';
      case 'green':
        return 'bg-green-500 text-white border-green-600';
      case 'blue':
        return 'bg-blue-500 text-white border-blue-600';
      case 'orange':
        return 'bg-orange-500 text-white border-orange-600';
      case 'purple':
        return 'bg-purple-500 text-white border-purple-600';
      default:
        return 'bg-red-500 text-white border-red-600';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return '-top-12 -left-4';
      case 'top-right':
        return '-top-12 -right-4';
      case 'bottom-left':
        return '-bottom-12 -left-4';
      case 'bottom-right':
        return '-bottom-12 -right-4';
      case 'top-center':
        return '-top-12 left-1/2 transform -translate-x-1/2';
      default:
        return '-top-12 -right-4';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`absolute z-50 ${getPositionClasses()} ${className}`}
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`
              relative px-4 py-2 rounded-lg shadow-lg border-2 text-sm font-bold
              ${getColorClasses()}
              flex items-center gap-2 min-w-max
            `}
          >
            <motion.div
              animate={{
                x: [0, 5, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.div>
            
            <span className="whitespace-nowrap">{message}</span>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-4 w-4 p-0 ml-2 text-white hover:bg-white/20 rounded-full"
            >
              <X className="h-3 w-3" />
            </Button>
          </motion.div>
          
          {/* Animated arrow pointer */}
          <motion.div
            animate={{
              y: [0, -5, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`
              absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0
              border-l-8 border-r-8 border-t-8 border-transparent 
              ${color === 'red' ? 'border-t-red-500' : 
                color === 'green' ? 'border-t-green-500' :
                color === 'blue' ? 'border-t-blue-500' :
                color === 'orange' ? 'border-t-orange-500' :
                'border-t-purple-500'}
            `}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedHighlight;
