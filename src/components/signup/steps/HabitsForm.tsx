
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HabitsFormProps {
  onSubmit: (data: Record<string, string>) => void;
  isLoading: boolean;
}

const HabitsForm: React.FC<HabitsFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    studyTime: "morning",
    studyDuration: "1-2",
    studyFrequency: "daily",
    studyPreference: "visual",
    stressManagement: "breaks"
  });

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectChange = (key: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-1">Study Habits</h3>
        <p className="text-sm text-muted-foreground">
          Let's understand your study preferences for a personalized experience
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>When do you prefer to study?</Label>
          <RadioGroup 
            defaultValue={formData.studyTime} 
            onValueChange={(value) => handleInputChange("studyTime", value)}
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

        <div className="space-y-2">
          <Label htmlFor="studyDuration">How long can you study in one session?</Label>
          <Select 
            value={formData.studyDuration} 
            onValueChange={handleSelectChange("studyDuration")}
          >
            <SelectTrigger id="studyDuration">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="<1">Less than 1 hour</SelectItem>
              <SelectItem value="1-2">1-2 hours</SelectItem>
              <SelectItem value="2-3">2-3 hours</SelectItem>
              <SelectItem value=">3">More than 3 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>How do you prefer to learn?</Label>
          <RadioGroup 
            defaultValue={formData.studyPreference} 
            onValueChange={(value) => handleInputChange("studyPreference", value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="visual" id="visual" />
              <Label htmlFor="visual">Visual (diagrams, charts)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="reading" id="reading" />
              <Label htmlFor="reading">Reading material</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="interactive" id="interactive" />
              <Label htmlFor="interactive">Interactive (quizzes, exercises)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom" />
              <Label htmlFor="custom">Custom:</Label>
              <Input 
                className="ml-1 h-8 w-48" 
                placeholder="Your preference" 
                onChange={(e) => handleInputChange("studyPreferenceCustom", e.target.value)}
              />
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>How do you manage stress during studying?</Label>
          <RadioGroup 
            defaultValue={formData.stressManagement} 
            onValueChange={(value) => handleInputChange("stressManagement", value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="breaks" id="breaks" />
              <Label htmlFor="breaks">Taking breaks</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="music" id="music" />
              <Label htmlFor="music">Listening to music</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="exercise" id="exercise" />
              <Label htmlFor="exercise">Physical exercise</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="customStress" />
              <Label htmlFor="customStress">Custom:</Label>
              <Input 
                className="ml-1 h-8 w-48" 
                placeholder="Your method" 
                onChange={(e) => handleInputChange("stressManagementCustom", e.target.value)}
              />
            </div>
          </RadioGroup>
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Continue"}
        </Button>
      </form>
    </div>
  );
};

export default HabitsForm;
