
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRole } from "../OnboardingContext";

interface DemographicsStepProps {
  role?: UserRole;
  onSubmit: (formData: Record<string, string>) => void;
}

const DemographicsStep: React.FC<DemographicsStepProps> = ({ role, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value as string;
    });
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {role === "Student" && (
        <>
          <div>
            <Label htmlFor="age">Age</Label>
            <Input id="age" name="age" required />
          </div>
          <div>
            <Label htmlFor="grade">Class/Grade</Label>
            <Input id="grade" name="grade" required placeholder="e.g. 12th, B.Tech 2nd year" />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" required />
          </div>
        </>
      )}
      
      {role === "Employee" && (
        <>
          <div>
            <Label htmlFor="jobRole">Job Role</Label>
            <Input id="jobRole" name="jobRole" required />
          </div>
          <div>
            <Label htmlFor="seniorityLevel">Seniority Level</Label>
            <Input id="seniorityLevel" name="seniorityLevel" required />
          </div>
          <div>
            <Label htmlFor="domain">Domain</Label>
            <Input id="domain" name="domain" required />
          </div>
        </>
      )}
      
      {role === "Doctor" && (
        <>
          <div>
            <Label htmlFor="specialization">Specialization</Label>
            <Input id="specialization" name="specialization" required />
          </div>
          <div>
            <Label htmlFor="institution">Institution</Label>
            <Input id="institution" name="institution" required />
          </div>
          <div>
            <Label htmlFor="research">Ongoing Research</Label>
            <Input id="research" name="research" required />
          </div>
        </>
      )}
      
      {role === "Founder" && (
        <>
          <div>
            <Label htmlFor="startupStage">Startup Stage</Label>
            <Input id="startupStage" name="startupStage" required />
          </div>
          <div>
            <Label htmlFor="teamSize">Team Size</Label>
            <Input id="teamSize" name="teamSize" required />
          </div>
          <div>
            <Label htmlFor="industry">Industry</Label>
            <Input id="industry" name="industry" required />
          </div>
        </>
      )}
      
      <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-700">Next</Button>
    </form>
  );
};

export default DemographicsStep;
