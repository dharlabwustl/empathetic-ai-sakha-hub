
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Brain, 
  Target, 
  Clock, 
  CheckCircle2,
  Play,
  ArrowRight,
  Zap
} from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface EnhancedTaskBreakdownProps {
  planData: TodaysPlanData | null;
  onConceptClick: (conceptId: string) => void;
  isMobile?: boolean;
}

const EnhancedTaskBreakdown: React.FC<EnhancedTaskBreakdownProps> = ({ 
  planData, 
  onConceptClick, 
  isMobile = false 
}) => {
  if (!planData) return null;

  const allTasks = [
    ...planData.concepts.map(c => ({ ...c, type: 'concept' as const })),
    ...planData.flashcards.map(f => ({ ...f, type: 'flashcard' as const })),
    ...planData.practiceExams.map(p => ({ ...p, type: 'practice-exam' as const }))
  ];

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept':
        return <BookOpen className="h-5 w-5" />;
      case 'flashcard':
        return <Brain className="h-5 w-5" />;
      case 'practice-exam':
        return <Target className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const getTaskGradient = (type: string, status: string) => {
    const baseGradients = {
      concept: status === 'completed' 
        ? 'from-green-100 to-emerald-50 border-green-200'
        : 'from-blue-100 to-indigo-50 border-blue-200',
      flashcard: status === 'completed'
        ? 'from-green-100 to-emerald-50 border-green-200'
        : 'from-purple-100 to-violet-50 border-purple-200',
      'practice-exam': status === 'completed'
        ? 'from-green-100 to-emerald-50 border-green-200'
        : 'from-orange-100 to-amber-50 border-orange-200'
    };
    return baseGradients[type as keyof typeof baseGradients] || baseGradients.concept;
  };

  const handleTaskClick = (task: any) => {
    if (task.type === 'concept') {
      onConceptClick(task.id);
    }
    // Add handlers for other task types as needed
  };

  return (
    <Card className="bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full">
            <Zap className="h-6 w-6 text-white" />
          </div>
          Today's Tasks
          <Badge variant="outline" className="ml-auto bg-white">
            {planData.completedTasks}/{planData.totalTasks} Complete
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Daily Progress</span>
            <span className="text-gray-600">
              {Math.round((planData.completedTasks / planData.totalTasks) * 100)}%
            </span>
          </div>
          <Progress 
            value={(planData.completedTasks / planData.totalTasks) * 100} 
            className="h-3"
          />
        </div>

        {/* Task grid */}
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
          {allTasks.map((task) => (
            <Card 
              key={task.id}
              className={`bg-gradient-to-br ${getTaskGradient(task.type, task.status)} border-2 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105`}
              onClick={() => handleTaskClick(task)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      task.status === 'completed' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white shadow-md'
                    }`}>
                      {task.status === 'completed' ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        getTaskIcon(task.type)
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {task.title}
                      </h4>
                      <p className="text-xs text-gray-600 capitalize">
                        {task.subject} • {task.type.replace('-', ' ')}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant={task.status === 'completed' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {task.status === 'completed' ? 'Done' : 'Pending'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Clock className="h-3 w-3" />
                    <span>{task.duration}min</span>
                    {'difficulty' in task && (
                      <>
                        <span>•</span>
                        <span className="capitalize">{task.difficulty}</span>
                      </>
                    )}
                  </div>
                  
                  {task.status === 'pending' && (
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="h-8 px-3 bg-white/80 hover:bg-white border border-white/50"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Start
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Backlog section */}
        {planData.backlogTasks && planData.backlogTasks.length > 0 && (
          <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-orange-800 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pending from Previous Days
              </h4>
              <Badge variant="destructive" className="text-xs">
                {planData.backlogTasks.length} overdue
              </Badge>
            </div>
            <div className="space-y-2">
              {planData.backlogTasks.slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-2 bg-white rounded border">
                  <div>
                    <span className="text-sm font-medium">{task.title}</span>
                    <p className="text-xs text-gray-600">{task.subject} • {task.timeEstimate}min</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {task.daysOverdue} days overdue
                  </Badge>
                </div>
              ))}
            </div>
            {planData.backlogTasks.length > 3 && (
              <p className="text-xs text-orange-600 mt-2">
                +{planData.backlogTasks.length - 3} more overdue tasks
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedTaskBreakdown;
