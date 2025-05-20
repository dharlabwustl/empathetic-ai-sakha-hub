
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroContent from './hero/HeroContent';
import HeroSlider from './hero/HeroSlider';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3); // Assuming 3 slides
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Handler for exam readiness analyzer
  const handleExamReadinessClick = () => {
    // Dispatch event to open the exam readiness analyzer
    window.dispatchEvent(new CustomEvent('open-exam-analyzer'));
  };

  return (
    <section className="relative overflow-hidden min-h-[90vh] py-16 md:py-24 flex items-center">
      {/* Background with 3D depth effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/70 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/50">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
          style={{
            backgroundImage: "linear-gradient(#5c6bc0 1px, transparent 1px), linear-gradient(to right, #5c6bc0 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}>
        </div>
      
        {/* Abstract 3D shapes */}
        <motion.div 
          className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 dark:bg-blue-700/5 rounded-full mix-blend-multiply filter blur-xl"
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
          className="absolute top-40 right-20 w-64 h-64 bg-purple-300/20 dark:bg-purple-700/10 rounded-full mix-blend-multiply filter blur-xl"
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
          className="absolute bottom-10 left-1/3 w-96 h-96 bg-indigo-300/20 dark:bg-indigo-600/10 rounded-full mix-blend-multiply filter blur-xl"
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
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left Content: Title, description and buttons */}
          <HeroContent handleExamReadinessClick={handleExamReadinessClick} />
          
          {/* Right Content: 3D Animated Slider */}
          <HeroSlider activeSlide={activeSlide} setActiveSlide={setActiveSlide} />
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        >
          <span className="text-xs text-gray-500 dark:text-gray-400 mb-2">Scroll to explore</span>
          <div className="w-5 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-1 bg-gray-500 dark:bg-gray-400 rounded-full mt-2"
              animate={{ y: [0, 15, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                repeatType: "loop" 
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
