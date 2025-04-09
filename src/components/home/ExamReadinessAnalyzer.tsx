import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, ChevronRight, ChevronLeft, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Exam types and screening questions
const examTypes = [
  { id: "iit-jee", name: "IIT-JEE", icon: "🎓", color: "bg-blue-500" },
  { id: "neet", name: "NEET", icon: "⚕️", color: "bg-green-500" },
  { id: "upsc", name: "UPSC", icon: "📜", color: "bg-amber-500" },
  { id: "cat", name: "CAT/MBA", icon: "📊", color: "bg-purple-500" },
  { id: "gate", name: "GATE", icon: "⚙️", color: "bg-indigo-500" },
  { id: "bank", name: "Bank Exams", icon: "🏦", color: "bg-emerald-500" },
];

// Profile Questions
const profileQuestions = [
  {
    id: "time-available",
    question: "How much daily study time can you commit?",
    options: [
      { id: "1-2", text: "1-2 hours" },
      { id: "3-4", text: "3-4 hours" },
      { id: "5-6", text: "5-6 hours" },
      { id: "7+", text: "7+ hours" },
    ],
  },
  {
    id: "exam-date",
    question: "When is your target exam date?",
    options: [
      { id: "1-3", text: "1-3 months away" },
      { id: "4-6", text: "4-6 months away" },
      { id: "7-12", text: "7-12 months away" },
      { id: "12+", text: "More than a year away" },
    ],
  },
  {
    id: "preparation",
    question: "What's your current preparation level?",
    options: [
      { id: "beginner", text: "Just starting" },
      { id: "basic", text: "Covered basics" },
      { id: "intermediate", text: "Completed 50% syllabus" },
      { id: "advanced", text: "Revision phase" },
    ],
  },
];

