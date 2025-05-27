
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, 
  Target, 
  Brain, 
  Clock, 
  Award,
  TrendingUp,
  BookOpen,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SmartSuggestion {
  id: string;
  title: string;
  description: string;
  type: 'priority' | 'review' | 'practice' | 'wellness' | 'encouragement';
  urgency: 'high' | 'medium' | 'low';
  estimatedTime: string;
  subject?: string;
}

const SmartDailySuggestions: React.FC = () => {
  const suggestions: SmartSuggestion[] = [
    {
      id: 'sg1',
      title: 'Focus on Physics Mechanics',
      description: 'Complete 2 pending concept cards and practice 15 flashcards',
      type: 'priority',
      urgency: 'high',
      estimatedTime: '45 min',
      subject: 'Physics'
    },
    {
      id: 'sg2',
      title: 'Quick Biology Review',
      description: 'Review classification flashcards - showing low retention',
      type: 'review',
      urgency: 'medium',
      estimatedTime: '20 min',
      subject: 'Biology'
    },
    {
      id: 'sg3',
      title: 'Chemistry Mock Test',
      description: 'Take organic chemistry practice exam before weekend',
      type: 'practice',
      urgency: 'medium',
      estimatedTime: '60 min',
      subject: 'Chemistry'
    },
    {
      id: 'sg4',
      title: 'Take Breaks',
      description: 'Schedule 10-minute breaks between study sessions for better retention.',
      type: 'wellness',
      urgency: 'low',
      estimatedTime: '5 min'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'priority': return <Target className="h-4 w-4" />;
      case 'review': return <Brain className="h-4 w-4" />;
      case 'practice': return <TrendingUp className="h-4 w-4" />;
      case 'wellness': return <Clock className="h-4 w-4" />;
      case 'encouragement': return <Award className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'priority': return 'text-red-600 bg-red-100';
      case 'review': return 'text-blue-600 bg-blue-100';
      case 'practice': return 'text-green-600 bg-green-100';
      case 'wellness': return 'text-purple-600 bg-purple-100';
      case 'encouragement': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full">
              <Lightbulb className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent font-bold">
              PREPZR AI Smart Daily Recommendations
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-4 bg-white rounded-lg border border-yellow-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${getTypeColor(suggestion.type)}`}>
                    {getTypeIcon(suggestion.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-800">{suggestion.title}</h4>
                      <Badge 
                        variant={suggestion.urgency === 'high' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {suggestion.urgency}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{suggestion.estimatedTime}</span>
                        {suggestion.subject && (
                          <>
                            <span>•</span>
                            <span>{suggestion.subject}</span>
                          </>
                        )}
                      </div>
                      <Button size="sm" variant="outline" className="h-6 text-xs px-2">
                        <Zap className="h-3 w-3 mr-1" />
                        Start
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SmartDailySuggestions;
