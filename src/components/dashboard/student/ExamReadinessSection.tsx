
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Award, GraduationCap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ExamReadinessSectionProps {
  score: number;
  previousScore: number;
  weeklyTrends: { week: string; score: number }[];
  weakAreas: string[];
  strongAreas: string[];
}

const ExamReadinessSection: React.FC<ExamReadinessSectionProps> = ({
  score,
  previousScore,
  weeklyTrends,
  weakAreas,
  strongAreas
}) => {
  const scoreChange = score - previousScore;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
        <GraduationCap className="text-orange-500" size={20} />
        Exam Readiness
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main score card */}
        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-orange-900/20 border-amber-100 dark:border-amber-800/30 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-orange-700 dark:text-orange-300">
              Your Readiness Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold text-orange-600 dark:text-orange-400">{score}%</span>
              {scoreChange > 0 ? (
                <span className="text-sm text-green-600 dark:text-green-400 flex items-center">
                  <TrendingUp size={14} className="mr-1" /> +{scoreChange}%
                </span>
              ) : (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  No change
                </span>
              )}
            </div>
            
            <Progress value={score} className="h-2 mb-4" />
            
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-lg">
                <div className="font-semibold text-red-600 dark:text-red-400 mb-1">Needs Work</div>
                <div className="text-gray-600 dark:text-gray-400">0-40%</div>
              </div>
              <div className="bg-amber-100 dark:bg-amber-900/20 p-2 rounded-lg">
                <div className="font-semibold text-amber-600 dark:text-amber-400 mb-1">Getting There</div>
                <div className="text-gray-600 dark:text-gray-400">41-70%</div>
              </div>
              <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg">
                <div className="font-semibold text-green-600 dark:text-green-400 mb-1">Ready</div>
                <div className="text-gray-600 dark:text-gray-400">71-100%</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Weekly trends chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent className="h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyTrends}>
                <XAxis dataKey="week" tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} hide />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Readiness']} 
                  labelFormatter={(label) => `Week ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#f97316" 
                  strokeWidth={2} 
                  dot={{ r: 4, fill: "#f97316", strokeWidth: 0 }}
                  activeDot={{ r: 6, stroke: "#f97316", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Strong and weak areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              Areas Needing Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {weakAreas.map((area, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  {area}
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Award className="text-amber-500" size={16} />
              Strong Areas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {strongAreas.map((area, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  {area}
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default ExamReadinessSection;
