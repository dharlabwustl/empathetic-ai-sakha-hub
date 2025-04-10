
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
  
  // Questions organized by exam goal
  const questionsByExam: Record<string, any[]> = {
    "IIT JEE (Engineering Entrance)": [
      {
        subject: "Physics",
        question: "A particle moves in a circle of radius 20 cm with constant speed and time period 4π seconds. What is the acceleration of the particle?",
        options: ["0.05 m/s²", "0.1 m/s²", "0.2 m/s²", "0.4 m/s²"]
      },
      {
        subject: "Chemistry",
        question: "Which of the following elements has the highest first ionization energy?",
        options: ["Sodium", "Magnesium", "Neon", "Fluorine"]
      },
      {
        subject: "Mathematics",
        question: "The differential equation that represents a family of ellipses with foci on the x-axis is:",
        options: ["x²/a² + y²/b² = 1", "x²/a² - y²/b² = 1", "(d²y/dx²) + y = 0", "d²y/dx² = -k²y"]
      },
      {
        subject: "Physics",
        question: "A body is thrown vertically upwards with an initial velocity v. The time taken to reach the maximum height is proportional to:",
        options: ["v", "v²", "1/v", "√v"]
      },
      {
        subject: "Chemistry",
        question: "Which of the following compounds will show optical isomerism?",
        options: ["CH₃CH₂OH", "CH₃CHClCH₃", "CH₃CH₂COOH", "CH₃CH₂CHO"]
      },
      {
        subject: "Mathematics",
        question: "If the vectors a, b and c are coplanar, then which of the following is true?",
        options: ["a × (b × c) = 0", "a · (b × c) = 0", "a × b = b × c", "(a × b) · c = 0"]
      },
      {
        subject: "Physics",
        question: "A spring of spring constant k is cut into n equal parts. The spring constant of each part will be:",
        options: ["k/n", "k", "nk", "n²k"]
      },
      {
        subject: "Chemistry",
        question: "Which of the following represents the correct order of increasing bond angles?",
        options: ["NH₃ < PH₃ < AsH₃", "PH₃ < NH₃ < AsH₃", "PH₃ < AsH₃ < NH₃", "AsH₃ < PH₃ < NH₃"]
      },
      {
        subject: "Mathematics",
        question: "If A and B are two events such that P(A) = 0.3, P(B) = 0.4 and P(A∩B) = 0.1, then P(A|B) is:",
        options: ["0.1", "0.25", "0.3", "0.4"]
      },
      {
        subject: "Mathematics",
        question: "The value of the determinant |cos x  sin x|/|-sin x  cos x| is:",
        options: ["1", "0", "cos 2x", "sin 2x"]
      }
    ],
    "NEET (Medical Entrance)": [
      {
        subject: "Biology",
        question: "Which of the following organelles is known as the 'power house of the cell'?",
        options: ["Ribosome", "Lysosome", "Mitochondria", "Golgi apparatus"]
      },
      {
        subject: "Chemistry", 
        question: "Which hormone is called the emergency hormone?",
        options: ["Insulin", "Thyroxine", "Adrenaline", "Estrogen"]
      },
      {
        subject: "Physics",
        question: "The human eye forms the image of an object at its:",
        options: ["Cornea", "Iris", "Pupil", "Retina"]
      },
      {
        subject: "Biology",
        question: "Pneumatophores are specialized roots in:",
        options: ["Epiphytes", "Halophytes", "Mangroves", "Xerophytes"]
      },
      {
        subject: "Chemistry",
        question: "Which of the following is a non-biodegradable pollutant?",
        options: ["Animal waste", "Sewage", "Plastic", "Vegetable waste"]
      },
      {
        subject: "Physics",
        question: "A tuning fork produces 4 beats per second with another tuning fork of frequency 256 Hz. If the first tuning fork has a frequency less than 256 Hz, what is its frequency?",
        options: ["252 Hz", "254 Hz", "258 Hz", "260 Hz"]
      },
      {
        subject: "Biology",
        question: "The final electron acceptor in aerobic respiration is:",
        options: ["NAD+", "FAD", "Oxygen", "Pyruvate"]
      },
      {
        subject: "Chemistry",
        question: "Which of the following is not a greenhouse gas?",
        options: ["Carbon dioxide", "Methane", "Nitrogen", "Water vapor"]
      },
      {
        subject: "Physics",
        question: "Which of the following electromagnetic waves has the shortest wavelength?",
        options: ["Gamma rays", "X-rays", "Ultraviolet rays", "Visible light"]
      },
      {
        subject: "Biology",
        question: "The function of hemoglobin is:",
        options: ["Transport of oxygen", "Blood clotting", "Providing immunity", "Hormone regulation"]
      }
    ]
  };

  // Default questions for other exams
  const defaultQuestions = [
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
    },
    {
      subject: "General Studies",
      question: "Which country has the largest coastline in the world?",
      options: ["Australia", "United States", "Canada", "Russia"]
    },
    {
      subject: "English",
      question: "Choose the correctly spelled word:",
      options: ["Accomodation", "Accommodation", "Acommodation", "Accommoddation"]
    },
    {
      subject: "Quantitative Aptitude",
      question: "If a shopkeeper sells an item at Rs. 1,140 with 5% discount, then what was the marked price?",
      options: ["Rs. 1,197", "Rs. 1,200", "Rs. 1,083", "Rs. 1,225"]
    }
  ];

  // Get the appropriate questions based on exam goal
  const getQuestions = () => {
    return questionsByExam[examGoal] || defaultQuestions;
  };
  
  const questions = getQuestions();

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
    // For demo purposes, generate insights based on exam goal
    let score: number;
    let strengths: string[] = [];
    let weaknesses: string[] = [];
    
    if (examGoal === "IIT JEE (Engineering Entrance)") {
      score = Math.floor(Math.random() * 31) + 60; // 60-90
      strengths = ["Mathematical problem-solving", "Application of concepts"];
      weaknesses = ["Physical Chemistry", "Coordinate Geometry"];
    } else if (examGoal === "NEET (Medical Entrance)") {
      score = Math.floor(Math.random() * 25) + 65; // 65-90
      strengths = ["Biology fundamentals", "Organic Chemistry"];
      weaknesses = ["Physics numerical problems", "Inorganic Chemistry"];
    } else {
      score = Math.floor(Math.random() * 41) + 60; // 60-100
      strengths = ["Quantitative Ability", "Logical Reasoning", "Data Interpretation"];
      weaknesses = ["Verbal Ability", "General Knowledge", "Current Affairs"];
    }
    
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
  
  const handleTryAnotherExam = () => {
    setStep("goal");
    setExamGoal("");
    setCustomExamGoal("");
    setStudyStyle("");
    setExamDate("");
    setStudyHoursPerDay("");
    setSubjects([]);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setProgress(0);
    setShowResults(false);
  };

  const renderStepContent = () => {
    switch (step) {
      case "goal":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
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
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
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
                      <Label htmlFor={style} className="cursor-pointer flex-1 text-gray-800">
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
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
                <Calendar className="mr-2 text-violet-500" size={20} />
                Time Until Your Exam
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="exam-date" className="text-gray-800">When is your exam?</Label>
                  <Input 
                    id="exam-date" 
                    type="date" 
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="study-hours" className="text-gray-800">How many hours can you study per day?</Label>
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
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900">
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
                    <span className="text-gray-800">{subject}</span>
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
          <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-violet-600">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="text-sm text-gray-600">
                  Subject: {currentQuestion.subject}
                </span>
              </div>
              
              <Progress value={progress} className="h-2 mb-6 bg-gray-100" />
              
              <h2 className="text-xl font-semibold mb-6 text-gray-900">{currentQuestion.question}</h2>
              
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto py-3 text-left hover:bg-violet-50 text-gray-800"
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
          <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2 text-gray-900">Your Exam Readiness Score</h2>
              <div className="w-36 h-36 mx-auto rounded-full border-4 border-violet-500 flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-violet-600">{readinessScore}%</span>
              </div>
              
              <p className="text-lg font-medium text-gray-800">
                {readinessScore >= 80 ? "Excellent!" : 
                 readinessScore >= 60 ? "Good progress!" : "You need more practice"}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-green-50 border-green-100">
                <CardContent className="p-4">
                  <h3 className="font-semibold flex items-center text-green-600 mb-2">
                    <CheckCircle size={18} className="mr-2" /> Strengths
                  </h3>
                  <p className="text-gray-800">{strength}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-red-50 border-red-100">
                <CardContent className="p-4">
                  <h3 className="font-semibold flex items-center text-red-600 mb-2">
                    <AlertCircle size={18} className="mr-2" /> Areas for Improvement
                  </h3>
                  <p className="text-gray-800">{weakness}</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="text-center bg-violet-50 border border-violet-100 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-violet-700">Get your personalized study plan!</h3>
                <p className="mb-4 text-gray-700">Sign up now for a customized study plan targeting your weak areas.</p>
                <Button 
                  onClick={handleSignUp}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 text-white"
                >
                  Create Free Account
                </Button>
              </div>
              
              <div className="text-center bg-blue-50 border border-blue-100 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-700">Try another assessment</h3>
                <p className="mb-4 text-gray-700">Check your readiness for a different exam or subject area.</p>
                <Button 
                  onClick={handleTryAnotherExam}
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                >
                  Start New Assessment
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
        <div className="flex justify-between items-center border-b pb-4">
          <DialogTitle className="text-xl font-bold text-gray-900">Exam Readiness Analyzer</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X size={18} />
          </Button>
        </div>
        
        <DialogDescription className="text-gray-700">
          Take this quick assessment to discover your exam readiness level and get personalized recommendations.
        </DialogDescription>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          {renderStepContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
