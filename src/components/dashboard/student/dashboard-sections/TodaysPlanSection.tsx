
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BadgeCheck, Brain, Calendar, Clock, ListTodo, ArrowRight } from 'lucide-react';
import { MoodType } from '@/types/user/base';
import { Badge } from '@/components/ui/badge';

interface TodaysPlanSectionProps {
  studyPlan: any;
  currentMood?: MoodType;
}

const TodaysPlanSection: React.FC<TodaysPlanSectionProps> = ({ 
  studyPlan,
  currentMood 
}) => {
  const navigate = useNavigate();
  
  // Render appropriate message based on mood
  const getMoodBasedMessage = () => {
    switch(currentMood) {
      case MoodType.TIRED:
      case MoodType.STRESSED:
        return "Your plan has been adjusted for today based on your mood. Focus on lighter review tasks.";
      case MoodType.FOCUSED:
      case MoodType.MOTIVATED:
        return "Great energy today! Your plan includes some challenging concepts to leverage your focus.";
      default:
        return "Your personalized study plan for today is ready.";
    }
  };

  // Mood-based tasks modification
  const getMoodBasedTasks = () => {
    let taskCount = 5;
    let focusArea = "Mixed subjects";
    let difficulty = "Medium";
    
    switch(currentMood) {
      case MoodType.TIRED:
        taskCount = 3;
        focusArea = "Review only";
        difficulty = "Easy";
        break;
      case MoodType.STRESSED:
        taskCount = 4;
        focusArea = "Familiar concepts";
        difficulty = "Easy to Medium";
        break;
      case MoodType.FOCUSED:
        taskCount = 6;
        focusArea = "Key concepts";
        difficulty = "Medium to Hard";
        break;
      case MoodType.MOTIVATED:
        taskCount = 7;
        focusArea = "Advanced topics";
        difficulty = "Hard";
        break;
      default:
        break;
    }
    
    return {
      taskCount,
      focusArea,
      difficulty
    };
  };
  
  const moodBasedTasks = getMoodBasedTasks();

  // Navigate to concept detail when requested
  const handleGoToConceptDetail = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };

  // Upcoming tasks for today
  const upcomingTasks = [
    { id: "t1", title: "Chemical Bonding", type: "concept", time: "2:00 PM" },
    { id: "t2", title: "Physics Flashcards", type: "flashcard", time: "4:30 PM" },
    { id: "t3", title: "Biology Practice Quiz", type: "practice", time: "6:15 PM" }
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5 text-violet-600" />
            Today's Study Plan
          </CardTitle>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <BadgeCheck className="h-3 w-3 mr-1" />
            Personalized
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground border-l-4 border-violet-400 pl-3 py-1 bg-violet-50 dark:bg-violet-900/20 rounded-r-lg">
            {getMoodBasedMessage()}
          </div>
          
          <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg border border-violet-200 dark:border-violet-800/50">
            <h4 className="font-medium text-violet-800 dark:text-violet-300 mb-2">Today's Plan</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span>Tasks for today:</span>
                <span className="font-medium">{moodBasedTasks.taskCount}</span>
              </li>
              <li className="flex justify-between">
                <span>Focus area:</span>
                <span className="font-medium">{moodBasedTasks.focusArea}</span>
              </li>
              <li className="flex justify-between">
                <span>Difficulty level:</span>
                <span className="font-medium">{moodBasedTasks.difficulty}</span>
              </li>
              <li className="flex justify-between">
                <span>Estimated time:</span>
                <span className="font-medium">2h 15m</span>
              </li>
              <li className="flex justify-between">
                <span>Priority subject:</span>
                <span className="font-medium">Physics</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-violet-500" />
              Upcoming Tasks
            </h4>
            
            <div className="space-y-2">
              {upcomingTasks.map(task => (
                <div 
                  key={task.id} 
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-2 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-900/30 cursor-pointer"
                  onClick={() => {
                    if (task.type === "concept") {
                      navigate(`/dashboard/student/concepts/concept-1`);
                    } else if (task.type === "flashcard") {
                      navigate(`/dashboard/student/flashcards`);
                    } else {
                      navigate(`/dashboard/student/practice-exam`);
                    }
                  }}
                >
                  <div className="flex items-center gap-2">
                    <ListTodo className="h-4 w-4 text-violet-500" />
                    <span className="text-sm">{task.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{task.time}</span>
                    <ArrowRight className="h-3 w-3 text-gray-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={() => navigate('/dashboard/student/today')}
              variant="default"
              className="w-full bg-violet-600 hover:bg-violet-700"
            >
              View Full Plan
            </Button>
            
            <Button 
              onClick={() => navigate('/dashboard/student/today')}
              variant="outline"
              className="w-full border-violet-200 text-violet-700 hover:bg-violet-50"
            >
              Upcoming Tasks
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysPlanSection;
