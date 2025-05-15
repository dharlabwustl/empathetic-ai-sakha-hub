
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { X, Check, AlertTriangle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface Question {
  id: string;
  text: string;
  options: string[];
  subject: string;
  difficulty: "easy" | "medium" | "hard";
}

interface ResultSummary {
  score: number;
  readinessPercentage: number;
  correctAnswers: number;
  totalQuestions: number;
  breakdown: {
    physics: number;
    chemistry: number;
    biology: number;
  };
  recommendations: string[];
}

interface ExamReadinessAnalyzerProps {
  onClose: () => void;
}

// NEET-specific questions
const neetQuestions: Question[] = [
  // Physics Questions (NEET syllabus-specific)
  {
    id: "p1",
    text: "A bullet of mass 10g is fired horizontally with velocity 150 m/s from a rifle of mass 5 kg. The recoil velocity of the rifle will be:",
    options: ["0.3 m/s", "0.5 m/s", "1.5 m/s", "3.0 m/s"],
    subject: "physics",
    difficulty: "medium"
  },
  {
    id: "p2",
    text: "The electric field in a region is given by E = 5 x^2 i + 3y j. The electric flux through a square of side 2m in the xy plane will be:",
    options: ["20 N⋅m²/C", "60 N⋅m²/C", "40 N⋅m²/C", "30 N⋅m²/C"],
    subject: "physics",
    difficulty: "hard"
  },
  {
    id: "p3",
    text: "The magnetic field due to a current carrying circular loop of radius R at a point on its axis at a distance x from the center is:",
    options: [
      "B = μ₀I/2 × R²/(x² + R²)^(3/2)",
      "B = μ₀IR²/2 × 1/(x² + R²)^(3/2)",
      "B = μ₀I/2R × 1/(1 + (x/R)²)^(1/2)",
      "B = μ₀IR/2 × 1/(x² + R²)^(1/2)"
    ],
    subject: "physics",
    difficulty: "hard"
  },
  {
    id: "p4",
    text: "In Young's double slit experiment, the fringe width is 0.4 mm. If the entire setup is immersed in water (refractive index = 4/3), the new fringe width will be:",
    options: ["0.3 mm", "0.53 mm", "0.4 mm", "0.45 mm"],
    subject: "physics",
    difficulty: "medium"
  },
  {
    id: "p5",
    text: "A nucleus with mass number 220 at rest emits an alpha particle with kinetic energy 5.5 MeV. The recoil energy of the residual nucleus is approximately:",
    options: ["0.1 MeV", "0.2 MeV", "0.05 MeV", "0.5 MeV"],
    subject: "physics",
    difficulty: "hard"
  },
  
  // Chemistry Questions (NEET syllabus-specific)
  {
    id: "c1",
    text: "Which of the following is the strongest acid?",
    options: ["CH₃COOH", "CF₃COOH", "CCl₃COOH", "CHCl₂COOH"],
    subject: "chemistry",
    difficulty: "medium"
  },
  {
    id: "c2",
    text: "The hybridization of carbon in the carbonate ion (CO₃²⁻) is:",
    options: ["sp", "sp²", "sp³", "dsp²"],
    subject: "chemistry",
    difficulty: "medium"
  },
  {
    id: "c3",
    text: "Which of the following compounds will show optical isomerism?",
    options: ["1,3-dichlorocyclobutane", "1,2-dichlorocyclobutane", "1,1-dichlorocyclobutane", "1,4-dichlorocyclobutane"],
    subject: "chemistry",
    difficulty: "hard"
  },
  {
    id: "c4",
    text: "The IUPAC name of the compound CH₃-CH=CH-CHO is:",
    options: ["Butanal", "But-2-enal", "But-3-enal", "2-Butenal"],
    subject: "chemistry",
    difficulty: "medium"
  },
  {
    id: "c5",
    text: "What is the molarity of H₂SO₄ in a solution prepared by diluting 30 mL of 0.5 M H₂SO₄ to a final volume of 500 mL?",
    options: ["0.03 M", "0.06 M", "0.01 M", "0.02 M"],
    subject: "chemistry",
    difficulty: "easy"
  },
  
  // Biology Questions (NEET syllabus-specific)
  {
    id: "b1",
    text: "Which of the following is NOT a function of the liver?",
    options: ["Production of insulin", "Storage of glycogen", "Production of bile", "Detoxification of drugs"],
    subject: "biology",
    difficulty: "easy"
  },
  {
    id: "b2",
    text: "Gametes in angiosperms are formed by:",
    options: ["Meiosis", "Mitosis", "Amitosis", "Binary fission"],
    subject: "biology",
    difficulty: "easy"
  },
  {
    id: "b3",
    text: "Which of the following is a site for photorespiration?",
    options: ["Peroxisome", "Mitochondria", "Chloroplast", "All of the above"],
    subject: "biology",
    difficulty: "medium"
  },
  {
    id: "b4",
    text: "NADPH required for the biosynthetic processes in cells is produced from:",
    options: ["Glycolysis", "Krebs cycle", "Light reaction of photosynthesis", "Terminal oxidation"],
    subject: "biology",
    difficulty: "medium"
  },
  {
    id: "b5",
    text: "What is the genetic material of Tobacco Mosaic Virus (TMV)?",
    options: ["Single-stranded RNA", "Double-stranded RNA", "Single-stranded DNA", "Double-stranded DNA"],
    subject: "biology",
    difficulty: "medium"
  }
];

// Correct answers lookup (in a real app, this would be secured)
const correctAnswers: Record<string, number> = {
  p1: 0, p2: 1, p3: 1, p4: 0, p5: 0,
  c1: 1, c2: 1, c3: 1, c4: 1, c5: 0,
  b1: 0, b2: 1, b3: 3, b4: 2, b5: 0
};

export function ExamReadinessAnalyzer({ onClose }: ExamReadinessAnalyzerProps) {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [step, setStep] = useState<"intro" | "questions" | "results">("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [results, setResults] = useState<ResultSummary | null>(null);
  const [questionAnimationKey, setQuestionAnimationKey] = useState(0);
  const { toast } = useToast();

  // Generate test questions based on subject
  useEffect(() => {
    if (step === "questions") {
      let filteredQuestions = neetQuestions;
      
      if (selectedSubject !== "all") {
        filteredQuestions = neetQuestions.filter((q) => q.subject === selectedSubject);
      }
      
      // Take a mix of questions with different difficulty levels
      const easyQuestions = filteredQuestions.filter((q) => q.difficulty === "easy").slice(0, 2);
      const mediumQuestions = filteredQuestions.filter((q) => q.difficulty === "medium").slice(0, 3);
      const hardQuestions = filteredQuestions.filter((q) => q.difficulty === "hard").slice(0, 2);
      
      const selectedQuestions = [...easyQuestions, ...mediumQuestions, ...hardQuestions]
        .sort(() => Math.random() - 0.5) // Shuffle
        .slice(0, 7); // Take 7 questions
      
      setCurrentQuestions(selectedQuestions);
      setCurrentQuestionIndex(0);
      setAnswers({});
    }
  }, [step, selectedSubject]);

  const handleStartTest = () => {
    setStep("questions");
  };

  const handleSelectAnswer = (questionId: string, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handlePrevQuestion = () => {
    setQuestionAnimationKey(prev => prev + 1);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    setQuestionAnimationKey(prev => prev + 1);
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate results
      calculateResults();
    }
  };

  const calculateResults = () => {
    // Count correct answers
    let correctCount = 0;
    let physicsCorrect = 0;
    let chemistryCorrect = 0;
    let biologyCorrect = 0;
    
    currentQuestions.forEach((question) => {
      if (answers[question.id] === correctAnswers[question.id]) {
        correctCount++;
        
        if (question.subject === "physics") {
          physicsCorrect++;
        } else if (question.subject === "chemistry") {
          chemistryCorrect++;
        } else if (question.subject === "biology") {
          biologyCorrect++;
        }
      }
    });
    
    const physicsCount = currentQuestions.filter(q => q.subject === "physics").length;
    const chemistryCount = currentQuestions.filter(q => q.subject === "chemistry").length;
    const biologyCount = currentQuestions.filter(q => q.subject === "biology").length;
    
    const totalScore = Math.round((correctCount / currentQuestions.length) * 100);
    
    // Prepare detailed recommendations based on performance
    const recommendations: string[] = [];
    
    // Physics recommendations
    const physicsPercent = physicsCount > 0 ? (physicsCorrect / physicsCount) * 100 : 0;
    if (physicsPercent < 50) {
      recommendations.push("Focus on strengthening your Physics fundamentals, particularly in mechanics and electromagnetism.");
    } else if (physicsPercent < 75) {
      recommendations.push("Your Physics knowledge is good, but practice more numerical problems in optics and modern physics.");
    }
    
    // Chemistry recommendations
    const chemistryPercent = chemistryCount > 0 ? (chemistryCorrect / chemistryCount) * 100 : 0;
    if (chemistryPercent < 50) {
      recommendations.push("Review basic Chemical concepts and periodic table properties. Focus on organic chemistry reactions.");
    } else if (chemistryPercent < 75) {
      recommendations.push("Your Chemistry foundation is solid. Work more on physical chemistry numerical problems.");
    }
    
    // Biology recommendations
    const biologyPercent = biologyCount > 0 ? (biologyCorrect / biologyCount) * 100 : 0;
    if (biologyPercent < 50) {
      recommendations.push("Strengthen your Biology understanding, especially in cell biology and human physiology.");
    } else if (biologyPercent < 75) {
      recommendations.push("Your Biology knowledge is good, but study more on genetics and molecular biology.");
    }
    
    // General recommendations
    if (totalScore < 40) {
      recommendations.push("Consider enrolling in a structured NEET preparation program to build your fundamentals.");
    } else if (totalScore < 70) {
      recommendations.push("Practice more NEET previous year questions and take regular mock tests.");
    } else {
      recommendations.push("You're on the right track! Focus on time management and solving complex problems faster.");
    }
    
    const result = {
      score: totalScore,
      readinessPercentage: totalScore,
      correctAnswers: correctCount,
      totalQuestions: currentQuestions.length,
      breakdown: {
        physics: physicsCount > 0 ? Math.round(physicsCorrect / physicsCount * 100) : 0,
        chemistry: chemistryCount > 0 ? Math.round(chemistryCorrect / chemistryCount * 100) : 0,
        biology: biologyCount > 0 ? Math.round(biologyCorrect / biologyCount * 100) : 0,
      },
      recommendations,
    };
    
    setResults(result);
    setStep("results");
  };

  const restartTest = () => {
    setStep("intro");
    setSelectedSubject("all");
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResults(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { 
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const currentQuestion = currentQuestions[currentQuestionIndex];
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
      >
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <h2 className="text-xl font-semibold">NEET Exam Readiness Analyzer</h2>
          <Button variant="ghost" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          {step === "intro" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Assess Your NEET Preparation Level</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  This quick assessment will measure your readiness for the NEET medical entrance exam. 
                  The test adapts to your subject knowledge and provides personalized recommendations.
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium">
                  Choose a subject to focus on (or select "All Subjects")
                </label>
                <Select
                  value={selectedSubject}
                  onValueChange={(value) => setSelectedSubject(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleStartTest} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Start Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === "questions" && currentQuestion && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Question {currentQuestionIndex + 1} of {currentQuestions.length}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 capitalize">
                      {currentQuestion.subject}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 capitalize">
                      {currentQuestion.difficulty}
                    </span>
                  </div>
                </div>
                <div>
                  <Progress value={(currentQuestionIndex + 1) / currentQuestions.length * 100} className="w-24" />
                </div>
              </div>

              <motion.div 
                key={questionAnimationKey}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-medium">{currentQuestion.text}</h3>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectAnswer(currentQuestion.id, index)}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                        answers[currentQuestion.id] === index
                          ? "border-purple-500 bg-purple-50 dark:bg-purple-900/30"
                          : "border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 dark:border-gray-700"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 mr-3 flex items-center justify-center rounded-full ${
                          answers[currentQuestion.id] === index
                            ? "bg-purple-500 text-white"
                            : "border border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        {answers[currentQuestion.id] === index && (
                          <Check className="h-3 w-3" />
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNextQuestion}
                  className={`${
                    currentQuestionIndex === currentQuestions.length - 1
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                  disabled={answers[currentQuestion.id] === undefined}
                >
                  {currentQuestionIndex === currentQuestions.length - 1
                    ? "Finish"
                    : "Next"}
                </Button>
              </div>
            </div>
          )}

          {step === "results" && results && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex mb-4 rounded-full p-4 bg-blue-50 dark:bg-blue-900/30">
                  <div
                    className="radial-progress text-blue-600"
                    style={{
                      "--value": results.readinessPercentage,
                      "--size": "8rem",
                    } as any}
                  >
                    <span className="text-2xl font-bold">{results.readinessPercentage}%</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold">
                  {results.readinessPercentage < 40
                    ? "Needs Improvement"
                    : results.readinessPercentage < 70
                    ? "Good Progress"
                    : "Excellent!"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  You answered {results.correctAnswers} out of {results.totalQuestions} questions correctly.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Subject Breakdown</h4>
                <div className="grid gap-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Physics</span>
                      <span>{results.breakdown.physics}%</span>
                    </div>
                    <Progress value={results.breakdown.physics} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Chemistry</span>
                      <span>{results.breakdown.chemistry}%</span>
                    </div>
                    <Progress value={results.breakdown.chemistry} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Biology</span>
                      <span>{results.breakdown.biology}%</span>
                    </div>
                    <Progress value={results.breakdown.biology} />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Recommendations</h4>
                <ScrollArea className="h-[120px] rounded-md border p-4">
                  <div className="space-y-2">
                    {results.recommendations.map((rec, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{rec}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-between">
                <Button variant="outline" onClick={restartTest}>
                  Take Another Assessment
                </Button>
                <Button 
                  onClick={() => {
                    toast({
                      title: "Results Saved",
                      description: "Your assessment results have been saved"
                    });
                    onClose();
                  }}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Close and Save Results
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
