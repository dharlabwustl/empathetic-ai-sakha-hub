
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { UserRole } from "@/types/user";
import { motion } from "framer-motion";

export interface OnboardingData {
  role?: UserRole;
  [key: string]: any;
}

export interface OnboardingQuestionsProps {
  role: UserRole;
  onComplete: (data: OnboardingData) => void;
  onClose: () => void;
  isLoading?: boolean;
}

const OnboardingQuestions = ({ role, onComplete, onClose, isLoading = false }: OnboardingQuestionsProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const studentQuestions = [
    {
      id: "study-style",
      question: "Let's understand your study style to better guide you. Take this short quiz?",
      options: [
        { id: "planner", label: "I plan ahead and follow schedules" },
        { id: "flexible", label: "I go with the flow and adapt" },
        { id: "mixed", label: "I use a mix of structure and flexibility" },
        { id: "pressure", label: "I work best under pressure" }
      ]
    },
    {
      id: "learning-preference",
      question: "How do you prefer to learn new concepts?",
      options: [
        { id: "visual", label: "Visual aids (charts, videos, diagrams)" },
        { id: "reading", label: "Reading text and taking notes" },
        { id: "practice", label: "Solving problems and practicing" },
        { id: "discussion", label: "Discussing with others" }
      ]
    }
  ];

  const employeeQuestions = [
    {
      id: "working-style",
      question: "Let's understand your working style to better guide you. Take this short quiz?",
      options: [
        { id: "planner", label: "I plan ahead and follow schedules" },
        { id: "flexible", label: "I go with the flow and adapt" },
        { id: "mixed", label: "I use a mix of structure and flexibility" },
        { id: "pressure", label: "I work best under pressure" }
      ]
    },
    {
      id: "experience-level",
      question: "What's your experience level?",
      options: [
        { id: "entry", label: "Entry level (0-2 years)" },
        { id: "mid", label: "Mid-level (3-5 years)" },
        { id: "senior", label: "Senior (5-10 years)" },
        { id: "lead", label: "Leadership (10+ years)" }
      ]
    }
  ];

  const doctorQuestions = [
    {
      id: "study-style",
      question: "Let's understand your study style to better guide you. Take this short quiz?",
      options: [
        { id: "planner", label: "I plan ahead and follow schedules" },
        { id: "flexible", label: "I go with the flow and adapt" },
        { id: "mixed", label: "I use a mix of structure and flexibility" },
        { id: "pressure", label: "I work best under pressure" }
      ]
    },
    {
      id: "specialty",
      question: "What's your medical specialty or area of interest?",
      options: [
        { id: "internal", label: "Internal Medicine" },
        { id: "surgery", label: "Surgery" },
        { id: "pediatrics", label: "Pediatrics" },
        { id: "other", label: "Other Specialty" }
      ]
    }
  ];

  const founderQuestions = [
    {
      id: "working-style",
      question: "Let's understand your working style to better guide you. Take this short quiz?",
      options: [
        { id: "planner", label: "I plan ahead and follow schedules" },
        { id: "flexible", label: "I go with the flow and adapt" },
        { id: "mixed", label: "I use a mix of structure and flexibility" },
        { id: "pressure", label: "I work best under pressure" }
      ]
    },
    {
      id: "startup-stage",
      question: "What stage is your startup in?",
      options: [
        { id: "idea", label: "Idea phase" },
        { id: "mvp", label: "Building MVP" },
        { id: "early", label: "Early traction" },
        { id: "growth", label: "Growth phase" }
      ]
    }
  ];

  // Choose questions based on role
  const questions = 
    role === "Student" ? studentQuestions :
    role === "Employee" ? employeeQuestions :
    role === "Doctor" ? doctorQuestions :
    founderQuestions;

  const handleAnswer = (id: string, value: string) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onComplete({...answers, role});
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const currentQuestion = questions[step];
  const isLastQuestion = step === questions.length - 1;
  const isAnswered = answers[currentQuestion.id] !== undefined;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">{role} Profile</h3>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X size={18} />
        </button>
      </div>

      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>Question {step + 1} of {questions.length}</span>
          <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-sky-500 to-violet-500 transition-all duration-300"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div key={currentQuestion.id} className="mb-8">
        <h4 className="text-lg font-medium mb-4">{currentQuestion.question}</h4>
        
        <RadioGroup 
          value={answers[currentQuestion.id] || ""} 
          onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
        >
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <div
                key={option.id}
                className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => handleAnswer(currentQuestion.id, option.id)}
              >
                <RadioGroupItem 
                  id={option.id} 
                  value={option.id} 
                  className="mr-3"
                />
                <Label htmlFor={option.id} className="cursor-pointer flex-1">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious} 
          disabled={step === 0}
        >
          Back
        </Button>
        
        <Button 
          onClick={handleNext} 
          disabled={!isAnswered || isLoading}
          className="bg-gradient-to-r from-sky-500 to-violet-500"
        >
          {isLoading ? "Processing..." : isLastQuestion ? "Complete" : "Next"}
        </Button>
      </div>
    </motion.div>
  );
};

export default OnboardingQuestions;