// IIT JEE Questions (10 questions)
const iitJeeQuestions = [
  {
    id: "jee-1",
    subject: "Physics",
    question: "A particle moves in a circle of radius R with a constant speed v. The magnitude of its angular momentum about the center is:",
    options: [
      { id: "jee-1-a", text: "zero" },
      { id: "jee-1-b", text: "mvR" },
      { id: "jee-1-c", text: "mv²R" },
      { id: "jee-1-d", text: "mv²/R" },
    ],
    correctAnswer: "jee-1-b",
  },
  {
    id: "jee-2",
    subject: "Chemistry",
    question: "Which of the following statements about hydrogen bonding is incorrect?",
    options: [
      { id: "jee-2-a", text: "It's a type of dipole-dipole interaction" },
      { id: "jee-2-b", text: "It's stronger than covalent bonds" },
      { id: "jee-2-c", text: "It explains the high boiling point of water" },
      { id: "jee-2-d", text: "It occurs in HF molecules" },
    ],
    correctAnswer: "jee-2-b",
  },
  {
    id: "jee-3",
    subject: "Mathematics",
    question: "If f(x) = |x - 1| + |x - 3| + |x - 5| for all real x, then the minimum value of f(x) occurs at:",
    options: [
      { id: "jee-3-a", text: "x = 1" },
      { id: "jee-3-b", text: "x = 3" },
      { id: "jee-3-c", text: "x = 5" },
      { id: "jee-3-d", text: "x = 2 or x = 4" },
    ],
    correctAnswer: "jee-3-b",
  },
  {
    id: "jee-4",
    subject: "Physics",
    question: "Two bodies of masses m and 4m are moving with equal kinetic energies. The ratio of their linear momenta is:",
    options: [
      { id: "jee-4-a", text: "1:1" },
      { id: "jee-4-b", text: "1:2" },
      { id: "jee-4-c", text: "1:4" },
      { id: "jee-4-d", text: "2:1" },
    ],
    correctAnswer: "jee-4-b",
  },
  {
    id: "jee-5",
    subject: "Chemistry",
    question: "The IUPAC name of the compound CH₃-CH=CH-CHO is:",
    options: [
      { id: "jee-5-a", text: "But-2-enal" },
      { id: "jee-5-b", text: "But-3-enal" },
      { id: "jee-5-c", text: "But-2-enoic acid" },
      { id: "jee-5-d", text: "But-1-en-3-al" },
    ],
    correctAnswer: "jee-5-a",
  },
  {
    id: "jee-6",
    subject: "Mathematics",
    question: "If the vectors a̅ = (1,2,3), b̅ = (0,1,-1), and c̅ = (2,5,λ) are coplanar, then the value of λ is:",
    options: [
      { id: "jee-6-a", text: "3" },
      { id: "jee-6-b", text: "4" },
      { id: "jee-6-c", text: "5" },
      { id: "jee-6-d", text: "6" },
    ],
    correctAnswer: "jee-6-c",
  },
  {
    id: "jee-7",
    subject: "Physics",
    question: "A wire of resistance R is stretched to twice its original length. The resistance of the stretched wire will be:",
    options: [
      { id: "jee-7-a", text: "R/4" },
      { id: "jee-7-b", text: "R/2" },
      { id: "jee-7-c", text: "2R" },
      { id: "jee-7-d", text: "4R" },
    ],
    correctAnswer: "jee-7-d",
  },
  {
    id: "jee-8",
    subject: "Chemistry",
    question: "Which of the following is an example of a condensation polymer?",
    options: [
      { id: "jee-8-a", text: "Polyethylene" },
      { id: "jee-8-b", text: "Polystyrene" },
      { id: "jee-8-c", text: "Nylon-6,6" },
      { id: "jee-8-d", text: "Teflon" },
    ],
    correctAnswer: "jee-8-c",
  },
  {
    id: "jee-9",
    subject: "Mathematics",
    question: "The value of ∫₀^π sin⁴x dx is:",
    options: [
      { id: "jee-9-a", text: "π/4" },
      { id: "jee-9-b", text: "3π/8" },
      { id: "jee-9-c", text: "π/2" },
      { id: "jee-9-d", text: "3π/4" },
    ],
    correctAnswer: "jee-9-b",
  },
  {
    id: "jee-10",
    subject: "Physics",
    question: "The electric field inside a charged conducting spherical shell is:",
    options: [
      { id: "jee-10-a", text: "Directly proportional to distance from center" },
      { id: "jee-10-b", text: "Inversely proportional to distance from center" },
      { id: "jee-10-c", text: "Zero" },
      { id: "jee-10-d", text: "Constant but non-zero" },
    ],
    correctAnswer: "jee-10-c",
  },
];

