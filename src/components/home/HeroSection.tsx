
import React from 'react';
import { motion } from 'framer-motion';
import HeroContent from './hero/HeroContent';
import HeroImage from './hero/HeroImage';
import FeatureGrid from './hero/feature-highlights/FeatureGrid';
import Background3D from './hero/Background3D';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeroSectionProps {
  handleExamReadinessClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ handleExamReadinessClick }) => {
  const isMobile = useIsMobile();

  return (
    <section className="relative py-16 md:py-24 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* 3D animated background */}
      <Background3D />
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/90 -z-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 mb-16 md:mb-24">
          <HeroContent handleExamReadinessClick={handleExamReadinessClick || (() => {})} />
          <HeroImage />
        </div>
        
        {/* Section divider */}
        <motion.div 
          className="mb-12 md:mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
            Your Path to Exam Excellence
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our platform delivers five key benefits that transform your exam preparation
          </p>
        </motion.div>
        
        {/* Feature cards with benefits */}
        <FeatureGrid />
        
        {/* Bottom decorative element */}
        <motion.div 
          className="mt-16 md:mt-24 w-full flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
