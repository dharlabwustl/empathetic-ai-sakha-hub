
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnimatedHighlightProps {
  children: React.ReactNode;
  text: string;
  storageKey: string;
  isUrgent?: boolean;
  className?: string;
}

const AnimatedHighlight: React.FC<AnimatedHighlightProps> = ({
  children,
  text,
  storageKey,
  isUrgent = false,
  className = ""
}) => {
  const [showHighlight, setShowHighlight] = useState(false);

  useEffect(() => {
    const hasSeenHighlight = localStorage.getItem(storageKey) === 'true';
    if (!hasSeenHighlight) {
      setTimeout(() => setShowHighlight(true), 1000);
    }
  }, [storageKey]);

  const handleClose = () => {
    setShowHighlight(false);
    localStorage.setItem(storageKey, 'true');
  };

  return (
    <div className={`relative ${className}`}>
      {children}
      
      <AnimatePresence>
        {showHighlight && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`absolute -top-2 -right-2 z-50 max-w-xs p-3 rounded-lg shadow-xl border-2 ${
              isUrgent 
                ? 'bg-red-50 border-red-300 text-red-800' 
                : 'bg-blue-50 border-blue-300 text-blue-800'
            }`}
          >
            <div className="flex items-start gap-2">
              <motion.div
                animate={{ 
                  x: [0, 5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ArrowRight className={`h-4 w-4 mt-0.5 ${
                  isUrgent ? 'text-red-600' : 'text-blue-600'
                }`} />
              </motion.div>
              
              <div className="flex-1">
                <p className="text-xs font-medium leading-tight">
                  {text}
                </p>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-5 w-5 p-0 hover:bg-red-100"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            
            {/* Animated pointer */}
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                y: [0, -2, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`absolute -bottom-1 left-8 w-3 h-3 transform rotate-45 ${
                isUrgent ? 'bg-red-50 border-r border-b border-red-300' : 'bg-blue-50 border-r border-b border-blue-300'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedHighlight;
