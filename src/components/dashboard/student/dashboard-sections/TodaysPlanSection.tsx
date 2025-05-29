
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
    <Card className="relative animate-pulse border-2 border-blue-300 shadow-lg shadow-blue-200/50">
      {/* Animated arrow for Today's Study Plan */}
      <div className="absolute -top-3 left-4 animate-bounce">
        <ArrowDown className="h-6 w-6 text-blue-500" />
      </div>
      
      {/* Sparkle animations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute top-4 right-6 w-1 h-1 bg-yellow-300 rounded-full animate-pulse"></div>
        <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            Today's NEET Study Plan
            <Badge variant="secondary" className="text-xs animate-pulse">
              LIVE PLAN
            </Badge>
            <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse" />
          </CardTitle>
          {currentMood && (
            <Badge variant="outline" className="capitalize">
              {currentMood.toLowerCase()} mood
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
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
                className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
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
            <Button size="sm" onClick={() => navigate('/dashboard/student/today')}>
              View Full Plan
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysPlanSection;
