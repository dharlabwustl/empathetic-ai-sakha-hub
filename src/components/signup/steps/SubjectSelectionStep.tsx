
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSubjectsForGoal } from "@/components/dashboard/student/onboarding/SubjectData";

interface SubjectSelectionStepProps {
  examGoal: string;
  onSubmit: (subjects: string) => void;
  isLoading: boolean;
}

const SubjectSelectionStep: React.FC<SubjectSelectionStepProps> = ({
  examGoal,
  onSubmit,
  isLoading
}) => {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [customSubject, setCustomSubject] = useState("");
  const suggestedSubjects = getSubjectsForGoal(examGoal);

  useEffect(() => {
    // Pre-select the first 2 subjects (if available)
    if (suggestedSubjects.length > 0 && selectedSubjects.length === 0) {
      setSelectedSubjects(suggestedSubjects.slice(0, Math.min(2, suggestedSubjects.length)));
    }
  }, [suggestedSubjects]);

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const addCustomSubject = () => {
    if (customSubject.trim() && !selectedSubjects.includes(customSubject.trim())) {
      setSelectedSubjects((prev) => [...prev, customSubject.trim()]);
      setCustomSubject("");
    }
  };

  const handleSubmit = () => {
    if (selectedSubjects.length > 0) {
      onSubmit(selectedSubjects.join(", "));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-1">Select Your Subjects</h3>
        <p className="text-sm text-muted-foreground">
          Select the subjects you want to focus on for {examGoal}
        </p>
      </div>

      <div className="space-y-3">
        {suggestedSubjects.map((subject) => (
          <div key={subject} className="flex items-center space-x-2">
            <Checkbox
              id={`subject-${subject}`}
              checked={selectedSubjects.includes(subject)}
              onCheckedChange={() => toggleSubject(subject)}
            />
            <Label
              htmlFor={`subject-${subject}`}
              className="font-medium cursor-pointer"
            >
              {subject}
            </Label>
          </div>
        ))}

        <div className="pt-2 border-t">
          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <Label htmlFor="custom-subject" className="text-sm mb-1 block">
                Add Custom Subject
              </Label>
              <Input
                id="custom-subject"
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                placeholder="Enter a subject"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={addCustomSubject}
              disabled={!customSubject.trim()}
            >
              Add
            </Button>
          </div>
        </div>

        {selectedSubjects.length > 0 && (
          <div className="pt-4">
            <Label className="text-sm mb-1 block">Selected Subjects</Label>
            <div className="flex flex-wrap gap-1">
              {selectedSubjects.map((subject) => (
                <div
                  key={subject}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs flex items-center"
                >
                  {subject}
                  <button
                    type="button"
                    onClick={() => toggleSubject(subject)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full"
        disabled={isLoading || selectedSubjects.length === 0}
      >
        {isLoading ? "Submitting..." : "Continue"}
      </Button>
    </div>
  );
};

export default SubjectSelectionStep;
