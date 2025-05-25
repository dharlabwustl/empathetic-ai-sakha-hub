
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Brain, FileText, Clock, Star, CheckCircle2, Circle } from 'lucide-react';

interface EnhancedTaskBreakdownProps {
  planData: any;
  onConceptClick: (conceptId: string) => void;
  isMobile: boolean;
}

const EnhancedTaskBreakdown: React.FC<EnhancedTaskBreakdownProps> = ({ 
  planData, 
  onConceptClick, 
  isMobile 
}) => {
  const tasks = planData?.tasks || [
    {
      id: 'concept-1',
      title: "Newton's Laws of Motion",
      type: 'concept',
      difficulty: 'medium',
      timeEstimate: 30,
      completed: false,
      subject: 'Physics',
      priority: 'high'
    },
    {
      id: 'flashcard-1',
      title: "Chemical Bonds Flashcards",
      type: 'flashcard',
      difficulty: 'easy',
      timeEstimate: 20,
      completed: true,
      subject: 'Chemistry',
      priority: 'medium'
    },
    {
      id: 'quiz-1',
      title: "Algebra Practice Problems",
      type: 'quiz',
      difficulty: 'hard',
      timeEstimate: 25,
      completed: false,
      subject: 'Mathematics',
      priority: 'high'
    }
  ];

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept':
        return <BookOpen className="h-5 w-5" />;
      case 'flashcard':
        return <Brain className="h-5 w-5" />;
      case 'quiz':
      case 'revision':
        return <FileText className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'from-green-400 to-emerald-500';
      case 'medium':
        return 'from-yellow-400 to-orange-500';
      case 'hard':
        return 'from-red-400 to-rose-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-700 border-red-200">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Low Priority</Badge>;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-4"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Premium Task Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task, idx) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                  task.completed 
                    ? 'border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20' 
                    : 'border-blue-200 bg-gradient-to-br from-white to-blue-50/30 dark:border-blue-800 dark:bg-gradient-to-br dark:from-gray-800 dark:to-blue-950/20'
                }`}
              >
                {/* Gradient overlay for visual appeal */}
                <div className={`absolute inset-0 bg-gradient-to-r ${getDifficultyColor(task.difficulty)} opacity-5`} />
                
                <div className="relative p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        task.type === 'concept' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' :
                        task.type === 'flashcard' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400' :
                        'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400'
                      }`}>
                        {getTaskIcon(task.type)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{task.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{task.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.completed ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      ) : (
                        <Circle className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {getPriorityBadge(task.priority)}
                    <Badge variant="outline" className="capitalize">
                      {task.difficulty}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      {task.timeEstimate} min
                    </div>
                  </div>

                  {!task.completed && (
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => onConceptClick(task.id)}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        Start Task
                      </Button>
                      <Button size="sm" variant="outline">
                        Mark Complete
                      </Button>
                    </div>
                  )}

                  {task.completed && (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-sm font-medium">Completed</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EnhancedTaskBreakdown;
