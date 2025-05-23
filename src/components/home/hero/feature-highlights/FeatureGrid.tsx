
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
            className={`bg-gradient-to-br ${point.color} px-5 py-3 rounded-full shadow-lg flex items-center gap-2 group transition-all duration-300`}
          >
            <motion.div
              className="text-white rounded-full p-1.5 bg-white/20"
              {...bounceAnimation}
            >
              {point.icon}
            </motion.div>
            <span className="font-medium text-white">{point.title}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Animated Takeaway Badges */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="flex flex-wrap justify-center gap-4 mt-8 max-w-5xl mx-auto"
      >
        {[
          { title: "Confidence Builder", color: "from-emerald-500 to-emerald-700", icon: "🔥" },
          { title: "Exam Success", color: "from-blue-500 to-blue-700", icon: "🏆" },
          { title: "Time Saver", color: "from-purple-500 to-purple-700", icon: "⏱️" },
          { title: "Stress-Free", color: "from-amber-500 to-amber-700", icon: "🧘" },
          { title: "Happy Learning", color: "from-pink-500 to-pink-700", icon: "😊" }
        ].map((takeaway, index) => (
          <motion.div
            key={`takeaway-${index}`}
            custom={index}
            variants={fadeInUpStaggered(index * 0.15)}
            whileHover={{ scale: 1.08, rotate: [-1, 1, -1], transition: { rotate: { repeat: Infinity, duration: 0.5 } } }}
            className={`bg-gradient-to-br ${takeaway.color} px-5 py-3 rounded-full shadow-lg flex items-center gap-2 group transition-all duration-300`}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0, -10, 0] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: index * 0.5
              }}
              className="text-xl"
            >
              {takeaway.icon}
            </motion.div>
            <motion.span 
              className="font-medium text-white"
              animate={{ 
                textShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 10px rgba(255,255,255,0.8)", "0 0 0px rgba(255,255,255,0)"]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            >
              {takeaway.title}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default FeatureGrid;
