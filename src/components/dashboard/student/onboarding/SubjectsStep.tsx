
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Circle, Target, Zap, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubjectsStepProps {
  examType?: string;
  strongSubjects: string[];
  mediumSubjects?: string[]; // Make this optional to maintain compatibility
  weakSubjects: string[];
  handleToggleSubject: (subject: string, type: 'strong' | 'medium' | 'weak') => void;
}

export default function SubjectsStep({ 
  examType, 
  strongSubjects, 
  mediumSubjects = [], // Default to empty array if not provided
  weakSubjects, 
  handleToggleSubject 
}: SubjectsStepProps) {
  
  // Define subjects based on exam type
  let subjects: string[] = [];
  
  switch (examType?.toLowerCase()) {
    case 'neet':
      subjects = ["Physics", "Chemistry", "Biology", "Botany", "Zoology"];
      break;
    case 'jee main':
    case 'jee advanced':
      subjects = ["Physics", "Chemistry", "Mathematics"];
      break;
    case 'upsc':
      subjects = ["General Studies", "Indian Polity", "Geography", "History", "Economics", "Science & Technology"];
      break;
    default:
      subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "General Knowledge"];
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <Target className="text-blue-500" size={20} />
          Subject Strengths & Weaknesses
        </h3>
        <p className="text-muted-foreground mb-6">Identify your strong and weak subjects for personalized study focus</p>
        
        <div className="grid grid-cols-1 gap-4">
          {subjects.map(subject => (
            <div key={subject} className="border rounded-lg p-4 flex justify-between items-center">
              <span className="font-medium">{subject}</span>
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={strongSubjects.includes(subject) ? "default" : "outline"}
                  className={cn(
                    "h-8",
                    strongSubjects.includes(subject) ? "bg-green-600 hover:bg-green-700" : ""
                  )}
                  onClick={() => handleToggleSubject(subject, 'strong')}
                >
                  <Zap size={14} className="mr-1" />
                  Strong
                </Button>
                
                {mediumSubjects !== undefined && (
                  <Button
                    type="button"
                    size="sm"
                    variant={mediumSubjects.includes(subject) ? "default" : "outline"}
                    className={cn(
                      "h-8",
                      mediumSubjects.includes(subject) ? "bg-blue-600 hover:bg-blue-700" : ""
                    )}
                    onClick={() => handleToggleSubject(subject, 'medium')}
                  >
                    <Circle size={14} className="mr-1" />
                    Medium
                  </Button>
                )}
                
                <Button
                  type="button"
                  size="sm"
                  variant={weakSubjects.includes(subject) ? "default" : "outline"}
                  className={cn(
                    "h-8",
                    weakSubjects.includes(subject) ? "bg-amber-600 hover:bg-amber-700" : ""
                  )}
                  onClick={() => handleToggleSubject(subject, 'weak')}
                >
                  <AlertCircle size={14} className="mr-1" />
                  Weak
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex gap-4 flex-wrap">
          {strongSubjects.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Strong subjects:</p>
              <div className="flex gap-2 flex-wrap">
                {strongSubjects.map(subject => (
                  <Badge key={`strong-${subject}`} variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {mediumSubjects && mediumSubjects.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Medium subjects:</p>
              <div className="flex gap-2 flex-wrap">
                {mediumSubjects.map(subject => (
                  <Badge key={`medium-${subject}`} variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {weakSubjects.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Weak subjects:</p>
              <div className="flex gap-2 flex-wrap">
                {weakSubjects.map(subject => (
                  <Badge key={`weak-${subject}`} variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
