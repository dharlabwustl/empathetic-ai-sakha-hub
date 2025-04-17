import React, { useState, useCallback } from "react";
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
import { UserRole } from "@/types/user/base";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

// Data arrays
const indianCities = [
  "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", 
  "Surat", "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", 
  "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara", "Ghaziabad", 
  "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli", 
  "Vasai-Virar", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", 
  "Navi Mumbai", "Allahabad", "Howrah", "Gwalior", "Jabalpur", "Coimbatore", 
  "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", "Guwahati", "Chandigarh", 
  "Solapur", "Hubballi–Dharwad", "Mysuru", "Tiruchirappalli", "Bareilly", "Aligarh", 
  "Tiruppur", "Moradabad", "Jalandhar", "Bhubaneswar", "Salem", "Warangal", "Guntur", 
  "Bhiwandi", "Saharanpur", "Gorakhpur", "Bikaner", "Amravati", "Noida", "Jamshedpur", 
  "Bhilai", "Cuttack", "Firozabad", "Kochi", "Nellore", "Bhavnagar", "Dehradun", 
  "Durgapur", "Asansol", "Rourkela", "Nanded", "Kolhapur", "Ajmer", "Akola", 
  "Gulbarga", "Jamnagar", "Ujjain", "Loni", "Siliguri", "Jhansi", "Ulhasnagar", 
  "Jammu", "Sangli", "Mangalore", "Erode", "Belgaum", "Kurnool", "Ambattur", 
  "Rajahmundry", "Tirunelveli", "Malegaon", "Gaya"
];

const institutes = [
  "Delhi Public School", "Kendriya Vidyalaya", "Navodaya Vidyalaya", 
  "DAV Public School", "Ryan International School", "Army Public School",
  "IIT Delhi", "BITS Pilani", "NIT Warangal", "St. Stephen's College",
  "Miranda House", "Lady Shri Ram College", "AIIMS Delhi",
  "Amity University", "Lovely Professional University", "Vellore Institute of Technology",
  "Manipal Institute of Technology", "SRM University", "Chandigarh University",
  "Allen Career Institute", "Aakash Institute", "FIITJEE", "Vidyamandir Classes",
  "Resonance", "Bansal Classes", "Vibrant Academy"
];

const grades = [
  "Class 9", "Class 10", "Class 11 (Science)", "Class 11 (Commerce)",
  "Class 11 (Arts)", "Class 12 (Science)", "Class 12 (Commerce)",
  "Class 12 (Arts)", "Bachelor's 1st Year", "Bachelor's 2nd Year",
  "Bachelor's 3rd Year", "Bachelor's 4th Year", "Master's 1st Year",
  "Master's 2nd Year", "PhD Scholar", "Post Graduate"
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
  goal?: string;
  onSubmit: (formData: Record<string, string>) => void;
}

const DemographicsStep: React.FC<DemographicsStepProps> = ({ role, goal, onSubmit }) => {
  const [selectedRoutines, setSelectedRoutines] = useState<string[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [customCity, setCustomCity] = useState<string>("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  
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

  const toggleRoutine = (routine: string) => {
    setSelectedRoutines(prev => 
      prev.includes(routine) 
        ? prev.filter(item => item !== routine) 
        : [...prev, routine]
    );
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

    // Add the selected routines as comma-separated values
    if (selectedRoutines.length > 0) {
      data.dailyRoutine = selectedRoutines.join(", ");
    }

    // If using custom city, add it to the data
    if (customCity && !data.location) {
      data.location = customCity;
    }
    
    // Add goal if it was previously selected
    if (goal) {
      data.examGoal = goal;
    }
    
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {role === "student" && (
        <>
          {goal && (
            <div className="mb-4 p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">Selected Goal: {goal}</p>
            </div>
          )}
          
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name" 
              placeholder="Enter your full name" 
              required 
            />
          </div>
          
          <div>
            <Label htmlFor="age">Age</Label>
            <Select name="age">
              <SelectTrigger className="bg-white dark:bg-gray-800">
                <SelectValue placeholder="Select your age" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800">
                {Array.from({ length: 30 }, (_, i) => i + 10).map((age) => (
                  <SelectItem key={age} value={age.toString()}>
                    {age}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="grade">Class/Grade</Label>
            <Select 
              name="grade" 
              onValueChange={(value) => setSelectedGrade(value)}
            >
              <SelectTrigger className="bg-white dark:bg-gray-800">
                <SelectValue placeholder="Select your grade" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800">
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
            <Select name="location" onValueChange={setCustomCity}>
              <SelectTrigger className="bg-white dark:bg-gray-800">
                <SelectValue placeholder="Select your city" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 max-h-60">
                {indianCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              className="mt-2"
              placeholder="Or type your city if not listed"
              value={customCity}
              onChange={(e) => setCustomCity(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="institute">Institute (Optional)</Label>
            <Select name="institute">
              <SelectTrigger className="bg-white dark:bg-gray-800">
                <SelectValue placeholder="Select your institute" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800">
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
              <SelectTrigger className="bg-white dark:bg-gray-800">
                <SelectValue placeholder="Hours of sleep per day" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800">
                {sleepHours.map((hours) => (
                  <SelectItem key={hours} value={hours}>
                    {hours}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="dailyRoutine">Daily Routine (Select multiple)</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {routines.map((routine) => (
                <div key={routine} className="flex items-start space-x-2">
                  <Checkbox 
                    id={`routine-${routine}`} 
                    checked={selectedRoutines.includes(routine)}
                    onCheckedChange={() => toggleRoutine(routine)}
                  />
                  <label 
                    htmlFor={`routine-${routine}`} 
                    className="text-sm leading-tight cursor-pointer"
                  >
                    {routine}
                  </label>
                </div>
              ))}
            </div>
            {selectedRoutines.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {selectedRoutines.map(routine => (
                  <Badge 
                    key={routine} 
                    variant="secondary" 
                    className="flex items-center gap-1"
                  >
                    {routine.length > 20 ? `${routine.substring(0, 20)}...` : routine}
                    <button
                      type="button" 
                      className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 h-4 w-4 inline-flex items-center justify-center text-xs"
                      onClick={() => toggleRoutine(routine)}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="focusDuration">Focus Duration</Label>
            <Select name="focusDuration">
              <SelectTrigger className="bg-white dark:bg-gray-800">
                <SelectValue placeholder="Hours of focus per day" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800">
                {studyHours.map((hours) => (
                  <SelectItem key={hours} value={hours}>
                    {hours}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Password fields moved to the end */}
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              placeholder="Create a password"
              value={password}
              onChange={handlePasswordChange}
              required 
            />
            <p className="text-xs text-muted-foreground">
              Password should be alphanumeric and at least 8 characters long
            </p>
          </div>
          
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input 
              id="confirmPassword" 
              name="confirmPassword" 
              type="password" 
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required 
            />
            {!passwordMatch && confirmPassword && (
              <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
            )}
          </div>
        </>
      )}
      
      {role === "employee" && (
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
      
      {role === "doctor" && (
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
      
      {role === "founder" && (
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
