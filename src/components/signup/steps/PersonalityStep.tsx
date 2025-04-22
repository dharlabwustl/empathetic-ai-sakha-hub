
import React from "react";
import { Button } from "@/components/ui/button";
import { PersonalityType } from "@/types/user/base";

interface PersonalityStepProps {
  onSelect: (personality: PersonalityType) => void;
}

const PersonalityStep: React.FC<PersonalityStepProps> = ({ onSelect }) => {
  const personalities: PersonalityType[] = [
    {
      type: "systematic_learner",
      traits: ["Organized", "Detail-oriented", "Methodical", "Focused"],
      learningStyle: "Sequential and structured learning"
    },
    {
      type: "intuitive_learner",
      traits: ["Creative", "Big-picture", "Conceptual", "Pattern-seeking"],
      learningStyle: "Conceptual and pattern-based learning"
    },
    {
      type: "social_learner",
      traits: ["Collaborative", "Communicative", "People-oriented", "Verbal"],
      learningStyle: "Discussion and group-based learning"
    },
    {
      type: "practical_learner",
      traits: ["Hands-on", "Realistic", "Applied", "Technical"],
      learningStyle: "Learning through application and practice"
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">Your Learning Style</h3>
      <p className="text-muted-foreground mb-4">Choose the option that best describes your approach to learning:</p>
      
      <div className="space-y-3">
        {personalities.map((personality, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-start p-4 h-auto flex flex-col items-start"
            onClick={() => onSelect(personality)}
          >
            <div className="font-medium">{personality.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
            <div className="text-sm text-muted-foreground mt-1">{personality.learningStyle}</div>
            <div className="flex flex-wrap gap-1 mt-2">
              {personality.traits.map((trait, i) => (
                <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {trait}
                </span>
              ))}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PersonalityStep;
