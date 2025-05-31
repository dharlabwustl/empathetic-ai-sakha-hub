
import React, { useState } from 'react';
import { ArrowUp, X, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface AICoachArrowProps {
  isVisible: boolean;
  onClose: () => void;
}

const AICoachArrow: React.FC<AICoachArrowProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="relative">
            {/* Message Bubble */}
            <div className="bg-blue-500 text-white px-4 py-3 rounded-lg shadow-lg relative mb-2">
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
                <Target className="h-4 w-4" />
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
                  Start here! Take test to identify gaps
                </motion.p>
              </motion.div>
              
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-white text-blue-500 hover:bg-gray-100 rounded-full"
              >
                <X className="h-3 w-3" />
              </Button>
              
              {/* Arrow pointing down */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-500"></div>
            </div>

            {/* Animated Arrow Pointer */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex justify-center"
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
                className="bg-blue-500 text-white p-2 rounded-full shadow-lg"
              >
                <ArrowUp className="h-5 w-5 rotate-180" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AICoachArrow;
