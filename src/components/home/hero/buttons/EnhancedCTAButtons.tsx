
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Live } from 'lucide-react';
import ButtonAnimationParticles from './ButtonAnimationParticles';

interface EnhancedCTAButtonsProps {
  onAnalyzeClick?: () => void;
}

const EnhancedCTAButtons: React.FC<EnhancedCTAButtonsProps> = ({ onAnalyzeClick }) => {
  const navigate = useNavigate();
  
  // Handle navigation to signup
  const handleSignupClick = () => {
    navigate('/signup');
  };
  
  // Handle navigation to NEET live sessions
  const handleNEETLiveClick = () => {
    navigate('/neet-live');
  };

  return (
    <div className="space-y-4">
      {/* Main CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-4 relative">
        {/* Floating particles animation */}
        <ButtonAnimationParticles />

        {/* Primary action button: Exam Readiness */}
        <motion.button
          onClick={onAnalyzeClick}
          className="relative overflow-hidden w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-full shadow-lg group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <span className="relative z-10 flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Analyze Exam Readiness
          </span>
          
          {/* Animated gradient background */}
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>

        {/* Secondary action button: Get Started */}
        <motion.button
          onClick={handleSignupClick}
          className="w-full sm:w-auto px-8 py-3 bg-white dark:bg-gray-800 border border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300 font-medium rounded-full hover:shadow-md transition-shadow flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Play className="h-4 w-4 mr-2" />
          Start Free Trial
        </motion.button>
      </div>
      
      {/* NEET Live CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center sm:justify-start"
      >
        <motion.button
          onClick={handleNEETLiveClick}
          className="group relative px-6 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white font-medium rounded-full hover:shadow-lg transition-all flex items-center space-x-2 overflow-hidden"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative z-10 flex items-center">
            <Live className="h-4 w-4 mr-2 animate-pulse" />
            <span className="font-bold">NEET</span> Live Sessions
            <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-white/20">
              NOW
            </span>
          </span>
          
          {/* Ripple effect */}
          <span className="absolute top-0 left-0 w-full h-full">
            <span className="absolute inset-0 h-full w-full bg-white/20 animate-ping rounded-full opacity-75"></span>
          </span>
          
          {/* Pulsing dot */}
          <span className="absolute top-2 right-2 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400"></span>
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default EnhancedCTAButtons;
