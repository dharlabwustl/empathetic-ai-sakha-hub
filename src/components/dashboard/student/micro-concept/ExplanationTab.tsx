
import React from "react";
import { ExplanationType } from "./types";
import { ExplanationButtonGroup } from "./explanation/ExplanationButtonGroup";
import { ExplanationContent } from "./explanation/ExplanationContent";

interface ExplanationTabProps {
  explanation: ExplanationType[];
  activeExplanation: string;
  setActiveExplanation: (title: string) => void;
}

export const ExplanationTab: React.FC<ExplanationTabProps> = ({
  explanation,
  activeExplanation,
  setActiveExplanation
}) => {
  return (
    <div className="mb-4">
      <ExplanationButtonGroup 
        explanations={explanation}
        activeExplanation={activeExplanation}
        setActiveExplanation={setActiveExplanation}
      />
      
      <ExplanationContent 
        activeExplanation={activeExplanation}
        explanations={explanation}
      />
    </div>
  );
};
