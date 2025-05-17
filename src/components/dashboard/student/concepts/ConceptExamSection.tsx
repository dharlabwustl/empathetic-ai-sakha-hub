
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap, Clock, Flame, LineChart, AlertCircle, CheckCircle2, FileText } from 'lucide-react';

interface ConceptExamSectionProps {
  conceptId: string;
  conceptTitle: string;
  examReady?: boolean;
}

interface ExamQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'subjective';
  difficulty: string;
}

export const ConceptExamSection: React.FC<ConceptExamSectionProps> = ({
  conceptId,
  conceptTitle,
  examReady = false
}) => {
  const { toast } = useToast();
  
  // Mock exam questions
  const examQuestions: ExamQuestion[] = [
    {
      id: 'q1',
      question: "How does Newton's Second Law relate force, mass, and acceleration?",
      type: 'multiple-choice',
      difficulty: 'easy'
    },
    {
      id: 'q2',
      question: "A 2 kg object is acted upon by a force of 10 N. Calculate its acceleration.",
      type: 'subjective',
      difficulty: 'medium'
    },
    {
      id: 'q3',
      question: "How would the acceleration of an object change if the force applied is doubled but the mass remains constant?",
      type: 'multiple-choice',
      difficulty: 'easy'
    },
    {
      id: 'q4',
      question: "A 1500 kg car accelerates from 0 to 27 m/s in 10 seconds. Calculate the force acting on the car.",
      type: 'subjective',
      difficulty: 'hard'
    }
  ];
  
  const startPracticeExam = () => {
    toast({
      title: "Practice Exam",
      description: `Starting practice exam for ${conceptTitle}`,
    });
    // Navigate to practice exam page or start modal
  };
  
  const startConceptQuiz = () => {
    toast({
      title: "Concept Quiz",
      description: "Starting a short quiz to test your understanding",
    });
    // Navigate to quiz or start modal
  };
  
  const generateExamNotes = () => {
    toast({
      title: "Exam Notes Generator",
      description: "Generating concise exam notes for quick revision",
    });
    // Open exam notes generator
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <GraduationCap className="mr-2 h-6 w-6 text-purple-600" />
          Exam Preparation
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-md flex items-center">
              <Clock className="mr-2 h-4 w-4 text-blue-600" />
              Practice Exam
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-sm text-muted-foreground mb-4">
              Take a timed practice exam focusing specifically on this concept 
              with exam-style questions.
            </p>
            <Button onClick={startPracticeExam} className="w-full">Start Practice Exam</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-md flex items-center">
              <Flame className="mr-2 h-4 w-4 text-red-600" />
              Quick Quiz
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-sm text-muted-foreground mb-4">
              Test your understanding with a quick 5-minute quiz on the key
              points of this concept.
            </p>
            <Button onClick={startConceptQuiz} className="w-full" variant="outline">
              Start Quiz
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-md flex items-center">
              <FileText className="mr-2 h-4 w-4 text-green-600" />
              Exam Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-sm text-muted-foreground mb-4">
              Generate concise exam-focused notes with key formulas and points
              to remember.
            </p>
            <Button onClick={generateExamNotes} className="w-full" variant="outline">
              Generate Notes
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <LineChart className="mr-2 h-5 w-5 text-purple-600" />
            Exam Readiness
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full border-4 flex items-center justify-center
              ${examReady ? 'border-green-500 text-green-600' : 'border-amber-500 text-amber-600'}">
              {examReady ? (
                <CheckCircle2 className="h-8 w-8" />
              ) : (
                <AlertCircle className="h-8 w-8" />
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-medium">
                {examReady ? 'Ready for Exam' : 'Not Yet Exam Ready'}
              </h3>
              <p className="text-muted-foreground">
                {examReady 
                  ? 'You have a strong understanding of this concept and are well-prepared for exams.' 
                  : 'Keep practicing this concept to increase your exam readiness.'}
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Recommended Actions:</h4>
            <ul className="space-y-2">
              {!examReady && (
                <>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 min-w-4">•</div>
                    <span>Complete at least 3 practice quizzes on this concept</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 min-w-4">•</div>
                    <span>Review the common mistakes section</span>
                  </li>
                </>
              )}
              <li className="flex items-start gap-2">
                <div className="mt-1 min-w-4">•</div>
                <span>Practice applying the concept in different scenarios</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 min-w-4">•</div>
                <span>Test yourself with exam-style questions</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
      
      <h3 className="font-medium text-lg mb-4">Sample Exam Questions</h3>
      <div className="space-y-4">
        {examQuestions.map((question, index) => (
          <Card key={question.id} className="overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 h-6 w-6 rounded-full flex items-center justify-center text-sm">
                  {index + 1}
                </div>
                <Badge variant="outline" className="text-gray-600 dark:text-gray-400">
                  {question.type === 'multiple-choice' ? 'Multiple Choice' : 'Subjective'}
                </Badge>
              </div>
              <Badge className={getDifficultyColor(question.difficulty)}>
                {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
              </Badge>
            </div>
            <CardContent className="p-4">
              <p>{question.question}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
