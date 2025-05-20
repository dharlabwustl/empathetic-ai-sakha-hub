
import React from 'react';
import { motion } from 'framer-motion';

const ButtonAnimationParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-violet-400/30 to-blue-300/30"
          style={{
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 30 - 15],
            y: [0, Math.random() * 30 - 15],
            opacity: [0.7, 0.3, 0.7],
            scale: [1, 1.2, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 3 + Math.random() * 2,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

export default ButtonAnimationParticles;