// NEET Questions (10 questions)
const neetQuestions = [
  {
    id: "neet-1",
    subject: "Biology",
    question: "Which of the following organelles is known as the 'powerhouse of the cell'?",
    options: [
      { id: "neet-1-a", text: "Ribosome" },
      { id: "neet-1-b", text: "Golgi apparatus" },
      { id: "neet-1-c", text: "Mitochondria" },
      { id: "neet-1-d", text: "Endoplasmic reticulum" },
    ],
    correctAnswer: "neet-1-c",
  },
  {
    id: "neet-2",
    subject: "Chemistry",
    question: "Which of the following is not an amino acid?",
    options: [
      { id: "neet-2-a", text: "Glycine" },
      { id: "neet-2-b", text: "Alanine" },
      { id: "neet-2-c", text: "Glucose" },
      { id: "neet-2-d", text: "Lysine" },
    ],
    correctAnswer: "neet-2-c",
  },
  {
    id: "neet-3",
    subject: "Physics",
    question: "Myopia (nearsightedness) can be corrected using:",
    options: [
      { id: "neet-3-a", text: "Convex lens" },
      { id: "neet-3-b", text: "Concave lens" },
      { id: "neet-3-c", text: "Cylindrical lens" },
      { id: "neet-3-d", text: "Bifocal lens" },
    ],
    correctAnswer: "neet-3-b",
  },
  {
    id: "neet-4",
    subject: "Biology",
    question: "In humans, the normal blood glucose level is:",
    options: [
      { id: "neet-4-a", text: "80-100 mg/dL" },
      { id: "neet-4-b", text: "100-150 mg/dL" },
      { id: "neet-4-c", text: "150-200 mg/dL" },
      { id: "neet-4-d", text: "70-120 mg/dL" },
    ],
    correctAnswer: "neet-4-d",
  },
  {
    id: "neet-5",
    subject: "Chemistry",
    question: "The pH of human blood under normal conditions is:",
    options: [
      { id: "neet-5-a", text: "6.4" },
      { id: "neet-5-b", text: "7.0" },
      { id: "neet-5-c", text: "7.4" },
      { id: "neet-5-d", text: "8.0" },
    ],
    correctAnswer: "neet-5-c",
  },
  {
    id: "neet-6",
    subject: "Biology",
    question: "The human heart normally beats at what rate per minute?",
    options: [
      { id: "neet-6-a", text: "50-60" },
      { id: "neet-6-b", text: "60-80" },
      { id: "neet-6-c", text: "70-90" },
      { id: "neet-6-d", text: "90-120" },
    ],
    correctAnswer: "neet-6-b",
  },
  {
    id: "neet-7",
    subject: "Chemistry",
    question: "Which of the following is a reducing sugar?",
    options: [
      { id: "neet-7-a", text: "Sucrose" },
      { id: "neet-7-b", text: "Glucose" },
      { id: "neet-7-c", text: "Starch" },
      { id: "neet-7-d", text: "Cellulose" },
    ],
    correctAnswer: "neet-7-b",
  },
  {
    id: "neet-8",
    subject: "Physics",
    question: "The SI unit of pressure is:",
    options: [
      { id: "neet-8-a", text: "Newton" },
      { id: "neet-8-b", text: "Pascal" },
      { id: "neet-8-c", text: "Joule" },
      { id: "neet-8-d", text: "Watt" },
    ],
    correctAnswer: "neet-8-b",
  },
  {
    id: "neet-9",
    subject: "Biology",
    question: "Which of the following is not a function of the liver?",
    options: [
      { id: "neet-9-a", text: "Detoxification" },
      { id: "neet-9-b", text: "Oxygen transport" },
      { id: "neet-9-c", text: "Bile production" },
      { id: "neet-9-d", text: "Glycogen storage" },
    ],
    correctAnswer: "neet-9-b",
  },
  {
    id: "neet-10",
    subject: "Chemistry",
    question: "Which vitamin is essential for blood clotting?",
    options: [
      { id: "neet-10-a", text: "Vitamin A" },
      { id: "neet-10-b", text: "Vitamin C" },
      { id: "neet-10-c", text: "Vitamin D" },
      { id: "neet-10-d", text: "Vitamin K" },
    ],
    correctAnswer: "neet-10-d",
  },
];

