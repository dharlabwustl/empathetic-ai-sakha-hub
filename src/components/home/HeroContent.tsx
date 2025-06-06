
import React from 'react';
import { motion } from 'framer-motion';
import HeroButtons from './HeroButtons';
import FeatureCheckpoints from './FeatureCheckpoints';
import StudentJourneyBadge from './StudentJourneyBadge';
import ExamNamesBadge from './ExamNamesBadge';
import { Award, GraduationCap, Clock, Shield, Smile, Brain } from 'lucide-react';
import { takeawayPoints } from './hero/feature-highlights/featureData';
import { fadeInStagger, itemVariants } from './hero/feature-highlights/animationVariants';

interface HeroContentProps {
  handleExamReadinessClick: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ handleExamReadinessClick }) => {
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
      <div className="flex flex-wrap gap-2 mb-4">
        <StudentJourneyBadge />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1"
        >
          <span className="animate-pulse-subtle">●</span> NEET is live now!
        </motion.div>
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
        We understand your mindset, not just the exam
      </h1>
      
      <motion.div 
        className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-lg p-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Your Preparation Challenges</h3>
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
        <span className="font-semibold">From struggling student to exam champion</span> - our AI-driven platform is specially designed for Indian competitive exams like <span className="font-semibold text-indigo-600 dark:text-indigo-400">JEE, NEET, UPSC, CAT</span> and more. Your personalized pathway to success starts here.
      </motion.p>
      
      {/* KEY BENEFITS SECTION - PROMINENTLY DISPLAYED ABOVE CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mb-10 p-5 rounded-xl border-2 border-blue-100 dark:border-blue-900/30 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 shadow-sm"
      >
        <h3 className="text-center font-semibold text-lg text-blue-700 dark:text-blue-400 mb-4">
          Five Key Benefits For Your Success
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-2">
          {[
            { icon: <Award size={24} />, label: "Confidence Builder", color: "bg-green-500" },
            { icon: <GraduationCap size={24} />, label: "Exam Success", color: "bg-blue-500" },
            { icon: <Clock size={24} />, label: "Time Saver", color: "bg-amber-500" },
            { icon: <Shield size={24} />, label: "Stress-Free", color: "bg-purple-500" },
            { icon: <Smile size={24} />, label: "Happy Learning", color: "bg-pink-500" },
            { icon: <Brain size={24} />, label: "Smart AI", color: "bg-indigo-500" }
          ].map((benefit, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              custom={idx}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className={`${benefit.color} text-white rounded-lg py-3 px-3 flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 text-center`}
            >
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0, -10, 0] 
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: idx * 0.5
                }}
                className="bg-white/20 rounded-full p-2 mb-1"
              >
                {benefit.icon}
              </motion.div>
              <span className="font-bold text-sm md:text-base">{benefit.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      {/* Exam Names Badge */}
      <ExamNamesBadge />
      
      <HeroButtons onAnalyzeClick={handleExamReadinessClick} />

      {/* Feature checkpoints */}
      <FeatureCheckpoints />
    </motion.div>
  );
};

export default HeroContent;
