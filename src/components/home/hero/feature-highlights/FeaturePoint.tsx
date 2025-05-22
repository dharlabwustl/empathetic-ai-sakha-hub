
import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from './animationVariants';

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
      variants={itemVariants}
      custom={index}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.3 }}
      className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800"
    >
      <div className={`py-6 px-5`}>
        <motion.div 
          className={`bg-gradient-to-r ${color} rounded-full p-3 inline-block mb-4 shadow-md`}
          whileHover={{ rotate: [0, -10, 10, -10, 10, 0], scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {icon}
          </motion.div>
        </motion.div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

export default FeaturePoint;
