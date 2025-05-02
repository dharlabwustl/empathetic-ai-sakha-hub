
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useOnboarding } from '../OnboardingContext';

const StudyPreferences = () => {
  const { onboardingData, setOnboardingData, goToNextStep, goToPreviousStep } = useOnboarding();
  const [studyTime, setStudyTime] = useState<string>(onboardingData.studyTime || '');
  const [studyPace, setStudyPace] = useState<string>(onboardingData.studyPace || '');
  const [studyMethod, setStudyMethod] = useState<string>(onboardingData.studyMethod || '');
  const [focusDuration, setFocusDuration] = useState<string>(onboardingData.focusDuration || '');

  const handleNext = () => {
    setOnboardingData({
      ...onboardingData,
      studyTime,
      studyPace,
      studyMethod,
      focusDuration
    });
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Your Study Preferences</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Help us personalize your learning experience
        </p>
      </div>
      
      <div className="space-y-4">
        {/* Study Time Preference */}
        <div className="space-y-2">
          <Label>When do you prefer to study?</Label>
          <RadioGroup 
            value={studyTime} 
            onValueChange={setStudyTime}
            className="grid grid-cols-2 gap-2"
          >
            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <RadioGroupItem value="morning" id="morning" />
              <Label htmlFor="morning" className="cursor-pointer">Morning</Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <RadioGroupItem value="afternoon" id="afternoon" />
              <Label htmlFor="afternoon" className="cursor-pointer">Afternoon</Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <RadioGroupItem value="evening" id="evening" />
              <Label htmlFor="evening" className="cursor-pointer">Evening</Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <RadioGroupItem value="night" id="night" />
              <Label htmlFor="night" className="cursor-pointer">Night</Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Study Pace */}
        <div className="space-y-2">
          <Label>What's your preferred study pace?</Label>
          <RadioGroup 
            value={studyPace} 
            onValueChange={setStudyPace}
            className="grid grid-cols-2 gap-2"
          >
            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <RadioGroupItem value="slow" id="slow" />
              <Label htmlFor="slow" className="cursor-pointer">Slow & Steady</Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <RadioGroupItem value="moderate" id="moderate" />
              <Label htmlFor="moderate" className="cursor-pointer">Moderate</Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <RadioGroupItem value="fast" id="fast" />
              <Label htmlFor="fast" className="cursor-pointer">Fast-Paced</Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <RadioGroupItem value="variable" id="variable" />
              <Label htmlFor="variable" className="cursor-pointer">Depends on Topic</Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Study Method */}
        <div className="space-y-2">
          <Label>How do you like to learn?</Label>
          <RadioGroup 
            value={studyMethod} 
            onValueChange={setStudyMethod}
            className="grid grid-cols-2 gap-2"
          >
            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <RadioGroupItem value="visual" id="visual" />
              <Label htmlFor="visual" className="cursor-pointer">Visual (Diagrams, Charts)</Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <RadioGroupItem value="reading" id="reading" />
              <Label htmlFor="reading" className="cursor-pointer">Reading & Writing</Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <RadioGroupItem value="practice" id="practice" />
              <Label htmlFor="practice" className="cursor-pointer">Practice Questions</Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <RadioGroupItem value="mix" id="mix" />
              <Label htmlFor="mix" className="cursor-pointer">Mix of Methods</Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Focus Duration */}
        <div className="space-y-2">
          <Label>How long can you focus in one sitting?</Label>
          <RadioGroup 
            value={focusDuration} 
            onValueChange={setFocusDuration}
            className="grid grid-cols-2 gap-2"
          >
            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <RadioGroupItem value="short" id="short" />
              <Label htmlFor="short" className="cursor-pointer">15-30 minutes</Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium" className="cursor-pointer">30-60 minutes</Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <RadioGroupItem value="long" id="long" />
              <Label htmlFor="long" className="cursor-pointer">1-2 hours</Label>
            </div>
            <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <RadioGroupItem value="extended" id="extended" />
              <Label htmlFor="extended" className="cursor-pointer">2+ hours</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={goToPreviousStep}>
          Back
        </Button>
        <Button onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default StudyPreferences;
