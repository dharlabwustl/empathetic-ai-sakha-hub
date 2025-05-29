
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Clock, Target, Zap, BookOpen, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const KpiTabsCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('performance');

  const performanceData = [
    { metric: 'Overall Score', value: 87, change: '+5%', color: 'green' },
    { metric: 'Study Streak', value: 12, change: '+2 days', color: 'blue' },
    { metric: 'Accuracy Rate', value: 78, change: '+3%', color: 'purple' },
    { metric: 'Completion Rate', value: 92, change: '+8%', color: 'orange' }
  ];

  const timeData = [
    { metric: 'Daily Average', value: '5.2h', change: '+30m', color: 'blue' },
    { metric: 'This Week', value: '28h', change: '+4h', color: 'green' },
    { metric: 'Focus Time', value: '4.1h', change: '+45m', color: 'purple' },
    { metric: 'Break Time', value: '1.1h', change: '-15m', color: 'orange' }
  ];

  const progressData = [
    { subject: 'Physics', progress: 75, target: 85, color: 'blue' },
    { subject: 'Chemistry', progress: 45, target: 70, color: 'orange' },
    { subject: 'Biology', progress: 68, target: 80, color: 'green' },
    { subject: 'Mathematics', progress: 55, target: 75, color: 'purple' }
  ];

  const renderMetricCard = (item: any, index: number) => (
    <motion.div
      key={item.metric}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-4 rounded-lg border"
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.metric}</h4>
        <Badge className={`bg-${item.color}-100 text-${item.color}-800 text-xs`}>
          {item.change}
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {typeof item.value === 'number' && item.metric !== 'Study Streak' ? `${item.value}%` : item.value}
        </span>
        <TrendingUp className={`h-4 w-4 text-${item.color}-600`} />
      </div>
    </motion.div>
  );

  const renderProgressCard = (item: any, index: number) => (
    <motion.div
      key={item.subject}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-4 rounded-lg border"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-gray-900 dark:text-white">{item.subject}</h4>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {item.progress}% / {item.target}%
        </span>
      </div>
      <div className="space-y-2">
        <Progress value={item.progress} className="h-2" />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Current</span>
          <span>Target: {item.target}%</span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="time" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Time
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="performance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {performanceData.map(renderMetricCard)}
            </div>
          </TabsContent>

          <TabsContent value="time">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {timeData.map(renderMetricCard)}
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {progressData.map(renderProgressCard)}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default KpiTabsCard;
