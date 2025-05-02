
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StudyTimePreference, StudyPace, StudyEnvironmentPreference, StressManagementTechnique } from "@/types/user/base";

interface StudyHabitsStepProps {
  onSubmit: (data: {
    studyTimePreference: StudyTimePreference;
    studyPace: StudyPace;
    dailyStudyHours: number;
    breakFrequency: string;
    stressManagement: StressManagementTechnique | string;
    stressManagementCustom?: string;
    studyEnvironment: StudyEnvironmentPreference;
    studyEnvironmentCustom?: string;
  }) => void;
}

const StudyHabitsStep: React.FC<StudyHabitsStepProps> = ({ onSubmit }) => {
  const [studyTimePreference, setStudyTimePreference] = useState<StudyTimePreference>(StudyTimePreference.Morning);
  const [studyPace, setStudyPace] = useState<StudyPace>(StudyPace.Balanced);
  const [dailyStudyHours, setDailyStudyHours] = useState<number>(3);
  const [breakFrequency, setBreakFrequency] = useState<string>("Every 45 minutes");
  const [stressManagement, setStressManagement] = useState<StressManagementTechnique | string>(StressManagementTechnique.DeepBreathing);
  const [stressManagementCustom, setStressManagementCustom] = useState<string>("");
  const [studyEnvironment, setStudyEnvironment] = useState<StudyEnvironmentPreference>(StudyEnvironmentPreference.Quiet);
  const [studyEnvironmentCustom, setStudyEnvironmentCustom] = useState<string>("");

  const handleSubmit = () => {
    onSubmit({
      studyTimePreference,
      studyPace,
      dailyStudyHours,
      breakFrequency,
      stressManagement: stressManagement === StressManagementTechnique.Other ? stressManagementCustom : stressManagement,
      stressManagementCustom,
      studyEnvironment,
      studyEnvironmentCustom
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Study Preferences</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Help us understand your study habits to personalize your experience.</p>
      </div>

      {/* Preferred Study Time */}
      <div className="space-y-3">
        <Label>When do you prefer to study?</Label>
        <RadioGroup value={studyTimePreference} onValueChange={(value) => setStudyTimePreference(value as StudyTimePreference)} className="grid grid-cols-1 gap-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={StudyTimePreference.Morning} id="morning" />
            <Label htmlFor="morning" className="cursor-pointer">Morning (6 AM - 11 AM)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={StudyTimePreference.Afternoon} id="afternoon" />
            <Label htmlFor="afternoon" className="cursor-pointer">Afternoon (12 PM - 4 PM)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={StudyTimePreference.Evening} id="evening" />
            <Label htmlFor="evening" className="cursor-pointer">Evening (5 PM - 8 PM)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={StudyTimePreference.Night} id="night" />
            <Label htmlFor="night" className="cursor-pointer">Night (9 PM - 12 AM)</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Study Pace */}
      <div className="space-y-3">
        <Label>What's your preferred study pace?</Label>
        <RadioGroup value={studyPace} onValueChange={(value) => setStudyPace(value as StudyPace)} className="grid grid-cols-1 gap-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={StudyPace.Aggressive} id="aggressive" />
            <Label htmlFor="aggressive" className="cursor-pointer">Aggressive (intense focus, faster progress)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={StudyPace.Balanced} id="balanced" />
            <Label htmlFor="balanced" className="cursor-pointer">Balanced (moderate pace with breaks)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={StudyPace.Relaxed} id="relaxed" />
            <Label htmlFor="relaxed" className="cursor-pointer">Relaxed (slower pace, thorough understanding)</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Daily Study Hours */}
      <div className="space-y-3">
        <Label>How many hours can you study daily?</Label>
        <Select 
          value={dailyStudyHours.toString()} 
          onValueChange={(value) => setDailyStudyHours(parseInt(value))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select hours" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((hours) => (
              <SelectItem key={hours} value={hours.toString()}>
                {hours} {hours === 1 ? 'hour' : 'hours'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Break Frequency */}
      <div className="space-y-3">
        <Label>How often do you prefer to take breaks?</Label>
        <Select 
          value={breakFrequency} 
          onValueChange={setBreakFrequency}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select break frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Every 25 minutes">Every 25 minutes (Pomodoro)</SelectItem>
            <SelectItem value="Every 45 minutes">Every 45 minutes</SelectItem>
            <SelectItem value="Every 60 minutes">Every 60 minutes</SelectItem>
            <SelectItem value="Every 90 minutes">Every 90 minutes</SelectItem>
            <SelectItem value="When needed">Only when needed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stress Management */}
      <div className="space-y-3">
        <Label>How do you manage study stress?</Label>
        <Select 
          value={stressManagement} 
          onValueChange={setStressManagement}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select stress management technique" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={StressManagementTechnique.DeepBreathing}>Deep breathing exercises</SelectItem>
            <SelectItem value={StressManagementTechnique.PhysicalExercise}>Physical exercise</SelectItem>
            <SelectItem value={StressManagementTechnique.Meditation}>Meditation</SelectItem>
            <SelectItem value={StressManagementTechnique.Music}>Listening to music</SelectItem>
            <SelectItem value={StressManagementTechnique.Talking}>Talking to friends/family</SelectItem>
            <SelectItem value={StressManagementTechnique.Other}>Other</SelectItem>
          </SelectContent>
        </Select>
        
        {stressManagement === StressManagementTechnique.Other && (
          <input
            type="text"
            value={stressManagementCustom}
            onChange={(e) => setStressManagementCustom(e.target.value)}
            placeholder="Please specify your technique"
            className="w-full p-2 border rounded"
          />
        )}
      </div>

      {/* Study Environment */}
      <div className="space-y-3">
        <Label>What's your preferred study environment?</Label>
        <Select 
          value={studyEnvironment} 
          onValueChange={(value) => setStudyEnvironment(value as StudyEnvironmentPreference)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select study environment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={StudyEnvironmentPreference.Quiet}>Quiet space (library, study room)</SelectItem>
            <SelectItem value={StudyEnvironmentPreference.BackgroundNoise}>Ambient background noise</SelectItem>
            <SelectItem value={StudyEnvironmentPreference.Music}>With music</SelectItem>
            <SelectItem value={StudyEnvironmentPreference.Group}>Group study</SelectItem>
            <SelectItem value={StudyEnvironmentPreference.Other}>Other</SelectItem>
          </SelectContent>
        </Select>
        
        {studyEnvironment === StudyEnvironmentPreference.Other && (
          <input
            type="text"
            value={studyEnvironmentCustom}
            onChange={(e) => setStudyEnvironmentCustom(e.target.value)}
            placeholder="Please specify your environment"
            className="w-full p-2 border rounded"
          />
        )}
      </div>

      <Button onClick={handleSubmit} className="w-full">
        Continue
      </Button>
    </div>
  );
};

export default StudyHabitsStep;
