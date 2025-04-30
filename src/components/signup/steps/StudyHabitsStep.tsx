
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";

interface StudyHabitsStepProps {
  onSubmit: (habits: Record<string, string>) => void;
}

const StudyHabitsStep: React.FC<StudyHabitsStepProps> = ({ onSubmit }) => {
  const [studyTime, setStudyTime] = useState<string>("");
  const [studyPace, setStudyPace] = useState<string>("");
  const [dailyStudyHours, setDailyStudyHours] = useState<string>("");
  const [breakFrequency, setBreakFrequency] = useState<string>("");
  const [stressManagement, setStressManagement] = useState<string>("");
  const [studyPreference, setStudyPreference] = useState<string>("");
  const [stressManagementCustom, setStressManagementCustom] = useState<string>("");
  const [studyPreferenceCustom, setStudyPreferenceCustom] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare habits data
    const habitsData: Record<string, string> = {
      studyTime,
      studyPace,
      dailyStudyHours,
      breakFrequency,
      stressManagement: stressManagement === "other" ? stressManagementCustom : stressManagement,
      studyPreference: studyPreference === "other" ? studyPreferenceCustom : studyPreference,
    };
    
    onSubmit(habitsData);
  };

  // Ensure all required fields are filled
  const isFormValid = studyTime && studyPace && dailyStudyHours && breakFrequency && 
    stressManagement && studyPreference &&
    (stressManagement !== "other" || stressManagementCustom) &&
    (studyPreference !== "other" || studyPreferenceCustom);

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

      <div className="space-y-4">
        {/* Preferred Study Time */}
        <div>
          <Label className="text-base font-medium">Preferred Study Time</Label>
          <RadioGroup
            value={studyTime}
            onValueChange={setStudyTime}
            className="grid grid-cols-2 gap-3 mt-2"
          >
            <Label
              htmlFor="study-morning"
              className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer transition-colors ${
                studyTime === "morning" ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"
              }`}
            >
              <RadioGroupItem value="morning" id="study-morning" />
              <span>Morning</span>
            </Label>
            <Label
              htmlFor="study-afternoon"
              className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer transition-colors ${
                studyTime === "afternoon" ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"
              }`}
            >
              <RadioGroupItem value="afternoon" id="study-afternoon" />
              <span>Afternoon</span>
            </Label>
            <Label
              htmlFor="study-evening"
              className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer transition-colors ${
                studyTime === "evening" ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"
              }`}
            >
              <RadioGroupItem value="evening" id="study-evening" />
              <span>Evening</span>
            </Label>
            <Label
              htmlFor="study-night"
              className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer transition-colors ${
                studyTime === "night" ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"
              }`}
            >
              <RadioGroupItem value="night" id="study-night" />
              <span>Night</span>
            </Label>
          </RadioGroup>
        </div>

        {/* Study Pace */}
        <div>
          <Label htmlFor="studyPace" className="text-base font-medium">
            Preferred Study Pace
          </Label>
          <Select value={studyPace} onValueChange={setStudyPace}>
            <SelectTrigger id="studyPace" className="mt-2">
              <SelectValue placeholder="Select your preferred pace" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="slow">Slow and thorough</SelectItem>
              <SelectItem value="moderate">Moderate pace</SelectItem>
              <SelectItem value="fast">Fast-paced</SelectItem>
              <SelectItem value="variable">Variable (depends on subject)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Daily Study Hours */}
        <div>
          <Label htmlFor="dailyStudyHours" className="text-base font-medium">
            Daily Study Hours
          </Label>
          <Select value={dailyStudyHours} onValueChange={setDailyStudyHours}>
            <SelectTrigger id="dailyStudyHours" className="mt-2">
              <SelectValue placeholder="Select hours per day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-2">1-2 hours</SelectItem>
              <SelectItem value="3-4">3-4 hours</SelectItem>
              <SelectItem value="5-6">5-6 hours</SelectItem>
              <SelectItem value="7+">7+ hours</SelectItem>
              <SelectItem value="variable">Variable (depends on day)</SelectItem>
            </SelectContent>
          </Select>
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
              <SelectItem value="exercise">Physical exercise</SelectItem>
              <SelectItem value="meditation">Meditation/Breathing techniques</SelectItem>
              <SelectItem value="music">Listening to music</SelectItem>
              <SelectItem value="breaks">Taking frequent breaks</SelectItem>
              <SelectItem value="talking">Talking to friends/family</SelectItem>
              <SelectItem value="other">Other (please specify)</SelectItem>
            </SelectContent>
          </Select>
          
          {stressManagement === "other" && (
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
          <Label htmlFor="studyPreference" className="text-base font-medium">
            Study Environment Preference
          </Label>
          <Select value={studyPreference} onValueChange={setStudyPreference}>
            <SelectTrigger id="studyPreference" className="mt-2">
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
          
          {studyPreference === "other" && (
            <Textarea
              value={studyPreferenceCustom}
              onChange={(e) => setStudyPreferenceCustom(e.target.value)}
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
