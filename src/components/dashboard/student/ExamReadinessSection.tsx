
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown, ChevronUp, Info, ArrowUp, ArrowDown, BarChart2, BookOpen, Check, AlertCircle } from 'lucide-react';

interface ExamReadinessSectionProps {
  score: number;
  previousScore?: number;
  weeklyTrends: Array<{ week: string; score: number }>;
  weakAreas: string[];
  strongAreas: string[];
}

const ExamReadinessSection: React.FC<ExamReadinessSectionProps> = ({ 
  score = 65, 
  previousScore = 58,
  weeklyTrends = [],
  weakAreas = [],
  strongAreas = []
}) => {
  const [expanded, setExpanded] = useState(false);
  const scoreDifference = previousScore ? score - previousScore : 0;

  // Determine color schemes based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-500';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-500';
    if (score >= 40) return 'text-orange-600 dark:text-orange-500';
    return 'text-red-600 dark:text-red-500';
  };

  const getScoreProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-600 dark:bg-green-500';
    if (score >= 60) return 'bg-yellow-600 dark:bg-yellow-500';
    if (score >= 40) return 'bg-orange-600 dark:bg-orange-500';
    return 'bg-red-600 dark:bg-red-500';
  };

  const getTipsBasedOnScore = (score: number) => {
    if (score >= 80) {
      return [
        "Continue focusing on high-yield topics for mastery",
        "Start taking full-length mock exams to build stamina",
        "Teach concepts to others to deepen your understanding",
        "Review topics you mastered several weeks ago to maintain recall"
      ];
    } else if (score >= 60) {
      return [
        "Increase practice with more challenging questions",
        "Create summary sheets for topics you've covered",
        "Join study groups for difficult concepts",
        "Use spaced repetition for better retention"
      ];
    } else if (score >= 40) {
      return [
        "Establish a consistent daily study routine",
        "Master fundamentals before moving to advanced topics",
        "Use active recall techniques like flashcards",
        "Break down complex topics into smaller parts"
      ];
    } else {
      return [
        "Focus on building strong basic knowledge first",
        "Identify and address knowledge gaps systematically",
        "Increase study time gradually but consistently",
        "Seek help from tutors for challenging concepts"
      ];
    }
  };

  const tips = getTipsBasedOnScore(score);

  return (
    <Card className="shadow-sm hover:shadow transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Exam Readiness Score</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(!expanded)} 
            className="h-8 w-8 p-0"
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <div className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}%</div>
                {previousScore && (
                  <div className={`text-sm font-medium flex items-center 
                    ${scoreDifference > 0 ? 'text-green-600 dark:text-green-400' : 
                      scoreDifference < 0 ? 'text-red-600 dark:text-red-400' : 
                      'text-gray-600 dark:text-gray-400'}`}
                  >
                    {scoreDifference > 0 ? (
                      <ArrowUp className="h-3 w-3 mr-0.5" />
                    ) : scoreDifference < 0 ? (
                      <ArrowDown className="h-3 w-3 mr-0.5" />
                    ) : null}
                    {scoreDifference > 0 ? `+${scoreDifference}%` : `${scoreDifference}%`}
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {score < 40 ? 'Needs work' : 
                 score < 60 ? 'Getting there' : 
                 score < 80 ? 'Good progress' : 'Excellent'}
              </div>
            </div>
            <Progress value={score} className={`h-2 ${getScoreProgressColor(score)}`} />
          </div>
          
          {expanded && (
            <>
              {/* Weekly trend chart */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium flex items-center">
                    <BarChart2 className="h-4 w-4 mr-1" />
                    Weekly Progress
                  </div>
                  {scoreDifference !== 0 && (
                    <div className={`text-xs px-2 py-0.5 rounded-full ${
                      scoreDifference > 0 
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' 
                        : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                    }`}>
                      {scoreDifference > 0 ? 'Improving' : 'Declining'}
                    </div>
                  )}
                </div>
                <div className="h-32 w-full bg-gray-50 dark:bg-gray-900/40 rounded-md p-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={weeklyTrends}
                      margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
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
              
              {/* Areas breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Weak areas */}
                <Card className="border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/5">
                  <CardHeader className="p-3 pb-1">
                    <CardTitle className="text-sm text-red-700 dark:text-red-400 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Areas Needing Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-1">
                    <ul className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
                      {weakAreas.map((area, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></div>
                          {area}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Strong areas */}
                <Card className="border border-green-100 dark:border-green-900/30 bg-green-50/50 dark:bg-green-900/5">
                  <CardHeader className="p-3 pb-1">
                    <CardTitle className="text-sm text-green-700 dark:text-green-400 flex items-center">
                      <Check className="h-4 w-4 mr-1" />
                      Strong Areas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-1">
                    <ul className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
                      {strongAreas.map((area, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></div>
                          {area}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              {/* Personalized tips */}
              <div>
                <div className="flex items-center mb-2">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <div className="text-sm font-medium">Tips to Improve Your Score</div>
                </div>
                <div className="bg-blue-50/50 dark:bg-blue-900/5 border border-blue-100 dark:border-blue-900/30 rounded-lg p-3">
                  <ul className="text-xs space-y-2">
                    {tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="min-w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-800/40 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xs mt-0.5 mr-2">
                          {idx + 1}
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
          
          {!expanded && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setExpanded(true)} 
              className="w-full border border-gray-200 dark:border-gray-800 text-xs"
            >
              View Details & Improvement Tips
              <ChevronDown className="ml-2 h-3 w-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamReadinessSection;
