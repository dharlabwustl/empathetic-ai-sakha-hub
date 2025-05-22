
import React from 'react';
import { motion } from 'framer-motion';
import Hero3DSection from './Hero3DSection';

const HeroSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative z-10"
    >
      <Hero3DSection />
    </motion.div>
  );
};

export default HeroSection;