// UPSC Questions (10 questions)
const upscQuestions = [
  {
    id: "upsc-1",
    subject: "History",
    question: "The Battle of Plassey was fought in:",
    options: [
      { id: "upsc-1-a", text: "1757" },
      { id: "upsc-1-b", text: "1761" },
      { id: "upsc-1-c", text: "1764" },
      { id: "upsc-1-d", text: "1769" },
    ],
    correctAnswer: "upsc-1-a",
  },
  {
    id: "upsc-2",
    subject: "Geography",
    question: "Which is the longest river in India?",
    options: [
      { id: "upsc-2-a", text: "Brahmaputra" },
      { id: "upsc-2-b", text: "Ganga" },
      { id: "upsc-2-c", text: "Yamuna" },
      { id: "upsc-2-d", text: "Godavari" },
    ],
    correctAnswer: "upsc-2-b",
  },
  {
    id: "upsc-3",
    subject: "Polity",
    question: "Who is known as the 'Father of the Indian Constitution'?",
    options: [
      { id: "upsc-3-a", text: "Mahatma Gandhi" },
      { id: "upsc-3-b", text: "Jawaharlal Nehru" },
      { id: "upsc-3-c", text: "B.R. Ambedkar" },
      { id: "upsc-3-d", text: "Sardar Patel" },
    ],
    correctAnswer: "upsc-3-c",
  },
  {
    id: "upsc-4",
    subject: "Economics",
    question: "Which Five Year Plan is currently in operation in India?",
    options: [
      { id: "upsc-4-a", text: "11th Five Year Plan" },
      { id: "upsc-4-b", text: "12th Five Year Plan" },
      { id: "upsc-4-c", text: "13th Five Year Plan" },
      { id: "upsc-4-d", text: "None - Five Year Plans have been replaced by NITI Aayog" },
    ],
    correctAnswer: "upsc-4-d",
  },
  {
    id: "upsc-5",
    subject: "Current Affairs",
    question: "Which state in India has the highest literacy rate?",
    options: [
      { id: "upsc-5-a", text: "Tamil Nadu" },
      { id: "upsc-5-b", text: "Kerala" },
      { id: "upsc-5-c", text: "Mizoram" },
      { id: "upsc-5-d", text: "Goa" },
    ],
    correctAnswer: "upsc-5-b",
  },
  {
    id: "upsc-6",
    subject: "Environment",
    question: "Which of these is not a greenhouse gas?",
    options: [
      { id: "upsc-6-a", text: "Carbon dioxide" },
      { id: "upsc-6-b", text: "Methane" },
      { id: "upsc-6-c", text: "Nitrogen" },
      { id: "upsc-6-d", text: "Water vapor" },
    ],
    correctAnswer: "upsc-6-c",
  },
  {
    id: "upsc-7",
    subject: "Science & Tech",
    question: "Who developed the polio vaccine?",
    options: [
      { id: "upsc-7-a", text: "Louis Pasteur" },
      { id: "upsc-7-b", text: "Jonas Salk" },
      { id: "upsc-7-c", text: "Alexander Fleming" },
      { id: "upsc-7-d", text: "Edward Jenner" },
    ],
    correctAnswer: "upsc-7-b",
  },
  {
    id: "upsc-8",
    subject: "Art & Culture",
    question: "Kathakali is a classical dance form of which state?",
    options: [
      { id: "upsc-8-a", text: "Tamil Nadu" },
      { id: "upsc-8-b", text: "Odisha" },
      { id: "upsc-8-c", text: "Kerala" },
      { id: "upsc-8-d", text: "Karnataka" },
    ],
    correctAnswer: "upsc-8-c",
  },
  {
    id: "upsc-9",
    subject: "History",
    question: "The Quit India Movement was launched in:",
    options: [
      { id: "upsc-9-a", text: "1930" },
      { id: "upsc-9-b", text: "1942" },
      { id: "upsc-9-c", text: "1947" },
      { id: "upsc-9-d", text: "1940" },
    ],
    correctAnswer: "upsc-9-b",
  },
  {
    id: "upsc-10",
    subject: "Polity",
    question: "How many fundamental rights are originally provided by the Indian Constitution?",
    options: [
      { id: "upsc-10-a", text: "Six" },
      { id: "upsc-10-b", text: "Seven" },
      { id: "upsc-10-c", text: "Five" },
      { id: "upsc-10-d", text: "Eight" },
    ],
    correctAnswer: "upsc-10-b",
  },
];

// Other exam questions sets would go here
const catQuestions = [
  // 10 CAT questions similar to above format
  {
    id: "cat-1",
    subject: "Quantitative Ability",
    question: "If x² + y² = 29 and xy = 10, then what is the value of (x-y)²?",
    options: [
      { id: "cat-1-a", text: "9" },
      { id: "cat-1-b", text: "16" },
      { id: "cat-1-c", text: "25" },
      { id: "cat-1-d", text: "49" },
    ],
    correctAnswer: "cat-1-a",
  },
  // ... more CAT questions
];

