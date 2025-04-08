
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  Slider 
} from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Checkbox
} from "@/components/ui/checkbox";
import { 
  Calendar as CalendarIcon, 
  ChevronRight, 
  Clock, 
  FastForward, 
  Play, 
  Pause, 
  Book, 
  Sparkles, 
  Sun, 
  Moon,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserProfileType } from "@/types/user";
import { format, addMonths } from "date-fns";

interface OnboardingFlowProps {
  userProfile: UserProfileType;
  goalTitle: string;
  onComplete: () => void;
}

// Mock subject data based on common exam goals
const subjectsByGoal: Record<string, string[]> = {
  "IIT-JEE": ["Physics", "Chemistry", "Mathematics"],
  "NEET": ["Physics", "Chemistry", "Biology"],
  "UPSC": ["General Studies", "Current Affairs", "History", "Geography", "Polity", "Economy", "Environment", "Science & Tech"],
  "CAT": ["Quantitative Ability", "Verbal Ability", "Data Interpretation", "Logical Reasoning"],
  "GATE": ["Engineering Mathematics", "General Aptitude", "Subject Specific Paper"],
  "Bank PO": ["English Language", "Reasoning", "Quantitative Aptitude", "General Awareness", "Computer Knowledge"],
  "CLAT": ["English", "Current Affairs", "Legal Reasoning", "Logical Reasoning", "Quantitative Techniques"],
};

// Default subjects if goal not found
const defaultSubjects = ["Mathematics", "Science", "English", "Social Studies"];

