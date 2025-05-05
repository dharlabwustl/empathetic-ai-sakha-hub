
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, BookOpen, CheckCircle, ArrowLeft } from 'lucide-react';
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
  onBack
}) => {
  const navigate = useNavigate();
  
  const difficultyColors = {
    'easy': 'bg-green-100 text-green-800 border-green-200',
    'medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'hard': 'bg-red-100 text-red-800 border-red-200'
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/dashboard/student');
    }
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <BackButton to="/dashboard/student" />
      </div>
      
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <Badge variant="outline" className={`${difficultyColors[difficulty]} capitalize`}>
              {difficulty}
            </Badge>
            
            {completed ? (
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
          {progress > 0 && (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
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
          
          {!completed && (
            <Button 
              onClick={handleComplete}
              className="w-full"
            >
              Mark as Complete
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptCardStudyContent;
