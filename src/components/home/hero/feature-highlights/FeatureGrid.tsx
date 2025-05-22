
import React from 'react';
import { motion } from 'framer-motion';
import FeaturePoint from './FeaturePoint';
import { featurePoints, takeawayPoints } from './featureData';
import { containerVariants, staggerContainer, bounceAnimation, fadeInUpStaggered } from './animationVariants';

const FeatureGrid: React.FC = () => {
  return (
    <>
      {/* Main feature points */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
      >
        {featurePoints.map((point, index) => (
          <FeaturePoint
            key={index}
            icon={point.icon}
            title={point.title}
            description={point.description}
            color={point.color}
            delay={point.delay}
            index={index}
          />
        ))}
      </motion.div>

      {/* Takeaway points with enhanced animation */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="flex flex-wrap justify-center gap-4 mt-12 max-w-5xl mx-auto"
      >
        {takeawayPoints.map((point, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={fadeInUpStaggered(index * 0.1)}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
            animate={{
              y: [0, -5, 0],
              transition: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2,
                delay: index * 0.2
              }
            }}
            className={`bg-gradient-to-br ${point.color} px-5 py-3 rounded-full shadow-lg flex items-center gap-2 group transition-all duration-300`}
          >
            <motion.div
              className="text-white rounded-full p-1.5 bg-white/20"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
                transition: { repeat: Infinity, duration: 3, delay: index * 0.3 }
              }}
            >
              {point.icon}
            </motion.div>
            <span className="font-medium text-white">{point.title}</span>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default FeatureGrid;
