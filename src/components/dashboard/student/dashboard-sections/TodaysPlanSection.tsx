
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, BookOpen, Brain, FileText, Target, Zap, Star } from 'lucide-react';
import { MoodType } from '@/types/user/base';

interface StudyPlan {
  date: string;
  dailyGoal: string;
  progress: number;
  tasks: StudyTask[];
  recallTarget: number;
  examTarget: number;
}

interface StudyTask {
  id: string;
  title: string;
  type: 'concept' | 'flashcard' | 'quiz' | 'revision';
  difficulty: 'easy' | 'medium' | 'hard';
  timeEstimate: number;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  neetFocus?: boolean;
}

interface TodaysPlanSectionProps {
  studyPlan?: any;
  currentMood?: MoodType;
}

const TodaysPlanSection: React.FC<TodaysPlanSectionProps> = ({ studyPlan, currentMood }) => {
  const navigate = useNavigate();
  
  // Enhanced NEET-focused study plan
  const getMoodBasedStudyPlan = (mood?: MoodType): StudyPlan => {
    const basePlan: StudyPlan = {
      date: new Date().toLocaleDateString(),
      dailyGoal: '4 hours',
      progress: 35,
      recallTarget: 85,
      examTarget: 75,
      tasks: [
        {
          id: 'concept-1',
          title: "NEET Physics: Thermodynamics",
          type: 'concept',
          difficulty: 'medium',
          timeEstimate: 45,
          completed: false,
          priority: 'high',
          neetFocus: true
        },
        {
          id: 'flashcard-1',
          title: "Chemical Bonding - NEET Pattern",
          type: 'flashcard',
          difficulty: 'medium',
          timeEstimate: 30,
          completed: false,
          priority: 'high',
          neetFocus: true
        },
        {
          id: 'quiz-1',
          title: "NEET Biology Mock Test",
          type: 'quiz',
          difficulty: 'medium',
          timeEstimate: 60,
          completed: false,
          priority: 'high',
          neetFocus: true
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
            recallTarget: 90,
            examTarget: 80,
            tasks: [
              ...basePlan.tasks,
              {
                id: 'revision-1',
                title: "NEET Previous Year Analysis",
                type: 'revision',
                difficulty: 'hard',
                timeEstimate: 75,
                completed: false,
                priority: 'high',
                neetFocus: true
              }
            ]
          };
        case MoodType.FOCUSED:
          return {
            ...basePlan,
            dailyGoal: '4.5 hours',
            recallTarget: 88,
            examTarget: 78,
            tasks: basePlan.tasks.map(task => ({
              ...task,
              difficulty: 'hard' as const
            }))
          };
        case MoodType.TIRED:
          return {
            ...basePlan,
            dailyGoal: '2.5 hours',
            recallTarget: 75,
            examTarget: 65,
            tasks: basePlan.tasks.slice(0, 2).map(task => ({
              ...task,
              difficulty: 'easy' as const,
              timeEstimate: Math.max(20, task.timeEstimate - 15)
            }))
          };
        case MoodType.ANXIOUS:
          return {
            ...basePlan,
            dailyGoal: '3 hours',
            recallTarget: 80,
            examTarget: 70,
            tasks: basePlan.tasks.map(task => ({
              ...task,
              difficulty: 'easy' as const
            }))
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
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">Easy</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 text-xs">Medium</Badge>;
      case 'hard':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">Hard</Badge>;
      default:
        return null;
    }
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === 'high') {
      return <Zap className="h-3 w-3 text-orange-500 animate-pulse" />;
    }
    return null;
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
    <Card className="overflow-hidden shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-0">
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm">
              <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Today's NEET Focus Plan</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-300">Concept-driven preparation strategy</p>
            </div>
          </div>
          {currentMood && (
            <Badge variant="outline" className="capitalize bg-white/80 border-blue-200">
              {currentMood.toLowerCase()} mode
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Today's Targets */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="text-sm font-semibold mb-3 flex items-center text-gray-900 dark:text-gray-100">
              <Star className="h-4 w-4 text-amber-500 mr-2" />
              Today's Achievement Targets
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="text-lg font-bold text-green-600 dark:text-green-400">{plan.recallTarget}%</div>
                <div className="text-xs text-green-700 dark:text-green-300">Recall Target</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{plan.examTarget}%</div>
                <div className="text-xs text-blue-700 dark:text-blue-300">Mock Test Target</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{plan.dailyGoal}</div>
                <div className="text-xs text-purple-700 dark:text-purple-300">Study Goal</div>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Calendar className="h-4 w-4" />
              <span>{plan.date}</span>
            </div>
            <div className="flex-1 mx-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 dark:text-gray-200">Daily progress</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{plan.progress}%</span>
              </div>
              <Progress value={plan.progress} className="h-2" />
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {getTotalTime(plan.tasks)} min total
            </div>
          </div>
          
          {/* Task List */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center">
              <BookOpen className="h-4 w-4 text-blue-600 mr-2" />
              Priority Tasks
            </h3>
            {plan.tasks.map((task, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700 rounded-xl cursor-pointer hover:shadow-md transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                onClick={() => handleTaskClick(task)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`p-2 rounded-full ${
                      task.type === 'concept' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                      task.type === 'flashcard' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                      'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {getTaskIcon(task.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 dark:text-gray-100">{task.title}</span>
                        {task.neetFocus && (
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs px-2 py-0.5">
                            NEET Focus
                          </Badge>
                        )}
                        {getPriorityIcon(task.priority)}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{task.timeEstimate} min</span>
                        </div>
                        <div className="capitalize">{task.type}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getDifficultyBadge(task.difficulty)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Action Button */}
          <div className="pt-2">
            <Button 
              size="sm" 
              onClick={() => navigate('/dashboard/student/today')}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium"
            >
              View Complete Study Plan
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysPlanSection;
