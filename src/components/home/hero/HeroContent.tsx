
import React from 'react';
import { motion } from 'framer-motion';
import FeatureCheckpoints from './FeatureCheckpoints';
import StudentJourneyBadge from './StudentJourneyBadge';
import EnhancedCTAButtons from './buttons/EnhancedCTAButtons';

interface HeroContentProps {
  handleExamReadinessClick: () => void;
  toggleStory: () => void;
  showStoryBtn?: boolean;
}

const HeroContent: React.FC<HeroContentProps> = ({ 
  handleExamReadinessClick, 
  toggleStory,
  showStoryBtn = true
}) => {
  const painPoints = [
    "Overwhelming syllabus",
    "Ineffective study techniques",
    "Lack of personalized guidance"
  ];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="w-full lg:w-1/2 pt-8 lg:pt-0 lg:pr-8"
    >
      <StudentJourneyBadge />
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
        We understand your mindset and not just the exam
      </h1>
      
      <motion.div 
        className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-lg p-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Facing These Challenges?</h3>
        <ul className="space-y-2">
          {painPoints.map((point, idx) => (
            <motion.li 
              key={idx}
              className="flex items-center text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
            >
              <span className="h-2 w-2 bg-red-500 rounded-full mr-2" />
              {point}
            </motion.li>
          ))}
        </ul>
      </motion.div>
      
      <motion.p 
        className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Our AI-driven platform is specially designed for Indian competitive exams like <span className="font-semibold text-indigo-600 dark:text-indigo-400">JEE, NEET, UPSC, CAT</span> and more. Get personalized strategies and overcome exam anxiety with our proven methodology.
      </motion.p>
      
      {/* Read the Student Journey Story button */}
      {showStoryBtn && (
        <motion.button
          onClick={toggleStory}
          className="mb-6 w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 text-purple-700 dark:text-purple-300 rounded-lg border border-purple-200 dark:border-purple-800/30 hover:shadow-md transition-all"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
          Read Aanya's Journey: From Struggle to Success
        </motion.button>
      )}

      {/* Enhanced CTA Buttons with NEET Live */}
      <EnhancedCTAButtons onAnalyzeClick={handleExamReadinessClick} />

      {/* Feature checkpoints */}
      <FeatureCheckpoints />
    </motion.div>
  );
};

export default HeroContent;
