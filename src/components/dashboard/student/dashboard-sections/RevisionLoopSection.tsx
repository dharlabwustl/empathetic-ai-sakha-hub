
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCw, Brain, Calendar, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RevisionItem {
  id: string;
  title: string;
  subject: string;
  type: string;
  priority: string;
  dueDate: string;
  retentionScore: number;
}

interface RevisionLoopSectionProps {
  revisionItems: RevisionItem[];
}

const RevisionLoopSection: React.FC<RevisionLoopSectionProps> = ({ revisionItems }) => {
  const navigate = useNavigate();
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/30';
      case 'medium': return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/30';
      case 'low': return 'text-green-500 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/30';
      default: return 'text-gray-500 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'concept': return <Brain size={16} />;
      case 'flashcard': return <RotateCw size={16} />;
      case 'quiz': return <Brain size={16} />;
      default: return <RotateCw size={16} />;
    }
  };
  
  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <RotateCw className="text-orange-500" size={20} />
          Revision Loop
        </h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-900/20"
          onClick={() => navigate('/dashboard/student/flashcards')}
        >
          View all <ChevronRight size={16} />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {revisionItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
          >
            <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(item.priority)}`}>
                      {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
                    </span>
                    <CardTitle className="text-base mt-2">{item.title}</CardTitle>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-1">
                      <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{item.retentionScore}%</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Retention</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center gap-1">
                    {getTypeIcon(item.type)}
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                  <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-md">
                    {item.subject}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="pt-2 mt-auto">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Calendar size={12} className="mr-1" />
                    {formatDueDate(item.dueDate)}
                  </div>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                    Review Now
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RevisionLoopSection;
