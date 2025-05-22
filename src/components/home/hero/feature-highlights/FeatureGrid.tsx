
import React from 'react';
import { motion } from 'framer-motion';
import FeaturePoint from './FeaturePoint';
import { featurePoints } from './featureData';
import { containerVariants, floatAnimation, cardHoverAnimation } from './animationVariants';

const FeatureGrid: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-7xl mx-auto"
    >
      {featurePoints.map((point, index) => (
        <motion.div 
          key={index}
          variants={floatAnimation}
          initial="initial"
          animate="animate"
          whileHover="hover"
          custom={index * 0.2} // Stagger the animations
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
