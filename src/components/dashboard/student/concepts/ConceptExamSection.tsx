
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { GraduationCap, Medal, AlertCircle, CheckCircle, BookOpen } from 'lucide-react';

interface ConceptExamSectionProps {
  conceptId: string;
  conceptTitle: string;
  examReady?: boolean;
}

export const ConceptExamSection: React.FC<ConceptExamSectionProps> = ({
  conceptId,
  conceptTitle,
  examReady = false
}) => {
  const { toast } = useToast();
  const [readiness, setReadiness] = useState<number>(examReady ? 85 : 45);
  
  // Mock practice questions data
  const [questions] = useState([
    {
      id: 'q1',
      completed: true,
      difficulty: 'easy',
      score: 100
    },
    {
      id: 'q2',
      completed: true,
      difficulty: 'medium',
      score: 75
    },
    {
      id: 'q3',
      completed: false,
      difficulty: 'medium',
      score: 0
    },
    {
      id: 'q4',
      completed: false,
      difficulty: 'hard',
      score: 0
    }
  ]);
  
  const startPracticeExam = () => {
    toast({
      title: "Practice Exam",
      description: `Starting exam practice for ${conceptTitle}`,
    });
    // Implementation for starting practice exam
  };
  
  const reviewConcept = () => {
    toast({
      title: "Review Concept",
      description: "Opening concept review mode",
    });
    // Implementation for reviewing concept
  };
  
  const completedQuestions = questions.filter(q => q.completed).length;
  const totalQuestions = questions.length;
  const completionPercentage = (completedQuestions / totalQuestions) * 100;
  
  const getReadinessColor = () => {
    if (readiness >= 80) return 'text-green-600';
    if (readiness >= 50) return 'text-amber-600';
    return 'text-red-600';
  };
  
  const getReadinessMessage = () => {
    if (readiness >= 80) return 'Exam Ready';
    if (readiness >= 50) return 'Almost Ready';
    return 'Needs More Practice';
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <GraduationCap className="mr-2 h-6 w-6 text-purple-600" />
          Exam Readiness
        </h2>
      </div>
      
      <div className="mb-8">
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-32 h-32 relative">
                <div className="w-full h-full rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getReadinessColor()}`}>
                      {readiness}%
                    </div>
                    <div className="text-xs text-gray-500">Readiness</div>
                  </div>
                </div>
                <svg className="w-32 h-32 absolute top-0 left-0 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50" cy="50" r="45" 
                    className="stroke-gray-200 dark:stroke-gray-700 fill-none"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50" cy="50" r="45" 
                    className={`${
                      readiness >= 80 ? 'stroke-green-500' : 
                      readiness >= 50 ? 'stroke-amber-500' : 'stroke-red-500'
                    } fill-none`}
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - readiness / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <span className={getReadinessColor()}>{getReadinessMessage()}</span>
                  {readiness >= 80 && <Medal className="ml-2 h-5 w-5 text-amber-500" />}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {readiness >= 80
                    ? "You've mastered this concept and are ready to apply it in exams. Consider taking practice tests to reinforce your knowledge."
                    : readiness >= 50
                    ? "You're making good progress, but should review some aspects of this concept before your exam."
                    : "This concept requires more practice before you're ready to apply it in exams."}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <Button onClick={startPracticeExam} className="flex-1">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Take Practice Test
                  </Button>
                  
                  {readiness < 80 && (
                    <Button onClick={reviewConcept} variant="outline" className="flex-1">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Review Material
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Practice Questions Progress</h3>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Completed</span>
            <span>{completedQuestions} of {totalQuestions} questions</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {questions.map((question, index) => (
            <Card key={question.id} className={`border ${question.completed ? 'bg-gray-50 dark:bg-gray-800/30' : ''}`}>
              <CardContent className="p-4 text-center">
                <div className="mb-2">
                  {question.completed ? (
                    <div className="mx-auto w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  ) : (
                    <div className="mx-auto w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                    </div>
                  )}
                </div>
                
                <h4 className="font-medium">Question {index + 1}</h4>
                <p className={`text-sm capitalize ${
                  question.difficulty === 'easy' ? 'text-green-600' :
                  question.difficulty === 'medium' ? 'text-amber-600' : 'text-red-600'
                }`}>
                  {question.difficulty}
                </p>
                
                {question.completed && (
                  <div className="mt-2 text-sm">
                    Score: <span className="font-semibold">{question.score}%</span>
                  </div>
                )}
                
                {!question.completed && (
                  <Button size="sm" variant="outline" className="mt-2 w-full">
                    Practice
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
