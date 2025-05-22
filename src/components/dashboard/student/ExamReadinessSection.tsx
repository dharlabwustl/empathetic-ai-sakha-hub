
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarCheck, TrendingUp, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface ExamReadinessSectionProps {
  score: number;
  previousScore?: number;
  weeklyTrends: Array<{week: string; score: number}>;
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
  const scoreImprovement = previousScore ? score - previousScore : 0;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className="border-2 border-purple-100 dark:border-purple-900/30">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                <CalendarCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle className="text-xl">Exam Readiness</CardTitle>
                <p className="text-sm text-muted-foreground">Your NEET readiness score</p>
              </div>
            </div>
            <Button variant="ghost" className="text-purple-600 dark:text-purple-400">
              View Details <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Score Section */}
            <motion.div 
              className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-lg"
              variants={itemVariants}
            >
              <div className="text-center">
                <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-2">Current Score</p>
                <div className="relative inline-block">
                  <motion.div 
                    className="text-4xl font-bold text-purple-700 dark:text-purple-300"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    {score}%
                  </motion.div>
                  
                  {scoreImprovement > 0 && (
                    <div className="absolute -top-2 -right-12 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-2 py-1 rounded-full flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{scoreImprovement}%
                    </div>
                  )}
                </div>
                
                <div className="mt-4 flex justify-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + (i * 0.1) }}
                    >
                      <Star 
                        className={`h-5 w-5 ${
                          i < Math.floor(score/20) 
                            ? "text-amber-400 fill-amber-400" 
                            : i < score/20 
                              ? "text-amber-400 fill-amber-200" 
                              : "text-gray-300 dark:text-gray-600"
                        }`} 
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Chart Section */}
            <motion.div 
              className="lg:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-inner border border-gray-100 dark:border-gray-700"
              variants={itemVariants}
            >
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-2">Weekly Progress Trend</p>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={weeklyTrends}
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#8884d8" 
                      fillOpacity={1} 
                      fill="url(#colorScore)" 
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            
            {/* Areas Section */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
              <h4 className="font-medium mb-2">Needs Improvement</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {weakAreas.map((area, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800/30">
                      {area}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
              <h4 className="font-medium mb-2">Strong Areas</h4>
              <div className="flex flex-wrap gap-2">
                {strongAreas.map((area, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800/30">
                      {area}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 lg:col-span-1">
              <h4 className="font-medium mb-2">Recommended Actions</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <div className="h-2 w-2 bg-purple-500 rounded-full mr-2"></div>
                  Focus on Organic Chemistry
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <div className="h-2 w-2 bg-purple-500 rounded-full mr-2"></div>
                  Review Thermodynamics formulas
                </li>
                <li className="flex items-center text-gray-700 dark:text-gray-300">
                  <div className="h-2 w-2 bg-purple-500 rounded-full mr-2"></div>
                  Practice more Vector problems
                </li>
              </ul>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExamReadinessSection;
