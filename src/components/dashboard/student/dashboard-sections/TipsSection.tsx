
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Brain, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SmartSuggestion {
  text: string;
  action: string;
  actionLink: string;
  color: string;
}

interface TipsSectionProps {
  smartSuggestion?: SmartSuggestion;
}

export default function TipsSection({ smartSuggestion }: TipsSectionProps) {
  const tips = [
    {
      icon: <Brain className="h-4 w-4 text-blue-500" />,
      title: "Active Recall",
      description: "Test yourself regularly instead of just re-reading notes."
    },
    {
      icon: <Target className="h-4 w-4 text-green-500" />,
      title: "Spaced Repetition",
      description: "Review topics at increasing intervals for better retention."
    },
    {
      icon: <Lightbulb className="h-4 w-4 text-yellow-500" />,
      title: "Pomodoro Technique",
      description: "Study in 25-minute focused sessions with short breaks."
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Study Tips & Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Smart Suggestion Box */}
        {smartSuggestion && (
          <div className={`p-4 rounded-lg border ${smartSuggestion.color} mb-4`}>
            <div className="flex items-start gap-3 mb-3">
              <Brain className="h-5 w-5 text-violet-500 mt-0.5" />
              <p className="text-sm font-medium">{smartSuggestion.text}</p>
            </div>
            <Link to={smartSuggestion.actionLink} className="no-underline">
              <Button 
                size="sm"
                className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:opacity-90 text-white"
              >
                {smartSuggestion.action} <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        )}

        {/* Regular Tips */}
        <div className="space-y-3">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <div className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
                {tip.icon}
              </div>
              <div>
                <h4 className="font-medium text-sm">{tip.title}</h4>
                <p className="text-xs text-muted-foreground">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
