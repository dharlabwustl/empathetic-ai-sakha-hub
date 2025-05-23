
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  Clock, 
  HelpCircle, 
  TrendingUp, 
  Award,
  Brain,
  Zap,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ConceptAnalyticsProps {
  masteryLevel: number;
  timeSpent: number;
  questionsAnswered: number;
  accuracy: number;
  conceptTitle: string;
}

const ConceptAnalytics: React.FC<ConceptAnalyticsProps> = ({
  masteryLevel,
  timeSpent,
  questionsAnswered,
  accuracy,
  conceptTitle
}) => {
  const getMasteryColor = (level: number) => {
    if (level >= 80) return 'text-green-600';
    if (level >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMasteryBadge = (level: number) => {
    if (level >= 80) return { text: 'Mastered', className: 'bg-green-100 text-green-800' };
    if (level >= 60) return { text: 'Progressing', className: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Learning', className: 'bg-blue-100 text-blue-800' };
  };

  const kpiCards = [
    {
      title: 'Mastery Level',
      value: masteryLevel,
      unit: '%',
      icon: <Target className="h-5 w-5 text-indigo-600" />,
      progress: masteryLevel,
      colorClass: getMasteryColor(masteryLevel),
      description: 'Your understanding level'
    },
    {
      title: 'Time Spent',
      value: timeSpent,
      unit: 'min',
      icon: <Clock className="h-5 w-5 text-blue-600" />,
      progress: Math.min((timeSpent / 60) * 100, 100),
      colorClass: 'text-blue-600',
      description: 'Study time today'
    },
    {
      title: 'Questions Answered',
      value: questionsAnswered,
      unit: '',
      icon: <HelpCircle className="h-5 w-5 text-purple-600" />,
      progress: Math.min((questionsAnswered / 30) * 100, 100),
      colorClass: 'text-purple-600',
      description: 'Practice questions'
    },
    {
      title: 'Accuracy',
      value: accuracy,
      unit: '%',
      icon: <TrendingUp className="h-5 w-5 text-green-600" />,
      progress: accuracy,
      colorClass: 'text-green-600',
      description: 'Answer accuracy'
    }
  ];

  const masteryBadge = getMasteryBadge(masteryLevel);

  return (
    <div className="mb-8">
      <Card className="border-2 border-indigo-100 dark:border-indigo-800 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Brain className="h-6 w-6" />
                Concept Analytics
              </CardTitle>
              <p className="text-indigo-100 mt-1">
                Track your progress on {conceptTitle}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={masteryBadge.className}>
                {masteryBadge.text}
              </Badge>
              {masteryLevel >= 80 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-semibold">Ready to Complete!</span>
                </motion.div>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiCards.map((kpi, index) => (
              <motion.div
                key={kpi.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        {kpi.icon}
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${kpi.colorClass}`}>
                          {kpi.value}
                          <span className="text-sm font-normal text-gray-500 ml-1">
                            {kpi.unit}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {kpi.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {kpi.description}
                      </p>
                      <div className="space-y-1">
                        <Progress 
                          value={kpi.progress} 
                          className="h-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>0</span>
                          <span>{kpi.title === 'Time Spent' ? '60 min' : kpi.title === 'Questions Answered' ? '30' : '100%'}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Quick Insights */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">Quick Insights</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-yellow-500" />
                <span>
                  {masteryLevel >= 80 
                    ? 'Excellent mastery level!' 
                    : masteryLevel >= 60 
                    ? 'Good progress, keep going!' 
                    : 'Focus on understanding basics'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>
                  {timeSpent >= 30 
                    ? 'Great study session today!' 
                    : 'Consider spending more time'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span>
                  {accuracy >= 80 
                    ? 'High accuracy maintained!' 
                    : 'Review concepts for better accuracy'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptAnalytics;
