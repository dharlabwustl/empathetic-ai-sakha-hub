
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  AlertTriangle, 
  Check, 
  BarChart, 
  AlertCircle, 
  BookOpen,
  RefreshCw,
  BrainCircuit
} from 'lucide-react';

interface AIInsightsProps {
  conceptName: string;
}

const AIInsights: React.FC<AIInsightsProps> = ({
  conceptName
}) => {
  // These would come from an API in a real implementation
  const insights = [
    {
      type: 'weak-link',
      title: 'Connection to Thermodynamics',
      description: 'Our AI has detected that you struggle with connecting this concept to related thermodynamics principles.',
      priority: 'high',
      action: 'Review related concepts',
      actionLink: '/dashboard/student/concepts/concept-thermo-1'
    },
    {
      type: 'revision',
      title: 'Periodic Revision Needed',
      description: 'It\'s been 14 days since you last reviewed this concept. Memory retention research suggests revisiting now.',
      priority: 'medium',
      action: 'Schedule review',
      actionLink: '#'
    },
    {
      type: 'misconception',
      title: 'Common Misconception Detected',
      description: 'Your answers in practice tests suggest a possible misconception about the fundamental principles.',
      priority: 'high',
      action: 'Clear misconception',
      actionLink: '#'
    },
    {
      type: 'strength',
      title: 'Strong Understanding of Core Principles',
      description: 'You consistently demonstrate mastery of the core principles, especially in quantitative problems.',
      priority: 'low',
      action: 'Try advanced problems',
      actionLink: '#'
    }
  ];
  
  // Get icon based on insight type
  const getInsightIcon = (type: string) => {
    switch(type) {
      case 'weak-link': return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'revision': return <RefreshCw className="h-5 w-5 text-blue-500" />;
      case 'misconception': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'strength': return <Check className="h-5 w-5 text-green-500" />;
      default: return <BookOpen className="h-5 w-5 text-purple-500" />;
    }
  };
  
  // Get badge styling based on priority
  const getPriorityBadgeClass = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };
  
  return (
    <Card className="border-t-4 border-t-indigo-500">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-indigo-600" />
            <h2 className="text-2xl font-bold">AI Learning Insights</h2>
          </div>
          
          <Button variant="outline" className="gap-1">
            <Sparkles className="h-4 w-4" />
            Generate New Insights
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((insight, index) => (
            <Card key={index} className="border-l-4" 
              style={{ 
                borderLeftColor: 
                  insight.type === 'strength' ? '#22c55e' : 
                  insight.priority === 'high' ? '#ef4444' : 
                  insight.priority === 'medium' ? '#f59e0b' : '#3b82f6' 
              }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800">
                      {getInsightIcon(insight.type)}
                    </div>
                    <h3 className="font-medium">{insight.title}</h3>
                  </div>
                  
                  <Badge variant="outline" className={getPriorityBadgeClass(insight.priority)}>
                    {insight.priority} priority
                  </Badge>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  {insight.description}
                </p>
                
                <div className="flex justify-end">
                  <Button size="sm" variant="outline" className="text-sm">
                    {insight.action}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full p-2">
              <BarChart className="h-6 w-6 text-blue-700 dark:text-blue-400" />
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">Personalized Study Recommendation</h3>
              <p className="text-blue-700 dark:text-blue-400 mb-4">
                Based on your learning patterns and performance data, our AI recommends focusing on application-based questions
                for this concept to strengthen your practical understanding.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                  See Recommended Questions
                </Button>
                <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-400">
                  View Full Learning Path
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsights;
