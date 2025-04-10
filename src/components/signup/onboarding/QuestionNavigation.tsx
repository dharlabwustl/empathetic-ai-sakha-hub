
import React from "react";
import { Button } from "@/components/ui/button";

interface QuestionNavigationProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  isAnswered: boolean;
  isLoading: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  isFirstStep,
  isLastStep,
  isAnswered,
  isLoading,
  onPrevious,
  onNext,
}) => {
  return (
    <div className="flex justify-between">
      <Button 
        variant="outline" 
        onClick={onPrevious} 
        disabled={isFirstStep}
      >
        Back
      </Button>
      
      <Button 
        onClick={onNext} 
        disabled={!isAnswered || isLoading}
        className="bg-gradient-to-r from-sky-500 to-violet-500"
      >
        {isLoading ? "Processing..." : isLastStep ? "Complete" : "Next"}
      </Button>
    </div>
  );
};

export default QuestionNavigation;
