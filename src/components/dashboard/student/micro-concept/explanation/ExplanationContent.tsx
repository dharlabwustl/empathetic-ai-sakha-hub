
import React from "react";
import { motion } from "framer-motion";
import { ExplanationType } from "../types";

interface ExplanationContentProps {
  activeExplanation: string;
  explanations: ExplanationType[];
}

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const ExplanationContent: React.FC<ExplanationContentProps> = ({
  activeExplanation,
  explanations
}) => {
  const activeContent = explanations.find(exp => exp.title === activeExplanation);
  
  if (!activeContent) return null;

  return (
    <motion.div
      key={activeExplanation}
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      className="bg-slate-50 p-4 rounded-lg"
    >
      {activeContent.content.split('\n').map((paragraph, i) => (
        <p key={i} className={i > 0 ? "mt-2" : ""}>
          {paragraph}
        </p>
      ))}
    </motion.div>
  );
};
