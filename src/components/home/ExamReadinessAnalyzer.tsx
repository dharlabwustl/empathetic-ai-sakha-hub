
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  X, 
  CheckCircle, 
  BookOpen, 
  Calendar, 
  Clock, 
  BrainCircuit,
  LineChart, 
  Target, 
  AlertCircle,
  ChevronRight, 
  ChevronLeft
} from "lucide-react";

interface ExamReadinessAnalyzerProps {
  onClose: () => void;
}

type Step = "goal" | "study-style" | "time-left" | "subjects" | "questions" | "results";

export function ExamReadinessAnalyzer({ onClose }: ExamReadinessAnalyzerProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("goal");
  const [examGoal, setExamGoal] = useState("");
  const [customExamGoal, setCustomExamGoal] = useState("");
  const [studyStyle, setStudyStyle] = useState("");
  const [examDate, setExamDate] = useState("");
  const [studyHoursPerDay, setStudyHoursPerDay] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [customSubject, setCustomSubject] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [strength, setStrength] = useState("");
  const [weakness, setWeakness] = useState("");
  const [readinessScore, setReadinessScore] = useState(0);

  const examGoals = [
    "IIT JEE (Engineering Entrance)",
    "NEET (Medical Entrance)",
    "MBA (CAT, XAT, SNAP, CMAT, etc.)",
    "CUET UG (Undergraduate Common Entrance Test)",
    "UPSC (Civil Services – Prelims & Mains)",
    "CLAT (Law Entrance)",
    "BANK PO (Bank Probationary Officer Exams)",
    "Other"
  ];

  const studyStyles = [
    "Visual (learn best from diagrams, videos, and charts)",
    "Auditory (learn best from lectures and discussions)",
    "Reading/Writing (learn best from reading and taking notes)",
    "Kinesthetic (learn best by doing and practical application)",
    "Mixed (combination of different styles)"
  ];

  const subjectOptions = {
    "IIT JEE (Engineering Entrance)": ["Physics", "Chemistry", "Mathematics"],
    "NEET (Medical Entrance)": ["Physics", "Chemistry", "Biology"],
    "MBA (CAT, XAT, SNAP, CMAT, etc.)": ["Quantitative Ability", "Data Interpretation", "Logical Reasoning", "Verbal Ability"],
    "CUET UG (Undergraduate Common Entrance Test)": ["General Test", "Domain Specific Subjects", "Languages"],
    "UPSC (Civil Services – Prelims & Mains)": ["General Studies", "CSAT", "Optional Subject"],
    "CLAT (Law Entrance)": ["English", "Current Affairs", "Legal Reasoning", "Logical Reasoning", "Quantitative Techniques"],
    "BANK PO (Bank Probationary Officer Exams)": ["Reasoning", "Quantitative Aptitude", "English Language", "General Awareness", "Computer Knowledge"],
    "Other": []
  };
  
  const questions = [
    {
      subject: "General Knowledge",
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"]
    },
    {
      subject: "Mathematics",
      question: "If x² - 3x + 2 = 0, what are the values of x?",
      options: ["1 and 2", "2 and 3", "-1 and -2", "0 and 2"]
    },
    {
      subject: "Physics",
      question: "What is Newton's First Law of Motion?",
      options: [
        "F = ma",
        "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force",
        "For every action, there is an equal and opposite reaction",
        "Energy cannot be created or destroyed"
      ]
    },
    {
      subject: "Chemistry",
      question: "What is the chemical symbol for gold?",
      options: ["Gd", "Au", "Ag", "Fe"]
    },
    {
      subject: "English",
      question: "Which of these is NOT a Shakespeare play?",
      options: ["Hamlet", "Macbeth", "Romeo and Juliet", "Pride and Prejudice"]
    },
    {
      subject: "Logical Reasoning",
      question: "In a certain code, EARTH is written as FBSUI. How would WATER be written in that code?",
      options: ["XBUFS", "XBSFU", "XBUFQ", "XBUFT"]
    },
    {
      subject: "Data Interpretation",
      question: "The average of 5 consecutive numbers is 15. What is the largest of these numbers?",
      options: ["13", "15", "17", "19"]
    },
    {
      subject: "Verbal Ability",
      question: "Which word is the antonym of 'Benevolent'?",
      options: ["Charitable", "Malevolent", "Generous", "Beneficial"]
    },
    {
      subject: "Current Affairs",
      question: "What does ESG stand for in the context of sustainable investing?",
      options: [
        "Economic, Social, Governance", 
        "Environmental, Social, Governance", 
        "Ethical, Sustainable, Growth", 
        "Environmental, Sustainable, Growth"
      ]
    },
    {
      subject: "Computer Knowledge",
      question: "Which of these is NOT a programming language?",
      options: ["Python", "Java", "HTML", "BIOS"]
    }
  ];

  const handleExamGoalSelect = (goal: string) => {
    setExamGoal(goal);
    if (goal !== "Other") {
      nextStep();
    }
  };

  const handleSubjectSelect = (subject: string) => {
    if (subjects.includes(subject)) {
      setSubjects(subjects.filter(s => s !== subject));
    } else {
      setSubjects([...subjects, subject]);
    }
  };

  const addCustomSubject = () => {
    if (customSubject && !subjects.includes(customSubject)) {
      setSubjects([...subjects, customSubject]);
      setCustomSubject("");
    }
  };

  const handleSubmitCustomGoal = () => {
    if (customExamGoal) {
      setExamGoal(customExamGoal);
      nextStep();
    }
  };

  const handleAnswerQuestion = (answer: string) => {
    const updatedAnswers = { ...answers, [currentQuestionIndex]: answer };
    setAnswers(updatedAnswers);
    
    // Calculate progress percentage
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    setProgress(progressPercentage);
    
    // Move to next question or results
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Generate results
        generateResults(updatedAnswers);
        setStep("results");
      }
    }, 300);
  };

  const generateResults = (answerData: Record<string, string>) => {
    // Analyze answers and generate results (simplified for demo)
    const score = Math.floor(Math.random() * 41) + 60; // Random score between 60-100
    
    // Set random strengths and weaknesses for demo
    const strengths = ["Quantitative Ability", "Logical Reasoning", "Data Interpretation"];
    const weaknesses = ["Verbal Ability", "General Knowledge", "Current Affairs"];
    
    setReadinessScore(score);
    setStrength(strengths[Math.floor(Math.random() * strengths.length)]);
    setWeakness(weaknesses[Math.floor(Math.random() * weaknesses.length)]);
    setShowResults(true);
  };

  const nextStep = () => {
    if (step === "goal") setStep("study-style");
    else if (step === "study-style") setStep("time-left");
    else if (step === "time-left") setStep("subjects");
    else if (step === "subjects") setStep("questions");
  };

  const prevStep = () => {
    if (step === "study-style") setStep("goal");
    else if (step === "time-left") setStep("study-style");
    else if (step === "subjects") setStep("time-left");
    else if (step === "questions") setStep("subjects");
  };

  const handleSignUp = () => {
    onClose();
    navigate('/signup');
  };

  const renderStepContent = () => {
    switch (step) {
      case "goal":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Target className="mr-2 text-violet-500" size={20} />
                Select Your Exam Goal
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {examGoals.map((goal) => (
                  <Button
                    key={goal}
                    variant={examGoal === goal ? "default" : "outline"}
                    className={`justify-start h-auto py-3 ${
                      examGoal === goal ? "bg-violet-600 text-white" : "text-gray-700"
                    }`}
                    onClick={() => handleExamGoalSelect(goal)}
                  >
                    {goal}
                  </Button>
                ))}
              </div>
              
              {examGoal === "Other" && (
                <div className="mt-4 flex gap-2">
                  <Input
                    placeholder="Enter your exam goal"
                    value={customExamGoal}
                    onChange={(e) => setCustomExamGoal(e.target.value)}
                  />
                  <Button onClick={handleSubmitCustomGoal}>Next</Button>
                </div>
              )}
            </div>
          </div>
        );
        
      case "study-style":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <BrainCircuit className="mr-2 text-violet-500" size={20} />
                Your Study Style
              </h2>
              <RadioGroup value={studyStyle} onValueChange={setStudyStyle}>
                <div className="grid gap-3">
                  {studyStyles.map((style) => (
                    <div
                      key={style}
                      className={`flex items-center border rounded-lg p-3 cursor-pointer hover:bg-violet-50 ${
                        studyStyle === style ? "border-violet-500 bg-violet-50" : "border-gray-200"
                      }`}
                      onClick={() => setStudyStyle(style)}
                    >
                      <RadioGroupItem value={style} id={style} className="mr-3" />
                      <Label htmlFor={style} className="cursor-pointer flex-1">
                        {style}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ChevronLeft size={16} className="mr-1" /> Back
              </Button>
              <Button onClick={nextStep} disabled={!studyStyle}>
                Next <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        );
        
      case "time-left":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Calendar className="mr-2 text-violet-500" size={20} />
                Time Until Your Exam
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="exam-date">When is your exam?</Label>
                  <Input 
                    id="exam-date" 
                    type="date" 
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="study-hours">How many hours can you study per day?</Label>
                  <Input
                    id="study-hours"
                    type="number"
                    placeholder="Hours per day"
                    min="1"
                    max="24"
                    value={studyHoursPerDay}
                    onChange={(e) => setStudyHoursPerDay(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ChevronLeft size={16} className="mr-1" /> Back
              </Button>
              <Button 
                onClick={nextStep} 
                disabled={!examDate || !studyHoursPerDay}
              >
                Next <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        );
        
      case "subjects":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <BookOpen className="mr-2 text-violet-500" size={20} />
                Select Subjects to Focus On
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {subjectOptions[examGoal as keyof typeof subjectOptions]?.map((subject) => (
                  <div
                    key={subject}
                    onClick={() => handleSubjectSelect(subject)}
                    className={`flex items-center border rounded-lg p-3 cursor-pointer hover:bg-violet-50 ${
                      subjects.includes(subject) ? "border-violet-500 bg-violet-50" : "border-gray-200"
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                      subjects.includes(subject) ? "bg-violet-500" : "border border-gray-300"
                    }`}>
                      {subjects.includes(subject) && (
                        <CheckCircle size={14} className="text-white" />
                      )}
                    </div>
                    <span>{subject}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2 mt-4">
                <Input
                  placeholder="Add another subject"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                />
                <Button onClick={addCustomSubject}>Add</Button>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ChevronLeft size={16} className="mr-1" /> Back
              </Button>
              <Button onClick={nextStep} disabled={subjects.length === 0}>
                Start Test <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        );
        
      case "questions":
        const currentQuestion = questions[currentQuestionIndex];
        return (
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-violet-600">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="text-sm text-gray-500">
                  Subject: {currentQuestion.subject}
                </span>
              </div>
              
              <Progress value={progress} className="h-2 mb-6" />
              
              <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
              
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto py-3 text-left hover:bg-violet-50"
                    onClick={() => handleAnswerQuestion(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );
        
      case "results":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Your Exam Readiness Score</h2>
              <div className="w-36 h-36 mx-auto rounded-full border-4 border-violet-500 flex items-center justify-center mb-4">
                <span className="text-4xl font-bold">{readinessScore}%</span>
              </div>
              
              <p className="text-lg font-medium">
                {readinessScore >= 80 ? "Excellent!" : 
                 readinessScore >= 60 ? "Good progress!" : "You need more practice"}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold flex items-center text-green-600 mb-2">
                    <CheckCircle size={18} className="mr-2" /> Strengths
                  </h3>
                  <p>{strength}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold flex items-center text-red-600 mb-2">
                    <AlertCircle size={18} className="mr-2" /> Areas for Improvement
                  </h3>
                  <p>{weakness}</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center bg-violet-50 border border-violet-100 rounded-lg p-6 mt-6">
              <h3 className="text-xl font-semibold mb-2">Get your personalized study plan!</h3>
              <p className="mb-4">Sign up now to receive a customized study plan that targets your weak areas and builds on your strengths.</p>
              
              <Button 
                onClick={handleSignUp}
                className="bg-gradient-to-r from-violet-600 to-purple-600 text-white"
              >
                Create Free Account
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <DialogTitle className="text-xl font-bold">Exam Readiness Analyzer</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>
        
        <DialogDescription>
          Take this quick assessment to discover your exam readiness level and get personalized recommendations.
        </DialogDescription>
        
        {renderStepContent()}
      </DialogContent>
    </Dialog>
  );
}
