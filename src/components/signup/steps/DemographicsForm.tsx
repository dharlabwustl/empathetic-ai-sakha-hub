
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRole } from "@/types/user/base";

interface DemographicsFormProps {
  role: UserRole;
  goal: string;
  onSubmit: (data: Record<string, string>) => void;
  isLoading?: boolean;
}

const DemographicsForm: React.FC<DemographicsFormProps> = ({ 
  role, 
  goal, 
  onSubmit, 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    name: "",
    age: "",
    location: "",
  });

  // Determine additional fields based on role and goal
  const getAdditionalFields = () => {
    switch(role) {
      case "student":
        return [
          { id: "school", label: "School/College Name", type: "text" },
          { id: "grade", label: "Grade/Year", type: "text" },
        ];
      case "employee":
        return [
          { id: "company", label: "Company Name", type: "text" },
          { id: "designation", label: "Designation", type: "text" },
        ];
      case "doctor":
        return [
          { id: "specialization", label: "Specialization", type: "text" },
          { id: "experience", label: "Years of Experience", type: "number" },
        ];
      case "founder":
        return [
          { id: "company", label: "Company/Startup Name", type: "text" },
          { id: "industry", label: "Industry", type: "text" },
        ];
      default:
        return [];
    }
  };

  const additionalFields = getAdditionalFields();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input 
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="age">Age</Label>
        <Input 
          id="age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="location">Location</Label>
        <Input 
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      
      {additionalFields.map((field) => (
        <div key={field.id}>
          <Label htmlFor={field.id}>{field.label}</Label>
          <Input 
            id={field.id}
            name={field.id}
            type={field.type}
            value={formData[field.id] || ""}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      
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

export default DemographicsForm;
