
import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedHighlightProps {
  text: string;
  storageKey: string;
  className?: string;
  showArrow?: boolean;
}

const AnimatedHighlight: React.FC<AnimatedHighlightProps> = ({ 
  text, 
  storageKey, 
  className = '',
  showArrow = false 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasBeenClosed = localStorage.getItem(storageKey) === 'true';
    setIsVisible(!hasBeenClosed);
  }, [storageKey]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(storageKey, 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`absolute -top-2 left-1/2 transform -translate-x-1/2 z-20 ${className}`}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 4px 20px rgba(239, 68, 68, 0.3)',
                '0 8px 30px rgba(239, 68, 68, 0.5)',
                '0 4px 20px rgba(239, 68, 68, 0.3)'
              ]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-2 rounded-lg shadow-lg relative max-w-xs"
          >
            <div className="flex items-center gap-2 text-sm font-semibold">
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
              <span>{text}</span>
              <button
                onClick={handleClose}
                className="ml-1 hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
            <motion.div
              className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-r from-red-500 to-orange-500 rotate-45"
              animate={{ rotate: [45, 50, 45] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedHighlight;
