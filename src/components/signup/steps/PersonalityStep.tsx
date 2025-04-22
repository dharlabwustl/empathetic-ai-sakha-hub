
import React from "react";
import { Button } from "@/components/ui/button";
import { PersonalityType } from "@/types/user/base";

interface PersonalityStepProps {
  onSelect: (personality: string) => void;
}

const PersonalityStep: React.FC<PersonalityStepProps> = ({ onSelect }) => {
  const personalityTypes = [
    {
      name: "Systematic Learner",
      description: "You prefer organized, structured learning with clear instructions and steps.",
      icon: "📋"
    },
    {
      name: "Visual Learner",
      description: "You learn best through images, diagrams, and visual demonstrations.",
      icon: "👁️"
    },
    {
      name: "Practical Learner",
      description: "You prefer hands-on learning and practical applications of concepts.",
      icon: "🛠️"
    },
    {
      name: "Social Learner", 
      description: "You thrive in group settings and learn through discussion and interaction.",
      icon: "👥"
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium mb-2">Your Learning Style</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Select the learning style that best describes you. This helps us personalize your experience.
      </p>
      <div className="grid grid-cols-1 gap-3">
        {personalityTypes.map((type) => (
          <Button
            key={type.name}
            variant="outline"
            className="flex flex-col items-start p-4 h-auto hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-200 text-left"
            onClick={() => onSelect(type.name)}
          >
            <div className="flex items-center w-full">
              <span className="text-2xl mr-3">{type.icon}</span>
              <div>
                <h3 className="font-medium">{type.name}</h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PersonalityStep;