const gateQuestions = [
  // 10 GATE questions similar to above format
  {
    id: "gate-1",
    subject: "Computer Science",
    question: "What is the time complexity of the best algorithm for finding the shortest path from a single source to all vertices in a graph with non-negative edge weights?",
    options: [
      { id: "gate-1-a", text: "O(E log V)" },
      { id: "gate-1-b", text: "O(V²)" },
      { id: "gate-1-c", text: "O(V + E)" },
      { id: "gate-1-d", text: "O(VE)" },
    ],
    correctAnswer: "gate-1-a",
  },
  // ... more GATE questions
];

const bankQuestions = [
  // 10 Bank exam questions similar to above format
  {
    id: "bank-1",
    subject: "Numerical Ability",
    question: "A person borrows ₹10,000 at 8% simple interest per annum. How much does he need to pay after 3 years?",
    options: [
      { id: "bank-1-a", text: "₹10,800" },
      { id: "bank-1-b", text: "₹12,400" },
      { id: "bank-1-c", text: "₹12,000" },
      { id: "bank-1-d", text: "₹12,800" },
    ],
    correctAnswer: "bank-1-b",
  },
  // ... more Bank exam questions
];

// Map exam types to their respective questions
const examQuestionsMap = {
  "iit-jee": iitJeeQuestions,
  "neet": neetQuestions,
  "upsc": upscQuestions,
  "cat": catQuestions,
  "gate": gateQuestions,
  "bank": bankQuestions,
};

