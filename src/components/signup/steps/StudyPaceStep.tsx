
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Zap, Clock, Calendar } from "lucide-react";

interface StudyPaceStepProps {
  onStudyPaceSelect: (pace: string) => void;
}

const paceOptions = [
  {
    id: "intensive",
    title: "Intensive",
    description: "Cover more material in less time, high intensity",
    icon: Zap,
  },
  {
    id: "balanced",
    title: "Balanced",
    description: "Steady pace with regular breaks, moderate intensity",
    icon: Clock,
  },
  {
    id: "relaxed",
    title: "Relaxed",
    description: "Take your time, focus on deep understanding with less pressure",
    icon: Calendar,
  },
];

const StudyPaceStep: React.FC<StudyPaceStepProps> = ({ onStudyPaceSelect }) => {
  const [selectedPace, setSelectedPace] = useState<string | null>(null);
  
  const handlePaceSelect = (pace: string) => {
    setSelectedPace(pace);
  };
  
  const handleSubmit = () => {
    if (selectedPace) {
      onStudyPaceSelect(selectedPace);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">What study pace works best for you?</h2>
        <p className="text-gray-500">
          We'll adjust your study schedule based on your preferred pace.
        </p>
      </div>
      
      <div className="grid gap-4">
        {paceOptions.map((pace) => (
          <Card
            key={pace.id}
            className={`border p-4 cursor-pointer transition-all ${
              selectedPace === pace.id
                ? "border-primary bg-primary/5"
                : "hover:border-primary/50"
            }`}
            onClick={() => handlePaceSelect(pace.id)}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                selectedPace === pace.id ? "bg-primary text-white" : "bg-muted"
              }`}>
                <pace.icon className="h-5 w-5" />
              </div>
              
              <div className="flex-grow">
                <h3 className="font-medium">{pace.title}</h3>
                <p className="text-sm text-muted-foreground">{pace.description}</p>
              </div>
              
              {selectedPace === pace.id && (
                <Check className="h-5 w-5 text-primary" />
              )}
            </div>
          </Card>
        ))}
      </div>
      
      <Button 
        onClick={handleSubmit} 
        className="w-full mt-4"
        disabled={!selectedPace}
      >
        Continue
      </Button>
    </div>
  );
};

export default StudyPaceStep;
