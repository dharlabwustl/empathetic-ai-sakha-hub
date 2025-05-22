
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      setActiveFeature(prev => (prev + 1) % 5);
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
      {/* Enhanced 3D Background with exam-themed effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-white to-yellow-50/80 dark:from-gray-950 dark:via-gray-900 dark:to-orange-950/20" />
        
        {/* Abstract floating 3D shapes - Knowledge bubbles */}
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-orange-400/15 to-yellow-400/10 dark:from-orange-700/10 dark:to-yellow-700/5 rounded-full mix-blend-multiply filter blur-xl"
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
          className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-r from-amber-300/20 to-orange-300/20 dark:from-amber-700/10 dark:to-orange-700/10 rounded-full mix-blend-multiply filter blur-xl"
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
          className="absolute bottom-10 left-1/3 w-96 h-96 bg-gradient-to-r from-yellow-300/20 to-amber-300/20 dark:from-yellow-600/10 dark:to-amber-600/10 rounded-full mix-blend-multiply filter blur-xl"
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
        
        {/* 3D Exam objects floating in background */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-20 h-20 perspective-1000"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div 
            className="w-full h-full bg-gradient-to-r from-orange-500/30 to-amber-500/30 rounded-lg border border-orange-200 dark:border-orange-700/30 shadow-lg"
            animate={{ 
              rotateX: [0, 15, 0, -15, 0],
              rotateY: [0, -15, 0, 15, 0],
              translateZ: [0, 30, 0, -30, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "loop"
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-orange-700 dark:text-orange-300 text-lg font-bold opacity-70">NEET</span>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="absolute top-1/3 left-1/4 w-16 h-16 perspective-1000"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div 
            className="w-full h-full bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-lg border border-amber-200 dark:border-amber-700/30 shadow-lg"
            animate={{ 
              rotateX: [0, -20, 0, 20, 0],
              rotateY: [0, 20, 0, -20, 0],
              translateZ: [0, -25, 0, 25, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "loop",
              delay: 1
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-amber-700 dark:text-amber-300 text-sm font-bold opacity-70">JEE</span>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-24 h-24 perspective-1000"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div 
            className="w-full h-full bg-gradient-to-r from-yellow-500/30 to-orange-500/30 rounded-full border border-yellow-200 dark:border-yellow-700/30 shadow-lg"
            animate={{ 
              rotateX: [0, 10, 0, -10, 0],
              rotateY: [0, -10, 0, 10, 0],
              translateZ: [0, 40, 0, -40, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "loop",
              delay: 2
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-yellow-700 dark:text-yellow-300 text-lg font-bold opacity-70">UPSC</span>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Animated grid pattern representing exam paper */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
          style={{
            backgroundImage: "linear-gradient(#FFB347 1px, transparent 1px), linear-gradient(to right, #FFB347 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
        
        {/* Floating educational symbols */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Books */}
          <motion.div
            className="absolute top-[15%] left-[10%] w-6 h-8 bg-orange-600/20 rounded-sm"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0, -5, 0],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
          
          {/* Formula */}
          <motion.div
            className="absolute top-[25%] right-[20%] text-orange-600/30 text-xl font-bold"
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            E=mc²
          </motion.div>
          
          {/* Test paper */}
          <motion.div
            className="absolute bottom-[30%] left-[30%] w-10 h-14 bg-gradient-to-b from-white/80 to-orange-100/80 dark:from-gray-800/50 dark:to-orange-900/30 rounded-sm"
            animate={{
              y: [0, -10, 0],
              rotate: [0, -3, 0, 3, 0],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <div className="h-1 w-8 bg-orange-600/30 rounded-full mt-2 ml-1"></div>
            <div className="h-1 w-6 bg-orange-600/30 rounded-full mt-2 ml-1"></div>
            <div className="h-1 w-7 bg-orange-600/30 rounded-full mt-2 ml-1"></div>
          </motion.div>
        </div>
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
