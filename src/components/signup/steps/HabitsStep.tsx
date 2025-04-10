
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface HabitsStepProps {
  onSubmit: (habits: Record<string, string>) => void;
}

const HabitsStep: React.FC<HabitsStepProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const habits: Record<string, string> = {};
    formData.forEach((value, key) => {
      habits[key] = value as string;
    });
    onSubmit(habits);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="sleepPattern">Sleep Pattern</Label>
        <Input id="sleepPattern" name="sleepPattern" placeholder="e.g. 6-8 hours daily" required />
      </div>
      <div>
        <Label htmlFor="dailyRoutine">Daily Routine</Label>
        <Input id="dailyRoutine" name="dailyRoutine" placeholder="e.g. Morning study, evening review" required />
      </div>
      <div>
        <Label htmlFor="stressManagement">Stress Management Methods</Label>
        <Input id="stressManagement" name="stressManagement" placeholder="e.g. Meditation, exercise" required />
      </div>
      <div>
        <Label htmlFor="focusDuration">Focus Duration</Label>
        <Input id="focusDuration" name="focusDuration" placeholder="e.g. 45 minutes with 15-minute breaks" required />
      </div>
      <div>
        <Label htmlFor="studyPreference">Study Preference</Label>
        <Input id="studyPreference" name="studyPreference" placeholder="e.g. Visual learning, group study" required />
      </div>
      <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-700">Next</Button>
    </form>
  );
};

export default HabitsStep;
