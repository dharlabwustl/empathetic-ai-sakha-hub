
import React from 'react';
import ExamBadges from './hero/ExamBadges';
import PainPoints from './hero/PainPoints';
import ChatInterface from './hero/ChatInterface';
import ScrollIndicator from './hero/ScrollIndicator';
import HeroButtons from './hero/HeroButtons';

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
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display gradient-text animate-fade-in">
            India's 1st personalized AI study partner for exam success
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 animate-fade-in animation-delay-200">
            Sakha AI adapts to your unique learning style, making exam preparation smarter, faster, and stress-free.
          </p>
          
          <HeroButtons onAnalyzeClick={openExamAnalyzer} />
        </div>
        
        <ExamBadges />
        
        <div className="mt-12">
          <ChatInterface />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <PainPoints />
        </div>
        
        <ScrollIndicator />
      </div>
    </section>
  );
};

export default HeroSection;
