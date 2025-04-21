
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface StudyHabitsStepProps {
  onSubmit: (habits: Record<string, string>) => void;
}

const StudyHabitsStep: React.FC<StudyHabitsStepProps> = ({ onSubmit }) => {
  const [studyHabits, setStudyHabits] = useState<Record<string, string>>({
    preferredTime: "morning",
    studyDuration: "1-2",
    environment: "silent",
    breakFrequency: "hourly"
  });
  
  const handleChange = (field: string, value: string) => {
    setStudyHabits(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(studyHabits);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Your Study Habits</h3>
        <p className="text-sm text-gray-500 mb-4">
          Help us understand how you prefer to study so we can customize your learning experience.
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label>Preferred study time</Label>
          <RadioGroup 
            value={studyHabits.preferredTime} 
            onValueChange={(value) => handleChange('preferredTime', value)}
            className="flex flex-col space-y-1 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="morning" id="morning" />
              <Label htmlFor="morning">Morning (5 AM - 12 PM)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="afternoon" id="afternoon" />
              <Label htmlFor="afternoon">Afternoon (12 PM - 5 PM)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="evening" id="evening" />
              <Label htmlFor="evening">Evening (5 PM - 10 PM)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="night" id="night" />
              <Label htmlFor="night">Night (10 PM - 5 AM)</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <Label>How long do you typically study in one session?</Label>
          <RadioGroup 
            value={studyHabits.studyDuration} 
            onValueChange={(value) => handleChange('studyDuration', value)}
            className="flex flex-col space-y-1 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="less-1" id="less-1" />
              <Label htmlFor="less-1">Less than 1 hour</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1-2" id="1-2" />
              <Label htmlFor="1-2">1-2 hours</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2-4" id="2-4" />
              <Label htmlFor="2-4">2-4 hours</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="more-4" id="more-4" />
              <Label htmlFor="more-4">More than 4 hours</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <Label>Preferred study environment</Label>
          <RadioGroup 
            value={studyHabits.environment} 
            onValueChange={(value) => handleChange('environment', value)}
            className="flex flex-col space-y-1 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="silent" id="silent" />
              <Label htmlFor="silent">Silent environment</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="background-music" id="background-music" />
              <Label htmlFor="background-music">With background music</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ambient-noise" id="ambient-noise" />
              <Label htmlFor="ambient-noise">With ambient noise (café, etc.)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="group" id="group" />
              <Label htmlFor="group">In a group setting</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      <Button type="submit" className="w-full">
        Next
      </Button>
    </form>
  );
};

export default StudyHabitsStep;
