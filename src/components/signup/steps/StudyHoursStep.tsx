
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface StudyHoursStepProps {
  onStudyHoursSelect: (hours: number) => void;
}

const StudyHoursStep: React.FC<StudyHoursStepProps> = ({ onStudyHoursSelect }) => {
  const [hours, setHours] = useState(4);

  const handleChange = (value: number[]) => {
    setHours(value[0]);
    onStudyHoursSelect(value[0]);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-center mb-4">I can dedicate this many hours daily...</h2>
      
      <div className="p-6 bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-100"
          >
            <Clock className="w-10 h-10 text-blue-600" />
          </motion.div>
        </div>
        
        <div className="text-center mb-6">
          <motion.div
            key={hours}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-4xl font-bold text-blue-600"
          >
            {hours} {hours === 1 ? 'hour' : 'hours'}
          </motion.div>
          <p className="text-sm text-gray-500 mt-2">
            {hours < 3 ? 'Consider allocating more time for better results' : 
             hours >= 3 && hours <= 6 ? 'Great! This is a good amount of study time' :
             'Excellent commitment! Make sure to take breaks'}
          </p>
        </div>
        
        <div className="px-2">
          <Slider 
            defaultValue={[4]} 
            min={1}
            max={12}
            step={0.5}
            onValueChange={handleChange}
          />
          
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>1 hr</span>
            <span>12 hrs</span>
          </div>
        </div>
      </div>
      
      <p className="text-center text-sm text-gray-500 mt-4">
        We'll create a plan that fits within your daily schedule
      </p>
    </div>
  );
};

export default StudyHoursStep;
