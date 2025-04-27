
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Timer, Flag, ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Mock exam data
const getMockExam = (examId: string) => {
  return {
    id: examId,
    title: "Physics Mid-Term Exam",
    subject: "Physics",
    duration: 60, // minutes
    totalQuestions: 5,
    questions: [
      {
        id: "q1",
        text: "Which of the following correctly describes Newton's First Law of Motion?",
        type: "single",
        options: [
          { id: "a", text: "Force equals mass times acceleration" },
          { id: "b", text: "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force" },
          { id: "c", text: "For every action, there is an equal and opposite reaction" },
          { id: "d", text: "The acceleration of an object decreases as its mass increases" }
        ],
        correctOption: "b",
        explanation: "Newton's First Law states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force."
      },
      {
        id: "q2",
        text: "What is the SI unit of electric current?",
        type: "single",
        options: [
          { id: "a", text: "Volt" },
          { id: "b", text: "Watt" },
          { id: "c", text: "Ampere" },
          { id: "d", text: "Ohm" }
        ],
        correctOption: "c",
        explanation: "The ampere (A) is the SI unit of electric current."
      },
      {
        id: "q3",
        text: "Which of the following are examples of scalar quantities? (Select all that apply)",
        type: "multiple",
        options: [
          { id: "a", text: "Mass" },
          { id: "b", text: "Velocity" },
          { id: "c", text: "Temperature" },
          { id: "d", text: "Displacement" }
        ],
        correctOptions: ["a", "c"],
        explanation: "Scalar quantities have only magnitude and no direction. Mass and temperature are scalar quantities, while velocity and displacement are vector quantities."
      },
      {
        id: "q4",
        text: "What is the formula for calculating kinetic energy?",
        type: "single",
        options: [
          { id: "a", text: "KE = mgh" },
          { id: "b", text: "KE = ½mv²" },
          { id: "c", text: "KE = Fd" },
          { id: "d", text: "KE = P/V" }
        ],
        correctOption: "b",
        explanation: "Kinetic energy (KE) is calculated using the formula KE = ½mv², where m is mass and v is velocity."
      },
      {
        id: "q5",
        text: "Which of the following statements about waves are correct? (Select all that apply)",
        type: "multiple",
        options: [
          { id: "a", text: "Sound waves are longitudinal waves" },
          { id: "b", text: "Light waves require a medium to travel" },
          { id: "c", text: "The wavelength is the distance between consecutive crests or troughs" },
          { id: "d", text: "The frequency of a wave is measured in meters" }
        ],
        correctOptions: ["a", "c"],
        explanation: "Sound waves are longitudinal waves, and wavelength is indeed the distance between consecutive crests or troughs. Light waves do not require a medium to travel, and frequency is measured in hertz (Hz), not meters."
      }
    ]
  };
};

const ExamTakingPage = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const exam = getMockExam(examId || "default");
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(exam.duration * 60); // in seconds
  
  const currentQuestion = exam.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / exam.questions.length) * 100;
  
  // Handle single choice selection
  const handleSingleChoice = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
    });
  };
  
  // Handle multiple choice selection
  const handleMultipleChoice = (optionId: string) => {
    const currentSelections = answers[currentQuestion.id] as string[] || [];
    const updatedSelections = currentSelections.includes(optionId)
      ? currentSelections.filter(id => id !== optionId)
      : [...currentSelections, optionId];
    
    setAnswers({
      ...answers,
      [currentQuestion.id]: updatedSelections
    });
  };
  
  // Navigate to the next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  // Navigate to the previous question
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Flag/unflag current question
  const handleToggleFlag = () => {
    if (flaggedQuestions.includes(currentQuestion.id)) {
      setFlaggedQuestions(flaggedQuestions.filter(id => id !== currentQuestion.id));
    } else {
      setFlaggedQuestions([...flaggedQuestions, currentQuestion.id]);
    }
  };
  
  // Submit the exam
  const handleSubmitExam = () => {
    // Calculate the score based on answers
    const score = calculateScore();
    
    // In a real app, save the results to backend
    console.log("Exam submitted:", {
      examId,
      answers,
      score
    });
    
    // Navigate to the review page
    navigate(`/dashboard/student/practice-exam/${examId}/review`);
  };
  
  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    
    exam.questions.forEach(question => {
      const userAnswer = answers[question.id];
      
      if (question.type === "single" && userAnswer === question.correctOption) {
        score += 1;
      } else if (question.type === "multiple") {
        const userSelections = userAnswer as string[] || [];
        const correctOptions = question.correctOptions || [];
        
        if (
          userSelections.length === correctOptions.length &&
          userSelections.every(selection => correctOptions.includes(selection))
        ) {
          score += 1;
        }
      }
    });
    
    return score;
  };
  
  // Format the remaining time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <SharedPageLayout
      title={exam.title}
      subtitle={`${exam.subject} · ${exam.questions.length} questions · ${exam.duration} minutes`}
      showBackButton={true}
      backButtonUrl="/dashboard/student/practice-exam"
    >
      <div className="space-y-6">
        {/* Exam Info and Timer */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-medium">Question {currentQuestionIndex + 1} of {exam.questions.length}</span>
            {flaggedQuestions.includes(currentQuestion.id) && (
              <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-xs py-0.5 px-2 rounded-full">
                Flagged
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 bg-primary/5 px-3 py-1 rounded-full">
            <Timer size={16} className="text-primary" />
            <span className="font-medium">{formatTime(timeRemaining)}</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <Progress value={progress} className="h-2" />
        
        {/* Question Card */}
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-medium flex justify-between items-start">
                <span>{currentQuestion.text}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className={`ml-2 ${flaggedQuestions.includes(currentQuestion.id) ? 'bg-yellow-100 dark:bg-yellow-900/30' : ''}`}
                  onClick={handleToggleFlag}
                >
                  <Flag className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentQuestion.type === "single" ? (
                <RadioGroup
                  value={answers[currentQuestion.id] as string || ""}
                  onValueChange={handleSingleChoice}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.id} id={`${currentQuestion.id}-${option.id}`} />
                      <Label htmlFor={`${currentQuestion.id}-${option.id}`}>{option.text}</Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-3">
                  {currentQuestion.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${currentQuestion.id}-${option.id}`}
                        checked={(answers[currentQuestion.id] as string[] || []).includes(option.id)}
                        onCheckedChange={() => handleMultipleChoice(option.id)}
                      />
                      <Label htmlFor={`${currentQuestion.id}-${option.id}`}>{option.text}</Label>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                <Button
                  variant="outline"
                  disabled={currentQuestionIndex === 0}
                  onClick={handlePreviousQuestion}
                >
                  <ChevronLeft size={16} className="mr-1" /> Previous
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {}} // Save progress in a real implementation
                >
                  <Save size={16} className="mr-1" /> Save
                </Button>
                {currentQuestionIndex < exam.questions.length - 1 ? (
                  <Button
                    onClick={handleNextQuestion}
                  >
                    Next <ChevronRight size={16} className="ml-1" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmitExam}
                  >
                    Submit Exam
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        </motion.div>
        
        {/* Question Navigation */}
        <div className="flex flex-wrap gap-2">
          {exam.questions.map((question, index) => (
            <Button
              key={question.id}
              variant={currentQuestionIndex === index ? "default" : "outline"}
              size="sm"
              className={`w-10 h-10 p-0 ${answers[question.id] ? 'border-primary/40' : ''} ${
                flaggedQuestions.includes(question.id) ? 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300' : ''
              }`}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ExamTakingPage;
