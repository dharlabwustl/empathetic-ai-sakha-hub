
import React from 'react';
import { motion } from 'framer-motion';
import FeaturePoint from './FeaturePoint';
import { featurePoints } from './featureData';
import { containerVariants } from './animationVariants';

const FeatureGrid: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto px-4"
    >
      {featurePoints.map((point, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.2,
            ease: "easeOut" 
          }}
          className="flex justify-center"
        >
          <FeaturePoint
            key={index}
            icon={point.icon}
            title={point.title}
            description={point.description}
            color={point.color}
            delay={point.delay}
            index={index}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeatureGrid;
