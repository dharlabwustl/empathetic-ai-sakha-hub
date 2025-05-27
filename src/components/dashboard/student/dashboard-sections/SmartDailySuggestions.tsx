
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Target, Brain, Clock, TrendingUp } from 'lucide-react';

const SmartDailySuggestions: React.FC = () => {
  const suggestions = [
    {
      id: 1,
      title: "Focus on Physics Today",
      description: "Your Physics performance needs attention. Start with Laws of Motion.",
      icon: <Target className="h-4 w-4" />,
      priority: "high"
    },
    {
      id: 2,
      title: "Quick Chemistry Review", 
      description: "Review organic reactions before starting new concepts.",
      icon: <Brain className="h-4 w-4" />,
      priority: "medium"
    },
    {
      id: 3,
      title: "Take Study Breaks",
      description: "Schedule 10-minute breaks between sessions for better retention.",
      icon: <Clock className="h-4 w-4" />,
      priority: "low"
    },
    {
      id: 4,
      title: "Mock Test Performance",
      description: "Your Biology scores are improving. Keep up the momentum!",
      icon: <TrendingUp className="h-4 w-4" />,
      priority: "info"
    }
  ];

  return (
    <Card className="shadow-sm bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-yellow-800">
          <Lightbulb className="h-5 w-5" />
          PREPZR AI Smart Daily Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {suggestions.map((suggestion) => (
            <div 
              key={suggestion.id} 
              className="p-3 bg-white rounded-lg border border-yellow-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full text-white flex-shrink-0">
                  {suggestion.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">
                    {suggestion.title}
                  </h4>
                  <p className="text-xs text-gray-600">{suggestion.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartDailySuggestions;
