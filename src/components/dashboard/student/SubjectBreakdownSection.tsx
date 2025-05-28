
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface SubjectData {
  subject: string;
  priority: 'High' | 'Medium' | 'Low';
  concepts: { completed: number; total: number };
  flashcards: { completed: number; total: number };
  practiceTests: { completed: number; total: number };
  quizScore: number;
  recallAccuracy: number;
  status: 'completed' | 'in-progress' | 'pending';
}

const SubjectBreakdownSection = () => {
  const subjectData: SubjectData[] = [
    {
      subject: 'Physics',
      priority: 'High',
      concepts: { completed: 42, total: 60 },
      flashcards: { completed: 85, total: 120 },
      practiceTests: { completed: 15, total: 20 },
      quizScore: 72,
      recallAccuracy: 68,
      status: 'in-progress'
    },
    {
      subject: 'Chemistry',
      priority: 'Medium',
      concepts: { completed: 48, total: 55 },
      flashcards: { completed: 110, total: 130 },
      practiceTests: { completed: 18, total: 22 },
      quizScore: 78,
      recallAccuracy: 74,
      status: 'in-progress'
    },
    {
      subject: 'Biology',
      priority: 'High',
      concepts: { completed: 55, total: 55 },
      flashcards: { completed: 180, total: 180 },
      practiceTests: { completed: 25, total: 25 },
      quizScore: 92,
      recallAccuracy: 90,
      status: 'completed'
    }
  ];

  const overallStats = [
    { label: 'Concepts Completed', value: '45/60', change: '+5', color: 'text-blue-600' },
    { label: 'Quiz Average Score', value: '82%', change: '+3', color: 'text-green-600' },
    { label: 'Flashcard Recall', value: '78%', change: '+7', color: 'text-purple-600' },
    { label: 'Practice Tests', value: '12', change: '+2', color: 'text-orange-600' },
    { label: 'Daily Study Goal', value: '4.5 hrs', change: '+0.5%', color: 'text-red-600' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">✅ Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">🟡 In Progress</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300">⚪ Pending</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">High</Badge>;
      case 'Medium':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">Medium</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Low</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-75 animate-pulse"></div>
        <Card className="relative bg-white dark:bg-gray-900">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Overall Progress Summary
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="h-4 w-4 text-yellow-500" />
              </motion.div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {overallStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg"
                >
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  <div className="text-xs text-green-600 font-medium">{stat.change}</div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Subject-wise breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-violet-600" />
              Subject-Wise Detailed Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Subject</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Priority</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Concepts</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Flashcards</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Practice Tests</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Quiz Score</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Recall Accuracy</th>
                    <th className="text-left py-3 px-2 font-medium text-gray-700 dark:text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {subjectData.map((subject, index) => (
                    <motion.tr
                      key={subject.subject}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <td className="py-4 px-2 font-medium text-gray-900 dark:text-white">{subject.subject}</td>
                      <td className="py-4 px-2">{getPriorityBadge(subject.priority)}</td>
                      <td className="py-4 px-2">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {subject.concepts.completed} / {subject.concepts.total}
                        </div>
                        <Progress 
                          value={(subject.concepts.completed / subject.concepts.total) * 100} 
                          className="h-2 mt-1" 
                        />
                      </td>
                      <td className="py-4 px-2">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {subject.flashcards.completed} / {subject.flashcards.total}
                        </div>
                        <Progress 
                          value={(subject.flashcards.completed / subject.flashcards.total) * 100} 
                          className="h-2 mt-1" 
                        />
                      </td>
                      <td className="py-4 px-2">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {subject.practiceTests.completed} / {subject.practiceTests.total}
                        </div>
                        <Progress 
                          value={(subject.practiceTests.completed / subject.practiceTests.total) * 100} 
                          className="h-2 mt-1" 
                        />
                      </td>
                      <td className="py-4 px-2">
                        <span className={`font-medium ${
                          subject.quizScore >= 80 ? 'text-green-600 dark:text-green-400' : 
                          subject.quizScore >= 60 ? 'text-yellow-600 dark:text-yellow-400' : 
                          'text-red-600 dark:text-red-400'
                        }`}>
                          {subject.quizScore}%
                        </span>
                      </td>
                      <td className="py-4 px-2">
                        <span className={`font-medium ${
                          subject.recallAccuracy >= 80 ? 'text-green-600 dark:text-green-400' : 
                          subject.recallAccuracy >= 60 ? 'text-yellow-600 dark:text-yellow-400' : 
                          'text-red-600 dark:text-red-400'
                        }`}>
                          {subject.recallAccuracy}%
                        </span>
                      </td>
                      <td className="py-4 px-2">{getStatusBadge(subject.status)}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SubjectBreakdownSection;
