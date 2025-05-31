
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnimatedHighlightProps {
  id: string;
  message: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  arrowDirection?: 'up' | 'down' | 'left' | 'right';
  variant?: 'default' | 'important';
  className?: string;
}

const AnimatedHighlight: React.FC<AnimatedHighlightProps> = ({
  id,
  message,
  position = 'top-right',
  arrowDirection = 'down',
  variant = 'default',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const hasSeenHighlight = localStorage.getItem(`highlight_${id}_seen`) === 'true';
    
    if (!hasSeenHighlight) {
      const timer = setTimeout(() => {
        setShouldShow(true);
        setIsVisible(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [id]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(`highlight_${id}_seen`, 'true');
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-0 left-0 -translate-y-full -translate-x-2';
      case 'top-right':
        return 'top-0 right-0 -translate-y-full translate-x-2';
      case 'bottom-left':
        return 'bottom-0 left-0 translate-y-full -translate-x-2';
      case 'bottom-right':
        return 'bottom-0 right-0 translate-y-full translate-x-2';
      default:
        return 'top-0 right-0 -translate-y-full translate-x-2';
    }
  };

  const getArrowClasses = () => {
    const baseClasses = "absolute w-0 h-0";
    const arrowSize = "border-[8px]";
    
    switch (arrowDirection) {
      case 'up':
        return `${baseClasses} ${arrowSize} border-transparent ${
          variant === 'important' 
            ? 'border-b-orange-500 top-[-16px] left-1/2 -translate-x-1/2' 
            : 'border-b-purple-500 top-[-16px] left-1/2 -translate-x-1/2'
        }`;
      case 'down':
        return `${baseClasses} ${arrowSize} border-transparent ${
          variant === 'important' 
            ? 'border-t-orange-500 bottom-[-16px] left-1/2 -translate-x-1/2' 
            : 'border-t-purple-500 bottom-[-16px] left-1/2 -translate-x-1/2'
        }`;
      case 'left':
        return `${baseClasses} ${arrowSize} border-transparent ${
          variant === 'important' 
            ? 'border-r-orange-500 left-[-16px] top-1/2 -translate-y-1/2' 
            : 'border-r-purple-500 left-[-16px] top-1/2 -translate-y-1/2'
        }`;
      case 'right':
        return `${baseClasses} ${arrowSize} border-transparent ${
          variant === 'important' 
            ? 'border-l-orange-500 right-[-16px] top-1/2 -translate-y-1/2' 
            : 'border-l-purple-500 right-[-16px] top-1/2 -translate-y-1/2'
        }`;
      default:
        return `${baseClasses} ${arrowSize} border-transparent ${
          variant === 'important' 
            ? 'border-t-orange-500 bottom-[-16px] left-1/2 -translate-x-1/2' 
            : 'border-t-purple-500 bottom-[-16px] left-1/2 -translate-x-1/2'
        }`;
    }
  };

  if (!shouldShow) return null;

  const bgClasses = variant === 'important' 
    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-600 shadow-orange-200' 
    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-600 shadow-purple-200';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 20,
            duration: 0.3 
          }}
          className={`absolute z-50 ${getPositionClasses()} ${className}`}
        >
          <div className={`relative ${bgClasses} rounded-lg px-4 py-3 shadow-lg border max-w-xs`}>
            <div className="flex items-start gap-2">
              <motion.div
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="h-4 w-4 flex-shrink-0 mt-0.5" />
              </motion.div>
              
              <p className="text-sm font-medium leading-relaxed flex-1">
                {message}
              </p>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-6 w-6 p-0 hover:bg-white/20 text-white hover:text-white"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            
            <div className={getArrowClasses()} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedHighlight;
