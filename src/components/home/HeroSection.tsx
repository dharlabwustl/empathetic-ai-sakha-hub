
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-blue-950/80 dark:via-gray-900 dark:to-indigo-950/80" />
        
        {/* Abstract floating 3D shapes - Knowledge bubbles */}
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-indigo-400/10 dark:from-blue-700/10 dark:to-indigo-700/5 rounded-full mix-blend-multiply filter blur-xl"
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
          className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-r from-indigo-300/20 to-blue-300/20 dark:from-indigo-700/10 dark:to-blue-700/10 rounded-full mix-blend-multiply filter blur-xl"
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
          className="absolute bottom-10 left-1/3 w-96 h-96 bg-gradient-to-r from-indigo-300/20 to-blue-300/20 dark:from-indigo-600/10 dark:to-blue-600/10 rounded-full mix-blend-multiply filter blur-xl"
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
            className="w-full h-full bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-lg border border-blue-200 dark:border-blue-700/30 shadow-lg"
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
              <span className="text-blue-700 dark:text-blue-300 text-lg font-bold opacity-70">NEET</span>
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
            className="w-full h-full bg-gradient-to-r from-indigo-500/30 to-blue-500/30 rounded-lg border border-indigo-200 dark:border-indigo-700/30 shadow-lg"
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
              <span className="text-indigo-700 dark:text-indigo-300 text-sm font-bold opacity-70">JEE</span>
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
            className="w-full h-full bg-gradient-to-r from-indigo-500/30 to-blue-500/30 rounded-full border border-indigo-200 dark:border-indigo-700/30 shadow-lg"
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
              <span className="text-indigo-700 dark:text-indigo-300 text-lg font-bold opacity-70">UPSC</span>
            </div>
          </motion.div>
        </motion.div>
        
        {/* 3D Books floating in air */}
        <motion.div
          className="absolute top-[35%] left-[15%] w-20 h-28 perspective-1000"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <motion.div 
            className="w-full h-full bg-gradient-to-r from-blue-500/40 to-blue-600/40 rounded-md border border-blue-300 dark:border-blue-700/30 shadow-lg"
            animate={{ 
              rotateY: [0, 40, 0, -10, 0],
              rotateX: [0, 10, 0, -5, 0],
              translateZ: [0, 20, 0, -10, 0],
              translateY: [0, -10, 0]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              repeatType: "loop"
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-xs font-bold opacity-70 rotate-90">PHYSICS</span>
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-blue-700/70"></div>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="absolute bottom-[25%] right-[20%] w-24 h-32 perspective-1000"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
        >
          <motion.div 
            className="w-full h-full bg-gradient-to-r from-blue-400/40 to-blue-500/40 rounded-md border border-blue-300 dark:border-blue-700/30 shadow-lg"
            animate={{ 
              rotateY: [0, -30, 0, 15, 0],
              rotateX: [0, -8, 0, 4, 0],
              translateZ: [0, -20, 0, 15, 0],
              translateY: [0, -15, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "loop",
              delay: 1
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-xs font-bold opacity-70 rotate-90">CHEMISTRY</span>
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-blue-500/70"></div>
          </motion.div>
        </motion.div>
        
        {/* Animated grid pattern representing exam paper */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
          style={{
            backgroundImage: "linear-gradient(#4DB2EC 1px, transparent 1px), linear-gradient(to right, #4DB2EC 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
        
        {/* Floating formula elements */}
        <motion.div
          className="absolute top-[45%] right-[25%] text-blue-600/30 text-xl font-bold"
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
        
        <motion.div
          className="absolute top-[30%] right-[40%] text-blue-600/30 text-xl font-bold"
          animate={{
            y: [0, -8, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "loop",
            delay: 1
          }}
        >
          PV=nRT
        </motion.div>
        
        <motion.div
          className="absolute bottom-[40%] left-[35%] text-blue-600/30 text-xl font-bold"
          animate={{
            y: [0, -12, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatType: "loop",
            delay: 2
          }}
        >
          F=ma
        </motion.div>
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
