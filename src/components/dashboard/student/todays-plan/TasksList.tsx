
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';
import TaskCard from './TaskCard';

interface TasksListProps {
  planData: TodaysPlanData | null;
  onConceptClick: (conceptId: string) => void;
}

const TasksList: React.FC<TasksListProps> = ({ planData, onConceptClick }) => {
  if (!planData) return null;

  const allTasks = [
    ...planData.concepts.map(c => ({ ...c, type: 'concept' as const })),
    ...planData.flashcards.map(f => ({ ...f, type: 'flashcard' as const })),
    ...planData.practiceExams.map(p => ({ ...p, type: 'practice-exam' as const }))
  ];

  const completedCount = allTasks.filter(t => t.status === 'completed').length;

  const handleTaskStart = (taskId: string) => {
    console.log('Starting task:', taskId);
  };

  const handleTaskComplete = (taskId: string) => {
    console.log('Completing task:', taskId);
  };

  const handleTaskClick = (taskId: string) => {
    const task = allTasks.find(t => t.id === taskId);
    if (task?.type === 'concept') {
      onConceptClick(taskId);
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-xl border-0">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-b">
        <CardTitle className="text-2xl flex items-center gap-3">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
            <Trophy className="h-6 w-6 text-yellow-600" />
          </div>
          Today's Tasks
          <Badge variant="outline" className="ml-auto bg-white dark:bg-gray-800">
            {completedCount}/{allTasks.length} Complete
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {allTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStart={handleTaskStart}
              onComplete={handleTaskComplete}
              onTaskClick={handleTaskClick}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TasksList;