// Custom progress component for better visual presentation
const CustomProgress = ({ value, className }) => {
  return (
    <div className={cn("relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden", className)}>
      <div 
        className="h-full bg-gradient-to-r from-sky-500 to-violet-500 rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

// Main component
const ExamReadinessAnalyzer = ({ onClose }) => {
  const { toast } = useToast();
  const [step, setStep] = useState("select-exam");
  const [selectedExam, setSelectedExam] = useState(null);
  const [profileAnswers, setProfileAnswers] = useState({});
  const [examAnswers, setExamAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [questionsCompleted, setQuestionsCompleted] = useState(0);

  // Set up questions based on selected exam
  useEffect(() => {
    if (selectedExam) {
      const questions = examQuestionsMap[selectedExam?.id] || [];
      setTotalQuestions(questions.length);
    }
  }, [selectedExam]);

  // Handle exam selection
  const handleExamSelect = (exam) => {
    setSelectedExam(exam);
    setStep("profile-questions");
  };

  // Handle profile question answers
  const handleProfileAnswer = (questionId, answerId) => {
    setProfileAnswers({
      ...profileAnswers,
      [questionId]: answerId,
    });
  };

  // Check if all profile questions are answered
  const allProfileQuestionsAnswered = () => {
    return profileQuestions.every((q) => profileAnswers[q.id]);
  };

  // Begin the exam
  const handleStartExam = () => {
    if (allProfileQuestionsAnswered()) {
      setStep("exam");
      setCurrentQuestionIndex(0);
    } else {
      toast({
        title: "Please answer all questions",
        description: "We need this information to tailor your assessment.",
        variant: "destructive",
      });
    }
  };

  // Handle exam question answers
  const handleExamAnswer = (questionId, answerId) => {
    setExamAnswers({
      ...examAnswers,
      [questionId]: answerId,
    });
  };

  // Navigate to next question
  const handleNextQuestion = () => {
    const questions = examQuestionsMap[selectedExam?.id] || [];
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setQuestionsCompleted(questionsCompleted + 1);
    } else {
      calculateScore();
      setStep("results");
    }
  };

  // Navigate to previous question
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Calculate score and generate recommendations
  const calculateScore = () => {
    const questions = examQuestionsMap[selectedExam?.id] || [];
    let correct = 0;

    questions.forEach((q) => {
      if (examAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const finalScore = (correct / questions.length) * 100;
    setScore(finalScore);

    // Generate recommendations based on score
    if (finalScore < 40) {
      setRecommendations([
        "Build a strong foundation in key concepts",
        "Focus on understanding rather than memorization",
        "Begin with basic practice problems before advancing",
        "Consider a structured study plan with regular assessments"
      ]);
    } else if (finalScore < 70) {
      setRecommendations([
        "Strengthen your knowledge in specific weak areas",
        "Practice more problem-solving with medium difficulty",
        "Review concepts regularly and take practice tests",
        "Consider joining a study group for collaborative learning"
      ]);
    } else {
      setRecommendations([
        "Focus on advanced problem-solving techniques",
        "Take full-length mock tests under timed conditions",
        "Revise complex topics and edge cases",
        "Work on speed and accuracy with challenging problems"
      ]);
    }
  };

  // Reset the assessment
  const handleReset = () => {
    setStep("select-exam");
    setSelectedExam(null);
    setProfileAnswers({});
    setExamAnswers({});
    setCurrentQuestionIndex(0);
    setScore(null);
    setRecommendations([]);
    setQuestionsCompleted(0);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-white/10 dark:border-gray-800"
      >
        {/* Header with close button */}
        <div className="bg-gradient-to-r from-sky-600 to-violet-600 text-white p-5 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Exam Readiness Analyzer</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-6 pt-5">
          <div className="mb-3 flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>
              {step === "select-exam" && "Step 1: Select Exam"}
              {step === "profile-questions" && "Step 2: Your Profile"}
              {step === "exam" && "Step 3: Assessment"}
              {step === "results" && "Step 4: Results"}
            </span>
            <span>
              {step === "exam" && `Question ${currentQuestionIndex + 1}/${totalQuestions}`}
            </span>
          </div>

          <CustomProgress
            value={
              step === "select-exam" ? 25 :
              step === "profile-questions" ? 50 :
              step === "exam" ? 50 + ((currentQuestionIndex + 1) / totalQuestions) * 25 :
              step === "results" ? 100 : 0
            }
            className="mb-5"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* Exam Selection */}
            {step === "select-exam" && (
              <motion.div
                key="select-exam"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-2xl font-semibold mb-6 text-center">
                  Which exam are you preparing for?
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {examTypes.map((exam) => (
                    <motion.div
                      key={exam.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleExamSelect(exam)}
                      className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-xl transition-all text-center"
                    >
                      <div
                        className={`w-16 h-16 rounded-full ${exam.color} flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-md`}
                      >
                        {exam.icon}
                      </div>
                      <h4 className="font-medium text-lg">{exam.name}</h4>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Profile Questions */}
            {step === "profile-questions" && (
              <motion.div
                key="profile-questions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center mb-8">
                  <div className="mr-4">
                    <div className={`w-14 h-14 rounded-full ${selectedExam.color} flex items-center justify-center text-white text-2xl shadow-md`}>
                      {selectedExam.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">
                      {selectedExam.name} Assessment
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Let's understand your preparation level
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  {profileQuestions.map((question) => (
                    <div key={question.id} className="bg-gray-50 dark:bg-gray-800/70 rounded-lg p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                      <h4 className="font-semibold mb-4 text-lg">{question.question}</h4>
                      <RadioGroup
                        value={profileAnswers[question.id] || ""}
                        onValueChange={(value) => handleProfileAnswer(question.id, value)}
                      >
                        <div className="space-y-3">
                          {question.options.map((option) => (
                            <div
                              key={option.id}
                              className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${
                                profileAnswers[question.id] === option.id
                                  ? "bg-sky-50 border border-sky-200 dark:bg-sky-900/30 dark:border-sky-700 shadow-md"
                                  : "bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                              }`}
                            >
                              <RadioGroupItem
                                value={option.id}
                                id={option.id}
                                className="mr-3"
                              />
                              <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                                {option.text}
                              </Label>
                              {profileAnswers[question.id] === option.id && (
                                <Check className="text-sky-500 ml-2" size={16} />
                              )}
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  ))}

                  <Button
                    onClick={handleStartExam}
                    className="w-full bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 text-lg py-6 mt-6 shadow-lg"
                  >
                    Start Assessment <ArrowRight className="ml-2" size={18} />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Exam Questions */}
            {step === "exam" && selectedExam && (
              <motion.div
                key="exam-questions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {(() => {
                  const questions = examQuestionsMap[selectedExam.id] || [];
                  const currentQuestion = questions[currentQuestionIndex];

                  if (!currentQuestion) return null;

                  return (
                    <div>
                      <div className="flex items-center mb-6">
                        <Badge className={`${selectedExam.color} text-white mr-3 px-3 py-1 text-sm`}>
                          {currentQuestion.subject}
                        </Badge>
                        <h3 className="text-xl font-semibold">Question {currentQuestionIndex + 1}</h3>
                      </div>

                      <Card className="mb-8 shadow-lg border-gray-200 dark:border-gray-700">
                        <CardContent className="pt-6">
                          <p className="text-lg mb-6">{currentQuestion.question}</p>
                          
                          <RadioGroup
                            value={examAnswers[currentQuestion.id] || ""}
                            onValueChange={(value) => handleExamAnswer(currentQuestion.id, value)}
                            className="space-y-3"
                          >
                            {currentQuestion.options.map((option) => (
                              <div
                                key={option.id}
                                className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${
                                  examAnswers[currentQuestion.id] === option.id
                                    ? "bg-sky-50 border border-sky-200 dark:bg-sky-900/30 dark:border-sky-700 shadow-md"
                                    : "bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                }`}
                              >
                                <RadioGroupItem
                                  value={option.id}
                                  id={option.id}
                                  className="mr-3"
                                />
                                <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                                  {option.text}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </CardContent>
                      </Card>

                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          onClick={handlePrevQuestion}
                          disabled={currentQuestionIndex === 0}
                          className="flex items-center border-gray-300 dark:border-gray-600"
                        >
                          <ChevronLeft size={16} className="mr-1" /> Previous
                        </Button>
                        <Button
                          onClick={handleNextQuestion}
                          className="bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600"
                        >
                          {currentQuestionIndex < questions.length - 1 ? (
                            <>Next <ChevronRight size={16} className="ml-1" /></>
                          ) : (
                            <>Finish <Check size={16} className="ml-1" /></>
                          )}
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}

            {/* Results */}
            {step === "results" && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-center mb-8">
                  <div className={`w-24 h-24 ${
                    score < 40 ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300" :
                    score < 70 ? "bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-300" :
                    "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300"
                  } rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner`}>
                    <span className="text-3xl font-bold">{Math.round(score)}%</span>
                  </div>
                  <h3 className="text-2xl font-semibold">
                    {score < 40 ? "Keep Going!" : 
                     score < 70 ? "Good Progress!" : 
                     "Excellent Work!"}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
                    {score < 40 ? "You're just getting started. Let's build a solid foundation." :
                     score < 70 ? "You're making good progress. Let's focus on the weak areas." : 
                     "You're doing fantastic! Let's master advanced concepts."}
                  </p>
                </div>

                <Card className="mb-6 shadow-lg border-gray-200 dark:border-gray-700">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-4 text-lg">Our Recommendations</h4>
                    <ul className="space-y-3">
                      {recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start">
                          <div className="bg-sky-100 dark:bg-sky-900/30 p-1 rounded-full mr-3 mt-0.5">
                            <Check className="text-sky-600 dark:text-sky-400" size={14} />
                          </div>
                          <span>{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <Button 
                    variant="outline"
                    onClick={handleReset}
                    className="border-gray-300 dark:border-gray-600"
                  >
                    Try Another Exam
                  </Button>
                  <Link to="/signup" className="w-full sm:w-auto">
                    <Button className="w-full bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600">
                      Create Your Study Plan <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ExamReadinessAnalyzer;
