
import React from "react";
import { TestType } from "./types";
import { cn } from "@/lib/utils";
import { Award, BookOpen, FileCheck } from "lucide-react";

interface ProgressIndicatorProps {
  progress: number;
  currentTest: TestType;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ progress, currentTest }) => {
  const steps = [
    { id: 'readiness', label: 'Readiness Score', icon: <Award className="h-4 w-4" /> },
    { id: 'concept', label: 'Concept Mastery', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'report', label: 'Final Report', icon: <FileCheck className="h-4 w-4" /> }
  ];
  
  return (
    <div className="mb-6">
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between space-x-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className="relative w-full mb-1">
                <div 
                  className={cn(
                    "h-1 rounded-full transition-all duration-500",
                    index === 0 ? "bg-gradient-to-r from-blue-500 to-violet-500" : 
                    index === 1 ? "bg-gradient-to-r from-violet-500 to-pink-500" :
                    "bg-gradient-to-r from-pink-500 to-red-500",
                    (index === 0 && progress === 0) ? "opacity-30" :
                    (index === 1 && progress < 66) ? "opacity-30" :
                    (index === 2 && progress < 100) ? "opacity-30" : "opacity-100"
                  )}
                  style={{ width: '100%' }}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full transition-all",
                  currentTest === step.id || 
                  (currentTest === 'intro' && step.id === 'readiness') ||
                  (currentTest === 'report' && step.id === 'report') ?
                  "bg-gradient-to-br from-blue-500 via-violet-500 to-purple-600 text-white" :
                  "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                )}>
                  {step.icon}
                </div>
                <span className={cn(
                  "text-xs font-medium hidden sm:inline-block",
                  currentTest === step.id ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"
                )}>
                  {step.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
