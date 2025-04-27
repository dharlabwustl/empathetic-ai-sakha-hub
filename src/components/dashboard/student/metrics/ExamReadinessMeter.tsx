
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ReadinessData {
  conceptCompletion: number;
  flashcardAccuracy: number;
  examScores: {
    physics: number;
    chemistry: number;
    mathematics: number;
  };
  overallReadiness: number;
  timestamp: string;
}

interface ExamReadinessMeterProps {
  readinessData: ReadinessData;
}

const ExamReadinessMeter: React.FC<ExamReadinessMeterProps> = ({ readinessData }) => {
  // Mock data for trends
  const trendData = [
    { week: 'Week 1', readiness: 45, target: 70 },
    { week: 'Week 2', readiness: 52, target: 70 },
    { week: 'Week 3', readiness: 58, target: 70 },
    { week: 'Week 4', readiness: 65, target: 70 },
    { week: 'Week 5', readiness: readinessData.overallReadiness, target: 70 },
  ];

  // Readiness level classification
  const getReadinessLevel = (score: number) => {
    if (score >= 90) return { level: 'Excellent', color: 'text-green-600' };
    if (score >= 75) return { level: 'Good', color: 'text-blue-600' };
    if (score >= 60) return { level: 'Satisfactory', color: 'text-yellow-600' };
    if (score >= 40) return { level: 'Needs Work', color: 'text-orange-600' };
    return { level: 'Critical', color: 'text-red-600' };
  };

  const readinessLevel = getReadinessLevel(readinessData.overallReadiness);

  // Getting color for progress bar
  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  // Calculate average exam score
  const averageExamScore = (
    readinessData.examScores.physics + 
    readinessData.examScores.chemistry + 
    readinessData.examScores.mathematics
  ) / 3;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Exam Readiness</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Readiness Score */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Overall Readiness</span>
              <span className={`font-bold ${readinessLevel.color}`}>
                {readinessData.overallReadiness}% - {readinessLevel.level}
              </span>
            </div>
            <Progress 
              value={readinessData.overallReadiness} 
              className="h-3"
            />
            
            <div className="grid grid-cols-1 gap-3 mt-6">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Concept Mastery</span>
                  <span>{readinessData.conceptCompletion}%</span>
                </div>
                <Progress 
                  value={readinessData.conceptCompletion} 
                  className="h-2" 
                />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Flashcard Recall</span>
                  <span>{readinessData.flashcardAccuracy}%</span>
                </div>
                <Progress 
                  value={readinessData.flashcardAccuracy} 
                  className="h-2"
                />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Practice Exam Scores</span>
                  <span>{averageExamScore.toFixed(1)}%</span>
                </div>
                <Progress 
                  value={averageExamScore} 
                  className="h-2"
                />
              </div>
            </div>
          </div>
          
          {/* Progress Chart */}
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trendData}
                margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="readiness"
                  stroke="#6366f1"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  name="Your Readiness"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#e11d48"
                  strokeDasharray="5 5"
                  name="Target"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Subject Breakdown */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <h3 className="font-medium mb-3">Subject Readiness</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <span className={getReadinessLevel(readinessData.examScores.physics).color}>
                {readinessData.examScores.physics}%
              </span>
              <div>
                <Progress 
                  value={readinessData.examScores.physics} 
                  className="h-1.5" 
                />
              </div>
              <p className="text-xs mt-1">Physics</p>
            </div>
            
            <div className="space-y-1">
              <span className={getReadinessLevel(readinessData.examScores.chemistry).color}>
                {readinessData.examScores.chemistry}%
              </span>
              <div>
                <Progress 
                  value={readinessData.examScores.chemistry} 
                  className="h-1.5"
                />
              </div>
              <p className="text-xs mt-1">Chemistry</p>
            </div>
            
            <div className="space-y-1">
              <span className={getReadinessLevel(readinessData.examScores.mathematics).color}>
                {readinessData.examScores.mathematics}%
              </span>
              <div>
                <Progress 
                  value={readinessData.examScores.mathematics} 
                  className="h-1.5"
                />
              </div>
              <p className="text-xs mt-1">Mathematics</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamReadinessMeter;
