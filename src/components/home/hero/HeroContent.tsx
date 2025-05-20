
import React from 'react';
import { motion } from 'framer-motion';
import HeroButtons from './HeroButtons';
import FeatureCheckpoints from './FeatureCheckpoints';

interface HeroContentProps {
  handleExamReadinessClick: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ handleExamReadinessClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="w-full lg:w-1/2 pt-8 lg:pt-0 lg:pr-8"
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
        Smart Data. Real Impact. Humanizing exam prep.
      </h1>
      
      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
        Our AI-powered platform creates personalized study plans, targeted practice sessions, 
        and tracks your progress to ensure exam success with less stress.
      </p>
      
      <HeroButtons onAnalyzeClick={handleExamReadinessClick} />

      {/* Feature checkpoints */}
      <FeatureCheckpoints />
      
      {/* Social proof section */}
      <div className="mt-8 flex items-center justify-center lg:justify-start space-x-1">
        <div className="flex -space-x-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-300">
              {i < 3 ? (
                <img 
                  src={`/assets/images/avatar-${i+1}.png`} 
                  alt={`User ${i+1}`}
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/images/default-avatar.png";
                  }}
                />
              ) : (
                <span>{i === 3 ? "+99" : ""}</span>
              )}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-semibold">5,000+</span> students already improving their scores
        </p>
      </div>
    </motion.div>
  );
};

export default HeroContent;
