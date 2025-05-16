
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroButtonsProps {
  scrollToFeatures?: () => void;
  onAnalyzeClick?: () => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({
  scrollToFeatures,
  onAnalyzeClick,
}) => {
  const navigate = useNavigate();

  const handleExamReadiness = () => {
    if (onAnalyzeClick) {
      onAnalyzeClick();
    } else {
      // Dispatch an event to open the exam analyzer
      const event = new Event('open-exam-analyzer');
      window.dispatchEvent(event);
    }
  };

  // Only show these two buttons regardless of login state
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button 
        size="lg" 
        className="font-semibold rounded-full shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-8"
        onClick={handleExamReadiness}
      >
        <Sparkles className="mr-2 h-5 w-5" />
        Test Your Exam Readiness
      </Button>
      <Button 
        size="lg" 
        variant="outline" 
        className="font-semibold border-2 rounded-full shadow px-8" 
        onClick={() => navigate('/signup')}
      >
        Start 7-Day Free Trial
      </Button>
    </div>
  );
};

export default HeroButtons;
