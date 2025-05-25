
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  BookOpen, 
  Brain, 
  Target, 
  Coffee, 
  Gift,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DailySmartSuggestions: React.FC = () => {
  const navigate = useNavigate();

  const suggestions = [
    {
      id: 'start-concepts',
      icon: <BookOpen className="h-5 w-5 text-blue-600" />,
      title: 'Start with Key Concepts',
      description: 'Begin your day by studying fundamental concepts to build a strong foundation.',
      action: () => navigate('/dashboard/student/concepts'),
      priority: 'high',
      bgColor: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-800'
    },
    {
      id: 'practice-flashcards',
      icon: <Brain className="h-5 w-5 text-purple-600" />,
      title: 'Reinforce with Flashcards',
      description: 'Use flashcards to reinforce your learning and improve retention.',
      action: () => navigate('/dashboard/student/flashcards'),
      priority: 'medium',
      bgColor: 'bg-purple-50 border-purple-200',
      textColor: 'text-purple-800'
    },
    {
      id: 'take-practice-exam',
      icon: <Target className="h-5 w-5 text-green-600" />,
      title: 'Take Practice Test',
      description: 'Test your knowledge with practice exams to assess your understanding.',
      action: () => navigate('/dashboard/student/practice-exam'),
      priority: 'medium',
      bgColor: 'bg-green-50 border-green-200',
      textColor: 'text-green-800'
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="text-xs">High Priority</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="text-xs">Recommended</Badge>;
      case 'low':
        return <Badge variant="outline" className="text-xs">Optional</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-800">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-3">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full">
            <Lightbulb className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          Daily Smart Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Suggestion cards */}
        <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
          {suggestions.map((suggestion) => (
            <Card 
              key={suggestion.id} 
              className={`${suggestion.bgColor} border hover:shadow-md transition-all duration-200 cursor-pointer`}
              onClick={suggestion.action}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/80 rounded-full shadow-sm">
                    {suggestion.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-medium ${suggestion.textColor} text-sm`}>
                        {suggestion.title}
                      </h4>
                      {getPriorityBadge(suggestion.priority)}
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 mb-3">
                      {suggestion.description}
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full bg-white/80 hover:bg-white border-white/50 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        suggestion.action();
                      }}
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Take Action
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySmartSuggestions;
