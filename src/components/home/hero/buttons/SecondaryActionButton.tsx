
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SecondaryActionButtonProps {
  onClick: () => void;
  text?: string;
}

const SecondaryActionButton: React.FC<SecondaryActionButtonProps> = ({ 
  onClick, 
  text = "AI Exam Readiness Analysis" 
}) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        y: -2
      }}
      whileTap={{ scale: 0.98 }}
      className="relative w-full sm:w-auto"
    >
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/30 via-violet-500/30 to-indigo-400/30 blur-md -z-10"
        animate={{ 
          opacity: [0.5, 0.8, 0.5],
          scale: [0.98, 1.01, 0.98],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      <Button
        onClick={onClick}
        variant="outline"
        size="lg"
        className="border-2 w-full border-purple-300 hover:border-purple-400 dark:border-purple-700 dark:hover:border-purple-600 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-xl group py-5 px-6 h-auto"
      >
        <Brain className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
        <span>{text}</span>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <Sparkles className="h-5 w-5 ml-2 text-amber-500" />
        </motion.div>
      </Button>
    </motion.div>
  );
};

export default SecondaryActionButton;
