
import React from 'react';
import { motion } from 'framer-motion';
import HeroContent from './HeroContent';
import HeroImages from './HeroImages';
import ImmersiveBackground from './ImmersiveBackground';

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] pt-16 pb-24 overflow-hidden">
      {/* Immersive 3D Background */}
      <ImmersiveBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full relative z-20 flex flex-col lg:flex-row items-center lg:items-start gap-8"
          >
            <HeroContent handleExamReadinessClick={() => {
              window.dispatchEvent(new Event('open-exam-analyzer'));
            }} />
            
            <HeroImages />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
