
import React from 'react';
import { motion } from 'framer-motion';

const HeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-20 -right-5 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-lg"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-10 left-5 w-20 h-20 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-full blur-lg"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 2 }}
      />
    </div>
  );
};

export default HeroBackground;
