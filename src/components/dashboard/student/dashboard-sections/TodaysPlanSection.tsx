
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, BookOpen, Brain, FileText, ArrowDown, Sparkles } from 'lucide-react';
import { MoodType } from '@/types/user/base';

interface StudyPlan {
  date: string;
  dailyGoal: string;
  progress: number;
  tasks: StudyTask[];
}

interface StudyTask {
  id: string;
  title: string;
  type: 'concept' | 'flashcard' | 'quiz' | 'revision';
  difficulty: 'easy' | 'medium' | 'hard';
  timeEstimate: number;
  completed: boolean;
}

interface TodaysPlanSectionProps {
  studyPlan?: any;
  currentMood?: MoodType;
}

const TodaysPlanSection: React.FC<TodaysPlanSectionProps> = ({ studyPlan, currentMood }) => {
  const navigate = useNavigate();
  
  // Create mood-based study plans
  const getMoodBasedStudyPlan = (mood?: MoodType): StudyPlan => {
    const basePlan: StudyPlan = {
      date: new Date().toLocaleDateString(),
      dailyGoal: '4 hours',
      progress: 35,
      tasks: [
        {
          id: 'concept-1',
          title: "Newton's Laws of Motion",
          type: 'concept',
          difficulty: 'medium',
          timeEstimate: 30,
          completed: false
        },
        {
          id: 'flashcard-1',
          title: "Chemical Bonds Flashcards",
          type: 'flashcard',
          difficulty: 'medium',
          timeEstimate: 20,
          completed: false
        },
        {
          id: 'quiz-1',
          title: "Algebra Practice Problems",
          type: 'quiz',
          difficulty: 'medium',
          timeEstimate: 25,
          completed: false
        }
      ]
    };

    // Adjust plan based on mood
    if (mood) {
      switch (mood) {
        case MoodType.MOTIVATED:
          return {
            ...basePlan,
            dailyGoal: '5 hours',
            tasks: [
              ...basePlan.tasks,
              {
                id: 'revision-1',
                title: "Full Physics Revision",
                type: 'revision',
                difficulty: 'hard',
                timeEstimate: 45,
                completed: false
              }
            ]
          };
        case MoodType.FOCUSED:
          return {
            ...basePlan,
            dailyGoal: '4.5 hours',
            tasks: basePlan.tasks.map(task => ({
              ...task,
              difficulty: 'hard' as const
            }))
          };
        case MoodType.TIRED:
          return {
            ...basePlan,
            dailyGoal: '2.5 hours',
            tasks: basePlan.tasks.slice(0, 2).map(task => ({
              ...task,
              difficulty: 'easy' as const,
              timeEstimate: Math.max(15, task.timeEstimate - 10)
            }))
          };
        case MoodType.ANXIOUS:
          return {
            ...basePlan,
            dailyGoal: '3 hours',
            tasks: basePlan.tasks.map(task => ({
              ...task,
              difficulty: 'easy' as const
            }))
          };
        case MoodType.STRESSED:
          return {
            ...basePlan,
            dailyGoal: '2 hours',
            tasks: [
              {
                id: 'revision-2',
                title: "Quick Recap of Key Concepts",
                type: 'revision',
                difficulty: 'easy',
                timeEstimate: 20,
                completed: false
              },
              {
                id: 'flashcard-2',
                title: "Basic Formula Review",
                type: 'flashcard',
                difficulty: 'easy',
                timeEstimate: 15,
                completed: false
              }
            ]
          };
        default:
          return basePlan;
      }
    }
    
    return basePlan;
  };

  const plan = getMoodBasedStudyPlan(currentMood);

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept':
        return <BookOpen className="h-4 w-4" />;
      case 'flashcard':
        return <Brain className="h-4 w-4" />;
      case 'quiz':
      case 'revision':
        return <FileText className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Easy</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Medium</Badge>;
      case 'hard':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Hard</Badge>;
      default:
        return null;
    }
  };
  
  const getTotalTime = (tasks: StudyTask[]) => {
    return tasks.reduce((total, task) => total + task.timeEstimate, 0);
  };

  const handleTaskClick = (task: StudyTask) => {
    if (task.type === 'concept') {
      navigate(`/dashboard/student/concepts/${task.id}`);
    } else if (task.type === 'flashcard') {
      navigate('/dashboard/student/flashcards');
    } else if (task.type === 'quiz') {
      navigate('/dashboard/student/practice-exam');
    }
  };

  return (
    <Card className="relative animate-pulse border-2 border-blue-300 shadow-lg shadow-blue-200/50 overflow-hidden">
      {/* Enhanced animated arrow for Today's Study Plan with glow effect */}
      <div className="absolute -top-4 left-4 animate-bounce z-10">
        <div className="relative">
          <ArrowDown className="h-7 w-7 text-blue-500 drop-shadow-lg filter animate-pulse" />
          <div className="absolute inset-0 h-7 w-7 text-blue-300 animate-ping">
            <ArrowDown className="h-7 w-7" />
          </div>
        </div>
      </div>
      
      {/* Enhanced sparkle animations with varying patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute top-6 right-8 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-yellow-500 rounded-full animate-ping" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute top-8 left-3 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1.4s' }}></div>
        <div className="absolute bottom-8 right-5 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '2.6s' }}></div>
        <div className="absolute bottom-1/2 left-6 w-1.5 h-1.5 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '3.2s' }}></div>
      </div>

      {/* Enhanced gradient overlay with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 via-transparent to-indigo-50/40 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-sky-50/30 to-blue-50/50 pointer-events-none"></div>

      <CardHeader className="pb-2 relative z-10 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/30 dark:to-indigo-900/30 border-b border-blue-100/50">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            Today's NEET Study Plan
            <Badge variant="secondary" className="text-xs animate-pulse bg-blue-100 text-blue-800 border-blue-300 shadow-sm">
              LIVE PLAN
            </Badge>
            <Sparkles className="h-5 w-5 text-yellow-500 animate-pulse" />
          </CardTitle>
          {currentMood && (
            <Badge variant="outline" className="capitalize">
              {currentMood.toLowerCase()} mood
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{plan.date}</span>
            </div>
            <div className="text-sm">
              Goal: <span className="font-medium">{plan.dailyGoal}</span>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Daily progress</span>
              <span>{plan.progress}%</span>
            </div>
            <Progress value={plan.progress} className="h-2" />
          </div>
          
          <div className="space-y-3 pt-2">
            {plan.tasks.map((task, idx) => (
              <div 
                key={idx}
                className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                onClick={() => handleTaskClick(task)}
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-full ${
                      task.type === 'concept' ? 'bg-blue-100 text-blue-600' :
                      task.type === 'flashcard' ? 'bg-purple-100 text-purple-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {getTaskIcon(task.type)}
                    </div>
                    <span className="font-medium">{task.title}</span>
                  </div>
                  {getDifficultyBadge(task.difficulty)}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{task.timeEstimate} min</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-sm pt-1">
            <div>
              Total time: <span className="font-medium">{getTotalTime(plan.tasks)} min</span>
            </div>
            <Button 
              size="sm" 
              onClick={() => navigate('/dashboard/student/today')} 
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
            >
              View Full Plan
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysPlanSection;
