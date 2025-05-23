
import React from 'react';
import { motion } from 'framer-motion';

const HeroHeadline: React.FC = () => {
  return (
    <motion.h1
      className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <span className="relative inline-block">
        <motion.span 
          className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600"
          animate={{ 
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          We understand your
        </motion.span>
      </span>
      <br />
      <motion.span 
        className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative"
        animate={{ 
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
        }}
        transition={{ duration: 8, delay: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        mindset, not just the exam
        <motion.div
          className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
        />
      </motion.span>
    </motion.h1>
  );
};

export default HeroHeadline;
