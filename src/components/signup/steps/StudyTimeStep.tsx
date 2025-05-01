
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Sun, Coffee, Moon, Clock } from "lucide-react";

interface StudyTimeStepProps {
  onStudyTimeSelect: (time: string) => void;
}

const timeOptions = [
  {
    id: "early_morning",
    title: "Early Morning",
    description: "4 AM - 8 AM",
    icon: Sun,
    emojiTime: "🌅",
  },
  {
    id: "morning",
    title: "Morning",
    description: "8 AM - 12 PM",
    icon: Coffee,
    emojiTime: "☀️",
  },
  {
    id: "afternoon",
    title: "Afternoon",
    description: "12 PM - 5 PM",
    icon: Sun,
    emojiTime: "🌤️",
  },
  {
    id: "evening",
    title: "Evening",
    description: "5 PM - 9 PM",
    icon: Clock,
    emojiTime: "🌆",
  },
  {
    id: "night",
    title: "Night",
    description: "9 PM - 12 AM",
    icon: Moon,
    emojiTime: "🌙",
  },
  {
    id: "late_night",
    title: "Late Night",
    description: "12 AM - 4 AM",
    icon: Moon,
    emojiTime: "🌚",
  },
];

const StudyTimeStep: React.FC<StudyTimeStepProps> = ({ onStudyTimeSelect }) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleSubmit = () => {
    if (selectedTime) {
      onStudyTimeSelect(selectedTime);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">When do you prefer to study?</h2>
        <p className="text-gray-500">
          Select your most productive time of day for studying.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {timeOptions.map((time) => (
          <Card
            key={time.id}
            className={`border p-4 cursor-pointer transition-all ${
              selectedTime === time.id
                ? "border-primary bg-primary/5"
                : "hover:border-primary/50"
            }`}
            onClick={() => handleTimeSelect(time.id)}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                selectedTime === time.id ? "bg-primary text-white" : "bg-muted"
              }`}>
                {time.emojiTime}
              </div>
              
              <div className="flex-grow">
                <h3 className="font-medium">{time.title}</h3>
                <p className="text-sm text-muted-foreground">{time.description}</p>
              </div>
              
              {selectedTime === time.id && (
                <Check className="h-5 w-5 text-primary" />
              )}
            </div>
          </Card>
        ))}
      </div>
      
      <Button 
        onClick={handleSubmit} 
        className="w-full mt-4"
        disabled={!selectedTime}
      >
        Continue
      </Button>
    </div>
  );
};

export default StudyTimeStep;
