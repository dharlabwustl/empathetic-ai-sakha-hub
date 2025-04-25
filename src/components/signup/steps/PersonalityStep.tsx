
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PersonalityType } from "@/types/user/base";

interface PersonalityStepProps {
  onSelect: (personality: string) => void;
  isLoading?: boolean;
}

const PersonalityStep: React.FC<PersonalityStepProps> = ({ onSelect, isLoading = false }) => {
  const personalities = [
    { 
      type: "analytical", 
      emoji: "🔍", 
      label: "Analytical", 
      description: "You prefer structured, logical learning with detailed examples" 
    },
    { 
      type: "creative", 
      emoji: "🎨", 
      label: "Creative", 
      description: "You learn best through visual aids and open-ended activities" 
    },
    { 
      type: "practical", 
      emoji: "🛠️", 
      label: "Practical", 
      description: "You enjoy hands-on learning and real-world applications" 
    },
    { 
      type: "social", 
      emoji: "👥", 
      label: "Social", 
      description: "You thrive in collaborative learning environments" 
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-1">Let's understand your learning style</h3>
        <p className="text-sm text-muted-foreground">
          Which of these best describes your approach to learning?
        </p>
      </div>
      
      <div className="space-y-3">
        {personalities.map((item) => (
          <motion.div
            key={item.type}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() => onSelect(item.type)}
              disabled={isLoading}
              className="w-full h-auto p-4 flex flex-col items-start text-left bg-white hover:bg-blue-50 border border-blue-200 text-blue-700"
              variant="outline"
            >
              <div className="flex items-center gap-3 w-full">
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                </div>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PersonalityStep;
