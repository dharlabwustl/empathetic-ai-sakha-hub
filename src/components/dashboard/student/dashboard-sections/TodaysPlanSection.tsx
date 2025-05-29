import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, BookOpen, Brain, FileText, ArrowRight, Target } from 'lucide-react';
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
  priority?: boolean;
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
          completed: false,
          priority: true
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
          title: "NEET Biology Practice",
          type: 'quiz',
          difficulty: 'medium',
          timeEstimate: 25,
          completed: false,
          priority: true
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

  const priorityTasks = plan.tasks.filter(task => task.priority);
  const neetTasks = plan.tasks.filter(task => task.title.toLowerCase().includes('neet') || task.type === 'quiz');

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Today's Study Plan</CardTitle>
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

          {/* Today's Top Priority Section with Animations */}
          {priorityTasks.length > 0 && (
            <div className="relative">
              {/* Premium animated border */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 p-[2px] animate-pulse">
                <div className="bg-white dark:bg-gray-900 rounded-lg h-full w-full"></div>
              </div>
              
              {/* Animated arrow indicator */}
              <div className="absolute -left-6 top-1/2 transform -translate-y-1/2">
                <ArrowRight className="h-5 w-5 text-purple-500 animate-bounce" />
              </div>
              
              {/* Sparkling effect */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              
              <div className="relative bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg border-2 border-transparent">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-purple-600 animate-pulse" />
                  <h3 className="font-bold text-purple-800 dark:text-purple-200">Today's Top Priority</h3>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-pink-500 rounded-full animate-pulse delay-100"></div>
                    <div className="w-1 h-1 bg-purple-500 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {priorityTasks.map((task, idx) => (
                    <div 
                      key={idx}
                      className="p-3 bg-white/80 dark:bg-gray-800/80 border rounded-lg cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-200 transform hover:scale-[1.02]"
                      onClick={() => handleTaskClick(task)}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-800/50 dark:text-purple-300">
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
              </div>
            </div>
          )}

          {/* Today's NEET Study Plan Section with Animations */}
          {neetTasks.length > 0 && (
            <div className="relative mt-6">
              {/* Premium animated border */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 p-[2px] animate-pulse">
                <div className="bg-white dark:bg-gray-900 rounded-lg h-full w-full"></div>
              </div>
              
              {/* Animated arrow indicator */}
              <div className="absolute -left-6 top-1/2 transform -translate-y-1/2">
                <ArrowRight className="h-5 w-5 text-blue-500 animate-bounce delay-75" />
              </div>
              
              {/* Sparkling effect */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping delay-150"></div>
              
              <div className="relative bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-lg border-2 border-transparent">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-blue-600 animate-pulse" />
                  <h3 className="font-bold text-blue-800 dark:text-blue-200">Today's NEET Study Plan</h3>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse delay-75"></div>
                    <div className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse delay-150"></div>
                    <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse delay-225"></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {neetTasks.map((task, idx) => (
                    <div 
                      key={idx}
                      className="p-3 bg-white/80 dark:bg-gray-800/80 border rounded-lg cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-200 transform hover:scale-[1.02]"
                      onClick={() => handleTaskClick(task)}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-800/50 dark:text-blue-300">
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
              </div>
            </div>
          )}

          {/* Regular Tasks */}
          <div className="space-y-3 pt-2">
            {plan.tasks.filter(task => !task.priority && !task.title.toLowerCase().includes('neet')).map((task, idx) => (
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
