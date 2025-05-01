
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Plus } from "lucide-react";

interface SubjectsStepProps {
  examType: string;
  onSubjectsSelect: (strongSubjects: string[], weakSubjects: string[]) => void;
}

const SubjectsStep: React.FC<SubjectsStepProps> = ({ examType, onSubjectsSelect }) => {
  const [strongSubjects, setStrongSubjects] = useState<string[]>([]);
  const [weakSubjects, setWeakSubjects] = useState<string[]>([]);
  const [subjectOptions, setSubjectOptions] = useState<string[]>([]);
  
  useEffect(() => {
    // Get subject options based on the exam type
    const options = getSubjectsForExam(examType);
    setSubjectOptions(options);
  }, [examType]);
  
  const toggleStrongSubject = (subject: string) => {
    // Remove from weak subjects if present
    if (weakSubjects.includes(subject)) {
      setWeakSubjects(weakSubjects.filter(s => s !== subject));
    }
    
    // Toggle in strong subjects
    if (strongSubjects.includes(subject)) {
      setStrongSubjects(strongSubjects.filter(s => s !== subject));
    } else {
      setStrongSubjects([...strongSubjects, subject]);
    }
  };
  
  const toggleWeakSubject = (subject: string) => {
    // Remove from strong subjects if present
    if (strongSubjects.includes(subject)) {
      setStrongSubjects(strongSubjects.filter(s => s !== subject));
    }
    
    // Toggle in weak subjects
    if (weakSubjects.includes(subject)) {
      setWeakSubjects(weakSubjects.filter(s => s !== subject));
    } else {
      setWeakSubjects([...weakSubjects, subject]);
    }
  };
  
  const handleSubmit = () => {
    onSubjectsSelect(strongSubjects, weakSubjects);
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">Select Your Subjects</h2>
        <p className="text-gray-500">
          Identify your strong and weak subjects for a customized study plan.
        </p>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-lg mb-2">Subjects for {examType}</h3>
          <div className="flex flex-wrap gap-2">
            {subjectOptions.map(subject => (
              <Badge 
                key={subject}
                variant={strongSubjects.includes(subject) ? "default" : weakSubjects.includes(subject) ? "destructive" : "outline"} 
                className="cursor-pointer px-3 py-1 text-sm"
                onClick={() => {
                  if (!strongSubjects.includes(subject) && !weakSubjects.includes(subject)) {
                    // First click, add to strong subjects
                    toggleStrongSubject(subject);
                  } else if (strongSubjects.includes(subject)) {
                    // Second click, move to weak subjects
                    toggleWeakSubject(subject);
                  } else {
                    // Third click, remove completely
                    toggleWeakSubject(subject);
                  }
                }}
              >
                {subject}
                {strongSubjects.includes(subject) && (
                  <span className="ml-1 text-xs">💪</span>
                )}
                {weakSubjects.includes(subject) && (
                  <span className="ml-1 text-xs">📚</span>
                )}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-4 mt-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Badge variant="default" className="w-3 h-3 p-0"></Badge>
              <span>Strong subjects</span>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="destructive" className="w-3 h-3 p-0"></Badge>
              <span>Weak subjects</span>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="outline" className="w-3 h-3 p-0"></Badge>
              <span>Not selected</span>
            </div>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={handleSubmit} 
        className="w-full mt-4"
        disabled={strongSubjects.length === 0 && weakSubjects.length === 0}
      >
        Continue
      </Button>
    </div>
  );
};

// Helper function to get subjects based on exam type
function getSubjectsForExam(examType: string): string[] {
  switch (examType.toLowerCase()) {
    case 'iit-jee':
      return ['Physics', 'Chemistry', 'Mathematics', 'Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Mechanics', 'Electromagnetism', 'Modern Physics', 'Calculus', 'Algebra', 'Coordinate Geometry'];
    case 'neet':
      return ['Physics', 'Chemistry', 'Biology', 'Zoology', 'Botany', 'Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry', 'Human Physiology', 'Plant Physiology', 'Genetics', 'Cell Biology'];
    case 'upsc':
      return ['General Studies', 'Indian Polity', 'Geography', 'History', 'Economics', 'Environment', 'Science & Technology', 'Current Affairs', 'Ethics', 'International Relations'];
    default:
      return ['Mathematics', 'Science', 'English', 'Social Studies', 'Computer Science', 'General Knowledge'];
  }
}

export default SubjectsStep;
