
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { UserRole } from "@/types/user/base";

interface DemographicsStepProps {
  onSubmit: (data: Record<string, string>) => void;
  selectedGoal?: string;
}

const DemographicsStep: React.FC<DemographicsStepProps> = ({ onSubmit, selectedGoal }) => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    location: "",
    education: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Tell us about yourself</h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
        This helps us personalize your learning experience
        {selectedGoal ? ` for ${selectedGoal}` : ''}
      </p>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  placeholder="Your age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Input
                  id="gender"
                  name="gender"
                  placeholder="Your gender"
                  value={formData.gender}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="City, State"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="education">Education Level</Label>
                <Input
                  id="education"
                  name="education"
                  placeholder="Your highest education"
                  value={formData.education}
                  onChange={handleChange}
                />
              </div>
              
              <div className="pt-4">
                <Button type="submit" className="w-full">Continue</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default DemographicsStep;
