
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";

interface StudyHabitsStepProps {
  onSubmit: (data: Record<string, string>) => void;
}

const StudyHabitsStep: React.FC<StudyHabitsStepProps> = ({ onSubmit }) => {
  const [formState, setFormState] = useState<Record<string, string>>({
    preferredStudyTime: "morning",
    studyDuration: "1-2",
    breakFrequency: "25-5",
    stressManagement: "exercise",
    studyPreference: "alone"
  });

  const handleChange = (id: string, value: string) => {
    setFormState({ ...formState, [id]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Study Habits</h2>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
        Let us understand your study preferences to personalize your experience.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="p-4">
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">When do you prefer to study?</Label>
              <RadioGroup
                value={formState.preferredStudyTime}
                onValueChange={(value) => handleChange("preferredStudyTime", value)}
                className="grid grid-cols-2 gap-2 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="morning" id="morning" />
                  <Label htmlFor="morning">Morning</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="afternoon" id="afternoon" />
                  <Label htmlFor="afternoon">Afternoon</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="evening" id="evening" />
                  <Label htmlFor="evening">Evening</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="night" id="night" />
                  <Label htmlFor="night">Night</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-medium">How long can you study in one session?</Label>
              <RadioGroup
                value={formState.studyDuration}
                onValueChange={(value) => handleChange("studyDuration", value)}
                className="grid grid-cols-2 gap-2 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0-1" id="less-1" />
                  <Label htmlFor="less-1">Less than 1 hour</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1-2" id="1-2" />
                  <Label htmlFor="1-2">1-2 hours</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2-3" id="2-3" />
                  <Label htmlFor="2-3">2-3 hours</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3+" id="3+" />
                  <Label htmlFor="3+">3+ hours</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="text-right mt-6">
              <Button type="submit">Continue</Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default StudyHabitsStep;
