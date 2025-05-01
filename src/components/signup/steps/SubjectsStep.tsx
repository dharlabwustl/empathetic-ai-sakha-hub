
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, AlertTriangle } from "lucide-react";

interface SubjectsStepProps {
  examType?: string;
  onSubjectsSelect: (strongSubjects: string[], weakSubjects: string[]) => void;
}

const SubjectsStep: React.FC<SubjectsStepProps> = ({ examType, onSubjectsSelect }) => {
  const [strongSubjects, setStrongSubjects] = useState<string[]>([]);
  const [weakSubjects, setWeakSubjects] = useState<string[]>([]);
  
  // Subject lists for different exam types
  const getSubjectsForExam = () => {
    switch (examType) {
      case "IIT-JEE":
        return ["Physics", "Chemistry", "Mathematics"];
      case "NEET":
        return ["Physics", "Chemistry", "Biology"];
      case "UPSC":
        return ["General Studies", "History", "Geography", "Economics", "Polity"];
      case "GATE":
        return ["Engineering Mathematics", "General Aptitude", "Core Subject"];
      default:
        return ["Mathematics", "Science", "English", "Social Studies"];
    }
  };
  
  const subjects = getSubjectsForExam();
  
  const handleToggleStrong = (subject: string) => {
    if (strongSubjects.includes(subject)) {
      setStrongSubjects(strongSubjects.filter(s => s !== subject));
    } else {
      setStrongSubjects([...strongSubjects, subject]);
      setWeakSubjects(weakSubjects.filter(s => s !== subject));
    }
  };
  
  const handleToggleWeak = (subject: string) => {
    if (weakSubjects.includes(subject)) {
      setWeakSubjects(weakSubjects.filter(s => s !== subject));
    } else {
      setWeakSubjects([...weakSubjects, subject]);
      setStrongSubjects(strongSubjects.filter(s => s !== subject));
    }
  };
  
  const handleContinue = () => {
    onSubjectsSelect(strongSubjects, weakSubjects);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-center mb-2">Select your strong and weak subjects</h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        This helps us personalize your study plan
      </p>
      
      <div className="space-y-4">
        {subjects.map((subject) => (
          <div key={subject} className="p-4 bg-white border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">{subject}</h3>
              <div className="text-xs text-gray-500">
                {strongSubjects.includes(subject) ? "Strong" : 
                 weakSubjects.includes(subject) ? "Needs Improvement" : "Not selected"}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={() => handleToggleStrong(subject)}
                variant={strongSubjects.includes(subject) ? "default" : "outline"}
                className={`flex-1 ${strongSubjects.includes(subject) ? "bg-green-600 hover:bg-green-700" : ""}`}
              >
                <BadgeCheck className="w-4 h-4 mr-2" />
                Strong
              </Button>
              
              <Button
                type="button"
                onClick={() => handleToggleWeak(subject)}
                variant={weakSubjects.includes(subject) ? "default" : "outline"}
                className={`flex-1 ${weakSubjects.includes(subject) ? "bg-amber-600 hover:bg-amber-700" : ""}`}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Needs Work
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {(strongSubjects.length > 0 || weakSubjects.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-4"
        >
          <Button 
            onClick={handleContinue}
            className="w-full" 
            size="lg"
          >
            Continue <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default SubjectsStep;
