
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { AlertCircle, Calendar, Info, MapPin, School } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DemographicsStepProps {
  onSubmit: (data: Record<string, string>) => void;
}

const DemographicsStep: React.FC<DemographicsStepProps> = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState({
    age: "",
    educationLevel: "",
    city: "",
    examDate: "",
  });
  
  const [errors, setErrors] = useState({
    age: "",
    educationLevel: "",
    examDate: "",
  });
  
  const [activeTip, setActiveTip] = useState<string | null>(null);

  const calculateMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    
    // Validate age
    if (name === "age") {
      const ageNum = parseInt(value);
      if (isNaN(ageNum) || ageNum < 12 || ageNum > 100) {
        setErrors({ ...errors, age: "Age must be between 12-100" });
      } else {
        setErrors({ ...errors, age: "" });
      }
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormValues({ ...formValues, [name]: value });
    if (name === "educationLevel" && value === "") {
      setErrors({ ...errors, educationLevel: "Education level is required" });
    } else {
      setErrors({ ...errors, educationLevel: "" });
    }
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    
    if (name === "examDate") {
      if (!value) {
        setErrors({ ...errors, examDate: "Exam date is required" });
      } else {
        const selectedDate = new Date(value);
        const today = new Date();
        
        if (selectedDate < today) {
          setErrors({ ...errors, examDate: "Exam date must be in the future" });
        } else {
          setErrors({ ...errors, examDate: "" });
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {
      age: formValues.age ? (parseInt(formValues.age) < 12 || parseInt(formValues.age) > 100) ? "Age must be between 12-100" : "" : "Age is required",
      educationLevel: formValues.educationLevel ? "" : "Education level is required",
      examDate: formValues.examDate ? "" : "Exam date is required",
    };
    
    setErrors(newErrors);
    
    if (Object.values(newErrors).every(error => error === "")) {
      onSubmit(formValues);
    }
  };

  return (
    <TooltipProvider>
      <form onSubmit={handleSubmit} className="space-y-4">
        <motion.div 
          className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg border border-indigo-100 dark:border-indigo-800/30 mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Why we need this information</h3>
              <p className="text-xs text-indigo-600/70 dark:text-indigo-400/70 mt-1">
                Your demographics help us personalize your study plan and optimize your preparation strategy.
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <Label htmlFor="age">Age</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info 
                  className="h-4 w-4 text-gray-400 cursor-help hover:text-indigo-500 transition-colors" 
                  onMouseEnter={() => setActiveTip("age")}
                  onMouseLeave={() => setActiveTip(null)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <motion.p 
                  className="text-xs max-w-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Helps us adjust content complexity and recommend age-appropriate study strategies
                </motion.p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="relative">
            <Input 
              id="age" 
              name="age" 
              type="number" 
              placeholder="Enter your age" 
              min="12" 
              max="100"
              value={formValues.age} 
              onChange={handleInputChange}
              className={activeTip === "age" ? "border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-800/30" : ""}
            />
            {activeTip === "age" && (
              <motion.div 
                className="absolute right-0 top-full mt-1 text-xs text-indigo-600 dark:text-indigo-400 w-full text-right"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                We'll tailor content difficulty to your age group
              </motion.div>
            )}
          </div>
          {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
        </motion.div>
        
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <Label htmlFor="educationLevel">Education Level</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <School 
                  className="h-4 w-4 text-gray-400 cursor-help hover:text-indigo-500 transition-colors"
                  onMouseEnter={() => setActiveTip("education")}
                  onMouseLeave={() => setActiveTip(null)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">
                  Helps us align content with your educational background and foundation knowledge
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select 
            value={formValues.educationLevel} 
            onValueChange={(value) => handleSelectChange("educationLevel", value)}
          >
            <SelectTrigger 
              id="educationLevel" 
              className={activeTip === "education" ? "border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-800/30" : ""}
            >
              <SelectValue placeholder="Select your education level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="highSchool">High School (9-10th)</SelectItem>
              <SelectItem value="higherSecondary">Higher Secondary (11-12th)</SelectItem>
              <SelectItem value="undergraduate">Undergraduate</SelectItem>
              <SelectItem value="graduate">Graduate</SelectItem>
              <SelectItem value="postgraduate">Post Graduate</SelectItem>
            </SelectContent>
          </Select>
          {errors.educationLevel && <p className="text-sm text-red-500">{errors.educationLevel}</p>}
        </motion.div>
        
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <Label htmlFor="city">City (Optional)</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <MapPin 
                  className="h-4 w-4 text-gray-400 cursor-help hover:text-indigo-500 transition-colors"
                  onMouseEnter={() => setActiveTip("city")}
                  onMouseLeave={() => setActiveTip(null)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">
                  Helps us connect you with local study resources and nearby exam centers
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input 
            id="city" 
            name="city" 
            type="text" 
            placeholder="Enter your city" 
            value={formValues.city} 
            onChange={handleInputChange}
            className={activeTip === "city" ? "border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-800/30" : ""}
          />
        </motion.div>

        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <Label htmlFor="examDate">Exam Appearing Date</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Calendar 
                  className="h-4 w-4 text-gray-400 cursor-help hover:text-indigo-500 transition-colors"
                  onMouseEnter={() => setActiveTip("examDate")}
                  onMouseLeave={() => setActiveTip(null)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">
                  Helps us create a strategic study plan to ensure you're fully prepared by your exam date
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input 
            id="examDate" 
            name="examDate" 
            type="date" 
            min={calculateMinDate()} 
            value={formValues.examDate} 
            onChange={handleDateChange}
            className={activeTip === "examDate" ? "border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-800/30" : ""}
          />
          {errors.examDate && <p className="text-sm text-red-500">{errors.examDate}</p>}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">Continue</Button>
        </motion.div>
      </form>
    </TooltipProvider>
  );
};

export default DemographicsStep;
