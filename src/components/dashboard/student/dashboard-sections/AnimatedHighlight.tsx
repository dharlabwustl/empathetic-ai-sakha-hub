
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnimatedHighlightProps {
  text: string;
  storageKey: string;
  className?: string;
  variant?: 'urgent' | 'info' | 'success' | 'warning';
}

const AnimatedHighlight: React.FC<AnimatedHighlightProps> = ({
  text,
  storageKey,
  className = '',
  variant = 'info'
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem(`highlight_dismissed_${storageKey}`) === 'true';
    setIsVisible(!isDismissed);
  }, [storageKey]);

  const handleClose = () => {
    localStorage.setItem(`highlight_dismissed_${storageKey}`, 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const variants = {
    urgent: {
      bg: 'bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30',
      text: 'text-red-800 dark:text-red-200',
      border: 'border-red-300 dark:border-red-700',
      arrow: 'text-red-600'
    },
    info: {
      bg: 'bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30',
      text: 'text-blue-800 dark:text-blue-200',
      border: 'border-blue-300 dark:border-blue-700',
      arrow: 'text-blue-600'
    },
    success: {
      bg: 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30',
      text: 'text-green-800 dark:text-green-200',
      border: 'border-green-300 dark:border-green-700',
      arrow: 'text-green-600'
    },
    warning: {
      bg: 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30',
      text: 'text-yellow-800 dark:text-yellow-200',
      border: 'border-yellow-300 dark:border-yellow-700',
      arrow: 'text-yellow-600'
    }
  };

  const variantStyles = variants[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={`absolute -top-2 left-2 right-2 z-20 ${variantStyles.bg} ${variantStyles.border} border-2 rounded-lg p-3 shadow-lg backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{
              x: [0, 8, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ArrowRight className={`h-4 w-4 ${variantStyles.arrow}`} />
          </motion.div>
          <span className={`text-sm font-medium ${variantStyles.text}`}>
            {text}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="h-6 w-6 p-0 hover:bg-white/20"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </motion.div>
  );
};

export default AnimatedHighlight;
