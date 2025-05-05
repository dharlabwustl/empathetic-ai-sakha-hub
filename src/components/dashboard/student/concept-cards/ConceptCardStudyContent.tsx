
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, BookOpen, CheckCircle, ArrowLeft, Brain, FileText, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/dashboard/student/BackButton';

interface ConceptCardStudyContentProps {
  id: string;
  title: string;
  subject: string;
  chapter?: string;
  content: string | React.ReactNode;
  difficulty: 'easy' | 'medium' | 'hard';
  progress?: number;
  keyPoints?: string[];
  examples?: { title: string; content: string }[];
  completed?: boolean;
  onComplete?: () => void;
  onBack?: () => void;
  relatedFlashcards?: string[];
  relatedPracticeExams?: string[];
}

const ConceptCardStudyContent: React.FC<ConceptCardStudyContentProps> = ({
  id,
  title,
  subject,
  chapter = '',
  content,
  difficulty,
  progress = 0,
  keyPoints = [],
  examples = [],
  completed = false,
  onComplete,
  onBack,
  relatedFlashcards = [],
  relatedPracticeExams = []
}) => {
  const navigate = useNavigate();
  const [studyProgress, setStudyProgress] = useState(progress);
  const [hasCompletedReading, setHasCompletedReading] = useState(completed);
  
  // Auto-increment progress as the user reads through the content
  useEffect(() => {
    if (!hasCompletedReading && studyProgress < 90) {
      const timer = setTimeout(() => {
        setStudyProgress(prev => Math.min(prev + 10, 90));
      }, 15000); // Increase progress every 15 seconds
      
      return () => clearTimeout(timer);
    }
  }, [studyProgress, hasCompletedReading]);
  
  const difficultyColors = {
    'easy': 'bg-green-100 text-green-800 border-green-200',
    'medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'hard': 'bg-red-100 text-red-800 border-red-200'
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/dashboard/student/concepts');
    }
  };

  const handleComplete = () => {
    setHasCompletedReading(true);
    setStudyProgress(100);
    if (onComplete) {
      onComplete();
    }
  };
  
  // Get dynamic related resources (in real app would come from API)
  const getRelatedFlashcardPath = () => {
    return `/dashboard/student/flashcards/${subject.toLowerCase()}-${title.toLowerCase().replace(/\s+/g, '-')}/practice`;
  };
  
  const getRelatedPracticePath = () => {
    return `/dashboard/student/practice-exam/${subject.toLowerCase()}-quiz/start`;
  };
  
  const handleContinueToFlashcards = () => {
    navigate(getRelatedFlashcardPath());
  };
  
  const handleGoToPractice = () => {
    navigate(getRelatedPracticePath());
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleBack} 
          className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Concepts</span>
        </Button>
      </div>
      
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <Badge variant="outline" className={`${difficultyColors[difficulty]} capitalize`}>
              {difficulty}
            </Badge>
            
            {hasCompletedReading ? (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5" />
                Completed
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                In Progress
              </Badge>
            )}
          </div>
          
          <CardTitle className="text-xl mt-2">{title}</CardTitle>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Book className="h-4 w-4" /> {subject}
            </div>
            {chapter && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" /> {chapter}
                </div>
              </>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {studyProgress > 0 && (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{Math.round(studyProgress)}%</span>
              </div>
              <Progress value={studyProgress} className="h-2" />
            </div>
          )}
          
          {/* Study content */}
          <div className="prose max-w-none">
            {typeof content === 'string' ? <p>{content}</p> : content}
          </div>
          
          {/* Key points */}
          {keyPoints.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800/50">
              <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Key Points</h4>
              <ul className="space-y-1 list-disc list-inside text-sm">
                {keyPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Examples */}
          {examples.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium">Examples</h4>
              {examples.map((example, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700/50">
                  <h5 className="font-medium mb-2">{example.title}</h5>
                  <p className="text-sm">{example.content}</p>
                </div>
              ))}
            </div>
          )}
          
          {/* Learning Journey - Next Steps */}
          <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg border border-violet-200 dark:border-violet-800/50">
            <h4 className="font-medium text-violet-800 dark:text-violet-300 mb-3">Continue Your Learning Journey</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm border-b border-violet-200 dark:border-violet-800/50 pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                  <span className="font-medium">Concept Study</span>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                  {hasCompletedReading ? 'Complete' : 'In Progress'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between text-sm border-b border-violet-200 dark:border-violet-800/50 pb-3">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                  <span className="font-medium">Flashcard Review</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleContinueToFlashcards}
                  className="text-xs h-7 px-2"
                  disabled={!hasCompletedReading}
                >
                  Start
                </Button>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                  <span className="font-medium">Practice Quiz</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleGoToPractice} 
                  className="text-xs h-7 px-2"
                  disabled={!hasCompletedReading}
                >
                  Start
                </Button>
              </div>
            </div>
          </div>
          
          {!hasCompletedReading ? (
            <Button 
              onClick={handleComplete}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
            >
              Mark as Complete
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <Button 
                onClick={handleContinueToFlashcards}
                className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center gap-2"
              >
                <Brain className="h-4 w-4" />
                <span>Continue to Flashcards</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                onClick={handleGoToPractice}
                variant="outline"
                className="flex-1 flex items-center justify-center gap-2"
              >
                <FileText className="h-4 w-4" />
                <span>Take Practice Quiz</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptCardStudyContent;
