
import React from 'react';
import { motion } from 'framer-motion';
import FeaturePoint from './FeaturePoint';
import { featurePoints } from './featureData';
import { containerVariants, staggerContainer, bounceAnimation, fadeInUpStaggered } from './animationVariants';

// New takeaway points with enhanced data
const takeawayPoints = [
  {
    title: "Confidence Builder",
    color: "from-green-500 to-green-600",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>,
    delay: 0.1
  },
  {
    title: "Exam Success",
    color: "from-blue-500 to-blue-600",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="m16.24 7.76-2.12 2.12"/><path d="M19.07 11h-2.89"/><path d="M17.22 15.89c-1.2 1.06-2.79 1.71-4.53 1.71-3.86 0-7-3.14-7-7"/><path d="M6.14 9.12A7 7 0 0 1 19 12.1"/><circle cx="12" cy="12" r="10"/></svg>,
    delay: 0.2
  },
  {
    title: "Time Saver",
    color: "from-purple-500 to-purple-600",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    delay: 0.3
  },
  {
    title: "Stress-Free",
    color: "from-amber-500 to-amber-600",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    delay: 0.4
  },
  {
    title: "Happy Learning",
    color: "from-rose-500 to-rose-600",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
    delay: 0.5
  }
];

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

      {/* Enhanced animated takeaway points */}
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
            whileHover={{ scale: 1.05 }}
            animate={{ 
              y: [0, -5, 0],
              transition: {
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.5, 1],
                repeat: Infinity,
                repeatDelay: point.delay
              }
            }}
            className={`bg-gradient-to-br ${point.color} px-5 py-3 rounded-full shadow-lg flex items-center gap-2 group transition-all duration-300`}
          >
            <motion.div
              className="text-white rounded-full p-1.5 bg-white/20"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.75, 1],
                repeat: Infinity,
                repeatDelay: 1 + point.delay
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