export default function OnboardingFlow({ userProfile, goalTitle, onComplete }: OnboardingFlowProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [stepComplete, setStepComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  
  // Form state
  const [examDate, setExamDate] = useState<Date | undefined>(addMonths(new Date(), 6));
  const [studyHours, setStudyHours] = useState<number>(4);
  const [strongSubjects, setStrongSubjects] = useState<string[]>([]);
  const [weakSubjects, setWeakSubjects] = useState<string[]>([]);
  const [studyPace, setStudyPace] = useState<"Aggressive" | "Balanced" | "Relaxed">("Balanced");
  const [studyTime, setStudyTime] = useState<"Morning" | "Afternoon" | "Evening" | "Night">("Evening");

  // Get the relevant subjects based on the goal title
  const normalizedGoalTitle = Object.keys(subjectsByGoal).find(
    goal => goalTitle.toLowerCase().includes(goal.toLowerCase())
  );
  
  const subjects = normalizedGoalTitle ? 
    subjectsByGoal[normalizedGoalTitle] : 
    defaultSubjects;

  useEffect(() => {
    // Check if the current step is complete
    switch (currentStep) {
      case 1:
        setStepComplete(!!examDate);
        break;
      case 2:
        setStepComplete(studyHours > 0);
        break;
      case 3:
        setStepComplete(strongSubjects.length > 0 || weakSubjects.length > 0);
        break;
      case 4:
        setStepComplete(!!studyPace);
        break;
      case 5:
        setStepComplete(!!studyTime);
        break;
      default:
        setStepComplete(false);
    }
  }, [currentStep, examDate, studyHours, strongSubjects, weakSubjects, studyPace, studyTime]);

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle final submission
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    
    // Simulate API call to generate plan
    setTimeout(() => {
      setLoading(false);
      setShowSuccessCard(true);
      
      toast({
        title: "Success!",
        description: "Your personalized study plan has been created.",
      });
      
      // Wait a moment to show success screen before completing
      setTimeout(() => {
        onComplete();
      }, 3000);
    }, 2500);
  };

  const handleToggleSubject = (subject: string, type: 'strong' | 'weak') => {
    if (type === 'strong') {
      if (strongSubjects.includes(subject)) {
        setStrongSubjects(strongSubjects.filter(s => s !== subject));
      } else {
        // Remove from weak subjects if it's there
        if (weakSubjects.includes(subject)) {
          setWeakSubjects(weakSubjects.filter(s => s !== subject));
        }
        setStrongSubjects([...strongSubjects, subject]);
      }
    } else {
      if (weakSubjects.includes(subject)) {
        setWeakSubjects(weakSubjects.filter(s => s !== subject));
      } else {
        // Remove from strong subjects if it's there
        if (strongSubjects.includes(subject)) {
          setStrongSubjects(strongSubjects.filter(s => s !== subject));
        }
        setWeakSubjects([...weakSubjects, subject]);
      }
    }
  };

  if (showSuccessCard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10 p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full"
        >
          <Card className="shadow-xl overflow-hidden border-0">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-8 text-center text-white">
              <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <Sparkles size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Your Smart Plan is Ready!</h2>
              <p>We've created a personalized study plan just for you</p>
            </div>
            <CardContent className="p-6 text-center">
              <div className="space-y-4 mb-6">
                <div className="animate-pulse flex justify-center">
                  <div className="h-2 w-2 bg-emerald-500 rounded-full mx-1"></div>
                  <div className="h-2 w-2 bg-emerald-500 rounded-full mx-1 animation-delay-200"></div>
                  <div className="h-2 w-2 bg-emerald-500 rounded-full mx-1 animation-delay-400"></div>
                </div>
                <p className="text-gray-600">Taking you to your dashboard...</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10 p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full"
        >
          <Card className="shadow-xl overflow-hidden border-0">
            <CardHeader className="bg-gradient-to-br from-sky-600 to-indigo-700 text-white p-6 text-center">
              <h2 className="text-2xl font-bold">Creating Your Smart Study Plan</h2>
              <p className="text-sky-100">This will only take a moment...</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-sky-500 rounded-full animate-pulse mr-3"></div>
                  <p>Reading syllabus for {goalTitle}...</p>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-indigo-500 rounded-full animate-pulse mr-3"></div>
                  <p>Analyzing previous year questions...</p>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-violet-500 rounded-full animate-pulse mr-3"></div>
                  <p>Customizing your study calendar...</p>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse mr-3"></div>
                  <p>Generating flashcards for {weakSubjects.join(", ")}...</p>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-amber-500 rounded-full animate-pulse mr-3"></div>
                  <p>Creating practice quiz sets...</p>
                </div>

                <div className="relative pt-4">
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2 }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full"
      >
        <Card className="shadow-xl overflow-hidden border-0">
          <CardHeader className="bg-gradient-to-br from-sky-600 to-indigo-700 text-white p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Let's create your personalized study plan</h2>
                <p className="text-sky-100">For {goalTitle}</p>
              </div>
              <div className="mt-4 md:mt-0 bg-white/10 px-4 py-2 rounded-lg">
                Step {currentStep} of 5
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                        <CalendarIcon className="text-sky-500" size={20} />
                        Target Exam Date
                      </h3>
                      <p className="text-muted-foreground mb-4">When are you planning to take the {goalTitle} exam?</p>
                      
                      <div className="flex flex-col space-y-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button 
                              variant="outline" 
                              className="justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {examDate ? format(examDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={examDate}
                              onSelect={setExamDate}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="mt-4 bg-sky-50 p-4 rounded-md">
                        <p className="text-sm flex items-center gap-2">
                          <AlertCircle size={16} className="text-sky-500" />
                          <span>Common {goalTitle} exam dates are typically in May-June and November-December.</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                        <Clock className="text-indigo-500" size={20} />
                        Daily Study Hours
                      </h3>
                      <p className="text-muted-foreground mb-4">How many hours can you dedicate to studying each day?</p>
                      
                      <div className="space-y-6 py-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Hours: {studyHours}</span>
                        </div>
                        <Slider
                          defaultValue={[studyHours]}
                          max={12}
                          min={1}
                          step={0.5}
                          onValueChange={(value) => setStudyHours(value[0])}
                          className="cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1 hour</span>
                          <span>6 hours</span>
                          <span>12 hours</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 bg-indigo-50 p-4 rounded-md">
                        <p className="text-sm flex items-center gap-2">
                          <AlertCircle size={16} className="text-indigo-500" />
                          <span>For {goalTitle}, a minimum of {normalizedGoalTitle === "UPSC" ? "6-8" : "4-6"} hours daily is recommended for optimal preparation.</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
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
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                        <FastForward className="text-amber-500" size={20} />
                        Study Pace Preference
                      </h3>
                      <p className="text-muted-foreground mb-4">How intensive would you like your study plan to be?</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Button 
                          variant={studyPace === "Aggressive" ? "default" : "outline"}
                          onClick={() => setStudyPace("Aggressive")}
                          className={cn(
                            "h-24 flex flex-col items-center justify-center space-y-2",
                            studyPace === "Aggressive" && "bg-amber-600 hover:bg-amber-700"
                          )}
                        >
                          <FastForward size={24} />
                          <span>Aggressive</span>
                        </Button>
                        
                        <Button 
                          variant={studyPace === "Balanced" ? "default" : "outline"}
                          onClick={() => setStudyPace("Balanced")}
                          className={cn(
                            "h-24 flex flex-col items-center justify-center space-y-2",
                            studyPace === "Balanced" && "bg-emerald-600 hover:bg-emerald-700"
                          )}
                        >
                          <Play size={24} />
                          <span>Balanced</span>
                        </Button>
                        
                        <Button 
                          variant={studyPace === "Relaxed" ? "default" : "outline"}
                          onClick={() => setStudyPace("Relaxed")}
                          className={cn(
                            "h-24 flex flex-col items-center justify-center space-y-2",
                            studyPace === "Relaxed" && "bg-blue-600 hover:bg-blue-700"
                          )}
                        >
                          <Pause size={24} />
                          <span>Relaxed</span>
                        </Button>
                      </div>
                      
                      <div className="mt-4 bg-amber-50 p-4 rounded-md">
                        <p className="text-sm flex items-center gap-2">
                          <AlertCircle size={16} className="text-amber-500" />
                          <span>
                            {studyPace === "Aggressive" && "Aggressive pace fits more content in less time. Best for those with strong discipline."}
                            {studyPace === "Balanced" && "Balanced pace provides a steady progression with regular breaks. Ideal for most students."}
                            {studyPace === "Relaxed" && "Relaxed pace spreads content over longer periods with more review time. Good for reducing stress."}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                        <Clock className="text-sky-500" size={20} />
                        Preferred Study Time
                      </h3>
                      <p className="text-muted-foreground mb-4">When do you feel most productive for studying?</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Button 
                          variant={studyTime === "Morning" ? "default" : "outline"}
                          onClick={() => setStudyTime("Morning")}
                          className={cn(
                            "h-24 flex flex-col items-center justify-center space-y-2",
                            studyTime === "Morning" && "bg-amber-500 hover:bg-amber-600"
                          )}
                        >
                          <Sun size={24} />
                          <span>Morning</span>
                          <span className="text-xs">5 AM - 12 PM</span>
                        </Button>
                        
                        <Button 
                          variant={studyTime === "Afternoon" ? "default" : "outline"}
                          onClick={() => setStudyTime("Afternoon")}
                          className={cn(
                            "h-24 flex flex-col items-center justify-center space-y-2",
                            studyTime === "Afternoon" && "bg-sky-500 hover:bg-sky-600"
                          )}
                        >
                          <Sun size={24} />
                          <span>Afternoon</span>
                          <span className="text-xs">12 PM - 5 PM</span>
                        </Button>
                        
                        <Button 
                          variant={studyTime === "Evening" ? "default" : "outline"}
                          onClick={() => setStudyTime("Evening")}
                          className={cn(
                            "h-24 flex flex-col items-center justify-center space-y-2",
                            studyTime === "Evening" && "bg-indigo-500 hover:bg-indigo-600"
                          )}
                        >
                          <Sun size={24} />
                          <span>Evening</span>
                          <span className="text-xs">5 PM - 9 PM</span>
                        </Button>
                        
                        <Button 
                          variant={studyTime === "Night" ? "default" : "outline"}
                          onClick={() => setStudyTime("Night")}
                          className={cn(
                            "h-24 flex flex-col items-center justify-center space-y-2",
                            studyTime === "Night" && "bg-violet-500 hover:bg-violet-600"
                          )}
                        >
                          <Moon size={24} />
                          <span>Night</span>
                          <span className="text-xs">9 PM - 5 AM</span>
                        </Button>
                      </div>
                      
                      <div className="mt-4 p-4 rounded-md bg-gradient-to-r from-sky-50 to-indigo-50">
                        <p className="text-sm flex items-center gap-2">
                          <AlertCircle size={16} className="text-sky-500" />
                          <span>We'll schedule your most challenging topics during your preferred time when your focus is at its peak.</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
          <CardFooter className="bg-gray-50 p-6 flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!stepComplete}
              className={cn(
                currentStep === 5 ? "bg-gradient-to-r from-sky-600 to-indigo-600" : ""
              )}
            >
              {currentStep < 5 ? (
                <>
                  Next <ChevronRight size={16} className="ml-1" />
                </>
              ) : (
                "Generate My Smart Plan"
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
