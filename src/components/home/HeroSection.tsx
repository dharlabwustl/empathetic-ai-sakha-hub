
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
