
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { NewStudyPlanSubject } from "@/types/user/studyPlan";

interface SubjectsStepProps {
  subjects: NewStudyPlanSubject[];
  setSubjects: (subjects: NewStudyPlanSubject[]) => void;
  examType: string;
  // Support for the legacy code pattern with strongSubjects/weakSubjects as string arrays
  strongSubjects?: string[];
  weakSubjects?: string[];
  handleToggleSubject?: (subject: string, type: 'strong' | 'weak') => void;
}

const SubjectsStep: React.FC<SubjectsStepProps> = ({ 
  subjects, 
  setSubjects, 
  examType,
  strongSubjects = [],
  weakSubjects = [],
  handleToggleSubject
}) => {
  const getSubjectsForExam = (exam: string): {name: string, topics: string[]}[] => {
    // Default subjects for IIT-JEE
    const defaultSubjects = [
      { name: "Physics", topics: ["Mechanics", "Thermodynamics", "Electrostatics"] },
      { name: "Chemistry", topics: ["Organic", "Inorganic", "Physical"] },
      { name: "Mathematics", topics: ["Calculus", "Algebra", "Geometry"] },
    ];
    
    // Return subjects based on exam type
    switch (exam.toLowerCase()) {
      case 'neet':
        return [
          { name: "Biology", topics: ["Zoology", "Botany"] },
          { name: "Physics", topics: ["Mechanics", "Optics"] },
          { name: "Chemistry", topics: ["Organic", "Inorganic"] },
        ];
      case 'upsc':
        return [
          { name: "General Studies", topics: ["History", "Geography", "Polity"] },
          { name: "Current Affairs", topics: ["National", "International"] },
          { name: "Optional Subject", topics: ["Subject 1", "Subject 2"] },
        ];
      case 'cat':
        return [
          { name: "Quantitative Ability", topics: ["Algebra", "Arithmetic"] },
          { name: "Data Interpretation", topics: ["Charts", "Graphs"] },
          { name: "Verbal Ability", topics: ["Reading Comprehension", "Grammar"] },
          { name: "Logical Reasoning", topics: ["Syllogisms", "Puzzles"] },
        ];
      case 'bank po':
      case 'banking':
        return [
          { name: "English Language", topics: ["Grammar", "Comprehension"] },
          { name: "Quantitative Aptitude", topics: ["Arithmetic", "Data Interpretation"] },
          { name: "Reasoning", topics: ["Logical", "Verbal"] },
          { name: "General Awareness", topics: ["Banking", "Current Affairs"] },
        ];
      case 'gate':
        return [
          { name: "Engineering Mathematics", topics: ["Calculus", "Linear Algebra"] },
          { name: "Subject Specific", topics: ["Core Concepts", "Advanced Topics"] },
          { name: "General Aptitude", topics: ["Verbal", "Numerical"] },
        ];
      case 'clat':
        return [
          { name: "English", topics: ["Grammar", "Comprehension"] },
          { name: "Legal Reasoning", topics: ["Case Laws", "Legal Knowledge"] },
          { name: "Logical Reasoning", topics: ["Arguments", "Deductions"] },
          { name: "Current Affairs", topics: ["National", "International"] },
        ];
      default:
        // Search for partial matches in the exam type
        if (exam.toLowerCase().includes('iit') || exam.toLowerCase().includes('jee')) {
          return defaultSubjects;
        }
        return defaultSubjects;
    }
  };

  const availableSubjects = getSubjectsForExam(examType);

  const handleSubjectSelect = (subjectName: string, proficiency: 'weak' | 'moderate' | 'strong') => {
    // Support both API patterns
    if (handleToggleSubject && (proficiency === 'weak' || proficiency === 'strong')) {
      handleToggleSubject(subjectName, proficiency);
      return;
    }
    
    // Original implementation
    const existingIndex = subjects.findIndex(s => s.name === subjectName);
    
    if (existingIndex >= 0) {
      // Update existing subject
      const updatedSubjects = [...subjects];
      updatedSubjects[existingIndex] = { name: subjectName, proficiency };
      setSubjects(updatedSubjects);
    } else {
      // Add new subject
      setSubjects([...subjects, { name: subjectName, proficiency }]);
    }
  };

  const isProficiencySelected = (subjectName: string, proficiency: 'weak' | 'moderate' | 'strong') => {
    // Support for legacy code pattern
    if (proficiency === 'weak' && weakSubjects && weakSubjects.includes(subjectName)) {
      return true;
    }
    
    if (proficiency === 'strong' && strongSubjects && strongSubjects.includes(subjectName)) {
      return true;
    }
    
    // Original implementation
    const subject = subjects.find(s => s.name === subjectName);
    return subject && subject.proficiency === proficiency;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Select Your Subjects</h2>
        <p className="text-muted-foreground">
          Rate your proficiency in each subject so we can optimize your study plan
        </p>
      </div>

      <div className="space-y-8">
        {availableSubjects.map((subject, idx) => (
          <div key={idx} className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">{subject.name}</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {subject.topics.map((topic, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <RadioGroup className="flex gap-4">
              <div 
                className={`flex flex-col items-center space-y-1 border rounded-lg p-3 cursor-pointer ${
                  isProficiencySelected(subject.name, 'weak') ? 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800' : 'hover:bg-muted'
                }`} 
                onClick={() => handleSubjectSelect(subject.name, 'weak')}
              >
                <RadioGroupItem 
                  value={`${subject.name}-weak`} 
                  id={`${subject.name}-weak`} 
                  className="sr-only" 
                  checked={isProficiencySelected(subject.name, 'weak')} 
                />
                <div className="w-6 h-6 rounded-full bg-red-200 flex items-center justify-center">
                  {isProficiencySelected(subject.name, 'weak') && <Check className="h-3 w-3 text-red-700" />}
                </div>
                <Label htmlFor={`${subject.name}-weak`} className="text-sm font-medium">Weak</Label>
              </div>
              
              <div 
                className={`flex flex-col items-center space-y-1 border rounded-lg p-3 cursor-pointer ${
                  isProficiencySelected(subject.name, 'moderate') ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-800' : 'hover:bg-muted'
                }`} 
                onClick={() => handleSubjectSelect(subject.name, 'moderate')}
              >
                <RadioGroupItem 
                  value={`${subject.name}-moderate`} 
                  id={`${subject.name}-moderate`} 
                  className="sr-only" 
                  checked={isProficiencySelected(subject.name, 'moderate')} 
                />
                <div className="w-6 h-6 rounded-full bg-yellow-200 flex items-center justify-center">
                  {isProficiencySelected(subject.name, 'moderate') && <Check className="h-3 w-3 text-yellow-700" />}
                </div>
                <Label htmlFor={`${subject.name}-moderate`} className="text-sm font-medium">Moderate</Label>
              </div>
              
              <div 
                className={`flex flex-col items-center space-y-1 border rounded-lg p-3 cursor-pointer ${
                  isProficiencySelected(subject.name, 'strong') ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800' : 'hover:bg-muted'
                }`} 
                onClick={() => handleSubjectSelect(subject.name, 'strong')}
              >
                <RadioGroupItem 
                  value={`${subject.name}-strong`} 
                  id={`${subject.name}-strong`} 
                  className="sr-only" 
                  checked={isProficiencySelected(subject.name, 'strong')} 
                />
                <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center">
                  {isProficiencySelected(subject.name, 'strong') && <Check className="h-3 w-3 text-green-700" />}
                </div>
                <Label htmlFor={`${subject.name}-strong`} className="text-sm font-medium">Strong</Label>
              </div>
            </RadioGroup>
            
            {idx < availableSubjects.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectsStep;
