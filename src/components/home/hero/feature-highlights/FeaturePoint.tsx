
import React from 'react';
import { motion } from 'framer-motion';

export interface FeaturePointProps {
  icon: React.ReactNode;
  color: string;
  delay: number;
  index: number;
}

const FeaturePoint: React.FC<FeaturePointProps> = ({
  icon,
  color,
  delay,
  index
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        show: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 80,
            damping: 12
          }
        }
      }}
      whileHover={{
        scale: 1.15,
        y: -10,
        boxShadow: "0 15px 30px -5px rgba(139, 92, 246, 0.5)",
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 10
        }
      }}
      className="flex items-center justify-center p-4 rounded-full transform transition-all relative"
      style={{ originY: 0.5, originX: 0.5 }}
    >
      <FeatureIcon icon={icon} color={color} delay={delay} />
    </motion.div>
  );
};

const FeatureIcon: React.FC<{ icon: React.ReactNode; color: string; delay: number }> = ({ 
  icon, color, delay 
}) => {
  const iconAnimation = {
    rotate: [0, -10, 10, -5, 0],
    scale: [1, 1.2, 1],
    transition: { 
      duration: 0.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 3
    }
  };

  return (
    <motion.div 
      whileHover={iconAnimation}
      animate={iconAnimation}
      className={`rounded-full bg-gradient-to-br ${color} p-3 flex-shrink-0 shadow-md`}
    >
      {icon}
      <motion.div 
        className="absolute inset-0 rounded-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0, 0.5, 0], 
          scale: [0.8, 1.5, 1.8]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity,
          repeatDelay: 1,
          delay: delay
        }}
        style={{ 
          background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)`,
        }}
      />
    </motion.div>
  );
};

export default FeaturePoint;
