
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HabitsFormProps {
  onSubmit: (habits: Record<string, string>) => void;
  isLoading?: boolean;
}

const HabitsForm: React.FC<HabitsFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    studyTime: "morning",
    studyDuration: "1-2",
    studyPreference: "alone",
    stressManagement: "exercise",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">Preferred study time</Label>
          <RadioGroup 
            value={formData.studyTime} 
            onValueChange={(value) => handleChange("studyTime", value)}
            className="mt-2 space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="early-morning" id="early-morning" />
              <Label htmlFor="early-morning">Early Morning (5-8 AM)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="morning" id="morning" />
              <Label htmlFor="morning">Morning (8-12 PM)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="afternoon" id="afternoon" />
              <Label htmlFor="afternoon">Afternoon (12-5 PM)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="evening" id="evening" />
              <Label htmlFor="evening">Evening (5-9 PM)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="night" id="night" />
              <Label htmlFor="night">Night (9 PM-12 AM)</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label className="text-base font-medium">Daily study duration (hours)</Label>
          <Select 
            value={formData.studyDuration}
            onValueChange={(value) => handleChange("studyDuration", value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-1">Less than 1 hour</SelectItem>
              <SelectItem value="1-2">1-2 hours</SelectItem>
              <SelectItem value="2-4">2-4 hours</SelectItem>
              <SelectItem value="4-6">4-6 hours</SelectItem>
              <SelectItem value="6+">More than 6 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-base font-medium">Study preference</Label>
          <RadioGroup 
            value={formData.studyPreference} 
            onValueChange={(value) => handleChange("studyPreference", value)}
            className="mt-2 space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="alone" id="alone" />
              <Label htmlFor="alone">Study alone</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="group" id="group" />
              <Label htmlFor="group">Study in groups</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="both" id="both" />
              <Label htmlFor="both">Both, depending on the subject</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom" />
              <Label htmlFor="custom">Other</Label>
            </div>
          </RadioGroup>
          {formData.studyPreference === "custom" && (
            <Input 
              className="mt-2"
              placeholder="Please specify"
              value={formData.studyPreferenceCustom || ""}
              onChange={(e) => handleChange("studyPreferenceCustom", e.target.value)}
            />
          )}
        </div>

        <div>
          <Label className="text-base font-medium">Stress management technique</Label>
          <RadioGroup 
            value={formData.stressManagement} 
            onValueChange={(value) => handleChange("stressManagement", value)}
            className="mt-2 space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="exercise" id="exercise" />
              <Label htmlFor="exercise">Exercise/Sports</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="meditation" id="meditation" />
              <Label htmlFor="meditation">Meditation/Yoga</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hobbies" id="hobbies" />
              <Label htmlFor="hobbies">Creative hobbies</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="social" id="social" />
              <Label htmlFor="social">Social activities</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="stress-custom" />
              <Label htmlFor="stress-custom">Other</Label>
            </div>
          </RadioGroup>
          {formData.stressManagement === "custom" && (
            <Input 
              className="mt-2"
              placeholder="Please specify"
              value={formData.stressManagementCustom || ""}
              onChange={(e) => handleChange("stressManagementCustom", e.target.value)}
            />
          )}
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Continue"}
      </Button>
    </form>
  );
};

export default HabitsForm;
