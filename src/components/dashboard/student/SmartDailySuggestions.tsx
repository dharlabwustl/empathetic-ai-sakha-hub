
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Zap, Target, Award } from 'lucide-react';

interface SmartSuggestion {
  id: string;
  title: string;
  description: string;
  type: 'priority' | 'review' | 'wellness' | 'encouragement';
  icon: React.ReactNode;
}

const SmartDailySuggestions: React.FC = () => {
  const suggestions: SmartSuggestion[] = [
    {
      id: 'sg1',
      title: 'Focus on Physics Today',
      description: 'Your Physics performance needs attention. Start with Laws of Motion.',
      type: 'priority',
      icon: <Target className="h-4 w-4" />
    },
    {
      id: 'sg2', 
      title: 'Quick Chemistry Review',
      description: 'Review organic reactions before starting new concepts.',
      type: 'review',
      icon: <Lightbulb className="h-4 w-4" />
    },
    {
      id: 'sg3',
      title: 'Take Study Breaks',
      description: 'Schedule 10-minute breaks between study sessions for better retention.',
      type: 'wellness',
      icon: <Zap className="h-4 w-4" />
    },
    {
      id: 'sg4',
      title: 'Practice Test Prep',
      description: 'Your mock test scores show improvement in Biology. Keep it up!',
      type: 'encouragement',
      icon: <Award className="h-4 w-4" />
    }
  ];

  return (
    <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-yellow-800">
          <Lightbulb className="h-6 w-6" />
          <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent font-bold">
            PREPZR AI Daily Smart Recommendations
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="p-4 bg-white rounded-lg border border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full text-white">
                  {suggestion.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">{suggestion.title}</h4>
                  <p className="text-sm text-gray-600">{suggestion.description}</p>
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
