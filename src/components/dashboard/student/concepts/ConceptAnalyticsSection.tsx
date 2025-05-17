
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BarChart, 
  PieChart,
  LineChart, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  Brain,
  Lightbulb
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ConceptAnalyticsSectionProps {
  conceptId: string;
  masteryPercent?: number;
  recallAccuracy?: number;
  quizScore?: number;
  practiceAttempts?: number;
}

const ConceptAnalyticsSection: React.FC<ConceptAnalyticsSectionProps> = ({
  conceptId,
  masteryPercent = 65,
  recallAccuracy = 70,
  quizScore = 80,
  practiceAttempts = 5
}) => {
  // Calculate overall mastery as an average of different metrics
  const overallMastery = Math.round((masteryPercent + recallAccuracy + quizScore) / 3);
  
  // Simulate practice history data
  const practiceHistory = [
    { date: '2023-05-10', score: 60 },
    { date: '2023-05-12', score: 65 },
    { date: '2023-05-15', score: 72 },
    { date: '2023-05-18', score: 68 },
    { date: '2023-05-21', score: 75 },
    { date: '2023-05-25', score: 80 },
  ];
  
  // Simulated weak areas detection
  const weakAreas = [
    { topic: 'Formula application', strength: 55, priority: 'high' },
    { topic: 'Related concepts', strength: 65, priority: 'medium' },
    { topic: 'Practical examples', strength: 60, priority: 'medium' }
  ];
  
  // Get color based on percentage
  const getColorByPercentage = (percent: number): string => {
    if (percent >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (percent >= 65) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };
  
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="h-6 w-6 text-purple-600" />
        <h2 className="text-2xl font-bold">Learning Analytics</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="border-t-4 border-t-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-700 dark:text-gray-200">Overall Mastery</h3>
              <div className={`rounded-full p-1.5 ${getColorByPercentage(overallMastery)}`}>
                <BarChart className="h-5 w-5" />
              </div>
            </div>
            
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">{overallMastery}%</span>
              <span className="text-sm text-gray-500 mb-1.5">mastery level</span>
            </div>
            
            <Progress value={overallMastery} className="mt-4 h-2" 
              style={{
                background: '#e5e7eb',
                '--progress-value': `${overallMastery}%`
              } as React.CSSProperties} 
            />
            
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span>Recall Accuracy</span>
                <span className="font-medium">{recallAccuracy}%</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span>Quiz Performance</span>
                <span className="font-medium">{quizScore}%</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span>Active Learning</span>
                <span className="font-medium">{masteryPercent}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-t-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-700 dark:text-gray-200">Practice Attempts</h3>
              <div className="bg-purple-50 rounded-full p-1.5 text-purple-600 border border-purple-200">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">{practiceAttempts}</span>
              <span className="text-sm text-gray-500 mb-1.5">total attempts</span>
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Last attempt: 2 days ago</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm">3 successful attempts</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span className="text-sm">2 needs improvement</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-t-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-700 dark:text-gray-200">Learning Insights</h3>
              <div className="bg-green-50 rounded-full p-1.5 text-green-600 border border-green-200">
                <Lightbulb className="h-5 w-5" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Strengths</h4>
                <div className="bg-green-50 border border-green-200 rounded-md p-3 text-sm text-green-800">
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Theoretical understanding</li>
                    <li>Basic concept definitions</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Areas for Improvement</h4>
                <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm text-amber-800">
                  <ul className="list-disc pl-4 space-y-1">
                    {weakAreas.map((area, index) => (
                      <li key={index}>
                        {area.topic}
                        <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                          {area.priority}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <LineChart className="h-5 w-5 text-blue-600" />
              <span>Learning Progress Over Time</span>
            </h3>
            
            <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-md">
              {/* In a real app, this would be a chart component */}
              <div className="text-center text-gray-500">
                <LineChart className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p>Progress visualization would appear here</p>
                <p className="text-xs mt-1">Based on your 5 practice sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <PieChart className="h-5 w-5 text-purple-600" />
              <span>Knowledge Distribution</span>
            </h3>
            
            <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-md">
              {/* In a real app, this would be a chart component */}
              <div className="text-center text-gray-500">
                <PieChart className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p>Knowledge distribution chart would appear here</p>
                <p className="text-xs mt-1">Showing your strengths and weaknesses</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConceptAnalyticsSection;
