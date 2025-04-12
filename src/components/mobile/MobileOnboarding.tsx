
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { format, addMonths } from "date-fns";
import { ArrowRight, ArrowLeft, Calendar, Clock, BookOpen, Brain, Target } from "lucide-react";

interface MobileOnboardingProps {
  onComplete: () => void;
}

const MobileOnboarding: React.FC<MobileOnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    examDate: format(addMonths(new Date(), 6), "yyyy-MM-dd"),
    studyHours: 4,
    strongSubjects: [] as string[],
    weakSubjects: [] as string[],
    studyPace: "Balanced" as "Aggressive" | "Balanced" | "Relaxed",
    studyTime: "Evening" as "Morning" | "Afternoon" | "Evening" | "Night",
  });
  
  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubjectToggle = (subject: string, type: 'strong' | 'weak') => {
    if (type === 'strong') {
      if (formData.strongSubjects.includes(subject)) {
        setFormData(prev => ({
          ...prev,
          strongSubjects: prev.strongSubjects.filter(s => s !== subject)
        }));
      } else {
        // Remove from weak if present
        const newWeakSubjects = formData.weakSubjects.filter(s => s !== subject);
        
        setFormData(prev => ({
          ...prev,
          strongSubjects: [...prev.strongSubjects, subject],
          weakSubjects: newWeakSubjects
        }));
      }
    } else {
      if (formData.weakSubjects.includes(subject)) {
        setFormData(prev => ({
          ...prev,
          weakSubjects: prev.weakSubjects.filter(s => s !== subject)
        }));
      } else {
        // Remove from strong if present
        const newStrongSubjects = formData.strongSubjects.filter(s => s !== subject);
        
        setFormData(prev => ({
          ...prev,
          weakSubjects: [...prev.weakSubjects, subject],
          strongSubjects: newStrongSubjects
        }));
      }
    }
  };
  
  const getSubjectsForExam = (examType: string) => {
    // Default subjects for JEE
    const defaultSubjects = ["Physics", "Chemistry", "Mathematics"];
    
    const subjectsByExam: Record<string, string[]> = {
      "JEE": ["Physics", "Chemistry", "Mathematics"],
      "NEET": ["Physics", "Chemistry", "Biology"],
      "UPSC": ["General Studies", "History", "Geography", "Economics", "Polity", "Science"],
      "CAT": ["Quantitative Aptitude", "Verbal Ability", "Logical Reasoning", "Data Interpretation"],
      "Bank Exam": ["Quantitative Aptitude", "Reasoning", "English", "General Awareness", "Computer Knowledge"],
      "GATE": ["Engineering Mathematics", "General Aptitude", "Subject Specific"]
    };
    
    return subjectsByExam[examType] || defaultSubjects;
  };
  
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };
  
  const handleSubmit = () => {
    setIsLoading(true);
    
    // Simulate API call to generate study plan
    setTimeout(() => {
      setIsLoading(false);
      onComplete();
    }, 2000);
  };
  
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <AnimatePresence mode="wait">
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex justify-center mb-4">
                <Calendar className="h-12 w-12 text-violet-600" />
              </div>
              <h2 className="text-xl font-bold text-center text-gray-900 mb-4">
                When is your exam?
              </h2>
              <p className="text-gray-600 text-center mb-4">
                Setting your exam date helps us create an optimized study schedule
              </p>
              <div className="mb-4">
                <input
                  type="date"
                  name="examDate"
                  value={formData.examDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-center"
                  min={format(new Date(), "yyyy-MM-dd")}
                />
                <p className="text-xs text-center mt-2 text-gray-500">
                  Estimated {Math.round((new Date(formData.examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days until your exam
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        );
        
      case 2:
        return (
          <AnimatePresence mode="wait">
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex justify-center mb-4">
                <Clock className="h-12 w-12 text-violet-600" />
              </div>
              <h2 className="text-xl font-bold text-center text-gray-900 mb-4">
                How many hours can you study daily?
              </h2>
              <p className="text-gray-600 text-center mb-4">
                This helps us schedule your study plan realistically
              </p>
              <div className="mb-4">
                <input
                  type="range"
                  name="studyHours"
                  min="1"
                  max="10"
                  value={formData.studyHours}
                  onChange={handleChange}
                  className="w-full accent-violet-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 hr</span>
                  <span>{formData.studyHours} hrs</span>
                  <span>10 hrs</span>
                </div>
                <p className="text-center mt-4 text-sm text-violet-600 font-medium">
                  {formData.studyHours} hours per day
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        );
        
      case 3:
        const subjects = getSubjectsForExam("JEE");
        return (
          <AnimatePresence mode="wait">
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex justify-center mb-4">
                <BookOpen className="h-12 w-12 text-violet-600" />
              </div>
              <h2 className="text-xl font-bold text-center text-gray-900 mb-4">
                Select your strong and weak subjects
              </h2>
              <p className="text-gray-600 text-center mb-4">
                This helps us personalize your learning focus
              </p>
              
              <div className="mb-6 space-y-5">
                {subjects.map(subject => (
                  <div key={subject} className="flex justify-between items-center">
                    <span className="text-gray-700">{subject}</span>
                    <div className="flex gap-2">
                      <Button 
                        type="button"
                        size="sm"
                        variant={formData.strongSubjects.includes(subject) ? "default" : "outline"}
                        className={formData.strongSubjects.includes(subject) ? "bg-green-600 hover:bg-green-700" : ""}
                        onClick={() => handleSubjectToggle(subject, 'strong')}
                      >
                        Strong
                      </Button>
                      <Button 
                        type="button"
                        size="sm"
                        variant={formData.weakSubjects.includes(subject) ? "default" : "outline"}
                        className={formData.weakSubjects.includes(subject) ? "bg-amber-600 hover:bg-amber-700" : ""}
                        onClick={() => handleSubjectToggle(subject, 'weak')}
                      >
                        Needs Work
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        );
        
      case 4:
        return (
          <AnimatePresence mode="wait">
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex justify-center mb-4">
                <Brain className="h-12 w-12 text-violet-600" />
              </div>
              <h2 className="text-xl font-bold text-center text-gray-900 mb-4">
                What's your preferred study pace?
              </h2>
              <p className="text-gray-600 text-center mb-4">
                Choose a pace that fits your learning style
              </p>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                {(["Relaxed", "Balanced", "Aggressive"] as const).map(pace => (
                  <Button
                    key={pace}
                    type="button"
                    variant={formData.studyPace === pace ? "default" : "outline"}
                    className={formData.studyPace === pace ? "bg-violet-600 hover:bg-violet-700" : ""}
                    onClick={() => setFormData(prev => ({ ...prev, studyPace: pace }))}
                  >
                    {pace}
                  </Button>
                ))}
              </div>
              
              <Card className="border-violet-100">
                <CardContent className="p-4 text-sm text-gray-600">
                  <p className="font-medium text-violet-800 mb-2">
                    {formData.studyPace === "Relaxed" && "Steady progress with more breaks"}
                    {formData.studyPace === "Balanced" && "Moderate intensity with regular breaks"}
                    {formData.studyPace === "Aggressive" && "High intensity with focused sessions"}
                  </p>
                  <p>
                    {formData.studyPace === "Relaxed" && "Perfect if you have more time before your exam and prefer a less intensive approach."}
                    {formData.studyPace === "Balanced" && "Recommended for most students - balances learning with adequate rest periods."}
                    {formData.studyPace === "Aggressive" && "Best when exam dates are approaching and you need to cover more content quickly."}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        );
        
      case 5:
        return (
          <AnimatePresence mode="wait">
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex justify-center mb-4">
                <Target className="h-12 w-12 text-violet-600" />
              </div>
              <h2 className="text-xl font-bold text-center text-gray-900 mb-4">
                When do you study best?
              </h2>
              <p className="text-gray-600 text-center mb-4">
                We'll optimize your study plan around your peak productivity hours
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                {(["Morning", "Afternoon", "Evening", "Night"] as const).map(time => (
                  <Button
                    key={time}
                    type="button"
                    variant={formData.studyTime === time ? "default" : "outline"}
                    className={`mb-2 ${formData.studyTime === time ? "bg-violet-600 hover:bg-violet-700" : ""}`}
                    onClick={() => setFormData(prev => ({ ...prev, studyTime: time }))}
                  >
                    {time}
                  </Button>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="font-medium text-violet-700">Almost there!</p>
                <p className="text-sm text-gray-600">
                  Click next to generate your personalized study plan
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        );
        
      default:
        return null;
    }
  };
  
  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6">
        <div className="w-20 h-20 border-4 border-t-violet-600 border-violet-200 rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-bold mb-2 text-gray-900">Creating Your Plan</h2>
        <p className="text-gray-600 text-center">
          Our AI is designing a personalized study plan optimized for your goals and preferences...
        </p>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 bg-violet-600 text-white">
        <h1 className="text-lg font-bold text-center">
          Personalize Your Experience
        </h1>
      </div>
      
      <div className="px-4 py-3 bg-violet-50">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-1 text-xs text-gray-500">
          <span>Step {step} of {totalSteps}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-auto">
        {renderStepContent()}
      </div>
      
      <div className="p-4 border-t border-gray-200 flex justify-between">
        <Button 
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={step === 1}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <Button 
          type="button"
          className="bg-violet-600 hover:bg-violet-700"
          onClick={handleNext}
        >
          {step === totalSteps ? 'Finish' : 'Next'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MobileOnboarding;
