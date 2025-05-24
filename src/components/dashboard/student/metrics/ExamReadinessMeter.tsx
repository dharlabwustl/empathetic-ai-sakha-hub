
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartLine, TrendingUp, Brain, Target, Clock, Zap, BookOpen, CheckCircle2 } from 'lucide-react';

interface ExamReadinessProps {
  score: number;
  weeklyTrend?: Array<{ week: string; score: number }>;
  section?: string;
}

const ExamReadinessMeter: React.FC<ExamReadinessProps> = ({ 
  score, 
  weeklyTrend = [],
  section = "overall" 
}) => {
  const getColorByScore = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  const getTrendDirection = () => {
    if (weeklyTrend.length < 2) return "stable";
    
    const lastWeek = weeklyTrend[weeklyTrend.length - 1].score;
    const previousWeek = weeklyTrend[weeklyTrend.length - 2].score;
    
    if (lastWeek > previousWeek) return "up";
    if (lastWeek < previousWeek) return "down";
    return "stable";
  };
  
  const trendDirection = getTrendDirection();
  
  // Smart suggestions based on score and current time
  const getSmartSuggestions = () => {
    const currentHour = new Date().getHours();
    const currentDay = new Date().getDay();
    const suggestions = [];

    if (score < 40) {
      suggestions.push({
        icon: <Target className="h-4 w-4 text-amber-500" />,
        text: "Focus on fundamentals first. Master basic concepts before moving to complex topics",
        action: "Study Core Concepts",
        priority: "high"
      });
    } else if (score >= 40 && score < 60) {
      suggestions.push({
        icon: <Brain className="h-4 w-4 text-blue-500" />,
        text: "Good foundation! Try mixed practice tests to identify weak areas",
        action: "Take Practice Test",
        priority: "medium"
      });
    } else if (score >= 60 && score < 80) {
      suggestions.push({
        icon: <Zap className="h-4 w-4 text-purple-500" />,
        text: "You're doing well! Focus on speed and accuracy with timed practice",
        action: "Time-bound Practice",
        priority: "medium"
      });
    } else {
      suggestions.push({
        icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
        text: "Excellent! Maintain consistency and try advanced challenging questions",
        action: "Advanced Practice",
        priority: "low"
      });
    }

    // Time-based suggestions
    if (currentHour < 12) {
      suggestions.push({
        icon: <Clock className="h-4 w-4 text-orange-500" />,
        text: "Morning energy is high! Tackle your most challenging topics now",
        action: "Study Difficult Topics",
        priority: "high"
      });
    } else if (currentHour > 18) {
      suggestions.push({
        icon: <BookOpen className="h-4 w-4 text-blue-500" />,
        text: "Evening review time! Go through what you learned today",
        action: "Review Today's Work",
        priority: "medium"
      });
    }

    // Day-based suggestions
    if (currentDay === 0 || currentDay === 6) { // Weekend
      suggestions.push({
        icon: <Brain className="h-4 w-4 text-violet-500" />,
        text: "Weekend deep dive! Perfect time for comprehensive topic revision",
        action: "Deep Topic Study",
        priority: "medium"
      });
    }

    return suggestions.slice(0, 2); // Limit to 2 suggestions
  };

  const smartSuggestions = getSmartSuggestions();

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Exam Readiness</CardTitle>
            <CardDescription>{section === "overall" ? "Your overall preparation level" : `${section} readiness`}</CardDescription>
          </div>
          <div className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 
            ${trendDirection === "up" ? "text-green-700 bg-green-50" : 
              trendDirection === "down" ? "text-red-700 bg-red-50" : 
              "text-gray-700 bg-gray-50"}`}>
            {trendDirection === "up" ? (
              <TrendingUp className="h-3 w-3" />
            ) : trendDirection === "down" ? (
              <TrendingUp className="h-3 w-3 rotate-180" />
            ) : (
              <ChartLine className="h-3 w-3" />
            )}
            {trendDirection === "up" ? "Improving" : 
              trendDirection === "down" ? "Declining" : 
              "Stable"}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Current Score</span>
              <span className="font-bold text-lg">{score}%</span>
            </div>
            <Progress value={score} className={`h-2 ${getColorByScore(score)}`} />
          </div>
          
          {/* Switch Exam and Generate New Plan buttons below progress meter */}
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" className="flex-1">
              Switch Exam
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              Generate New Plan
            </Button>
          </div>
          
          {weeklyTrend.length > 0 && (
            <div className="pt-2">
              <h4 className="text-sm font-medium mb-2">Weekly Progress</h4>
              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={weeklyTrend}
                    margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                    <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ stroke: '#3b82f6', strokeWidth: 2, fill: 'white', r: 3 }}
                      activeDot={{ stroke: '#3b82f6', strokeWidth: 2, fill: '#3b82f6', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
          
          {/* Smart Suggestions Section (replaces Tips to Improve) */}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            <h4 className="text-sm font-medium mb-3 flex items-center gap-1">
              <Brain className="h-4 w-4 text-violet-600" /> Smart Suggestions
            </h4>
            <div className="space-y-3">
              {smartSuggestions.map((suggestion, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border-l-4 ${
                    suggestion.priority === 'high' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                    suggestion.priority === 'medium' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                    'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {suggestion.icon}
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-800 dark:text-gray-200 mb-1">
                        {suggestion.text}
                      </p>
                      <Button size="sm" variant="outline" className="text-xs h-6">
                        {suggestion.action}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Button size="sm" variant="outline" className="w-full mt-2 text-xs flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            View Detailed Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamReadinessMeter;
