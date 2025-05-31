
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnimatedHighlightProps {
  message: string;
  storageKey: string;
  className?: string;
}

const AnimatedHighlight: React.FC<AnimatedHighlightProps> = ({ 
  message, 
  storageKey, 
  className = "" 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasBeenClosed = localStorage.getItem(storageKey) === 'true';
    if (!hasBeenClosed) {
      setIsVisible(true);
    }
  }, [storageKey]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(storageKey, 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`absolute -top-2 -right-2 z-20 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-2 rounded-lg shadow-lg max-w-xs ${className}`}
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.div>
            <span className="text-xs font-medium">{message}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-5 w-5 p-0 ml-1 hover:bg-white/20"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <div className="absolute -bottom-1 left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-orange-500"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedHighlight;
