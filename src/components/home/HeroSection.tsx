
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroContent from './hero/HeroContent';
import HeroSlider from './hero/HeroSlider';
import ImmersiveBackground from './hero/ImmersiveBackground';
import StoryNarrative from './hero/StoryNarrative';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [showStory, setShowStory] = useState(false);

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

  // Toggle story narrative
  const toggleStory = () => {
    setShowStory(!showStory);
  };

  return (
    <section className="relative overflow-hidden min-h-[100vh] py-16 md:py-24 flex items-center">
      {/* 3D Immersive Background */}
      <ImmersiveBackground activeSlide={activeSlide} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Story Narrative Overlay */}
          {showStory && (
            <StoryNarrative onClose={toggleStory} />
          )}
          
          {/* Left Content: Title, description and buttons */}
          <HeroContent 
            handleExamReadinessClick={handleExamReadinessClick} 
            toggleStory={toggleStory}
            showStoryBtn={!showStory}
          />
          
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
