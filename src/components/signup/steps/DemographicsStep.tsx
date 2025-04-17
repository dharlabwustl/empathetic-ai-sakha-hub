import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { UserRole } from "../OnboardingContext";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

const indianCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", 
  "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Kanpur", "Nagpur", 
  "Indore", "Thane", "Bhopal", "Visakhapatnam", "Patna", "Vadodara"
];

const institutes = [
  "Delhi Public School", "Kendriya Vidyalaya", "Navodaya Vidyalaya", 
  "DAV Public School", "Ryan International School", "Army Public School",
  "IIT Delhi", "BITS Pilani", "NIT Warangal", "St. Stephen's College",
  "Miranda House", "Lady Shri Ram College", "AIIMS Delhi"
];

const grades = [
  "Class 9", "Class 10", "Class 11 (Science)", "Class 11 (Commerce)",
  "Class 11 (Arts)", "Class 12 (Science)", "Class 12 (Commerce)",
  "Class 12 (Arts)", "Bachelor's 1st Year", "Bachelor's 2nd Year",
  "Bachelor's 3rd Year", "Bachelor's 4th Year", "Master's 1st Year",
  "Master's 2nd Year", "PhD Scholar"
];

const sleepHours = [
  "4 hours", "5 hours", "6 hours", "7 hours", "8 hours", "9 hours", "10+ hours"
];

const studyHours = [
  "1-2 hours", "3-4 hours", "5-6 hours", "7-8 hours", "9+ hours"
];

const routines = [
  "Early morning study (4-7 AM)",
  "Morning study (8-12 PM)",
  "Afternoon study (12-4 PM)",
  "Evening study (4-8 PM)",
  "Night study (8-12 AM)",
  "Late night study (12-4 AM)",
  "Balanced throughout day",
  "Weekends focused",
  "Study before exams only"
];

interface DemographicsStepProps {
  role?: UserRole;
  onSubmit: (formData: Record<string, string>) => void;
}

const DemographicsStep: React.FC<DemographicsStepProps> = ({ role, onSubmit }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const form = useForm();
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (confirmPassword) {
      setPasswordMatch(confirmPassword === e.target.value);
    }
  };
  
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(password === e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password && !passwordMatch) {
      return; // Don't submit if passwords don't match
    }
    
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
            <Select name="age">
              <SelectTrigger>
                <SelectValue placeholder="Select your age" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 30 }, (_, i) => i + 10).map((age) => (
                  <SelectItem key={age} value={age.toString()}>
                    {age}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              value={password}
              onChange={handlePasswordChange}
              required 
            />
          </div>
          
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input 
              id="confirmPassword" 
              name="confirmPassword" 
              type="password" 
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required 
            />
            {!passwordMatch && confirmPassword && (
              <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="grade">Class/Grade</Label>
            <Select name="grade">
              <SelectTrigger>
                <SelectValue placeholder="Select your grade" />
              </SelectTrigger>
              <SelectContent>
                {grades.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="location">Location</Label>
            <Popover>
              <PopoverTrigger asChild>
                <ShadcnButton
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between"
                >
                  <input 
                    name="location"
                    className="border-none bg-transparent w-full focus:outline-none"
                    placeholder="Select or type your city"
                  />
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </ShadcnButton>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search city..." />
                  <CommandEmpty>No city found. Type to enter manually.</CommandEmpty>
                  <CommandGroup>
                    {indianCities.map((city) => (
                      <CommandItem
                        key={city}
                        value={city}
                        onSelect={(value) => {
                          const input = document.querySelector('input[name="location"]') as HTMLInputElement;
                          if (input) input.value = value;
                        }}
                      >
                        <Check
                          className="mr-2 h-4 w-4 opacity-0"
                        />
                        {city}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <Label htmlFor="institute">Institute (Optional)</Label>
            <Select name="institute">
              <SelectTrigger>
                <SelectValue placeholder="Select your institute" />
              </SelectTrigger>
              <SelectContent>
                {institutes.map((institute) => (
                  <SelectItem key={institute} value={institute}>
                    {institute}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="sleepPattern">Sleep Pattern</Label>
            <Select name="sleepPattern">
              <SelectTrigger>
                <SelectValue placeholder="Hours of sleep per day" />
              </SelectTrigger>
              <SelectContent>
                {sleepHours.map((hours) => (
                  <SelectItem key={hours} value={hours}>
                    {hours}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="dailyRoutine">Daily Routine</Label>
            <Select name="dailyRoutine">
              <SelectTrigger>
                <SelectValue placeholder="Select your study routine" />
              </SelectTrigger>
              <SelectContent>
                {routines.map((routine) => (
                  <SelectItem key={routine} value={routine}>
                    {routine}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="focusDuration">Focus Duration</Label>
            <Select name="focusDuration">
              <SelectTrigger>
                <SelectValue placeholder="Hours of focus per day" />
              </SelectTrigger>
              <SelectContent>
                {studyHours.map((hours) => (
                  <SelectItem key={hours} value={hours}>
                    {hours}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-700"
        disabled={password && !passwordMatch}
      >
        Next
      </Button>
    </form>
  );
};

export default DemographicsStep;
