
import React from "react";
import { Button } from "@/components/ui/button";

interface MicroConceptFooterProps {
  isCompleted: boolean;
  handleComplete: () => void;
  handleNeedHelp: () => void;
}

export const MicroConceptFooter: React.FC<MicroConceptFooterProps> = ({
  isCompleted,
  handleComplete,
  handleNeedHelp
}) => {
  return (
    <div className="w-full flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          Previous Concept
        </Button>
        <Button variant="outline" size="sm">
          Next Concept
        </Button>
      </div>
      <div className="flex items-center gap-2">
        {!isCompleted && (
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
            onClick={handleNeedHelp}
          >
            Need Help
          </Button>
        )}
        <Button 
          variant={isCompleted ? "outline" : "default"} 
          size="sm" 
          className={isCompleted ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100" : "bg-violet-600 hover:bg-violet-700"}
          onClick={handleComplete}
          disabled={isCompleted}
        >
          {isCompleted ? "Completed" : "Mark as Complete"}
        </Button>
      </div>
    </div>
  );
};
