
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroButtonsProps {
  scrollToFeatures: () => void;
  scrollToForWhom: () => void;
  openExamAnalyzer: () => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({
  scrollToFeatures,
  scrollToForWhom,
  openExamAnalyzer
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Button 
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-6 rounded-lg shadow-lg group transition-all duration-300 w-full sm:w-auto"
        asChild
      >
        <Link to="/signup">
          <span className="text-base">Start Your Journey</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
      
      <Button 
        variant="outline" 
        className="border-2 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/30 px-6 py-6 rounded-lg shadow-sm w-full sm:w-auto"
        onClick={openExamAnalyzer}
      >
        <BookOpen className="mr-2 h-4 w-4" />
        <span className="text-base">Exam Readiness Test</span>
      </Button>
    </div>
  );
};

export default HeroButtons;
