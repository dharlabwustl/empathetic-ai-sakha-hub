
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getSubjectsForGoal } from "@/components/dashboard/student/onboarding/SubjectData";

interface SubjectSelectionStepProps {
  examGoal: string;
  onSubmit: (subjects: string) => void;
  isLoading?: boolean;
}

const SubjectSelectionStep: React.FC<SubjectSelectionStepProps> = ({ 
  examGoal, 
  onSubmit, 
  isLoading = false 
}) => {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);

  // Load subjects based on exam goal
  useEffect(() => {
    const subjects = examGoal ? getSubjectsForGoal(examGoal) : [];
    setAvailableSubjects(subjects);
    
    // Pre-select some common subjects based on goal
    if (subjects.length > 0) {
      // Select first 3 subjects by default or all if less than 3
      const defaultSelection = subjects.slice(0, Math.min(3, subjects.length));
      setSelectedSubjects(defaultSelection);
    }
  }, [examGoal]);

  const handleToggleSubject = (subject: string) => {
    setSelectedSubjects(current => 
      current.includes(subject)
        ? current.filter(s => s !== subject)
        : [...current, subject]
    );
  };

  const handleSubmit = () => {
    onSubmit(selectedSubjects.join(", "));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-1">Select your preferred subjects</h3>
        <p className="text-sm text-muted-foreground">
          Choose subjects you want to focus on for your {examGoal} preparation
        </p>
      </div>
      
      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
        {availableSubjects.map((subject) => (
          <div key={subject} className="flex items-center space-x-3 p-2 border border-gray-100 rounded-md">
            <Checkbox 
              id={subject}
              checked={selectedSubjects.includes(subject)}
              onCheckedChange={() => handleToggleSubject(subject)}
            />
            <Label htmlFor={subject} className="cursor-pointer flex-1">{subject}</Label>
          </div>
        ))}
        
        {availableSubjects.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No subjects available for selected goal. Please select a different goal.
          </p>
        )}
      </div>
      
      <Button 
        onClick={handleSubmit} 
        className="w-full"
        disabled={isLoading || selectedSubjects.length === 0}
      >
        {isLoading ? "Processing..." : "Continue"}
      </Button>
      
      {selectedSubjects.length > 0 && (
        <div className="text-sm text-gray-500">
          Selected {selectedSubjects.length} subject(s)
        </div>
      )}
    </div>
  );
};

export default SubjectSelectionStep;
