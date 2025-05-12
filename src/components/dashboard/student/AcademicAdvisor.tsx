
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, Award, Zap } from 'lucide-react';
import { StudyPlanTopic } from '@/types/user/base';

interface AcademicAdvisorProps {
  userProfile: any;
}

const AcademicAdvisor: React.FC<AcademicAdvisorProps> = ({ userProfile }) => {
  // Sample data - in a real app, this would come from an API
  const studyPlan = {
    dailyGoal: 2.5, // hours
    currentProgress: 1.75, // hours
    focusScore: 85, // percentage
    topics: [
      {
        id: "topic-1",
        name: "Organic Chemistry: Alkenes",
        difficulty: "medium",
        completed: true,
        status: "completed",
        priority: "high" // Added priority field
      },
      {
        id: "topic-2",
        name: "Physics: Wave Optics",
        difficulty: "medium",
        completed: true,
        status: "completed",
        priority: "medium" // Added priority field
      },
      {
        id: "topic-3",
        name: "Biology: Human Physiology",
        difficulty: "hard",
        completed: true,
        status: "completed",
        priority: "high" // Added priority field
      }
    ] as StudyPlanTopic[],
    recommendedBreak: 15, // minutes
  };

  // Calculate progress percentage
  const progressPercentage = Math.round((studyPlan.currentProgress / studyPlan.dailyGoal) * 100);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-primary" />
          Academic Advisor
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 gap-4">
          {/* Daily Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Daily Study Goal</span>
              <span className="text-sm text-muted-foreground">{studyPlan.currentProgress} / {studyPlan.dailyGoal} hrs</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            
            {/* Focus Score */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-1 text-yellow-500" />
                <span className="text-sm">Focus Score</span>
              </div>
              <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400">
                {studyPlan.focusScore}%
              </Badge>
            </div>
            
            {/* Break Reminder */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-blue-500" />
                <span className="text-sm">Recommended Break</span>
              </div>
              <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">
                {studyPlan.recommendedBreak} min
              </Badge>
            </div>
          </div>

          {/* Completed Topics */}
          <div className="space-y-2 mt-2">
            <h4 className="text-sm font-medium">Recently Completed</h4>
            <div className="space-y-2">
              {studyPlan.topics.map((topic, index) => (
                <div 
                  key={topic.id}
                  className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded-md text-sm flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <Award className={`h-4 w-4 mr-2 ${
                      topic.difficulty === 'easy' ? 'text-green-500' : 
                      topic.difficulty === 'medium' ? 'text-yellow-500' : 'text-red-500'
                    }`} />
                    <span>{topic.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {topic.difficulty}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
            <button className="text-sm text-primary hover:underline w-full text-center">
              View Complete Study Plan
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicAdvisor;
