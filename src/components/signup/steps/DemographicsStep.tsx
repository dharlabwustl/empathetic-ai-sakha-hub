
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";

interface DemographicsStepProps {
  onSubmit: (data: Record<string, string>) => void;
}

const DemographicsStep: React.FC<DemographicsStepProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const [formValues, setFormValues] = useState({
    age: "",
    gender: "",
    education: "",
    examDate: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formValues.age || !formValues.gender || !formValues.education || !formValues.examDate) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required to proceed.",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit(formValues);
  };

  // Get minimum date (today)
  const today = new Date();
  const minDate = today.toISOString().split('T')[0];
  
  // Get maximum date (3 years from now)
  const maxDate = new Date(today.getFullYear() + 3, today.getMonth(), today.getDate()).toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input 
          id="age"
          name="age"
          value={formValues.age}
          onChange={handleInputChange}
          placeholder="Your age"
          type="number"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Select 
          value={formValues.gender} 
          onValueChange={(value) => handleSelectChange("gender", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
            <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="education">Current Education</Label>
        <Select 
          value={formValues.education} 
          onValueChange={(value) => handleSelectChange("education", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your current education" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high_school">High School</SelectItem>
            <SelectItem value="undergraduate">Undergraduate</SelectItem>
            <SelectItem value="graduate">Graduate</SelectItem>
            <SelectItem value="postgraduate">Postgraduate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="examDate" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Target Exam Date
        </Label>
        <Input 
          id="examDate"
          name="examDate"
          value={formValues.examDate}
          onChange={handleInputChange}
          type="date"
          min={minDate}
          max={maxDate}
        />
      </div>

      <Button type="submit" className="w-full">Continue</Button>
    </form>
  );
};

export default DemographicsStep;
