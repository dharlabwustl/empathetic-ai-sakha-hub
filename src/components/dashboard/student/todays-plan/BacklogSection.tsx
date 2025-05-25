
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, BookOpen, Timer, Play } from 'lucide-react';
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface BacklogSectionProps {
  planData: TodaysPlanData | null;
}

const BacklogSection: React.FC<BacklogSectionProps> = ({ planData }) => {
  if (!planData?.backlogTasks || planData.backlogTasks.length === 0) {
    return null;
  }

  return (
    <Card className="border-l-4 border-l-orange-500 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-3 text-orange-800 dark:text-orange-200">
          <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-full">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
          </div>
          Pending Backlog ({planData.backlogTasks.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {planData.backlogTasks.slice(0, 3).map((task) => (
            <Card key={task.id} className="bg-white dark:bg-gray-800 border border-orange-200 dark:border-orange-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-lg">{task.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {task.subject}
                      </span>
                      <span className="flex items-center gap-1">
                        <Timer className="h-4 w-4" />
                        {task.timeEstimate}min
                      </span>
                      {task.daysOverdue && (
                        <Badge variant="destructive" className="text-xs">
                          {task.daysOverdue} days overdue
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-orange-600 border-orange-300 hover:bg-orange-50"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Clear Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BacklogSection;
