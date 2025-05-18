
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Info, BookOpen } from 'lucide-react';

interface WeeklyTrendData {
  week: string;
  score: number;
}

interface ExamReadinessSectionProps {
  score: number;
  previousScore?: number;
  weeklyTrends: WeeklyTrendData[];
  weakAreas: string[];
  strongAreas: string[];
}

const ExamReadinessSection = ({ 
  score, 
  previousScore, 
  weeklyTrends = [], 
  weakAreas = [],
  strongAreas = []
}: ExamReadinessSectionProps) => {
  const scoreDifference = previousScore ? score - previousScore : 0;
  const scoreColor = score < 40 ? "text-red-500" : score < 70 ? "text-amber-500" : "text-green-500";
  
  // Calculate score trend (upward or downward)
  const scoreDirection = scoreDifference > 0 ? 'up' : scoreDifference < 0 ? 'down' : 'unchanged';
  
  // Generate improvement tips based on score
  const getImprovementTips = () => {
    if (score < 40) {
      return [
        "Focus on mastering fundamental concepts before moving to advanced topics",
        "Increase your daily study time by 30 minutes",
        "Start with short practice quizzes to build confidence",
        `Prioritize weak areas like: ${weakAreas.slice(0, 2).join(', ')}`
      ];
    } else if (score < 70) {
      return [
        "Balance your study time between strong and weak subjects",
        "Start taking more practice tests to improve exam readiness",
        "Review your notes from previous study sessions regularly",
        "Implement spaced repetition for better retention"
      ];
    } else {
      return [
        "Focus on maintaining your strong performance with regular practice tests",
        "Try teaching concepts to others to strengthen understanding",
        "Challenge yourself with more difficult practice questions",
        "Fine-tune your exam strategy with timed practice sessions"
      ];
    }
  };
  
  const improvementTips = getImprovementTips();
  
  return (
    <Card className="shadow-md border-t-4 border-t-blue-500 animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Exam Readiness Score
            </CardTitle>
            <CardDescription>
              Track your preparation level for upcoming exams
            </CardDescription>
          </div>
          <div className="text-center">
            <div className={`text-4xl font-bold ${scoreColor}`}>
              {score}%
            </div>
            {previousScore && (
              <div className={`text-sm ${scoreDifference > 0 ? 'text-green-500' : scoreDifference < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                {scoreDifference > 0 ? '+' : ''}{scoreDifference}% since last week
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="h-44">
            <p className="text-sm text-muted-foreground mb-2">Weekly Progress</p>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line 
                  type="monotone"
                  dataKey="score"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, stroke: '#1d4ed8', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div>
            <div className="mb-4">
              <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                <BookOpen className="h-4 w-4 text-amber-500" /> 
                Areas Needing Improvement
              </h4>
              <div className="space-y-1">
                {weakAreas.map((area, i) => (
                  <div key={`weak-${i}`} className="text-sm px-2 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded">
                    {area}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
                <BookOpen className="h-4 w-4 text-green-500" /> 
                Strong Areas
              </h4>
              <div className="space-y-1">
                {strongAreas.map((area, i) => (
                  <div key={`strong-${i}`} className="text-sm px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded">
                    {area}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
            <Info className="h-4 w-4 text-blue-500" /> 
            Tips to Improve Your Exam Readiness
          </h4>
          <ul className="list-disc pl-5 space-y-1">
            {improvementTips.map((tip, i) => (
              <li key={`tip-${i}`} className="text-sm text-muted-foreground">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamReadinessSection;
