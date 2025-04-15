
import React from 'react';
import PainPoints from './hero/PainPoints';
import ChatInterface from './hero/ChatInterface';
import ScrollIndicator from './hero/ScrollIndicator';
import HeroButtons from './hero/HeroButtons';
import { motion } from "framer-motion";
import ExamNamesBadge from './hero/ExamNamesBadge';
import EcosystemAnimation from './EcosystemAnimation';
import FeatureHighlights from './hero/FeatureHighlights';
import OnboardingSection from './OnboardingSection';

export interface HeroSectionProps {
  scrollToFeatures: () => void;
  scrollToForWhom: () => void;
  openExamAnalyzer: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  scrollToFeatures,
  scrollToForWhom,
  openExamAnalyzer
}) => {
  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
      {/* Hero background decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-blue-300/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-gradient-to-tr from-blue-200/30 to-purple-300/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Sakha AI – पहली बार, पढ़ाई से पहले, आपको समझने वाला साथी
            </span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            India's 1st Emotionally Intelligent Study Partner – Tuned to Your Mood, Habits, Mind & Mission to Crack Exams.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <HeroButtons 
              onAnalyzeClick={openExamAnalyzer} 
              scrollToFeatures={scrollToFeatures} 
              scrollToForWhom={scrollToForWhom}
            />
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-6"
        >
          <ExamNamesBadge />
        </motion.div>
        
        {/* Feature Highlights section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12"
        >
          <FeatureHighlights />
        </motion.div>
        
        {/* Platform USPs section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mb-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-md"
        >
          <h2 className="text-xl font-bold mb-4 text-center">Our Platform's Unique Strengths</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              "Cognitive-layered exam-specific content",
              "Personalized AI learning journey",
              "Mood-aligned delivery",
              "Multimodal smart content (Text + Audio + Image + Video)",
              "Instant flashcard & test generation",
              "Built-in quality, relevance, and difficulty scoring"
            ].map((usp, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-lg shadow-sm border border-purple-100 dark:border-purple-800/30 flex flex-col items-center justify-center text-center"
              >
                <p className="text-sm font-medium">{usp}</p>
              </div>
            ))}
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="bg-white/90 dark:bg-slate-900/90 shadow-lg backdrop-blur-sm p-6 rounded-2xl border border-gray-100 dark:border-gray-800"
          >
            <PainPoints />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-xl rounded-2xl border border-purple-100 dark:border-purple-800 overflow-hidden"
          >
            <ChatInterface />
          </motion.div>
        </div>
        
        {/* Add the Ecosystem Animation section right after the grid with chat and pain points */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 mb-12"
        >
          <EcosystemAnimation />
        </motion.div>
        
        {/* Add the OnboardingSection right after the EcosystemAnimation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <OnboardingSection />
        </motion.div>
        
        <ScrollIndicator />
      </div>
    </section>
  );
};

export default HeroSection;
