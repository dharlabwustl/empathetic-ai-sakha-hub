
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  BookOpen, 
  Atom, 
  Calculator, 
  Dna, 
  Globe, 
  History, 
  Languages, 
  Book 
} from "lucide-react";
import { getSubjectsForGoal } from "@/components/dashboard/student/onboarding/SubjectData";
import { motion } from "framer-motion";

interface SubjectSelectionStepProps {
  examGoal: string;
  onSubmit: (subjects: string) => void;
  isLoading: boolean;
}

interface SubjectCardProps {
  subject: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onToggle: () => void;
  color: string;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ 
  subject, 
  icon, 
  isSelected, 
  onToggle, 
  color 
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Card 
      className={`p-3 cursor-pointer ${isSelected ? `ring-2 ring-${color}-500 bg-${color}-50 dark:bg-${color}-900/20` : ''}`}
      onClick={onToggle}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full bg-${color}-100 dark:bg-${color}-900/30`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="font-medium">{subject}</div>
        </div>
        <Checkbox 
          checked={isSelected}
          onCheckedChange={onToggle}
        />
      </div>
    </Card>
  </motion.div>
);

const SubjectSelectionStep: React.FC<SubjectSelectionStepProps> = ({
  examGoal,
  onSubmit,
  isLoading
}) => {
  const availableSubjects = getSubjectsForGoal(examGoal);
  
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  
  const handleToggle = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject) 
        : [...prev, subject]
    );
  };

  const handleSubmit = () => {
    onSubmit(selectedSubjects.join(','));
  };
  
  // Helper function to get icon for a subject
  const getSubjectIcon = (subject: string) => {
    switch(subject) {
      case "Physics":
        return <Atom className="h-5 w-5 text-blue-600" />;
      case "Chemistry":
        return <BookOpen className="h-5 w-5 text-purple-600" />;
      case "Mathematics":
        return <Calculator className="h-5 w-5 text-emerald-600" />;
      case "Biology":
        return <Dna className="h-5 w-5 text-green-600" />;
      case "Geography":
        return <Globe className="h-5 w-5 text-amber-600" />;
      case "History":
        return <History className="h-5 w-5 text-red-600" />;
      case "English":
        return <Languages className="h-5 w-5 text-sky-600" />;
      default:
        return <Book className="h-5 w-5 text-gray-600" />;
    }
  };
  
  // Helper function to get color for a subject
  const getSubjectColor = (subject: string) => {
    switch(subject) {
      case "Physics": return "blue";
      case "Chemistry": return "purple";
      case "Mathematics": return "emerald";
      case "Biology": return "green";
      case "Geography": return "amber";
      case "History": return "red";
      case "English": return "sky";
      default: return "gray";
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Select Your Preferred Subjects</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Choose the subjects you want to focus on for {examGoal}
      </p>
      
      <div className="grid grid-cols-1 gap-3">
        {availableSubjects.map(subject => (
          <SubjectCard
            key={subject}
            subject={subject}
            icon={getSubjectIcon(subject)}
            isSelected={selectedSubjects.includes(subject)}
            onToggle={() => handleToggle(subject)}
            color={getSubjectColor(subject)}
          />
        ))}
      </div>
      
      <div className="flex flex-col gap-2 mt-6">
        <Button 
          onClick={handleSubmit} 
          disabled={selectedSubjects.length === 0 || isLoading}
          className="w-full"
        >
          {isLoading ? "Processing..." : "Continue"}
        </Button>
        
        {selectedSubjects.length === 0 && (
          <p className="text-xs text-red-500 text-center">
            Please select at least one subject
          </p>
        )}
      </div>
    </div>
  );
};

export default SubjectSelectionStep;
