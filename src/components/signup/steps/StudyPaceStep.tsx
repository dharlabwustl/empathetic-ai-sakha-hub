
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Clock, Zap, Turtle } from "lucide-react";

interface StudyPaceStepProps {
  onStudyPaceSelect: (pace: string) => void;
}

const StudyPaceStep: React.FC<StudyPaceStepProps> = ({ onStudyPaceSelect }) => {
  const paceOptions = [
    {
      id: "Aggressive",
      label: "Aggressive",
      description: "Cover more content in less time",
      icon: <Zap className="h-6 w-6 text-orange-500" />
    },
    {
      id: "Balanced",
      label: "Balanced",
      description: "Standard pace with comprehensive coverage",
      icon: <Clock className="h-6 w-6 text-blue-500" />
    },
    {
      id: "Relaxed",
      label: "Relaxed",
      description: "Slower pace with deeper understanding",
      icon: <Turtle className="h-6 w-6 text-green-500" />
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-center mb-4">My preferred study pace is...</h2>
      <div className="grid grid-cols-1 gap-3">
        {paceOptions.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() => onStudyPaceSelect(option.id)}
              className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 h-auto py-4 px-4 w-full flex items-center justify-between"
              variant="outline"
            >
              <div className="flex items-center gap-3">
                {option.icon}
                <div className="text-left">
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.description}</div>
                </div>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
      
      <p className="text-center text-sm text-gray-500 mt-4">
        We'll adjust the intensity of your study plan accordingly
      </p>
    </div>
  );
};

export default StudyPaceStep;
