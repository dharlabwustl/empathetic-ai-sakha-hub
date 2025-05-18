
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Target, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ExamReadinessProps {
  currentScore: number;
  weeklyData: Array<{
    week: string;
    score: number;
  }>;
  targetExam: string;
  daysRemaining: number;
}

const ExamReadinessKPI: React.FC<ExamReadinessProps> = ({ 
  currentScore, 
  weeklyData, 
  targetExam,
  daysRemaining
}) => {
  const { toast } = useToast();
  const isScoreIncreasing = weeklyData.length >= 2 && 
    weeklyData[weeklyData.length - 1].score > weeklyData[weeklyData.length - 2].score;
  
  const getColorClass = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-blue-600 dark:text-blue-400';
    if (score >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };
  
  const getImprovementTips = () => {
    if (currentScore >= 80) {
      return [
        "Continue with your current routine, it's working well",
        "Focus on fine-tuning weak areas within your strong subjects",
        "Start taking more full-length practice exams to build stamina"
      ];
    } else if (currentScore >= 60) {
      return [
        "Increase your daily flashcard review sessions",
        "Spend more time on practice questions in your weaker subjects",
        "Try the Pomodoro technique: 25-minute focused study sessions with 5-minute breaks"
      ];
    } else if (currentScore >= 40) {
      return [
        "Review your study schedule and increase focus time",
        "Take more practice tests to identify knowledge gaps",
        "Try explaining concepts to someone else to reinforce understanding"
      ];
    } else {
      return [
        "Create a strict daily study schedule and stick to it",
        "Focus on understanding fundamental concepts before moving to advanced topics",
        "Join a study group or seek tutoring for difficult subjects"
      ];
    }
  };
  
  const handleShowDetailedAnalysis = () => {
    toast({
      title: "Detailed Analysis",
      description: "Opening detailed exam readiness analytics"
    });
    // Navigate to detailed analysis page or show modal
  };
  
  const handleCreateImprovementPlan = () => {
    toast({
      title: "Improvement Plan",
      description: "Creating a personalized improvement plan based on your current readiness score"
    });
    // Generate and show improvement plan
  };
  
  const tips = getImprovementTips();

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <span>Exam Readiness</span>
          </div>
          {daysRemaining <= 30 && (
            <div className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 text-xs py-1 px-2 rounded-full flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {daysRemaining} days left
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main score and trend */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg text-center lg:col-span-1">
            <div className={`text-4xl font-bold mb-1 ${getColorClass(currentScore)}`}>
              {currentScore}%
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              for {targetExam}
            </div>
            <div className="flex items-center justify-center gap-1 text-sm">
              {isScoreIncreasing ? (
                <>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-500">Improving</span>
                </>
              ) : (
                <>
                  <TrendingDown className="h-4 w-4 text-red-500" />
                  <span className="text-red-500">Needs attention</span>
                </>
              )}
            </div>
          </div>
          
          {/* Weekly trend chart */}
          <div className="lg:col-span-2 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={weeklyData}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Improvement tips */}
        <div className="mt-4 border-t pt-4">
          <h3 className="text-sm font-medium mb-2">Tips to improve your score:</h3>
          <ul className="space-y-1">
            {tips.map((tip, index) => (
              <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                <div className="min-w-4 mt-0.5">•</div>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
            <Button variant="outline" size="sm" onClick={handleShowDetailedAnalysis}>
              View Detailed Analysis
            </Button>
            <Button size="sm" onClick={handleCreateImprovementPlan}>
              Create Improvement Plan
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamReadinessKPI;
