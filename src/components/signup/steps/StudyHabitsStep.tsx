
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { AlertCircle, Clock, FastForward, Play, Pause, Sunrise, Sun, Sunset, Moon, Check } from "lucide-react";
import { StudyPace, StudyTimePreference, StressManagementTechnique } from "@/types/user/base";
import { cn } from "@/lib/utils";

interface StudyHabitsStepProps {
  onSubmit: (habits: Record<string, string>) => void;
}

const StudyHabitsStep: React.FC<StudyHabitsStepProps> = ({ onSubmit }) => {
  const [studyTime, setStudyTime] = useState<string>("");
  const [studyPace, setStudyPace] = useState<string>("");
  const [dailyStudyHours, setDailyStudyHours] = useState<number>(4);
  const [breakFrequency, setBreakFrequency] = useState<string>("");
  const [stressManagement, setStressManagement] = useState<string>("");
  const [studyEnvironment, setStudyEnvironment] = useState<string>("");
  const [stressManagementCustom, setStressManagementCustom] = useState<string>("");
  const [studyEnvironmentCustom, setStudyEnvironmentCustom] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare habits data
    const habitsData: Record<string, any> = {
      studyTimePreference: studyTime,
      studyPace,
      dailyStudyHours,
      breakFrequency,
      stressManagement: stressManagement === "other" ? stressManagementCustom : stressManagement,
      studyEnvironment: studyEnvironment === "other" ? studyEnvironmentCustom : studyEnvironment,
    };
    
    onSubmit(habitsData);
  };

  const timeOptions = [
    {
      value: StudyTimePreference.Morning,
      label: "Morning",
      description: "Early hours, 6 AM - 11 AM",
      icon: <Sunrise className="h-6 w-6 text-amber-500" />
    },
    {
      value: StudyTimePreference.Afternoon,
      label: "Afternoon",
      description: "Midday hours, 12 PM - 4 PM",
      icon: <Sun className="h-6 w-6 text-orange-500" />
    },
    {
      value: StudyTimePreference.Evening,
      label: "Evening",
      description: "After sunset, 5 PM - 8 PM",
      icon: <Sunset className="h-6 w-6 text-indigo-500" />
    },
    {
      value: StudyTimePreference.Night,
      label: "Night",
      description: "Late hours, 9 PM - 12 AM",
      icon: <Moon className="h-6 w-6 text-blue-500" />
    }
  ];

  // Ensure all required fields are filled
  const isFormValid = studyTime && studyPace && breakFrequency && 
    stressManagement && studyEnvironment &&
    (stressManagement !== "other" || stressManagementCustom) &&
    (studyEnvironment !== "other" || studyEnvironmentCustom);

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-5"
    >
      <div>
        <h3 className="text-lg font-medium mb-1">Study Preferences</h3>
        <p className="text-sm text-gray-500 mb-4">
          Let us understand your study habits to personalize your learning experience.
        </p>
      </div>

      <div className="space-y-6">
        {/* Preferred Study Time */}
        <div>
          <h3 className="text-base font-medium mb-2 flex items-center gap-2">
            <Clock className="text-indigo-500" size={18} />
            Preferred Study Time
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {timeOptions.map((option) => (
              <div
                key={option.value}
                className={`relative cursor-pointer group transition-all rounded-lg overflow-hidden`}
                onClick={() => setStudyTime(option.value)}
              >
                <div className={`flex items-center gap-4 p-3 border-2 transition-colors ${
                  studyTime === option.value
                    ? 'bg-indigo-50 border-indigo-400 dark:bg-indigo-900/30 dark:border-indigo-700'
                    : 'border-gray-200 hover:bg-indigo-50/50 hover:border-indigo-200 dark:border-gray-700 dark:hover:bg-indigo-900/10'
                }`}>
                  <div className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm">
                    {option.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-muted-foreground">{option.description}</div>
                  </div>
                  {studyTime === option.value && (
                    <div className="ml-auto">
                      <Check className="h-4 w-4 text-indigo-500" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Pace */}
        <div>
          <h3 className="text-base font-medium mb-2 flex items-center gap-2">
            <FastForward className="text-amber-500" size={18} />
            Study Pace Preference
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button 
              type="button"
              variant={studyPace === StudyPace.Aggressive ? "default" : "outline"}
              onClick={() => setStudyPace(StudyPace.Aggressive)}
              className={cn(
                "h-20 flex flex-col items-center justify-center space-y-1",
                studyPace === StudyPace.Aggressive && "bg-amber-600 hover:bg-amber-700"
              )}
            >
              <FastForward size={20} />
              <span>Aggressive</span>
            </Button>
            
            <Button 
              type="button"
              variant={studyPace === StudyPace.Balanced ? "default" : "outline"}
              onClick={() => setStudyPace(StudyPace.Balanced)}
              className={cn(
                "h-20 flex flex-col items-center justify-center space-y-1",
                studyPace === StudyPace.Balanced && "bg-emerald-600 hover:bg-emerald-700"
              )}
            >
              <Play size={20} />
              <span>Balanced</span>
            </Button>
            
            <Button 
              type="button"
              variant={studyPace === StudyPace.Relaxed ? "default" : "outline"}
              onClick={() => setStudyPace(StudyPace.Relaxed)}
              className={cn(
                "h-20 flex flex-col items-center justify-center space-y-1",
                studyPace === StudyPace.Relaxed && "bg-blue-600 hover:bg-blue-700"
              )}
            >
              <Pause size={20} />
              <span>Relaxed</span>
            </Button>
          </div>
          
          {studyPace && (
            <div className="mt-2 bg-amber-50 p-2 rounded-md text-xs">
              <p className="flex items-center gap-2">
                <AlertCircle size={14} className="text-amber-500" />
                <span>
                  {studyPace === StudyPace.Aggressive && "Aggressive pace fits more content in less time. Best for those with strong discipline."}
                  {studyPace === StudyPace.Balanced && "Balanced pace provides a steady progression with regular breaks. Ideal for most students."}
                  {studyPace === StudyPace.Relaxed && "Relaxed pace spreads content over longer periods with more review time. Good for reducing stress."}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Daily Study Hours */}
        <div>
          <h3 className="text-base font-medium mb-2">Daily Study Hours</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Hours: {dailyStudyHours}</span>
            </div>
            <Slider
              value={[dailyStudyHours]}
              max={12}
              min={1}
              step={0.5}
              onValueChange={(value) => setDailyStudyHours(value[0])}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 hour</span>
              <span>6 hours</span>
              <span>12 hours</span>
            </div>
          </div>
        </div>

        {/* Break Frequency */}
        <div>
          <Label htmlFor="breakFrequency" className="text-base font-medium">
            Break Frequency
          </Label>
          <Select value={breakFrequency} onValueChange={setBreakFrequency}>
            <SelectTrigger id="breakFrequency" className="mt-2">
              <SelectValue placeholder="How often do you take breaks?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="frequently">Frequently (every 30 mins)</SelectItem>
              <SelectItem value="occasionally">Occasionally (every 1-2 hours)</SelectItem>
              <SelectItem value="rarely">Rarely (study for 3+ hours straight)</SelectItem>
              <SelectItem value="pomodoro">Pomodoro technique</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stress Management */}
        <div>
          <Label htmlFor="stressManagement" className="text-base font-medium">
            How do you manage study stress?
          </Label>
          <Select value={stressManagement} onValueChange={setStressManagement}>
            <SelectTrigger id="stressManagement" className="mt-2">
              <SelectValue placeholder="Select stress management technique" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={StressManagementTechnique.Exercise}>Physical exercise</SelectItem>
              <SelectItem value={StressManagementTechnique.Meditation}>Meditation/Breathing techniques</SelectItem>
              <SelectItem value={StressManagementTechnique.Breaks}>Taking frequent breaks</SelectItem>
              <SelectItem value={StressManagementTechnique.Music}>Listening to music</SelectItem>
              <SelectItem value={StressManagementTechnique.Talking}>Talking to friends/family</SelectItem>
              <SelectItem value={StressManagementTechnique.Other}>Other (please specify)</SelectItem>
            </SelectContent>
          </Select>
          
          {stressManagement === StressManagementTechnique.Other && (
            <Textarea
              value={stressManagementCustom}
              onChange={(e) => setStressManagementCustom(e.target.value)}
              placeholder="Please specify your stress management technique"
              className="mt-2"
            />
          )}
        </div>

        {/* Study Environment Preference */}
        <div>
          <Label htmlFor="studyEnvironment" className="text-base font-medium">
            Study Environment Preference
          </Label>
          <Select value={studyEnvironment} onValueChange={setStudyEnvironment}>
            <SelectTrigger id="studyEnvironment" className="mt-2">
              <SelectValue placeholder="Select preferred environment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quiet">Quiet environment</SelectItem>
              <SelectItem value="background">Background noise/music</SelectItem>
              <SelectItem value="group">Group study</SelectItem>
              <SelectItem value="library">Library/Study room</SelectItem>
              <SelectItem value="outdoors">Outdoor setting</SelectItem>
              <SelectItem value="other">Other (please specify)</SelectItem>
            </SelectContent>
          </Select>
          
          {studyEnvironment === "other" && (
            <Textarea
              value={studyEnvironmentCustom}
              onChange={(e) => setStudyEnvironmentCustom(e.target.value)}
              placeholder="Please specify your study environment preference"
              className="mt-2"
            />
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600"
        disabled={!isFormValid}
      >
        Continue
      </Button>
    </motion.form>
  );
};

export default StudyHabitsStep;
