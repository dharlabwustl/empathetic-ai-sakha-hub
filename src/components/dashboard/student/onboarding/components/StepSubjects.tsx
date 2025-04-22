
import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

interface Subject {
  name: string;
  key: string;
  group?: string;
}

interface StepSubjectsProps {
  strongSubjects: Subject[];
  weakSubjects: Subject[];
  handleToggleSubject: (subject: Subject, type: 'strong' | 'weak') => void;
  examGoal: string;
}

const StepSubjects = ({ strongSubjects, weakSubjects, handleToggleSubject, examGoal }: StepSubjectsProps) => {
  // Get subjects based on exam goal
  const getSubjectsForExam = (): Subject[] => {
    const subjects: Subject[] = [];
    
    if (examGoal.toLowerCase().includes('jee')) {
      return [
        { name: "Physics", key: "physics" },
        { name: "Chemistry", key: "chemistry" },
        { name: "Mathematics", key: "mathematics" }
      ];
    } else if (examGoal.toLowerCase().includes('neet')) {
      return [
        { name: "Biology", key: "biology" },
        { name: "Physics", key: "physics" },
        { name: "Chemistry", key: "chemistry" }
      ];
    } else if (examGoal.toLowerCase().includes('upsc')) {
      return [
        { name: "General Studies", key: "general-studies" },
        { name: "Current Affairs", key: "current-affairs" },
        { name: "History", key: "history" },
        { name: "Geography", key: "geography" },
        { name: "Polity", key: "polity" },
        { name: "Economics", key: "economics" },
      ];
    } else if (examGoal.toLowerCase().includes('cat')) {
      return [
        { name: "Quantitative Ability", key: "quant" },
        { name: "Verbal Ability", key: "verbal" },
        { name: "Data Interpretation", key: "data" },
        { name: "Logical Reasoning", key: "logical" }
      ];
    } else {
      return [
        { name: "Mathematics", key: "mathematics" },
        { name: "Science", key: "science" },
        { name: "English", key: "english" },
        { name: "Social Studies", key: "social" }
      ];
    }
  };

  const subjects = getSubjectsForExam();

  const isStrong = (subject: Subject) => strongSubjects.some(s => s.key === subject.key);
  const isWeak = (subject: Subject) => weakSubjects.some(s => s.key === subject.key);

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
          <h3 className="text-xl font-semibold mb-2">Your Subjects</h3>
          <p className="text-muted-foreground mb-4">Select your strong and weak subjects to personalize your study plan</p>
          
          <div className="space-y-4">
            {subjects.map((subject) => (
              <div key={subject.key} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-lg">{subject.name}</h4>
                <div className="flex gap-2 mt-2">
                  <Button 
                    variant={isStrong(subject) ? "default" : "outline"}
                    size="sm"
                    className={isStrong(subject) ? "bg-green-600 hover:bg-green-700" : ""}
                    onClick={() => handleToggleSubject(subject, 'strong')}
                  >
                    <CheckCircle2 size={16} className="mr-1" />
                    Strong
                  </Button>
                  <Button 
                    variant={isWeak(subject) ? "default" : "outline"}
                    size="sm"
                    className={isWeak(subject) ? "bg-amber-600 hover:bg-amber-700" : ""}
                    onClick={() => handleToggleSubject(subject, 'weak')}
                  >
                    <XCircle size={16} className="mr-1" />
                    Needs Improvement
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {(strongSubjects.length === 0 && weakSubjects.length === 0) && (
            <div className="mt-4 bg-yellow-50 p-4 rounded-md">
              <p className="text-sm flex items-center gap-2">
                <AlertCircle size={16} className="text-yellow-500" />
                <span>Please select at least one subject to continue</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StepSubjects;
