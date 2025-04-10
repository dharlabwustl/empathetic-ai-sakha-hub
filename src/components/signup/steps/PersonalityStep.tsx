
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PersonalityStepProps {
  onPersonalitySelect: (personality: string) => void;
}

const PersonalityStep: React.FC<PersonalityStepProps> = ({ onPersonalitySelect }) => {
  const personalityTypes = [
    "Strategic Thinker", "Curious Creator", "Focused Performer", 
    "Analytical Planner", "Intuitive Explorer"
  ];

  return (
    <div className="space-y-4">
      <RadioGroup defaultValue="">
        {personalityTypes.map((type) => (
          <div 
            key={type} 
            className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-blue-50" 
            onClick={() => onPersonalitySelect(type)}
          >
            <RadioGroupItem value={type} id={type} />
            <Label htmlFor={type} className="flex-grow cursor-pointer">{type}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PersonalityStep;
