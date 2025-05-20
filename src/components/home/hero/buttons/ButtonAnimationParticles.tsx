
import React from 'react';
import { motion } from 'framer-motion';

const ButtonAnimationParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-indigo-300 dark:bg-indigo-600 opacity-70"
          initial={{
            x: '50%',
            y: '50%',
            scale: 0,
            opacity: 0.8
          }}
          animate={{
            x: `${Math.random() * 100 + 50}%`,
            y: `${Math.random() * 100 - 50}%`,
            scale: Math.random() * 2 + 0.5,
            opacity: 0
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            repeatDelay: Math.random() * 0.5,
          }}
        />
      ))}
    </div>
  );
};

export default ButtonAnimationParticles;
