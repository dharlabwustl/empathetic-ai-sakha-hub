
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
      {/* Enhanced 3D Background with premium exam-themed effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-purple-50/80 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/50" />
        
        {/* Books and study materials floating in 3D space */}
        <motion.div
          className="absolute w-32 h-44 top-20 left-[10%] opacity-40 dark:opacity-20"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
          style={{
            backgroundImage: "url('/lovable-uploads/1bd9164d-90e1-4088-b058-0fa5966be194.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            transform: "perspective(1000px) rotateY(15deg)"
          }}
        />
        
        {/* Floating formula */}
        <motion.div
          className="absolute w-64 h-24 top-[30%] right-[5%] opacity-30 dark:opacity-15 hidden md:block"
          animate={{ 
            y: [0, 20, 0],
            x: [0, -10, 0],
            rotate: [0, -3, 0]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            repeatType: "mirror" 
          }}
        >
          <svg viewBox="0 0 200 60" className="w-full h-full">
            <text x="0" y="30" fill="currentColor" className="text-indigo-800 dark:text-indigo-300" fontSize="14">
              <tspan x="0" dy="0">E = mc²</tspan>
            </text>
            <text x="0" y="50" fill="currentColor" className="text-purple-800 dark:text-purple-300" fontSize="14">
              <tspan x="0" dy="0">F = ma</tspan>
            </text>
          </svg>
        </motion.div>
        
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
        
        {/* Floating student avatar with happiness indicator */}
        <motion.div
          className="absolute h-16 w-16 bottom-[20%] right-[15%] bg-white dark:bg-gray-800 rounded-full shadow-lg border-2 border-blue-200 dark:border-blue-900 opacity-90 hidden md:block"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
          style={{
            backgroundImage: "url('/lovable-uploads/357a0e22-3fec-4a5c-808e-0540d5f7ba05.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          {/* Happiness indicator */}
          <motion.div 
            className="absolute -top-1 -right-1 h-6 w-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center"
            animate={{
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            <span className="text-white text-xs">😊</span>
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
        
        {/* Floating readiness score */}
        <motion.div
          className="absolute flex items-center justify-center w-24 h-24 top-[60%] left-[10%] hidden md:flex"
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        >
          <div className="w-full h-full bg-blue-600/10 dark:bg-blue-600/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <div className="text-center">
              <motion.div 
                className="text-lg font-bold text-blue-700 dark:text-blue-300"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                85%
              </motion.div>
              <div className="text-xs text-blue-600 dark:text-blue-400">Readiness</div>
            </div>
          </div>
        </motion.div>
        
        {/* 3D Cards floating around */}
        <motion.div
          className="absolute w-40 h-28 top-[15%] right-[30%] rounded-lg shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-indigo-100 dark:border-indigo-900/40 overflow-hidden hidden md:block"
          animate={{ 
            y: [0, -15, 0],
            rotateY: [0, 10, 0],
            rotateX: [0, -5, 0],
            z: [0, 20, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
          style={{
            transform: "perspective(1000px) rotateY(10deg) rotateX(-5deg)",
            transformStyle: "preserve-3d"
          }}
        >
          <div className="h-6 w-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center px-2">
            <div className="w-2 h-2 rounded-full bg-white mr-1"></div>
            <span className="text-white text-xs font-medium">Chemistry</span>
          </div>
          <div className="p-2 text-xs text-gray-800 dark:text-gray-200">
            <div className="mb-1 font-medium">Periodic Table Elements</div>
            <div className="h-2 bg-green-200 dark:bg-green-700 rounded-full w-3/4 mb-2"></div>
            <div className="flex justify-between text-[10px]">
              <span>Progress: 75%</span>
              <span>⭐⭐⭐⭐</span>
            </div>
          </div>
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
