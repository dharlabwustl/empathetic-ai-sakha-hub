
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Info, BookOpen, ArrowRight, LightbulbIcon, BrainIcon, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

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
  const [showDetailedSuggestions, setShowDetailedSuggestions] = useState(false);
  const scoreDifference = previousScore ? score - previousScore : 0;
  const scoreColor = score < 40 ? "text-red-500" : score < 70 ? "text-amber-500" : "text-green-500";
  
  // Calculate score trend (upward or downward)
  const scoreDirection = scoreDifference > 0 ? 'up' : scoreDifference < 0 ? 'down' : 'unchanged';
  
  // Generate improvement tips based on score and areas
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
  
  // Generate personalized recommendations based on weak areas
  const getPersonalizedRecommendations = () => {
    const recommendations = [];
    
    if (weakAreas.includes('Organic Chemistry')) {
      recommendations.push("For Organic Chemistry: Focus on reaction mechanisms and practice with molecular models");
    }
    
    if (weakAreas.includes('Thermodynamics')) {
      recommendations.push("For Thermodynamics: Review the laws and work through numerical problems step by step");
    }
    
    if (weakAreas.includes('Vectors')) {
      recommendations.push("For Vectors: Strengthen your visualization skills with graphical problems");
    }
    
    if (weeklyTrends.length >= 2) {
      const lastWeek = weeklyTrends[weeklyTrends.length - 1].score;
      const secondLastWeek = weeklyTrends[weeklyTrends.length - 2].score;
      
      if (lastWeek < secondLastWeek) {
        recommendations.push("Your performance has slightly declined recently. Consider revisiting recent topics you've studied.");
      }
    }
    
    // Add study pattern recommendations based on score
    if (score < 50) {
      recommendations.push("Based on your current score, we recommend increasing your daily study time by 25%");
    }
    
    return recommendations.length > 0 ? recommendations : ["Continue with your current study pattern while focusing on weak areas"];
  };
  
  const improvementTips = getImprovementTips();
  const personalizedRecommendations = getPersonalizedRecommendations();
  
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
          
          <Button 
            variant="link" 
            size="sm" 
            className="mt-2 p-0"
            onClick={() => setShowDetailedSuggestions(!showDetailedSuggestions)}
          >
            {showDetailedSuggestions ? "Hide detailed suggestions" : "Show detailed suggestions"}
            <ArrowRight className={`h-3 w-3 ml-1 transition-transform ${showDetailedSuggestions ? 'rotate-90' : ''}`} />
          </Button>
          
          {showDetailedSuggestions && (
            <div className="mt-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-800">
              <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center">
                <LightbulbIcon className="h-4 w-4 mr-1" />
                Personalized Improvement Plan
              </h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-medium text-blue-700 dark:text-blue-400">Based on your performance data</h5>
                  <ul className="mt-1 space-y-1">
                    {personalizedRecommendations.map((rec, i) => (
                      <li key={`rec-${i}`} className="text-xs flex items-start">
                        <span className="text-blue-500 mr-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-blue-700 dark:text-blue-400">Study time allocation</h5>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {weakAreas.slice(0, 2).map((area, i) => (
                      <div key={`focus-${i}`}>
                        <div className="flex justify-between text-xs">
                          <span>{area}</span>
                          <span className="font-medium">40%</span>
                        </div>
                        <Progress value={40} className="h-1 mt-1" />
                      </div>
                    ))}
                    {strongAreas.slice(0, 2).map((area, i) => (
                      <div key={`maintain-${i}`}>
                        <div className="flex justify-between text-xs">
                          <span>{area}</span>
                          <span className="font-medium">20%</span>
                        </div>
                        <Progress value={20} className="h-1 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <BrainIcon className="h-3 w-3 text-purple-500 mr-1" />
                    <span className="text-xs font-medium">Learning approach:</span>
                  </div>
                  <Badge variant="outline" className="text-xs bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                    Interactive practice
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 text-indigo-500 mr-1" />
                    <span className="text-xs font-medium">Recommended study sessions:</span>
                  </div>
                  <Badge variant="outline" className="text-xs bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300">
                    45 min with 10 min breaks
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamReadinessSection;
