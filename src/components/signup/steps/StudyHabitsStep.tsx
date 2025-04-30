
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";

interface StudyHabitsStepProps {
  onSubmit: (habits: Record<string, string>) => void;
}

const StudyHabitsStep: React.FC<StudyHabitsStepProps> = ({ onSubmit }) => {
  const [studyTime, setStudyTime] = useState("morning");
  const [studyPace, setStudyPace] = useState("balanced");
  const [studyHours, setStudyHours] = useState(2);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      preferredStudyTime: studyTime,
      preferredStudyPace: studyPace,
      dailyStudyHours: studyHours.toString()
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Your Study Habits</h3>
        <p className="text-sm text-gray-500">
          These details help us create a study plan that fits your lifestyle
        </p>
        
        <div className="mt-6">
          <Label className="font-medium">Preferred Study Time</Label>
          <p className="text-sm text-gray-500 mb-3">When are you most productive?</p>
          <RadioGroup
            value={studyTime}
            onValueChange={setStudyTime}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2"
          >
            <Label
              htmlFor="morning"
              className={`flex p-3 cursor-pointer items-center justify-between rounded-lg border ${
                studyTime === "morning"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="morning" id="morning" />
                <div>
                  <p className="font-medium">Morning</p>
                  <p className="text-xs text-gray-500">5 AM - 11 AM</p>
                </div>
              </div>
            </Label>
            <Label
              htmlFor="afternoon"
              className={`flex p-3 cursor-pointer items-center justify-between rounded-lg border ${
                studyTime === "afternoon"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="afternoon" id="afternoon" />
                <div>
                  <p className="font-medium">Afternoon</p>
                  <p className="text-xs text-gray-500">12 PM - 5 PM</p>
                </div>
              </div>
            </Label>
            <Label
              htmlFor="evening"
              className={`flex p-3 cursor-pointer items-center justify-between rounded-lg border ${
                studyTime === "evening"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="evening" id="evening" />
                <div>
                  <p className="font-medium">Evening</p>
                  <p className="text-xs text-gray-500">6 PM - 9 PM</p>
                </div>
              </div>
            </Label>
            <Label
              htmlFor="night"
              className={`flex p-3 cursor-pointer items-center justify-between rounded-lg border ${
                studyTime === "night"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="night" id="night" />
                <div>
                  <p className="font-medium">Night</p>
                  <p className="text-xs text-gray-500">10 PM - 4 AM</p>
                </div>
              </div>
            </Label>
          </RadioGroup>
        </div>
        
        <div className="mt-6">
          <Label className="font-medium">Preferred Study Pace</Label>
          <p className="text-sm text-gray-500 mb-3">How intensely do you want to study?</p>
          <RadioGroup
            value={studyPace}
            onValueChange={setStudyPace}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2"
          >
            <Label
              htmlFor="relaxed"
              className={`flex p-3 cursor-pointer items-center justify-between rounded-lg border ${
                studyPace === "relaxed"
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="relaxed" id="relaxed" />
                <div>
                  <p className="font-medium">Relaxed</p>
                  <p className="text-xs text-gray-500">Steady progress</p>
                </div>
              </div>
            </Label>
            <Label
              htmlFor="balanced"
              className={`flex p-3 cursor-pointer items-center justify-between rounded-lg border ${
                studyPace === "balanced"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="balanced" id="balanced" />
                <div>
                  <p className="font-medium">Balanced</p>
                  <p className="text-xs text-gray-500">Moderate intensity</p>
                </div>
              </div>
            </Label>
            <Label
              htmlFor="aggressive"
              className={`flex p-3 cursor-pointer items-center justify-between rounded-lg border ${
                studyPace === "aggressive"
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="aggressive" id="aggressive" />
                <div>
                  <p className="font-medium">Aggressive</p>
                  <p className="text-xs text-gray-500">Maximum intensity</p>
                </div>
              </div>
            </Label>
          </RadioGroup>
        </div>
        
        <div className="mt-6">
          <Label className="font-medium">Daily Study Hours</Label>
          <p className="text-sm text-gray-500 mb-3">
            How many hours can you dedicate to studying each day?
          </p>
          <div className="px-2">
            <Slider
              value={[studyHours]}
              min={1}
              max={8}
              step={0.5}
              onValueChange={(value) => setStudyHours(value[0])}
              className="mt-6"
            />
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>1 hour</span>
              <span className="font-medium text-blue-600">{studyHours} hours</span>
              <span>8 hours</span>
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-blue-600">
        Continue
      </Button>
    </motion.form>
  );
};

export default StudyHabitsStep;
