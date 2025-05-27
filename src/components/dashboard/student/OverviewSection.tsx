
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Target, 
  Clock, 
  TrendingUp, 
  Brain,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SubjectProgress {
  name: string;
  completed: number;
  total: number;
  progress: number;
  efficiency: number;
  studyTime: number; // in minutes
}

interface OverviewSectionProps {
  title: string;
  subjects: SubjectProgress[];
  totalStudyTime: number;
  overallProgress: number;
  suggestions: string[];
  type: 'concepts' | 'flashcards' | 'practice-exams';
}

const OverviewSection: React.FC<OverviewSectionProps> = ({
  title,
  subjects,
  totalStudyTime,
  overallProgress,
  suggestions,
  type
}) => {
  const totalCompleted = subjects.reduce((sum, subject) => sum + subject.completed, 0);
  const totalPending = subjects.reduce((sum, subject) => sum + (subject.total - subject.completed), 0);
  const averageEfficiency = subjects.reduce((sum, subject) => sum + subject.efficiency, 0) / subjects.length;

  const getIcon = () => {
    switch (type) {
      case 'concepts': return <BookOpen className="h-5 w-5" />;
      case 'flashcards': return <Brain className="h-5 w-5" />;
      case 'practice-exams': return <FileText className="h-5 w-5" />;
    }
  };

  const getColorScheme = () => {
    switch (type) {
      case 'concepts': return 'blue';
      case 'flashcards': return 'purple';
      case 'practice-exams': return 'orange';
    }
  };

  const colorScheme = getColorScheme();

  return (
    <div className="space-y-6 mb-8">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          NEET {title} Overview
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Track your progress across Physics, Chemistry, and Biology
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-700">{totalCompleted}</p>
                  <p className="text-xs text-green-600">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold text-orange-700">{totalPending}</p>
                  <p className="text-xs text-orange-600">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className={`bg-gradient-to-br from-${colorScheme}-50 to-${colorScheme === 'blue' ? 'indigo' : colorScheme}-50 dark:from-${colorScheme}-900/20 dark:to-${colorScheme === 'blue' ? 'indigo' : colorScheme}-900/20 border-${colorScheme}-200`}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className={`h-8 w-8 text-${colorScheme}-600`} />
                <div>
                  <p className={`text-2xl font-bold text-${colorScheme}-700`}>{Math.round(totalStudyTime / 60)}h</p>
                  <p className={`text-xs text-${colorScheme}-600`}>Study Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-purple-700">{Math.round(averageEfficiency)}%</p>
                  <p className="text-xs text-purple-600">Efficiency</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* NEET Subject Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getIcon()}
            <span className={`text-${colorScheme}-600`}>NEET Subject Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {['Physics', 'Chemistry', 'Biology'].map((subjectName, index) => {
              const subject = subjects.find(s => s.name === subjectName) || {
                name: subjectName,
                completed: Math.floor(Math.random() * 50) + 20,
                total: 100,
                progress: Math.floor(Math.random() * 40) + 40,
                efficiency: Math.floor(Math.random() * 30) + 70,
                studyTime: Math.floor(Math.random() * 300) + 180
              };

              return (
                <motion.div
                  key={subjectName}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-lg">{subjectName}</span>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-sm">
                        {subject.completed}/{subject.total}
                      </Badge>
                      <span className="text-sm font-medium text-gray-600">{subject.progress}%</span>
                    </div>
                  </div>
                  <Progress value={subject.progress} className="h-3" />
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div className="flex justify-between">
                      <span>Efficiency:</span>
                      <span className="font-medium">{subject.efficiency}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span className="font-medium">{Math.round(subject.studyTime / 60)}h {subject.studyTime % 60}m</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* NEET-Specific Smart Suggestions */}
      <Card className={`bg-gradient-to-r from-${colorScheme}-50 to-purple-50 dark:from-${colorScheme}-900/20 dark:to-purple-900/20`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-600" />
            NEET Preparation Smart Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              `Focus on high-weightage ${type} in NCERT syllabus`,
              `Review previous year NEET questions for ${type.replace('-', ' ')}`,
              `Practice time management for NEET ${type.replace('-', ' ')} section`,
              `Strengthen weak areas in Biology (highest weightage in NEET)`
            ].map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border"
              >
                <Brain className={`h-4 w-4 text-${colorScheme}-600 flex-shrink-0`} />
                <span className="text-sm">{suggestion}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewSection;
