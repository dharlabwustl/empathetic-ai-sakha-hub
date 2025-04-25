
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRole } from "@/components/signup/OnboardingContext";
import { getDemographicsQuestion } from "@/components/signup/utils/stepUtils";

interface DemographicsFormProps {
  onSubmit: (data: Record<string, string>) => void;
  role?: UserRole;
  goal?: string;
  isLoading?: boolean;
}

const DemographicsForm: React.FC<DemographicsFormProps> = ({
  onSubmit, 
  role = UserRole.Student, 
  goal,
  isLoading = false
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: Record<string, string> = {};
    
    formData.forEach((value, key) => {
      data[key] = value as string;
    });
    
    onSubmit(data);
  };

  const fields = getDemographicsFieldsByRole(role);
  const question = getDemographicsQuestion(role);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-6">
        <h3 className="font-medium text-lg">{question}</h3>
        {goal && (
          <p className="text-sm text-muted-foreground mt-1">
            You're preparing for: <span className="font-medium">{goal}</span>
          </p>
        )}
      </div>

      {fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id}>{field.label}</Label>
          <Input
            id={field.id}
            name={field.id}
            placeholder={field.placeholder}
            type={field.type || "text"}
            required={field.required}
          />
        </div>
      ))}

      <Button type="submit" disabled={isLoading} className="w-full mt-6">
        {isLoading ? "Processing..." : "Next"}
      </Button>
    </form>
  );
};

// Helper function to get fields based on user role
function getDemographicsFieldsByRole(role: UserRole): {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}[] {
  switch (role) {
    case UserRole.Student:
      return [
        {
          id: "age",
          label: "Age",
          placeholder: "Enter your age",
          type: "number",
          required: true,
        },
        {
          id: "grade",
          label: "Class/Grade",
          placeholder: "e.g., 11th, 12th, Undergraduate",
          required: true,
        },
        {
          id: "location",
          label: "City",
          placeholder: "Where do you live?",
        },
        {
          id: "institute",
          label: "School/College",
          placeholder: "Name of your educational institution",
        },
      ];
    case UserRole.Employee:
      return [
        {
          id: "jobTitle",
          label: "Job Title",
          placeholder: "Your current position",
          required: true,
        },
        {
          id: "experience",
          label: "Years of Experience",
          placeholder: "e.g., 2 years",
          required: true,
        },
        {
          id: "industry",
          label: "Industry",
          placeholder: "e.g., Technology, Healthcare",
        },
      ];
    case UserRole.Doctor:
      return [
        {
          id: "specialization",
          label: "Medical Specialization",
          placeholder: "Your medical specialization",
          required: true,
        },
        {
          id: "institution",
          label: "Hospital/Clinic",
          placeholder: "Where do you practice",
        },
        {
          id: "researchTopic",
          label: "Research Interest (if any)",
          placeholder: "Your area of research interest",
        },
      ];
    case UserRole.Founder:
      return [
        {
          id: "startupStage",
          label: "Startup Stage",
          placeholder: "e.g., Idea, Pre-seed, Seed",
          required: true,
        },
        {
          id: "industry",
          label: "Industry",
          placeholder: "Your startup's industry",
          required: true,
        },
        {
          id: "teamSize",
          label: "Team Size",
          placeholder: "Number of team members",
          type: "number",
        },
        {
          id: "startupGoal",
          label: "Primary Goal",
          placeholder: "e.g., Funding, Product Development",
        },
      ];
    default:
      return [
        {
          id: "background",
          label: "Background",
          placeholder: "Tell us about yourself",
          required: true,
        },
        {
          id: "interests",
          label: "Interests",
          placeholder: "Your key interests",
        },
      ];
  }
}

export default DemographicsForm;
