
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowUpIcon, ArrowDownIcon, TrendingUp, BookOpen, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ExamReadinessSectionProps {
  score: number;
  previousScore?: number;
  weeklyTrends: Array<{ week: string; score: number }>;
  weakAreas: string[];
  strongAreas: string[];
  tips?: string[];
}

const ExamReadinessSection: React.FC<ExamReadinessSectionProps> = ({
  score,
  previousScore,
  weeklyTrends,
  weakAreas,
  strongAreas,
  tips = []
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Calculate score difference and determine if it's an improvement or decline
  const scoreDiff = previousScore !== undefined ? score - previousScore : 0;
  const isImprovement = scoreDiff >= 0;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Exam Readiness Score</CardTitle>
            <CardDescription>
              How prepared are you for your upcoming exams
            </CardDescription>
          </div>
          <div className="flex items-center">
            <span className="text-3xl font-bold mr-2">{score}%</span>
            {previousScore !== undefined && (
              <Badge variant={isImprovement ? "default" : "destructive"} className="flex items-center">
                {isImprovement ? <ArrowUpIcon className="mr-1 h-3 w-3" /> : <ArrowDownIcon className="mr-1 h-3 w-3" />}
                {Math.abs(scoreDiff)}%
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Progress indicator */}
        <div className="mb-4">
          <Progress value={score} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Needs work</span>
            <span>Ready</span>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="areas">Areas</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
          </TabsList>
          
          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-4">
            <div className="mt-4 h-[200px]">
              <p className="text-sm font-medium mb-2">Weekly Progress</p>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={weeklyTrends}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="week" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#8884d8"
                    fill="url(#colorScore)"
                  />
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          {/* AREAS TAB */}
          <TabsContent value="areas">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 text-yellow-500 mr-2" />
                  <h3 className="font-medium">Areas to Improve</h3>
                </div>
                <ul className="space-y-1">
                  {weakAreas.map((area, index) => (
                    <li key={`weak-${index}`} className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                      <span className="text-sm">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-green-500 mr-2" />
                  <h3 className="font-medium">Strong Areas</h3>
                </div>
                <ul className="space-y-1">
                  {strongAreas.map((area, index) => (
                    <li key={`strong-${index}`} className="flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      <span className="text-sm">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
          
          {/* TIPS TAB */}
          <TabsContent value="tips">
            <div className="space-y-3 mt-4">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-blue-500 mr-2" />
                <h3 className="font-medium">Improvement Suggestions</h3>
              </div>
              <ul className="space-y-2 pl-2">
                {tips.map((tip, index) => (
                  <li key={`tip-${index}`} className="flex items-start">
                    <span className="h-5 w-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-2 text-xs">
                      {index + 1}
                    </span>
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mt-4">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Pro Tip:</strong> Focus on areas where you score below 60% first as they have the most room for improvement.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExamReadinessSection;
