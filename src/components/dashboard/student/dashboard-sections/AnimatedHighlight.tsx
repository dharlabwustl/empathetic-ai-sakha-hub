
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnimatedHighlightProps {
  id: string;
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  showArrow?: boolean;
  icon?: React.ReactNode;
}

const AnimatedHighlight: React.FC<AnimatedHighlightProps> = ({
  id,
  text,
  position = 'top',
  className = '',
  showArrow = true,
  icon
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(`highlight-dismissed-${id}`);
    if (!dismissed) {
      setIsVisible(true);
    }
  }, [id]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(`highlight-dismissed-${id}`, 'true');
  };

  if (!isVisible) return null;

  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-full';
      case 'bottom':
        return 'bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full';
      case 'left':
        return 'left-0 top-1/2 transform -translate-x-full -translate-y-1/2';
      case 'right':
        return 'right-0 top-1/2 transform translate-x-full -translate-y-1/2';
      default:
        return 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-full';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -20 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`absolute z-50 ${getPositionStyles()} ${className}`}
      >
        <div className="relative">
          {/* Main highlight bubble */}
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.3)",
                "0 0 30px rgba(59, 130, 246, 0.5)",
                "0 0 20px rgba(59, 130, 246, 0.3)"
              ]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-lg shadow-lg max-w-xs"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {icon && <span className="text-lg">{icon}</span>}
                <span className="text-sm font-medium">{text}</span>
                {showArrow && (
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-6 w-6 p-0 hover:bg-white/20 text-white"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </motion.div>
          
          {/* Arrow pointing to the card */}
          {position === 'top' && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-purple-600"></div>
            </div>
          )}
          {position === 'bottom' && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-purple-600"></div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedHighlight;
