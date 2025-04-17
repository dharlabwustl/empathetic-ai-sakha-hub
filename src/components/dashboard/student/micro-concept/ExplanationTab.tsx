
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExplanationType } from "./types";

interface ExplanationTabProps {
  explanation: ExplanationType[];
  activeExplanation: string;
  setActiveExplanation: (title: string) => void;
}

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const ExplanationTab: React.FC<ExplanationTabProps> = ({
  explanation,
  activeExplanation,
  setActiveExplanation
}) => {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2 mb-3">
        {explanation.map((exp) => (
          <Button 
            key={exp.title}
            variant={activeExplanation === exp.title ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveExplanation(exp.title)}
            className={activeExplanation === exp.title ? "bg-violet-600" : ""}
          >
            {exp.title}
          </Button>
        ))}
      </div>
      
      <motion.div
        key={activeExplanation}
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        className="bg-slate-50 p-4 rounded-lg"
      >
        {explanation.find(exp => exp.title === activeExplanation)?.content.split('\n').map((paragraph, i) => (
          <p key={i} className={i > 0 ? "mt-2" : ""}>
            {paragraph}
          </p>
        ))}
      </motion.div>
    </div>
  );
};
