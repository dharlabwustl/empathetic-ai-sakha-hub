
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ChevronRight, 
  CheckCircle, 
  BookOpen,
  Clock,
  Brain,
  AlertCircle,
  Award,
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Link } from "react-router-dom";

interface ExamReadinessAnalyzerProps {
  onClose: () => void;
}

type ExamType = "UPSC" | "NEET" | "JEE" | "Banking" | "CLAT" | "MBA" | "CUET";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer?: number;
}

const examQuestions: Record<ExamType, Question[]> = {
  "UPSC": [
    {
      id: 1,
      text: "Which of the following is NOT a Fundamental Right guaranteed by the Indian Constitution?",
      options: [
        "Right to Freedom of Religion",
        "Right to Property",
        "Right to Equality",
        "Right to Constitutional Remedies"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      text: "Which of the following committees recommended the Panchayati Raj system in India?",
      options: [
        "Ashok Mehta Committee",
        "Balwant Rai Mehta Committee",
        "Narasimham Committee",
        "Sarkaria Commission"
      ],
      correctAnswer: 1
    },
  ],
  "NEET": [
    {
      id: 1,
      text: "Which of the following organelles is responsible for cellular respiration?",
      options: [
        "Ribosomes",
        "Golgi apparatus",
        "Mitochondria",
        "Endoplasmic reticulum"
      ],
      correctAnswer: 2
    },
    {
      id: 2, 
      text: "A body of mass 2 kg is moving with a velocity of 10 m/s. What is its kinetic energy?",
      options: [
        "100 J",
        "200 J",
        "20 J",
        "10 J"
      ],
      correctAnswer: 0
    },
  ],
  "JEE": [
    {
      id: 1,
      text: "If the sum of the roots of the quadratic equation ax² + bx + c = 0 is equal to the product of its roots, then:",
      options: [
        "b = c",
        "a = c",
        "a + c = 0",
        "b + c = 0"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      text: "The unit vector perpendicular to both vec{i} + vec{j} and vec{j} + vec{k} is:",
      options: [
        "(vec{i} - vec{k})/√2",
        "(vec{i} + vec{k})/√2",
        "(vec{i} - vec{j})/√2",
        "(vec{j} - vec{k})/√2"
      ],
      correctAnswer: 0
    },
  ],
  "Banking": [
    {
      id: 1,
      text: "What is the minimum percentage of its demand and time liabilities that a bank has to maintain as Cash Reserve Ratio (CRR)?",
      options: [
        "3%",
        "4%",
        "6%",
        "8%"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      text: "If a train travels at 50 kmph, it reaches its destination late by 1 hour. If it travels at 60 kmph, it is late by 40 minutes. Find the distance of the journey.",
      options: [
        "300 km",
        "350 km",
        "400 km",
        "450 km"
      ],
      correctAnswer: 1
    },
  ],
  "CLAT": [
    {
      id: 1,
      text: "Principle: Ignorance of law is no excuse. Fact: X was unaware about the law which prohibited the use of mobile phones while driving. He was caught using his phone while driving. X pleads he didn't know about such law. Which of the following is correct?",
      options: [
        "X will be excused as he was unaware",
        "X will not be excused as ignorance of law is no excuse",
        "X will be partially excused",
        "X will be excused if it was his first offense"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      text: "The principle of 'res ipsa loquitur' is related to which area of law?",
      options: [
        "Constitutional Law",
        "Criminal Law",
        "Law of Torts",
        "Contract Law"
      ],
      correctAnswer: 2
    },
  ],
  "MBA": [
    {
      id: 1,
      text: "If REASON is coded as 5, and BELIEVED as 8, then what would be the code for GOVERNMENT?",
      options: [
        "9",
        "10",
        "7",
        "6"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      text: "A company sold 30% more products this year than last year. If the sales were valued at $1.3 million last year, what is the value of this year's sales?",
      options: [
        "$1.69 million",
        "$1.6 million",
        "$1.9 million",
        "$1.39 million"
      ],
      correctAnswer: 0
    },
  ],
  "CUET": [
    {
      id: 1,
      text: "Choose the most appropriate meaning of the idiom: 'To call a spade a spade'",
      options: [
        "To be outspoken",
        "To be diplomatic",
        "To be blunt and direct",
        "To be dishonest"
      ],
      correctAnswer: 2
    },
    {
      id: 2,
      text: "Which of the following gases has the highest percentage in the Earth's atmosphere?",
      options: [
        "Oxygen",
        "Carbon Dioxide",
        "Nitrogen",
        "Argon"
      ],
      correctAnswer: 2
    },
  ]
};

// Profile questions common for all exams
const profileQuestions = [
  {
    id: 1,
    question: "Have you attempted this exam before?",
    options: ["Yes", "No"]
  },
  {
    id: 2,
    question: "Are you attending coaching for this exam?",
    options: ["Yes, regular coaching", "Yes, occasional classes", "Self-study with online resources", "Completely self-study"]
  },
  {
    id: 3,
    question: "What subjects are you most confident in?",
    multi: true
  },
  {
    id: 4,
    question: "How would you rate your current stress level regarding the exam?",
    slider: true,
    min: 1,
    max: 10
  },
  {
    id: 5,
    question: "How many hours do you study daily on average?",
    options: ["Less than 2 hours", "2-4 hours", "4-6 hours", "More than 6 hours"]
  }
];

const examSubjects: Record<ExamType, string[]> = {
  "UPSC": ["History", "Geography", "Polity", "Economics", "Science", "Current Affairs"],
  "NEET": ["Physics", "Chemistry", "Biology", "Botany", "Zoology"],
  "JEE": ["Physics", "Chemistry", "Mathematics"],
  "Banking": ["Quantitative Aptitude", "Reasoning", "English", "General Awareness", "Computer Knowledge"],
  "CLAT": ["Legal Reasoning", "Logical Reasoning", "English", "Current Affairs", "Quantitative Techniques"],
  "MBA": ["Verbal Ability", "Data Interpretation", "Logical Reasoning", "Quantitative Aptitude"],
  "CUET": ["Language", "Domain Knowledge", "General Test"]
};

const ExamReadinessAnalyzer = ({ onClose }: ExamReadinessAnalyzerProps) => {
  const [step, setStep] = useState(1);
  const [selectedExam, setSelectedExam] = useState<ExamType | null>(null);
  const [profileAnswers, setProfileAnswers] = useState<Record<number, any>>({});
  const [examAnswers, setExamAnswers] = useState<Record<number, number>>({});
  const [confidenceLevel, setConfidenceLevel] = useState(60);
  
  const [readinessScore, setReadinessScore] = useState(0);
  const [strengths, setStrengths] = useState<string[]>([]);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const handleSelectExam = (exam: ExamType) => {
    setSelectedExam(exam);
    setStep(2);
  };

  const handleProfileAnswer = (questionId: number, answer: any) => {
    setProfileAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleExamAnswer = (questionId: number, optionIndex: number) => {
    setExamAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleNextStep = () => {
    if (step === 2) {
      // Check if all profile questions are answered
      const profileQuestionCount = profileQuestions.length;
      if (Object.keys(profileAnswers).length >= profileQuestionCount - 1) {
        setStep(3);
      }
    } else if (step === 3) {
      // Calculate readiness score and generate report
      calculateReadinessScore();
      setStep(4);
    }
  };

  const calculateReadinessScore = () => {
    // This would be more complex in a real implementation
    let score = 0;
    let correctAnswers = 0;
    
    // Calculate correct answers
    if (selectedExam) {
      examQuestions[selectedExam].forEach(q => {
        if (examAnswers[q.id] === q.correctAnswer) {
          correctAnswers++;
        }
      });
    }
    
    // Calculate score based on correct answers (50% of total)
    score += (correctAnswers / 2) * 50;
    
    // Add score based on study hours (20% of total)
    const studyHoursAnswer = profileAnswers[5];
    if (studyHoursAnswer === "More than 6 hours") {
      score += 20;
    } else if (studyHoursAnswer === "4-6 hours") {
      score += 15;
    } else if (studyHoursAnswer === "2-4 hours") {
      score += 10;
    } else {
      score += 5;
    }
    
    // Add score based on coaching (10% of total)
    const coachingAnswer = profileAnswers[2];
    if (coachingAnswer === "Yes, regular coaching") {
      score += 10;
    } else if (coachingAnswer === "Yes, occasional classes") {
      score += 8;
    } else if (coachingAnswer === "Self-study with online resources") {
      score += 6;
    } else {
      score += 4;
    }
    
    // Add score based on confidence level (20% of total)
    score += (confidenceLevel / 100) * 20;
    
    // Set the final score
    setReadinessScore(Math.round(score));
    
    // Set strengths and weaknesses (would be more sophisticated in real implementation)
    if (selectedExam) {
      const subjects = examSubjects[selectedExam];
      setStrengths([subjects[0], subjects[2]]);
      setWeaknesses([subjects[1], subjects[3] || subjects[1]]);
    }
    
    // Set recommendations
    setRecommendations([
      "Increase daily study hours by 1-2 hours",
      "Focus on weak areas with targeted practice",
      "Take more mock tests to improve time management",
      "Join a study group for peer learning"
    ]);
  };

  const renderExamSelector = () => (
    <div className="p-6 md:p-10">
      <h2 className="text-2xl md:text-3xl font-bold text-violet-800 mb-6">Select Your Exam</h2>
      <p className="text-gray-600 mb-8">
        Choose the exam you're preparing for to receive a personalized readiness assessment.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(Object.keys(examQuestions) as ExamType[]).map((exam) => (
          <button
            key={exam}
            onClick={() => handleSelectExam(exam)}
            className="p-6 border border-purple-100 rounded-lg hover:bg-purple-50 transition-colors text-left"
          >
            <h3 className="text-xl font-semibold text-violet-700">{exam}</h3>
            <p className="text-gray-500 text-sm mt-2">{examSubjects[exam].join(", ")}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-purple-600 font-medium">Select</span>
              <ChevronRight size={16} className="text-purple-600" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderProfileQuestions = () => (
    <div className="p-6 md:p-10">
      <h2 className="text-2xl md:text-3xl font-bold text-violet-800 mb-2">Your Profile</h2>
      <p className="text-gray-600 mb-8">
        Help us understand your current preparation level for {selectedExam}.
      </p>
      
      <div className="space-y-8">
        {profileQuestions.map((q) => (
          <div key={q.id} className="border-b border-gray-100 pb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">{q.question}</h3>
            
            {q.slider ? (
              <div className="space-y-4">
                <Slider
                  defaultValue={[5]}
                  max={10}
                  step={1}
                  onValueChange={(value) => {
                    handleProfileAnswer(q.id, value[0]);
                    setConfidenceLevel(value[0] * 10);
                  }}
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Low Stress</span>
                  <span>High Stress</span>
                </div>
                {profileAnswers[q.id] && (
                  <p className="text-sm text-violet-600 font-medium">
                    Stress level: {profileAnswers[q.id]}/10
                  </p>
                )}
              </div>
            ) : q.multi ? (
              <div className="space-y-2">
                {selectedExam && examSubjects[selectedExam].map((subject, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`subject-${index}`}
                      className="w-4 h-4 text-violet-600 rounded"
                      onChange={(e) => {
                        const currentSubjects = profileAnswers[q.id] || [];
                        if (e.target.checked) {
                          handleProfileAnswer(q.id, [...currentSubjects, subject]);
                        } else {
                          handleProfileAnswer(
                            q.id,
                            currentSubjects.filter((s: string) => s !== subject)
                          );
                        }
                      }}
                    />
                    <label htmlFor={`subject-${index}`} className="ml-2 text-gray-700">
                      {subject}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <RadioGroup
                onValueChange={(value) => handleProfileAnswer(q.id, value)}
                className="space-y-2"
              >
                {q.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`q${q.id}-option${index}`} />
                    <Label htmlFor={`q${q.id}-option${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-10">
        <Button
          onClick={handleNextStep}
          className="bg-violet-600 hover:bg-violet-700 text-white w-full"
          disabled={Object.keys(profileAnswers).length < 3}
        >
          Continue to Mini Test <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>
    </div>
  );

  const renderExamQuestions = () => (
    <div className="p-6 md:p-10">
      <h2 className="text-2xl md:text-3xl font-bold text-violet-800 mb-2">Mini Readiness Test</h2>
      <p className="text-gray-600 mb-8">
        Answer these sample questions to help us assess your preparation level.
      </p>
      
      {selectedExam && (
        <div className="space-y-10">
          {examQuestions[selectedExam].map((question, index) => (
            <div key={question.id} className="border-b border-gray-100 pb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                <span className="text-violet-600 font-bold mr-2">Q{index + 1}.</span> 
                {question.text}
              </h3>
              
              <RadioGroup
                onValueChange={(value) => handleExamAnswer(question.id, parseInt(value))}
                className="space-y-3"
              >
                {question.options.map((option, optIndex) => (
                  <div 
                    key={optIndex} 
                    className={`border rounded-lg p-4 transition-colors ${
                      examAnswers[question.id] === optIndex 
                        ? 'border-violet-500 bg-violet-50' 
                        : 'border-gray-200 hover:border-violet-300'
                    }`}
                  >
                    <RadioGroupItem 
                      value={optIndex.toString()} 
                      id={`q${question.id}-opt${optIndex}`} 
                      className="sr-only"
                    />
                    <Label 
                      htmlFor={`q${question.id}-opt${optIndex}`}
                      className="flex items-center cursor-pointer"
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                        examAnswers[question.id] === optIndex 
                          ? 'bg-violet-500 text-white' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-10">
        <Button
          onClick={handleNextStep}
          className="bg-violet-600 hover:bg-violet-700 text-white w-full"
          disabled={Object.keys(examAnswers).length < (selectedExam ? examQuestions[selectedExam].length : 0)}
        >
          Calculate My Readiness <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>
    </div>
  );

  const renderReadinessReport = () => (
    <div className="p-6 md:p-10">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-violet-800 mb-2">Your Exam Readiness Report</h2>
        <p className="text-gray-600">
          Based on your profile and test performance, here's your personalized assessment.
        </p>
      </div>
      
      <div className="bg-purple-50 rounded-xl p-6 mb-8">
        <div className="flex flex-col items-center">
          <div className="relative mb-2">
            <div className="w-32 h-32 rounded-full flex items-center justify-center bg-white border-8 border-purple-100">
              <span className="text-3xl font-bold text-violet-700">{readinessScore}%</span>
            </div>
            <div className="absolute -right-2 -top-2 bg-violet-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold">
              {selectedExam}
            </div>
          </div>
          <p className="text-lg font-semibold text-violet-800">
            {readinessScore < 40 ? 'Getting Started' : 
             readinessScore < 70 ? 'Making Progress' : 'Well Prepared'}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border border-green-100 rounded-lg p-6 bg-green-50">
          <div className="flex items-center mb-4">
            <CheckCircle className="text-green-500 mr-2" />
            <h3 className="text-lg font-semibold text-green-700">Your Strengths</h3>
          </div>
          <ul className="space-y-2">
            {strengths.map((strength, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border border-red-100 rounded-lg p-6 bg-red-50">
          <div className="flex items-center mb-4">
            <AlertCircle className="text-red-500 mr-2" />
            <h3 className="text-lg font-semibold text-red-700">Areas to Improve</h3>
          </div>
          <ul className="space-y-2">
            {weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                <span>{weakness}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="border border-violet-100 rounded-lg p-6 mb-8">
        <div className="flex items-center mb-4">
          <Brain className="text-violet-600 mr-2" />
          <h3 className="text-lg font-semibold text-violet-700">Recommendations</h3>
        </div>
        <ul className="space-y-3">
          {recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start">
              <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center text-violet-700 font-medium mr-2 mt-0.5">
                {index + 1}
              </div>
              <span>{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Get Your Full Study Plan</h3>
            <p className="mb-4 md:mb-0">
              Sign up now to access your complete personalized study strategy and AI-powered tools.
            </p>
          </div>
          <Button 
            className="bg-white text-violet-700 hover:bg-gray-100"
            asChild
          >
            <Link to="/signup">
              Sign Up Free <ArrowRight size={16} className="ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          <div className="flex justify-between items-center border-b border-gray-100 p-4 md:p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center mr-3">
                <BookOpen size={18} />
              </div>
              <div>
                <h2 className="font-bold text-xl text-violet-800">Exam Readiness Analyzer</h2>
                <p className="text-sm text-gray-500">Step {step} of 4</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X size={20} />
            </Button>
          </div>
          
          <div className="px-4 py-2 bg-violet-50 border-b border-violet-100">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-violet-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
            {step === 1 && renderExamSelector()}
            {step === 2 && renderProfileQuestions()}
            {step === 3 && renderExamQuestions()}
            {step === 4 && renderReadinessReport()}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExamReadinessAnalyzer;
