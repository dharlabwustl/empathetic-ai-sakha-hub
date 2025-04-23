
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, BookOpen, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Subject {
  name: string;
  key: string;
  group?: string;
}

interface StepSubjectsProps {
  strongSubjects: Subject[];
  weakSubjects: Subject[];
  handleToggleSubject: (subject: Subject, type: 'strong' | 'weak') => void;
  examGoal?: string;
}

const StepSubjects: React.FC<StepSubjectsProps> = ({ 
  strongSubjects,
  weakSubjects,
  handleToggleSubject,
  examGoal = "exam"
}) => {
  // Get all unique subjects from both arrays
  const allSubjects = [...new Map([
    ...strongSubjects.map(s => [s.key, s]),
    ...weakSubjects.map(s => [s.key, s])
  ].filter(Boolean)).values()];
  
  // Organize subjects by group if available
  const groupedSubjects: Record<string, Subject[]> = {};
  
  allSubjects.forEach(subject => {
    const group = subject.group || 'General';
    if (!groupedSubjects[group]) {
      groupedSubjects[group] = [];
    }
    groupedSubjects[group].push(subject);
  });

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <BookOpen className="text-purple-500" size={20} />
            Subject Proficiency
          </h3>
          <p className="text-muted-foreground mb-4">
            Select your strong and weak subjects for your {examGoal} preparation
          </p>
          
          {Object.keys(groupedSubjects).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(groupedSubjects).map(([group, subjects]) => (
                <div key={group} className="space-y-2">
                  {group !== 'General' && <h4 className="text-sm font-medium text-muted-foreground">{group}</h4>}
                  <div className="grid grid-cols-1 gap-2">
                    {subjects.map((subject) => (
                      <div key={subject.key} className="border rounded-lg p-3 bg-card">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{subject.name}</span>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className={cn(
                                "text-xs h-8 px-2",
                                strongSubjects.some(s => s.key === subject.key) && 
                                "bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800"
                              )}
                              onClick={() => handleToggleSubject(subject, 'strong')}
                            >
                              {strongSubjects.some(s => s.key === subject.key) && (
                                <Check className="mr-1 h-3 w-3" />
                              )}
                              Strong
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className={cn(
                                "text-xs h-8 px-2",
                                weakSubjects.some(s => s.key === subject.key) && 
                                "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:text-amber-800"
                              )}
                              onClick={() => handleToggleSubject(subject, 'weak')}
                            >
                              {weakSubjects.some(s => s.key === subject.key) && (
                                <Check className="mr-1 h-3 w-3" />
                              )}
                              Needs Work
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 border border-dashed rounded-lg">
              <p className="text-muted-foreground">No subjects available</p>
            </div>
          )}
          
          <div className="mt-4 bg-purple-50 p-4 rounded-md">
            <p className="text-sm flex items-center gap-2">
              <AlertCircle size={16} className="text-purple-500" />
              <span>Marking your weak subjects will help us allocate more practice time for them.</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StepSubjects;
