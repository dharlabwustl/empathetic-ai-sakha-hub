
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Sunrise, 
  Sun, 
  Sunset, 
  Moon
} from "lucide-react";

interface StudyTimeStepProps {
  studyTime: string; 
  setStudyTime: (time: "Morning" | "Afternoon" | "Evening" | "Night") => void;
}

const StudyTimeStep: React.FC<StudyTimeStepProps> = ({ studyTime, setStudyTime }) => {
  const timeOptions = [
    {
      value: "Morning",
      label: "Morning",
      description: "Early hours, 6 AM - 11 AM",
      icon: <Sunrise className="h-6 w-6 text-amber-500" />
    },
    {
      value: "Afternoon",
      label: "Afternoon",
      description: "Midday hours, 12 PM - 4 PM",
      icon: <Sun className="h-6 w-6 text-orange-500" />
    },
    {
      value: "Evening",
      label: "Evening",
      description: "After sunset, 5 PM - 8 PM",
      icon: <Sunset className="h-6 w-6 text-indigo-500" />
    },
    {
      value: "Night",
      label: "Night",
      description: "Late hours, 9 PM - 12 AM",
      icon: <Moon className="h-6 w-6 text-blue-500" />
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">When do you prefer to study?</h2>
        <p className="text-muted-foreground">
          We'll optimize your study plan for your most productive hours
        </p>
      </div>

      <RadioGroup 
        value={studyTime} 
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onValueChange={value => setStudyTime(value as "Morning" | "Afternoon" | "Evening" | "Night")}
      >
        {timeOptions.map((option) => (
          <div key={option.value} className="relative">
            <RadioGroupItem
              value={option.value}
              id={option.value}
              className="peer sr-only"
            />
            <Label
              htmlFor={option.value}
              className="flex flex-col items-start space-y-3 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                {option.icon}
                <span className="font-medium">{option.label}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {option.description}
              </span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default StudyTimeStep;
