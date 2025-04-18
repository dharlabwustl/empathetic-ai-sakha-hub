
import React from 'react';
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

      <div className="space-y-6">
        {availableSubjects.map((subject, idx) => (
          <div key={idx} className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">{subject.name}</h3>
              <div className="flex flex-wrap gap-2">
                {subject.topics.map((topic, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Simplified proficiency selection UI - Single row with visual proficiency scale */}
            <div className="flex items-center gap-1 mt-3">
              <div className="flex flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {/* Weak option */}
                <div 
                  onClick={() => handleSubjectSelect(subject.name, 'weak')}
                  className={`flex-1 flex items-center justify-center rounded-lg py-2 cursor-pointer transition-all
                    ${isProficiencySelected(subject.name, 'weak') 
                      ? 'bg-red-500 text-white shadow-sm' 
                      : 'hover:bg-red-100 dark:hover:bg-red-900/20'}`}
                >
                  <div className="flex flex-col items-center">
                    {isProficiencySelected(subject.name, 'weak') && (
                      <Check className="h-4 w-4 mb-1" />
                    )}
                    <span className="font-medium">Weak</span>
                  </div>
                </div>
                
                {/* Moderate option */}
                <div 
                  onClick={() => handleSubjectSelect(subject.name, 'moderate')}
                  className={`flex-1 flex items-center justify-center rounded-lg py-2 cursor-pointer transition-all mx-1
                    ${isProficiencySelected(subject.name, 'moderate') 
                      ? 'bg-yellow-500 text-white shadow-sm' 
                      : 'hover:bg-yellow-100 dark:hover:bg-yellow-900/20'}`}
                >
                  <div className="flex flex-col items-center">
                    {isProficiencySelected(subject.name, 'moderate') && (
                      <Check className="h-4 w-4 mb-1" />
                    )}
                    <span className="font-medium">Moderate</span>
                  </div>
                </div>
                
                {/* Strong option */}
                <div 
                  onClick={() => handleSubjectSelect(subject.name, 'strong')}
                  className={`flex-1 flex items-center justify-center rounded-lg py-2 cursor-pointer transition-all
                    ${isProficiencySelected(subject.name, 'strong') 
                      ? 'bg-green-500 text-white shadow-sm' 
                      : 'hover:bg-green-100 dark:hover:bg-green-900/20'}`}
                >
                  <div className="flex flex-col items-center">
                    {isProficiencySelected(subject.name, 'strong') && (
                      <Check className="h-4 w-4 mb-1" />
                    )}
                    <span className="font-medium">Strong</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectsStep;
