
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserRole } from "@/types/user/base";
import { getDemographicsQuestion } from "../utils/stepUtils";

interface DemographicsFormProps {
  onSubmit: (data: Record<string, string>) => void;
  role: UserRole;
  goal: string;
  isLoading: boolean;
}

const DemographicsForm: React.FC<DemographicsFormProps> = ({ 
  onSubmit, 
  role, 
  goal, 
  isLoading 
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const question = getDemographicsQuestion(role);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Generate form fields based on role
  const renderFormFields = () => {
    switch(role) {
      case "student":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age" 
                name="age" 
                placeholder="Your age" 
                value={formData.age || ""} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade">Class/Grade</Label>
              <Input 
                id="grade" 
                name="grade" 
                placeholder="10th to post graduation" 
                value={formData.grade || ""} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                name="location" 
                placeholder="City, State" 
                value={formData.location || ""} 
                onChange={handleInputChange} 
              />
            </div>
          </>
        );
      case "employee":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="jobRole">Job Role</Label>
              <Input 
                id="jobRole" 
                name="jobRole" 
                placeholder="Your job title" 
                value={formData.jobRole || ""} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seniority">Seniority Level</Label>
              <Input 
                id="seniority" 
                name="seniority" 
                placeholder="Entry, Mid, Senior, etc." 
                value={formData.seniority || ""} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="domain">Domain/Industry</Label>
              <Input 
                id="domain" 
                name="domain" 
                placeholder="Tech, Finance, Healthcare, etc." 
                value={formData.domain || ""} 
                onChange={handleInputChange} 
              />
            </div>
          </>
        );
      case "doctor":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input 
                id="specialization" 
                name="specialization" 
                placeholder="Your medical specialization" 
                value={formData.specialization || ""} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="institution">Institution</Label>
              <Input 
                id="institution" 
                name="institution" 
                placeholder="Hospital or clinic name" 
                value={formData.institution || ""} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="research">Research Interests (if any)</Label>
              <Textarea 
                id="research" 
                name="research" 
                placeholder="Brief description of your research" 
                value={formData.research || ""} 
                onChange={handleInputChange} 
              />
            </div>
          </>
        );
      case "founder":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="startupStage">Startup Stage</Label>
              <Input 
                id="startupStage" 
                name="startupStage" 
                placeholder="Idea, MVP, Growth, etc." 
                value={formData.startupStage || ""} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teamSize">Team Size</Label>
              <Input 
                id="teamSize" 
                name="teamSize" 
                placeholder="Number of team members" 
                value={formData.teamSize || ""} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input 
                id="industry" 
                name="industry" 
                placeholder="Tech, Healthcare, Finance, etc." 
                value={formData.industry || ""} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="goals">Main Goals</Label>
              <Textarea 
                id="goals" 
                name="goals" 
                placeholder="What are your main goals for your startup?" 
                value={formData.goals || ""} 
                onChange={handleInputChange} 
              />
            </div>
          </>
        );
      default:
        return (
          <div className="space-y-2">
            <Label htmlFor="aboutYou">About You</Label>
            <Textarea 
              id="aboutYou" 
              name="aboutYou" 
              placeholder="Tell us more about yourself" 
              value={formData.aboutYou || ""} 
              onChange={handleInputChange} 
            />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-1">{question}</h3>
        <p className="text-sm text-muted-foreground">
          This helps us personalize your experience for {goal}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {renderFormFields()}
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

export default DemographicsForm;
