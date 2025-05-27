
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Flag } from 'lucide-react';

interface ExamQuestion {
  id: string;
  text: string;
  options: { id: string; text: string; }[];
  correctOptionId: string;
  explanation: string;
  difficulty: string;
}

interface QuestionViewProps {
  question: ExamQuestion;
  selectedOptionId?: string;
  onAnswerSelect: (optionId: string) => void;
  questionNumber: number;
  isFlagged?: boolean;
}

const QuestionView: React.FC<QuestionViewProps> = ({
  question,
  selectedOptionId,
  onAnswerSelect,
  questionNumber,
  isFlagged = false
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">
            Question {questionNumber}
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant={question.difficulty === 'easy' ? 'default' : question.difficulty === 'medium' ? 'secondary' : 'destructive'}>
              {question.difficulty}
            </Badge>
            {isFlagged && (
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                <Flag className="h-3 w-3 mr-1 fill-yellow-500" />
                Flagged
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg leading-relaxed">{question.text}</p>
        
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedOptionId === option.id;
            
            return (
              <div
                key={option.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => onAnswerSelect(option.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  } flex items-center justify-center`}>
                    {isSelected && <CheckCircle className="h-3 w-3 text-white" />}
                  </div>
                  <span className={`text-sm ${isSelected ? 'font-medium text-blue-900' : 'text-gray-700'}`}>
                    {String.fromCharCode(65 + index)}. {option.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionView;
