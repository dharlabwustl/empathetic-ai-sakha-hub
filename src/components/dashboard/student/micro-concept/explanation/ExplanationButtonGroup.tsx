
import React from "react";
import { ExplanationType } from "../types";
import { ExplanationTabButton } from "./ExplanationTabButton";

interface ExplanationButtonGroupProps {
  explanations: ExplanationType[];
  activeExplanation: string;
  setActiveExplanation: (title: string) => void;
}

export const ExplanationButtonGroup: React.FC<ExplanationButtonGroupProps> = ({
  explanations,
  activeExplanation,
  setActiveExplanation
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      {explanations.map((exp) => (
        <ExplanationTabButton 
          key={exp.title}
          title={exp.title}
          isActive={activeExplanation === exp.title}
          onClick={() => setActiveExplanation(exp.title)}
        />
      ))}
    </div>
  );
};
