
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

interface PersonalityStepProps {
  onPersonalitySelect: (personality: string) => void;
}

const PersonalityStep: React.FC<PersonalityStepProps> = ({ onPersonalitySelect }) => {
  const personalityTypes = [
    {
      type: "Strategic Thinker",
      description: "You approach problems methodically and enjoy planning ahead"
    },
    {
      type: "Curious Creator",
      description: "You love exploring new ideas and thinking outside the box"
    },
    {
      type: "Focused Performer",
      description: "You prefer to dive deep into a subject and master it completely"
    },
    {
      type: "Analytical Planner",
      description: "You enjoy breaking down complex problems into manageable parts"
    },
    {
      type: "Intuitive Explorer",
      description: "You rely on your instincts and adapt quickly to new situations"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium">Your Learning Personality</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select the option that best describes your approach to learning
        </p>
      </div>
      
      <RadioGroup defaultValue="">
        {personalityTypes.map((item, index) => (
          <motion.div
            key={item.type}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-3"
          >
            <div 
              className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30" 
              onClick={() => onPersonalitySelect(item.type)}
            >
              <RadioGroupItem value={item.type} id={item.type} className="mt-1" />
              <div className="flex-1">
                <Label htmlFor={item.type} className="font-medium cursor-pointer">{item.type}</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PersonalityStep;
