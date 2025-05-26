
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Target, 
  TrendingUp, 
  Lightbulb,
  Play
} from 'lucide-react';

interface SubjectProgress {
  subject: string;
  completed: number;
  total: number;
  percentage: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface SmartSuggestion {
  title: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
}

interface OverviewSectionProps {
  pageType: 'concepts' | 'flashcards' | 'practice-exam' | 'formula-practice';
  subjectProgress: SubjectProgress[];
  smartSuggestions: SmartSuggestion[];
  overallProgress: number;
  onSuggestionClick: (action: string) => void;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({
  pageType,
  subjectProgress,
  smartSuggestions,
  overallProgress,
  onSuggestionClick
}) => {
  const getPageTitle = () => {
    switch (pageType) {
      case 'concepts': return 'Concept Mastery';
      case 'flashcards': return 'Flashcard Progress';
      case 'practice-exam': return 'Practice Exam Status';
      case 'formula-practice': return 'Formula Practice';
      default: return 'Progress Overview';
    }
  };

  const getPageIcon = () => {
    switch (pageType) {
      case 'concepts': return <BookOpen className="h-5 w-5" />;
      case 'flashcards': return <Target className="h-5 w-5" />;
      case 'practice-exam': return <CheckCircle2 className="h-5 w-5" />;
      case 'formula-practice': return <TrendingUp className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Overall Progress Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3 text-xl">
            {getPageIcon()}
            {getPageTitle()} Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span className="font-medium">{overallProgress}% Complete</span>
              </div>
              <Progress value={overallProgress} className="h-3" />
            </div>
            
            {/* Subject-wise Progress */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjectProgress.map((subject, index) => (
                <Card key={index} className="bg-white border border-gray-200">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{subject.subject}</h4>
                        <Badge variant="outline" className={getDifficultyColor(subject.difficulty)}>
                          {subject.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>{subject.completed}/{subject.total} Complete</span>
                          <span>{subject.percentage}%</span>
                        </div>
                        <Progress value={subject.percentage} className="h-2" />
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                        <span>{subject.completed} completed</span>
                        <Clock className="h-3 w-3 text-orange-500 ml-2" />
                        <span>{subject.total - subject.completed} pending</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Suggestions */}
      <Card className="border-purple-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3 text-lg">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Smart Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {smartSuggestions.map((suggestion, index) => (
              <Card 
                key={index} 
                className={`border-l-4 ${getPriorityColor(suggestion.priority)} transition-all hover:shadow-md`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">{suggestion.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{suggestion.description}</p>
                      <Badge variant="outline" size="sm" className="text-xs">
                        {suggestion.priority} priority
                      </Badge>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onSuggestionClick(suggestion.action)}
                      className="ml-4"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewSection;
