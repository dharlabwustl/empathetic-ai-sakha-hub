
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sunrise, Sun, Sunset, Moon } from "lucide-react";

interface StudyTimeStepProps {
  onStudyTimeSelect: (time: string) => void;
}

const StudyTimeStep: React.FC<StudyTimeStepProps> = ({ onStudyTimeSelect }) => {
  const timeOptions = [
    {
      id: "Morning",
      label: "Morning",
      description: "5 AM - 12 PM",
      icon: <Sunrise className="h-6 w-6 text-yellow-500" />
    },
    {
      id: "Afternoon",
      label: "Afternoon",
      description: "12 PM - 5 PM",
      icon: <Sun className="h-6 w-6 text-orange-500" />
    },
    {
      id: "Evening",
      label: "Evening",
      description: "5 PM - 10 PM",
      icon: <Sunset className="h-6 w-6 text-purple-500" />
    },
    {
      id: "Night",
      label: "Night",
      description: "10 PM - 5 AM",
      icon: <Moon className="h-6 w-6 text-blue-800" />
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-center mb-4">I prefer to study during...</h2>
      <div className="grid grid-cols-2 gap-3">
        {timeOptions.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() => onStudyTimeSelect(option.id)}
              className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 h-auto py-4 px-4 w-full flex flex-col items-center gap-2"
              variant="outline"
            >
              {option.icon}
              <div className="text-center">
                <div className="font-medium">{option.label}</div>
                <div className="text-xs text-gray-500">{option.description}</div>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
      
      <p className="text-center text-sm text-gray-500 mt-4">
        We'll optimize your study schedule for these hours
      </p>
    </div>
  );
};

export default StudyTimeStep;
