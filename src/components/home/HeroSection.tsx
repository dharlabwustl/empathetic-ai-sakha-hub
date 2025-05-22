
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroContent from './hero/HeroContent';
import DashboardPreview from './hero/DashboardPreview';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Automatically cycle through dashboard features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 6); // Updated to match the number of features
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Handler for exam readiness analyzer
  const handleExamReadinessClick = () => {
    // Dispatch event to open the exam readiness analyzer
    window.dispatchEvent(new CustomEvent('open-exam-analyzer'));
  };

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden min-h-screen py-12 md:py-16 lg:py-0 flex items-center"
    >
      {/* Enhanced 3D Background with immersive elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-purple-50/80 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/50" />
        
        {/* Abstract floating 3D shapes - Knowledge bubbles */}
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-purple-400/10 dark:from-blue-700/10 dark:to-purple-700/5 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            scale: [1, 1.2, 1], 
            x: [0, 30, 0], 
            y: [0, -50, 0] 
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
        
        <motion.div 
          className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-r from-purple-300/20 to-indigo-300/20 dark:from-purple-700/10 dark:to-indigo-700/10 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            scale: [1, 0.8, 1], 
            x: [0, -20, 0], 
            y: [0, 20, 0] 
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            repeatType: "reverse",
            delay: 2
          }}
        />
      
        <motion.div 
          className="absolute bottom-10 left-1/3 w-96 h-96 bg-gradient-to-r from-green-300/20 to-emerald-300/20 dark:from-green-600/10 dark:to-emerald-600/10 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            scale: [1, 1.1, 1], 
            x: [0, 20, 0], 
            y: [0, 30, 0] 
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            repeatType: "reverse",
            delay: 4
          }}
        />

        {/* Floating Books Animation */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-16 h-20 bg-blue-600/20 dark:bg-blue-500/20 rounded-sm shadow-lg"
          style={{ 
            transformStyle: "preserve-3d", 
            transform: "rotateX(10deg) rotateY(-20deg)"
          }}
          animate={{ 
            y: [0, -15, 0],
            rotateZ: [0, 5, 0], 
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut" 
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 to-indigo-500/50 rounded-sm" />
          <div className="absolute inset-y-0 left-0 w-2 bg-blue-700/50 rounded-l-sm" />
        </motion.div>

        {/* Floating Formula Card */}
        <motion.div
          className="absolute top-1/3 left-10 w-32 h-20 bg-white/50 dark:bg-gray-800/50 rounded-lg shadow-md p-2 backdrop-blur-sm"
          animate={{ 
            y: [0, 10, 0],
            rotateZ: [0, -3, 0],
            scale: [1, 1.02, 1] 
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
          style={{ 
            transformStyle: "preserve-3d",
            transform: "rotateX(10deg) rotateY(15deg)"
          }}
        >
          <motion.div className="text-xs text-indigo-800 dark:text-indigo-300 font-mono">
            E = mc<sup>2</sup>
          </motion.div>
          <motion.div className="text-xs text-purple-800 dark:text-purple-300 font-mono mt-2">
            F = ma
          </motion.div>
          <motion.div className="text-xs text-blue-800 dark:text-blue-300 font-mono mt-2">
            PV = nRT
          </motion.div>
        </motion.div>

        {/* Floating Exam Readiness Card */}
        <motion.div
          className="absolute bottom-1/3 right-20 w-40 h-24 bg-white/60 dark:bg-gray-800/60 rounded-lg shadow-lg p-3 backdrop-blur-sm"
          animate={{ 
            y: [0, -15, 0],
            rotateZ: [0, 2, 0],
            scale: [1, 1.03, 1] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            repeatType: "reverse",
            delay: 1
          }}
          style={{ 
            transformStyle: "preserve-3d",
            transform: "rotateX(-5deg) rotateY(-10deg)"
          }}
        >
          <div className="text-xs font-medium text-gray-800 dark:text-gray-200 mb-2">
            Exam Readiness Score
          </div>
          <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
            <motion.div 
              className="h-2 bg-green-500 dark:bg-green-400 rounded-full"
              initial={{ width: '30%' }}
              animate={{ width: '85%' }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-600 dark:text-gray-300">
            <span>0%</span>
            <span>85%</span>
            <span>100%</span>
          </div>
        </motion.div>

        {/* Floating Student Avatar with Happiness Indicator */}
        <motion.div
          className="absolute bottom-1/4 left-1/4 flex flex-col items-center"
          animate={{ 
            y: [0, -10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            repeatType: "reverse",
            delay: 3
          }}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-500 shadow-lg">
            <img 
              src="/lovable-uploads/ffb2594e-ee5e-424c-92ff-417777e347c9.png" 
              alt="Happy Student" 
              className="w-full h-full object-cover" 
            />
          </div>
          <motion.div 
            className="mt-1 flex"
            animate={{
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 2
            }}
          >
            <span role="img" aria-label="happy">😄</span>
            <span role="img" aria-label="celebration">🎉</span>
          </motion.div>
        </motion.div>
        
        {/* Animated grid pattern representing exam paper */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
          style={{
            backgroundImage: "linear-gradient(#5c6bc0 1px, transparent 1px), linear-gradient(to right, #5c6bc0 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center gap-8 justify-between min-h-[85vh]">
          {/* Left Content: Title, description and buttons */}
          <HeroContent handleExamReadinessClick={handleExamReadinessClick} />
          
          {/* Right Content: Enhanced 3D Dashboard Preview */}
          <DashboardPreview activeFeature={activeFeature} setActiveFeature={setActiveFeature} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
