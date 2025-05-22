
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroContent from './hero/HeroContent';
import HeroSlider from './hero/HeroSlider';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  // Handler for exam readiness analyzer
  const handleExamReadinessClick = () => {
    // Dispatch event to open the exam readiness analyzer
    window.dispatchEvent(new CustomEvent('open-exam-analyzer'));
  };

  return (
    <section className="relative overflow-hidden min-h-[85vh] py-12 md:py-16 flex items-center">
      {/* Enhanced 3D Background with premium exam-themed effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/70 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/50" />
        
        {/* 3D books and study materials pattern */}
        <div 
          className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08]" 
          style={{
            backgroundImage: "url('/lovable-uploads/bffd91d7-243d-42d9-bbd9-52133e18f4b6.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(1px)"
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
        
        {/* Floating paper and book elements */}
        <motion.div
          className="absolute top-[15%] right-[30%] w-24 h-16 bg-white/50 dark:bg-white/10 rounded-md shadow-lg transform rotate-12"
          animate={{
            y: [0, -15, 0],
            rotate: [12, 5, 12],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(240,240,255,0.5))",
            boxShadow: "0 5px 15px rgba(0,0,100,0.1)"
          }}
        />
        
        <motion.div
          className="absolute bottom-[25%] left-[20%] w-20 h-28 bg-blue-100/70 dark:bg-blue-900/20 rounded-sm shadow-lg transform -rotate-6"
          animate={{
            y: [0, 10, 0],
            rotate: [-6, -10, -6],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 3
          }}
          style={{
            backgroundImage: "linear-gradient(to right, rgba(200,220,255,0.7), rgba(220,230,255,0.5))",
            boxShadow: "0 5px 15px rgba(0,0,100,0.15)"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16">
          {/* Left Content: Title, description and buttons */}
          <HeroContent handleExamReadinessClick={handleExamReadinessClick} />
          
          {/* Right Content: Enhanced 3D Slider */}
          <HeroSlider activeSlide={activeSlide} setActiveSlide={setActiveSlide} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
