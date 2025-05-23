
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ExamNamesBadge from './ExamNamesBadge';
import HeroHeader from './HeroHeader';
import HeroHeadline from './HeroHeadline';
import HeroBackground from './HeroBackground';
import PremiumBadge from './PremiumBadge';
import KeyBenefitsSection from './KeyBenefitsSection';
import ChallengesSection from './ChallengesSection';
import HeroIntroText from './HeroIntroText';
import CommunityStat from './CommunityStat';
import HeroButtons from './HeroButtons';
import FeatureCheckpoints from './FeatureCheckpoints';

interface HeroContentProps {
  handleExamReadinessClick: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ handleExamReadinessClick }) => {
  const navigate = useNavigate();
  
  const handleFreeTrialClick = () => {
    navigate('/signup');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="w-full lg:w-1/2 pt-4 lg:pt-0 lg:pr-8 relative z-20"
    >
      {/* Futuristic Background Elements */}
      <HeroBackground />

      {/* Premium Success Badge */}
      <PremiumBadge />

      {/* Enhanced NEET Live Badge & Welcome Message */}
      <HeroHeader />

      {/* Main Headline */}
      <HeroHeadline />

      {/* Challenges Section */}
      <ChallengesSection />

      {/* Introduction Text */}
      <HeroIntroText />

      {/* Enhanced 5 Key Benefits */}
      <KeyBenefitsSection />
      
      {/* Exam Names Badge */}
      <ExamNamesBadge />

      {/* Enhanced Futuristic CTA Buttons */}
      <div className="space-y-3 mt-6 mb-6">
        <motion.button
          onClick={handleFreeTrialClick}
          className="group w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center relative overflow-hidden border border-purple-400/30"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative flex items-center gap-3">
            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>
            <span className="text-base">Launch Your Success Journey - 7 Days Free</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </div>
        </motion.button>
        
        <motion.button
          onClick={handleExamReadinessClick}
          className="group w-full border-2 border-purple-400/50 hover:border-purple-500 dark:border-purple-700 dark:hover:border-purple-600 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 py-3 px-6 rounded-2xl flex items-center justify-center relative overflow-hidden backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 8.5c-.96.96-2.82 1.76-5 1.76-3.5 0-6-2-6.5-3.75l3.5-1.5"></path><path d="M15 12c2.5-1 4-2.5 4.5-4.5l1.5-4.5c-1-.5-3-1-5-1-3 0-7 1.5-9.5 4L3.5 9"></path><path d="M14 16.5c-.96.96-2.82 1.76-5 1.76-3.5 0-6-2-6.5-3.75L6 13"></path><path d="M13.5 19.5c2.5-1 4-2.5 4.5-4.5L20 9"></path><path d="M20 3.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path><path d="M21.5 12a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path><path d="M3.5 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path></svg>
            <span className="font-semibold text-base">AI Exam Readiness Analysis</span>
            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 14l-4.5-3 4.5-3"></path><path d="M9.5 14l-4.5-3 4.5-3"></path><path d="M11 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"></path></svg>
          </div>
        </motion.button>
      </div>
      
      {/* Community Stats */}
      <CommunityStat />
    </motion.div>
  );
};

export default HeroContent;
