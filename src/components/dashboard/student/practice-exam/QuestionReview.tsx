
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface QuestionReviewProps {
  question: {
    id: number;
    text: string;
    userAnswer: string | string[];
    correctAnswer: string | string[];
    isCorrect: boolean;
    explanation: string;
  };
  questionNumber: number;
}

const QuestionReview: React.FC<QuestionReviewProps> = ({
  question,
  questionNumber
}) => {
  return (
    <Card className={`border-l-4 ${question.isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Question {questionNumber}</CardTitle>
          <div className="flex items-center gap-2">
            {question.isCorrect ? (
              <Badge className="bg-green-100 text-green-800 border-green-300">
                <CheckCircle className="h-3 w-3 mr-1" />
                Correct
              </Badge>
            ) : (
              <Badge className="bg-red-100 text-red-800 border-red-300">
                <XCircle className="h-3 w-3 mr-1" />
                Incorrect
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-base leading-relaxed">{question.text}</p>
        
        <div className="grid gap-3">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Your Answer:</span>
            </div>
            <p className="text-sm text-blue-800">
              {Array.isArray(question.userAnswer) 
                ? question.userAnswer.join(', ') 
                : question.userAnswer}
            </p>
          </div>
          
          {!question.isCorrect && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">Correct Answer:</span>
              </div>
              <p className="text-sm text-green-800">
                {Array.isArray(question.correctAnswer) 
                  ? question.correctAnswer.join(', ') 
                  : question.correctAnswer}
              </p>
            </div>
          )}
          
          <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Explanation:</span>
            </div>
            <p className="text-sm text-gray-700">{question.explanation}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionReview;
