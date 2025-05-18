
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartLine, TrendingUp, AlertCircle, CheckCircle2, BookOpen } from 'lucide-react';

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
  
  const getImprovementTips = () => {
    if (score >= 80) {
      return [
        "Keep reviewing high-yield topics regularly",
        "Focus on advanced practice tests",
        "Try teaching concepts to others to reinforce learning"
      ];
    } else if (score >= 60) {
      return [
        "Increase practice test frequency",
        "Create concise summary sheets for key concepts",
        "Form study groups for challenging topics"
      ];
    } else if (score >= 40) {
      return [
        "Establish a regular daily study schedule",
        "Focus on core concepts before advanced topics",
        "Use flashcards for active recall practice"
      ];
    } else {
      return [
        "Build strong foundational knowledge first",
        "Break down complex topics into smaller chunks",
        "Schedule focused study sessions without distractions"
      ];
    }
  };

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
          
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> Tips to Improve
            </h4>
            <ul className="space-y-1">
              {getImprovementTips().map((tip, index) => (
                <li key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
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
