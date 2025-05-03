
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const ExamNamesBadge = () => {
  return (
    <motion.div 
      className="flex flex-wrap justify-center items-center gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="text-sm text-muted-foreground mr-1"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Trusted by students preparing for:
        </motion.span>
      </motion.div>
      <div className="flex flex-wrap gap-2 items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Badge className="bg-green-600 hover:bg-green-700 px-3 py-1 text-white flex items-center gap-1.5">
            <motion.span
              animate={{ 
                color: ["#ffffff", "#f0f0f0", "#ffffff"],
                textShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 4px rgba(255,255,255,0.5)", "0px 0px 0px rgba(255,255,255,0)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="font-bold text-base"
            >
              NEET
            </motion.span>
            <motion.span 
              className="bg-white text-green-600 text-xs px-1.5 py-0.5 rounded-full font-medium"
              animate={{ 
                scale: [1, 1.1, 1],
                backgroundColor: ["#ffffff", "#f0f0f0", "#ffffff"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Launched
            </motion.span>
          </Badge>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExamNamesBadge;
