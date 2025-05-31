
import React, { useState } from 'react';
import { ArrowDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface UrgencyArrowProps {
  message: string;
  position: 'top-priority' | 'live-plan';
  className?: string;
}

const UrgencyArrow: React.FC<UrgencyArrowProps> = ({ message, position, className = '' }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const getArrowPosition = () => {
    if (position === 'top-priority') {
      return 'top-8 left-1/2 transform -translate-x-1/2';
    }
    return 'top-8 right-1/2 transform translate-x-1/2';
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
            {/* Main Arrow Pointer */}
            <motion.div
              animate={{
                y: [0, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex flex-col items-center"
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
                className="bg-red-500 text-white p-2 rounded-full shadow-lg"
              >
                <ArrowDown className="h-5 w-5" />
              </motion.div>
              
              {/* Message Bubble */}
              <div className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg relative">
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
                
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsVisible(false)}
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-white text-red-500 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-3 w-3" />
                </Button>
                
                {/* Arrow pointing down */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UrgencyArrow;
