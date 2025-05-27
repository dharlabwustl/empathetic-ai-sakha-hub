
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
  TrendingUp,
  Clock,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SmartDailySuggestionsProps {
  userName: string;
}

const SmartDailySuggestions: React.FC<SmartDailySuggestionsProps> = ({ userName }) => {
  const navigate = useNavigate();
  
  const currentHour = new Date().getHours();
  
  // Generate time-based suggestions
  const getTimeBasedSuggestions = () => {
    const suggestions = [];
    
    if (currentHour >= 6 && currentHour < 12) {
      suggestions.push({
        id: 'morning-concepts',
        icon: <BookOpen className="h-4 w-4 text-blue-600" />,
        title: 'Start with Core Concepts',
        description: 'Morning is perfect for learning new concepts when your mind is fresh.',
        action: () => navigate('/dashboard/student/concepts'),
        priority: 'high',
        bgColor: 'bg-blue-50 border-blue-200',
        textColor: 'text-blue-800'
      });
    } else if (currentHour >= 12 && currentHour < 17) {
      suggestions.push({
        id: 'afternoon-practice',
        icon: <Brain className="h-4 w-4 text-purple-600" />,
        title: 'Practice with Flashcards',
        description: 'Afternoon is ideal for reinforcing what you learned this morning.',
        action: () => navigate('/dashboard/student/flashcards'),
        priority: 'medium',
        bgColor: 'bg-purple-50 border-purple-200',
        textColor: 'text-purple-800'
      });
    } else if (currentHour >= 17 && currentHour < 22) {
      suggestions.push({
        id: 'evening-exam',
        icon: <Target className="h-4 w-4 text-green-600" />,
        title: 'Take a Practice Test',
        description: 'Evening is great for testing your knowledge and identifying gaps.',
        action: () => navigate('/dashboard/student/practice-exam'),
        priority: 'medium',
        bgColor: 'bg-green-50 border-green-200',
        textColor: 'text-green-800'
      });
    } else {
      suggestions.push({
        id: 'rest-time',
        icon: <Coffee className="h-4 w-4 text-amber-600" />,
        title: 'Time to Rest',
        description: 'It\'s late! Consider reviewing tomorrow\'s plan and getting good sleep.',
        action: () => navigate('/dashboard/student/today'),
        priority: 'low',
        bgColor: 'bg-amber-50 border-amber-200',
        textColor: 'text-amber-800'
      });
    }
    
    return suggestions;
  };

  const suggestions = getTimeBasedSuggestions();

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="text-xs">Recommended</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="text-xs">Good Choice</Badge>;
      case 'low':
        return <Badge variant="outline" className="text-xs">Optional</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-800">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-3">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-full">
            <Lightbulb className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          Smart Daily Suggestions
          <Badge variant="outline" className="ml-auto bg-white dark:bg-gray-800">
            <Star className="h-3 w-3 mr-1" />
            Personalized
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Suggestion cards */}
        <div className="grid gap-3">
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
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Start Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick stats */}
        <div className="mt-4 p-3 bg-white/50 dark:bg-gray-800/50 border border-white/30 dark:border-gray-700/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">
                Optimized for {currentHour < 12 ? 'morning' : currentHour < 17 ? 'afternoon' : 'evening'} study session
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartDailySuggestions;
