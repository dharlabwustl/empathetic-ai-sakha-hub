
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { useOnboardingContext } from '../OnboardingContext';

interface StudyHabitsStepProps {
  onNext: () => void;
}

const StudyHabitsStep: React.FC<StudyHabitsStepProps> = ({ onNext }) => {
  const { updateFormData, formData } = useOnboardingContext();
  const [studyTime, setStudyTime] = useState<'morning' | 'afternoon' | 'evening' | 'night'>(formData.studyTime || 'morning');
  const [studyPace, setStudyPace] = useState<'slow' | 'moderate' | 'fast'>(formData.studyPace || 'moderate');
  const [studyHoursPerDay, setStudyHoursPerDay] = useState<number>(formData.studyHoursPerDay || 4);

  const handleContinue = () => {
    updateFormData({
      studyTime,
      studyPace,
      studyHoursPerDay,
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-muted-foreground">Tell us about your study preferences so we can personalize your experience</p>
      </div>

      <div className="space-y-6">
        {/* Study Time Preference */}
        <div className="space-y-3">
          <Label>When do you prefer to study?</Label>
          <RadioGroup 
            defaultValue={studyTime} 
            onValueChange={(value) => setStudyTime(value as 'morning' | 'afternoon' | 'evening' | 'night')}
            className="grid grid-cols-2 gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="morning" id="morning" />
              <Label htmlFor="morning" className="cursor-pointer">Morning (5am-12pm)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="afternoon" id="afternoon" />
              <Label htmlFor="afternoon" className="cursor-pointer">Afternoon (12pm-5pm)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="evening" id="evening" />
              <Label htmlFor="evening" className="cursor-pointer">Evening (5pm-10pm)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="night" id="night" />
              <Label htmlFor="night" className="cursor-pointer">Night (10pm-5am)</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Study Pace */}
        <div className="space-y-3">
          <Label>What's your preferred study pace?</Label>
          <RadioGroup 
            defaultValue={studyPace}
            onValueChange={(value) => setStudyPace(value as 'slow' | 'moderate' | 'fast')}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="slow" id="slow" />
              <Label htmlFor="slow" className="cursor-pointer">I prefer to take my time and understand thoroughly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="moderate" id="moderate" />
              <Label htmlFor="moderate" className="cursor-pointer">I balance depth and coverage</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fast" id="fast" />
              <Label htmlFor="fast" className="cursor-pointer">I like to cover a lot of material quickly</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Daily Study Hours */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <Label>How many hours can you study per day?</Label>
            <span className="text-sm font-medium">{studyHoursPerDay} hours</span>
          </div>
          <Slider
            defaultValue={[studyHoursPerDay]}
            max={12}
            min={1}
            step={0.5}
            onValueChange={(value) => setStudyHoursPerDay(value[0])}
            className="w-full"
          />
        </div>
      </div>

      <Button 
        className="w-full"
        onClick={handleContinue}
      >
        Continue
      </Button>

      <p className="text-xs text-center text-muted-foreground mt-4">
        We'll use this information to create your personalized study plan
      </p>
    </div>
  );
};

export default StudyHabitsStep;
