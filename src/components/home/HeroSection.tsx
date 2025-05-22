
import React from 'react';
import { motion } from 'framer-motion';
import HeroContent from './hero/HeroContent';
import ImmersiveBackground from './hero/ImmersiveBackground';

const HeroSection: React.FC = () => {
  const handleExamReadinessClick = () => {
    // Dispatch custom event to open exam analyzer
    window.dispatchEvent(new Event('open-exam-analyzer'));
  };

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Immersive 3D Background - spans the entire hero section */}
      <ImmersiveBackground />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Hero content */}
          <HeroContent handleExamReadinessClick={handleExamReadinessClick} />
          
          {/* Illustration - right side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full lg:w-1/2 relative z-10"
          >
            <img 
              src="/lovable-uploads/ea82befe-f61c-41ee-a28a-31ae5bbfb81c.png" 
              alt="PREPZR Learning Platform" 
              className="w-full max-w-lg mx-auto transform hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
