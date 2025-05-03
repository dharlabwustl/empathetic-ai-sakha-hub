
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, CalendarPlus } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useStudyPlanWizard } from './hooks/useStudyPlanWizard';
import { NewStudyPlan } from '@/types/user/studyPlan';

interface CreateStudyPlanWizardProps {
  open: boolean;
  onClose: () => void;
  examGoal: string;
  onCreatePlan: (plan: NewStudyPlan) => void;
}

// List of available exams
const availableExams = [
  "NEET", 
  "JEE Main", 
  "JEE Advanced", 
  "AIIMS", 
  "UPSC CSE", 
  "GATE", 
  "CAT", 
  "CLAT", 
  "NDA", 
  "SSC CGL"
];

const CreateStudyPlanWizard: React.FC<CreateStudyPlanWizardProps> = ({
  open,
  onClose,
  examGoal: initialExamGoal,
  onCreatePlan,
}) => {
  const {
    step,
    formData,
    setFormData,
    strongSubjects,
    weakSubjects,
    handleToggleSubject,
    handlePaceChange,
    handleStudyTimeChange,
    handleExamGoalSelect,
    handleNext,
    handleBack,
  } = useStudyPlanWizard({ 
    examGoal: initialExamGoal,
    onCreatePlan,
    onClose
  });

  // Date state for exam date
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Handler for exam date change
  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
    if (date) {
      setFormData(prev => ({
        ...prev,
        examDate: format(date, "yyyy-MM-dd")
      }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Study Plan</DialogTitle>
          <DialogDescription>
            Let's create a personalized study plan to help you succeed
          </DialogDescription>
        </DialogHeader>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {step === 1 && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="examGoal">Select Your Exam Goal</Label>
                  <Select
                    value={formData.examGoal || initialExamGoal}
                    onValueChange={handleExamGoalSelect}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an exam" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableExams.map((exam) => (
                        <SelectItem key={exam} value={exam}>
                          {exam}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="examDate">Exam Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Select exam date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={handleDateChange}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal">Study Plan Goal (Optional)</Label>
                  <Textarea
                    id="goal"
                    placeholder="E.g., Score 650+ in NEET, Focus on Physics and Chemistry, etc."
                    value={formData.goal || ''}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-4 py-4">
                <div>
                  <Label className="mb-2 block">Select your strong subjects</Label>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {getSubjectsForExam(formData.examGoal || initialExamGoal).map(subject => (
                      <Button
                        key={`strong-${subject}`}
                        type="button"
                        variant={strongSubjects.includes(subject) ? "default" : "outline"}
                        onClick={() => handleToggleSubject(subject, 'strong')}
                        className={strongSubjects.includes(subject) ? "bg-green-600 hover:bg-green-700 text-white" : ""}
                      >
                        {subject}
                      </Button>
                    ))}
                  </div>
                  <Label className="mb-2 block">Select your weak subjects</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {getSubjectsForExam(formData.examGoal || initialExamGoal).map(subject => (
                      <Button
                        key={`weak-${subject}`}
                        type="button"
                        variant={weakSubjects.includes(subject) ? "default" : "outline"}
                        onClick={() => handleToggleSubject(subject, 'weak')}
                        className={weakSubjects.includes(subject) ? "bg-red-600 hover:bg-red-700 text-white" : ""}
                      >
                        {subject}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Continue with existing steps */}
            {step === 3 && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label className="block mb-2">Select your preferred study time</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant={formData.preferredStudyTime === "morning" ? "default" : "outline"}
                      onClick={() => handleStudyTimeChange("Morning")}
                      className={formData.preferredStudyTime === "morning" ? "bg-blue-600 hover:bg-blue-700" : ""}
                    >
                      Morning
                    </Button>
                    <Button
                      type="button"
                      variant={formData.preferredStudyTime === "afternoon" ? "default" : "outline"}
                      onClick={() => handleStudyTimeChange("Afternoon")}
                      className={formData.preferredStudyTime === "afternoon" ? "bg-yellow-600 hover:bg-yellow-700" : ""}
                    >
                      Afternoon
                    </Button>
                    <Button
                      type="button"
                      variant={formData.preferredStudyTime === "evening" ? "default" : "outline"}
                      onClick={() => handleStudyTimeChange("Evening")}
                      className={formData.preferredStudyTime === "evening" ? "bg-orange-600 hover:bg-orange-700" : ""}
                    >
                      Evening
                    </Button>
                    <Button
                      type="button"
                      variant={formData.preferredStudyTime === "night" ? "default" : "outline"}
                      onClick={() => handleStudyTimeChange("Night")}
                      className={formData.preferredStudyTime === "night" ? "bg-indigo-600 hover:bg-indigo-700" : ""}
                    >
                      Night
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {step === 4 && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label className="block mb-2">Select your study pace</Label>
                  <div className="grid grid-cols-1 gap-2">
                    <Button
                      type="button"
                      variant={formData.learningPace === "fast" ? "default" : "outline"}
                      onClick={() => handlePaceChange("Aggressive")}
                      className={formData.learningPace === "fast" ? "bg-purple-600 hover:bg-purple-700" : ""}
                    >
                      Aggressive (8+ hours daily)
                    </Button>
                    <Button
                      type="button"
                      variant={formData.learningPace === "moderate" ? "default" : "outline"}
                      onClick={() => handlePaceChange("Balanced")}
                      className={formData.learningPace === "moderate" ? "bg-blue-600 hover:bg-blue-700" : ""}
                    >
                      Balanced (5-7 hours daily)
                    </Button>
                    <Button
                      type="button"
                      variant={formData.learningPace === "slow" ? "default" : "outline"}
                      onClick={() => handlePaceChange("Relaxed")}
                      className={formData.learningPace === "slow" ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      Relaxed (3-4 hours daily)
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="studyHoursPerDay">Daily study hours</Label>
                  <Input
                    id="studyHoursPerDay"
                    type="number"
                    min="1"
                    max="14"
                    value={formData.studyHoursPerDay}
                    onChange={(e) => setFormData({ ...formData, studyHoursPerDay: parseInt(e.target.value) || 0 })}
                    className="w-full"
                  />
                </div>
              </div>
            )}
            
            {step === 5 && (
              <div className="space-y-4 py-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">Your Study Plan Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Exam Goal:</span>
                      <span className="text-sm">{formData.examGoal}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Exam Date:</span>
                      <span className="text-sm">{date ? format(date, "PP") : "Not set"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Daily Study Hours:</span>
                      <span className="text-sm">{formData.studyHoursPerDay} hours</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Study Time:</span>
                      <span className="text-sm">{formData.preferredStudyTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Learning Pace:</span>
                      <span className="text-sm">{formData.learningPace}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Strong Subjects:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {strongSubjects.map(subject => (
                          <span key={subject} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Weak Subjects:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {weakSubjects.map(subject => (
                          <span key={subject} className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={handleBack}>
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          <Button onClick={handleNext}>
            {step < 5 ? "Next" : "Create Study Plan"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper function to get subjects based on exam
function getSubjectsForExam(examGoal: string): string[] {
  switch (examGoal) {
    case "NEET":
      return ["Physics", "Chemistry", "Biology", "Botany", "Zoology"];
    case "JEE Main":
    case "JEE Advanced":
      return ["Physics", "Chemistry", "Mathematics"];
    case "UPSC CSE":
      return ["General Studies", "History", "Geography", "Polity", "Economics", "Science & Tech"];
    case "GATE":
      return ["Engineering Mathematics", "General Aptitude", "Subject Specific"];
    case "CAT":
      return ["Quantitative Ability", "Verbal Ability", "Data Interpretation", "Logical Reasoning"];
    case "CLAT":
      return ["English", "Logical Reasoning", "Legal Reasoning", "General Knowledge", "Quantitative Techniques"];
    case "NDA":
      return ["Mathematics", "General Ability Test"];
    case "SSC CGL":
      return ["General Intelligence", "General Awareness", "Quantitative Aptitude", "English Comprehension"];
    case "AIIMS":
      return ["Physics", "Chemistry", "Biology", "General Knowledge", "Aptitude & Logical Thinking"];
    default:
      return ["Subject 1", "Subject 2", "Subject 3", "Subject 4"];
  }
}

export default CreateStudyPlanWizard;
