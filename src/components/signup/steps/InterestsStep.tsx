
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { getSubjectsForGoal } from "@/components/dashboard/student/onboarding/SubjectData";

interface InterestsStepProps {
  examGoal?: string;
  onSubmit: (interests: string) => void;
}

const InterestsStep: React.FC<InterestsStepProps> = ({ examGoal, onSubmit }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [customInterest, setCustomInterest] = useState("");
  const [suggestedSubjects, setSuggestedSubjects] = useState<string[]>([]);

  useEffect(() => {
    // Get suggested subjects based on the exam goal
    if (examGoal) {
      const subjects = getSubjectsForGoal(examGoal);
      setSuggestedSubjects(subjects);
    }
  }, [examGoal]);

  const handleAddCustomInterest = () => {
    if (customInterest.trim() && !selectedInterests.includes(customInterest.trim())) {
      setSelectedInterests(prev => [...prev, customInterest.trim()]);
      setCustomInterest("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustomInterest();
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setSelectedInterests(prev => prev.filter(item => item !== interest));
  };

  const toggleSubject = (subject: string) => {
    if (selectedInterests.includes(subject)) {
      handleRemoveInterest(subject);
    } else {
      setSelectedInterests(prev => [...prev, subject]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(selectedInterests.join(", "));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Select Your Preferred Subjects</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {examGoal ? `Based on your goal for ${examGoal}, we recommend these subjects:` : 'Choose subjects you want to focus on:'}
        </p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {suggestedSubjects.map(subject => (
            <div key={subject} className="flex items-center space-x-2">
              <Checkbox 
                id={`subject-${subject}`}
                checked={selectedInterests.includes(subject)}
                onCheckedChange={() => toggleSubject(subject)}
              />
              <label 
                htmlFor={`subject-${subject}`}
                className="text-sm cursor-pointer"
              >
                {subject}
              </label>
            </div>
          ))}
        </div>

        <h4 className="text-sm font-medium mb-2 mt-4">Or add your own interests:</h4>
        <div className="flex gap-2">
          <Input
            value={customInterest}
            onChange={(e) => setCustomInterest(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter an interest and press Enter"
          />
          <Button 
            type="button" 
            onClick={handleAddCustomInterest} 
            variant="outline"
          >
            Add
          </Button>
        </div>
      </div>

      {selectedInterests.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Selected interests:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedInterests.map((interest) => (
              <Badge 
                key={interest} 
                variant="secondary"
                className="flex items-center gap-1"
              >
                {interest}
                <button
                  type="button"
                  className="ml-1 h-4 w-4 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 inline-flex items-center justify-center"
                  onClick={() => handleRemoveInterest(interest)}
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-700"
        disabled={selectedInterests.length === 0}
      >
        Next
      </Button>
    </form>
  );
};

export default InterestsStep;
