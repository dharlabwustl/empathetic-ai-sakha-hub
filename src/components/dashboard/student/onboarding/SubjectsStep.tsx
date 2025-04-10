
import React from "react";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Book, AlertCircle } from "lucide-react";

interface SubjectsStepProps {
  subjects: string[];
  strongSubjects: string[];
  weakSubjects: string[];
  handleToggleSubject: (subject: string, type: 'strong' | 'weak') => void;
}

export default function SubjectsStep({ subjects, strongSubjects, weakSubjects, handleToggleSubject }: SubjectsStepProps) {
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
            <Book className="text-violet-500" size={20} />
            Strong & Weak Subjects
          </h3>
          <p className="text-muted-foreground mb-4">Select your strengths and areas that need improvement.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2 text-green-600">Strong Subjects</h4>
              <div className="space-y-2">
                {subjects.map(subject => (
                  <div key={`strong-${subject}`} className="flex items-center">
                    <Checkbox
                      id={`strong-${subject}`}
                      checked={strongSubjects.includes(subject)}
                      onCheckedChange={() => handleToggleSubject(subject, 'strong')}
                      className="border-green-500 data-[state=checked]:bg-green-500"
                    />
                    <label 
                      htmlFor={`strong-${subject}`}
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {subject}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2 text-red-600">Weak Subjects</h4>
              <div className="space-y-2">
                {subjects.map(subject => (
                  <div key={`weak-${subject}`} className="flex items-center">
                    <Checkbox
                      id={`weak-${subject}`}
                      checked={weakSubjects.includes(subject)}
                      onCheckedChange={() => handleToggleSubject(subject, 'weak')}
                      className="border-red-500 data-[state=checked]:bg-red-500"
                    />
                    <label 
                      htmlFor={`weak-${subject}`}
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {subject}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 bg-violet-50 p-4 rounded-md">
            <p className="text-sm flex items-center gap-2">
              <AlertCircle size={16} className="text-violet-500" />
              <span>We'll customize your study plan based on your strengths and weaknesses.</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
