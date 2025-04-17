
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { MicroConceptHeader } from "./micro-concept/MicroConceptHeader";
import { MicroConceptTabs } from "./micro-concept/MicroConceptTabs";
import { MicroConceptFooter } from "./micro-concept/MicroConceptFooter";
import { useMicroConcept } from "./micro-concept/useMicroConcept";
import { MicroConceptProps } from "./micro-concept/types";

export default function MicroConcept({
  title = "Newton's Third Law of Motion",
  subject = "Physics",
  explanation = [
    {
      title: "Simple Explanation",
      content: "For every action, there is an equal and opposite reaction. When you push against a wall, the wall pushes back against you with the same force."
    },
    {
      title: "Detailed Explanation",
      content: "Newton's Third Law states that for every action force, there is an equal and opposite reaction force. These forces always occur in pairs and act on different objects. The mathematical form is F₁₂ = -F₂₁, where F₁₂ is the force exerted by object 1 on object 2, and F₂₁ is the force exerted by object 2 on object 1."
    },
    {
      title: "Visual Explanation",
      content: "Imagine a rocket: the rocket expels gas downward (action force), and the gas exerts an equal force upward on the rocket (reaction force). This propels the rocket upward. Similarly, when you swim, you push water backward, and the water pushes you forward."
    },
    {
      title: "Mathematical Explanation",
      content: "The mathematical expression is F₁₂ = -F₂₁, where:\n- F₁₂ is the force exerted by object 1 on object 2\n- F₂₁ is the force exerted by object 2 on object 1\n- The negative sign indicates that the forces are in opposite directions\n\nThis law applies to all forces and is fundamental to understanding momentum conservation."
    }
  ],
  example = "When a book rests on a table, the book exerts a downward force on the table due to gravity, and the table exerts an equal upward force on the book. This is why the book doesn't fall through the table.",
  commonMistakes = [
    {
      mistake: "Thinking that action and reaction forces cancel each other out",
      correction: "Action and reaction forces act on different objects, so they don't cancel each other. The gravitational force on you and your equal but opposite force on Earth don't cancel because they act on different bodies."
    },
    {
      mistake: "Confusing Newton's Third Law pairs with balanced forces",
      correction: "Balanced forces act on the same object and may cause it to remain at rest. Newton's Third Law pairs always act on different objects."
    }
  ],
  examRelevance = "This concept frequently appears in numerical problems involving rocket propulsion, collisions, and force analysis. Expect 2-3 questions directly testing this concept in competitive exams like JEE.",
  difficulty = "medium",
  id,
  chapter,
  estimatedTime,
  content,
  resourceType,
  resourceUrl,
  onComplete,
  onNeedHelp,
  isCompleted: initialIsCompleted = false
}: MicroConceptProps) {
  const {
    activeExplanation,
    setActiveExplanation,
    isCompleted,
    handleComplete,
    handleNeedHelp
  } = useMicroConcept({
    id,
    title,
    isCompleted: initialIsCompleted,
    onComplete,
    onNeedHelp
  });
  
  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`overflow-hidden border-t-4 ${isCompleted ? 'border-t-green-500' : 'border-t-violet-500'}`}>
        <CardHeader className={`${isCompleted ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10' : 'bg-gradient-to-r from-violet-500/10 to-indigo-500/10'} pb-4`}>
          <MicroConceptHeader 
            title={title}
            subject={subject}
            difficulty={difficulty}
            isCompleted={isCompleted}
          />
        </CardHeader>

        <MicroConceptTabs
          explanation={explanation}
          example={example}
          commonMistakes={commonMistakes}
          examRelevance={examRelevance}
          activeExplanation={activeExplanation}
          setActiveExplanation={setActiveExplanation}
        />

        <CardFooter className={`${isCompleted ? 'bg-gradient-to-r from-green-50 to-emerald-50' : 'bg-gradient-to-r from-violet-50 to-indigo-50'} border-t p-3`}>
          <MicroConceptFooter 
            isCompleted={isCompleted}
            handleComplete={handleComplete}
            handleNeedHelp={handleNeedHelp}
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
}
