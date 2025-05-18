
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Legend,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Info, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

const ReadinessScoreMeter = ({ score }: { score: number }) => {
  return (
    <div className="relative pt-4">
      <div className="w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <div className="absolute left-0 right-0 -top-2 flex justify-between px-2 text-xs text-gray-500 dark:text-gray-400">
        <span>0</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100</span>
      </div>
      <motion.div 
        className="absolute text-lg font-bold"
        style={{ 
          left: `${score}%`, 
          transform: 'translateX(-50%)', 
          top: '20px' 
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {score}
      </motion.div>
    </div>
  );
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const data = [
  { name: 'Concepts', value: 75 },
  { name: 'Practice Tests', value: 68 },
  { name: 'Flashcards', value: 82 },
  { name: 'Revision', value: 60 }
];

// Weekly trend data for the readiness score
const weeklyTrendData = [
  { week: 'Week 1', readiness: 58 },
  { week: 'Week 2', readiness: 62 },
  { week: 'Week 3', readiness: 65 },
  { week: 'Week 4', readiness: 72 }
];

// Weekly breakdowns by category
const categoryTrendData = [
  { week: 'Week 1', concepts: 55, practice: 50, flashcards: 70, revision: 45 },
  { week: 'Week 2', concepts: 60, practice: 58, flashcards: 75, revision: 50 },
  { week: 'Week 3', concepts: 65, practice: 64, flashcards: 78, revision: 54 },
  { week: 'Week 4', concepts: 75, practice: 68, flashcards: 82, revision: 60 }
];

// Custom readiness improvement tips based on the current performance
const getReadinessTips = (overallScore: number, categoryData: { name: string, value: number }[]) => {
  const tips = [];
  
  // Find the lowest category
  const sortedCategories = [...categoryData].sort((a, b) => a.value - b.value);
  const lowestCategory = sortedCategories[0];
  
  // Generic tip based on overall score
  if (overallScore < 60) {
    tips.push({
      title: "Increase your study time",
      description: "Try to add 30 extra minutes of focused study time each day to improve your overall readiness."
    });
  }
  
  // Specific tips based on categories
  if (lowestCategory.name === 'Concepts' && lowestCategory.value < 80) {
    tips.push({
      title: "Focus on concept mastery",
      description: "Spend more time understanding fundamental concepts rather than memorizing facts."
    });
  }
  
  if (lowestCategory.name === 'Practice Tests' && lowestCategory.value < 80) {
    tips.push({
      title: "Take more practice tests",
      description: "Increase the number of practice tests to improve your exam readiness score."
    });
  }
  
  if (lowestCategory.name === 'Flashcards' && lowestCategory.value < 80) {
    tips.push({
      title: "Review your flashcards more frequently",
      description: "Set aside time each day to review your flashcards to improve your recall accuracy."
    });
  }
  
  if (lowestCategory.name === 'Revision' && lowestCategory.value < 80) {
    tips.push({
      title: "Implement a revision schedule",
      description: "Schedule regular revision sessions for previously learned material to prevent forgetting."
    });
  }
  
  // Add a general positive tip if the score is already good
  if (overallScore >= 70) {
    tips.push({
      title: "You're on the right track!",
      description: "Keep up your current study routine and focus on maintaining consistency."
    });
  }
  
  return tips;
};

interface ExamReadinessScoreProps {
  overallScore: number;
  targetExam: string;
  daysUntilExam?: number;
}

const ExamReadinessScore: React.FC<ExamReadinessScoreProps> = ({ 
  overallScore = 72, 
  targetExam = "IIT-JEE",
  daysUntilExam = 85
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [showTrends, setShowTrends] = useState(false);
  
  // Get personalized improvement tips
  const readinessTips = getReadinessTips(overallScore, data);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Exam Readiness</span>
          <motion.div 
            className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            {targetExam}
          </motion.div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="mb-10">
          <motion.div 
            className={`text-center text-3xl font-bold mb-2 ${
              overallScore >= 80 ? 'text-green-600 dark:text-green-400' : 
              overallScore >= 60 ? 'text-yellow-600 dark:text-yellow-400' : 
              'text-red-600 dark:text-red-400'
            }`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
          >
            {overallScore}/100
          </motion.div>
          
          {daysUntilExam && (
            <div className="text-center text-sm text-muted-foreground mb-4">
              {daysUntilExam} days until your exam
            </div>
          )}
          
          <ReadinessScoreMeter score={overallScore} />
        </div>
        
        <div className="flex flex-col space-y-2">
          <Button
            variant="outline" 
            size="sm" 
            onClick={() => setExpanded(!expanded)} 
            className="w-full flex items-center justify-center gap-2"
          >
            {expanded ? 'Hide Details' : 'View Details'}
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          
          {expanded && (
            <>
              <Button
                variant="ghost" 
                size="sm" 
                onClick={() => setShowTrends(!showTrends)} 
                className="w-full flex items-center justify-center gap-2 mt-2"
              >
                {showTrends ? 'Hide Weekly Trends' : 'Show Weekly Trends'}
                {showTrends ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="ghost" 
                size="sm" 
                onClick={() => setShowTips(!showTips)} 
                className="w-full flex items-center justify-center gap-2"
              >
                {showTips ? 'Hide Improvement Tips' : 'Show Improvement Tips'}
                {showTips ? <ChevronUp className="h-4 w-4" /> : <Info className="h-4 w-4" />}
              </Button>
            </>
          )}
        </div>
        
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                Readiness by Category
                <Info className="h-4 w-4 text-muted-foreground" />
              </h4>
              
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="space-y-2">
                  {data.map((entry, index) => (
                    <div key={`ability-${index}`}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{entry.name}</span>
                        <span className="font-medium">{entry.value}%</span>
                      </div>
                      <Progress value={entry.value} className="h-2" />
                    </div>
                  ))}
                </div>
                
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend layout="vertical" verticalAlign="middle" align="right" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Weekly Trends Section */}
              {showTrends && (
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-medium text-sm mb-4 flex items-center gap-2">
                    Weekly Trends
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </h4>
                  
                  <div className="h-[200px] mb-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weeklyTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="readiness" 
                          stroke="#8884d8" 
                          strokeWidth={2}
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={categoryTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="concepts" stroke="#0088FE" strokeWidth={2} />
                        <Line type="monotone" dataKey="practice" stroke="#00C49F" strokeWidth={2} />
                        <Line type="monotone" dataKey="flashcards" stroke="#FFBB28" strokeWidth={2} />
                        <Line type="monotone" dataKey="revision" stroke="#FF8042" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">Monthly Change: </span>
                      <span className="text-green-600">+14%</span>
                    </div>
                    <div className="text-xs text-muted-foreground text-right">
                      <span className="font-medium">Projected at exam: </span>
                      <span className="text-blue-600">85%</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Improvement Tips Section */}
              {showTips && (
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                    Personalized Improvement Tips
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </h4>
                  
                  <div className="space-y-4">
                    {readinessTips.map((tip, index) => (
                      <div key={index} className="bg-muted/30 p-3 rounded-md border-l-4 border-primary">
                        <div className="font-medium">{tip.title}</div>
                        <div className="text-sm text-muted-foreground mt-1">{tip.description}</div>
                      </div>
                    ))}
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm">
                      <h5 className="font-medium mb-2 flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        Key Focus Areas:
                      </h5>
                      <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                        <li>Increase {data[0].name} practice (currently {data[0].value}%)</li>
                        <li>Set aside time for daily {data[3].name} sessions</li>
                        <li>Keep up your good work with {data[2].name}!</li>
                      </ul>
                      
                      <div className="mt-3 flex justify-end">
                        <Button variant="link" size="sm" className="text-xs flex items-center">
                          View detailed improvement plan <ArrowRight className="h-3 w-3 ml-1"/>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Base Recommendations */}
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-sm mt-4">
                <h5 className="font-medium mb-2">Recommendations:</h5>
                <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                  <li>Focus more on Revision sessions</li>
                  <li>Increase Practice Test frequency</li>
                  <li>Keep up the good work with Flashcards!</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExamReadinessScore;
