
import React from 'react';
import { motion } from 'framer-motion';

interface FeaturePointProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
  index: number;
}

const FeaturePoint: React.FC<FeaturePointProps> = ({
  icon,
  title,
  description,
  color,
  delay,
  index
}) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: delay, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 w-full max-w-xs h-full flex flex-col items-center text-center border border-gray-100 dark:border-gray-700 overflow-hidden relative"
    >
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 opacity-10 -z-10"
        animate={{
          background: [
            `linear-gradient(120deg, ${color.split(' ')[1]} 0%, ${color.split(' ')[3]} 100%)`,
            `linear-gradient(240deg, ${color.split(' ')[3]} 0%, ${color.split(' ')[1]} 100%)`,
            `linear-gradient(360deg, ${color.split(' ')[1]} 0%, ${color.split(' ')[3]} 100%)`,
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      
      {/* Icon container with pulsing animation */}
      <motion.div
        className={`${color} p-3 rounded-full mb-4 text-white`}
        animate={{ 
          boxShadow: [
            `0 0 0 rgba(0,0,0,0)`, 
            `0 0 10px ${color.split(' ')[3]}`, 
            `0 0 0 rgba(0,0,0,0)`
          ],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
      >
        {icon}
      </motion.div>
      
      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
      
      <motion.p 
        className="text-sm text-gray-600 dark:text-gray-300"
        initial={{ opacity: 0.7 }}
        whileHover={{ opacity: 1 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

export default FeaturePoint;
