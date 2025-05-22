
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
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 w-full max-w-xs h-full flex flex-col items-center text-center border border-gray-100 dark:border-gray-700 overflow-hidden relative"
      style={{ 
        boxShadow: "0px 8px 24px rgba(0,0,0,0.08)"
      }}
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
            `0 0 15px ${color.split(' ')[3]}`, 
            `0 0 0 rgba(0,0,0,0)`
          ],
          scale: [1, 1.08, 1]
        }}
        transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
      >
        {icon}
      </motion.div>
      
      <motion.h3 
        className="text-lg font-bold mb-2 text-gray-900 dark:text-white"
        animate={{ 
          color: [
            "currentColor", 
            `${color.split(' ')[3].replace(')', ',.8)')}`, 
            "currentColor"
          ] 
        }}
        transition={{ duration: 4, repeat: Infinity, delay: index * 0.3 }}
      >
        {title}
      </motion.h3>
      
      <motion.p 
        className="text-sm text-gray-600 dark:text-gray-300"
        initial={{ opacity: 0.7 }}
        whileHover={{ opacity: 1 }}
      >
        {description}
      </motion.p>
      
      {/* Floating particles effect */}
      <motion.div 
        className="absolute w-2 h-2 rounded-full"
        style={{ 
          background: color.split(' ')[3],
          top: '70%',
          left: '20%',
          filter: 'blur(1px)'
        }}
        animate={{ 
          y: [0, -15, 0],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          delay: index * 0.5 + 1
        }}
      />
      
      <motion.div 
        className="absolute w-1.5 h-1.5 rounded-full"
        style={{ 
          background: color.split(' ')[1],
          top: '40%',
          right: '30%',
          filter: 'blur(1px)'
        }}
        animate={{ 
          y: [0, -20, 0],
          opacity: [0, 0.8, 0]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          delay: index * 0.3 + 2
        }}
      />
    </motion.div>
  );
};

export default FeaturePoint;
