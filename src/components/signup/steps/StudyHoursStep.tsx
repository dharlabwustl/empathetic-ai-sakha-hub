
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface StudyHoursStepProps {
  onStudyHoursSelect: (hours: number) => void;
}

const StudyHoursStep: React.FC<StudyHoursStepProps> = ({ onStudyHoursSelect }) => {
  const [studyHours, setStudyHours] = useState<number>(2);
  
  const handleChange = (value: number[]) => {
    setStudyHours(value[0]);
  };
  
  const handleSubmit = () => {
    onStudyHoursSelect(studyHours);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">How much time can you dedicate to studying daily?</h2>
        <p className="text-gray-500">This helps us create a personalized study plan for you.</p>
      </div>
      
      <div className="py-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-500">1 hour</span>
          <span className="text-sm text-gray-500">8+ hours</span>
        </div>
        
        <Slider 
          defaultValue={[2]} 
          max={8}
          min={1}
          step={0.5}
          onValueChange={handleChange}
        />
        
        <div className="mt-8 text-center">
          <span className="text-2xl font-bold">{studyHours} {studyHours === 1 ? 'hour' : 'hours'}</span>
          <p className="text-sm text-gray-500 mt-1">per day</p>
        </div>
      </div>
      
      <Button 
        onClick={handleSubmit} 
        className="w-full mt-4"
      >
        Continue
      </Button>
    </div>
  );
};

export default StudyHoursStep;
