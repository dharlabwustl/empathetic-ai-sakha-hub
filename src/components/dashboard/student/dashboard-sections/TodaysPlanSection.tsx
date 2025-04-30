
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Book, BookOpen, Calendar, Check, Clock, AlertCircle, BookCheck, Flag } from 'lucide-react';
import { MoodType } from '@/types/student/todaysPlan';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface TodaysPlanSectionProps {
  studyPlan: any; // Replace with proper type
  currentMood?: MoodType;
}

const getMoodBasedPlan = (mood: MoodType | undefined, defaultPlan: any) => {
  if (!mood) return defaultPlan;

  switch (mood) {
    case 'happy':
      return {
        ...defaultPlan,
        concepts: [...defaultPlan.todaysFocus.concepts, "Bonus: Advanced Topic"],
        message: "You're in a great mood! Added a bonus advanced topic to challenge you.",
        estimatedTime: defaultPlan.todaysFocus.estimatedTime * 1.1
      };
    case 'focused':
      return {
        ...defaultPlan,
        message: "You're focused today! Fast-track mode activated with additional flashcards.",
        estimatedTime: defaultPlan.todaysFocus.estimatedTime * 1.1
      };
    case 'tired':
      return {
        ...defaultPlan,
        concepts: defaultPlan.todaysFocus.concepts.slice(0, 2),
        message: "Taking it easy today. Simplified plan with just the essential concepts.",
        estimatedTime: defaultPlan.todaysFocus.estimatedTime * 0.7
      };
    case 'stressed':
      return {
        ...defaultPlan,
        concepts: defaultPlan.todaysFocus.concepts.slice(0, 1),
        message: "Stress-relief mode: Just 1 simple concept and quick flashcards today.",
        estimatedTime: defaultPlan.todaysFocus.estimatedTime * 0.5
      };
    case 'anxious':
      return {
        ...defaultPlan,
        concepts: defaultPlan.todaysFocus.concepts.slice(0, 1),
        message: "Anxiety management mode: Focusing on simple topics to build confidence.",
        estimatedTime: defaultPlan.todaysFocus.estimatedTime * 0.6
      };
    default:
      return {
        ...defaultPlan,
        message: "Your plan has been adjusted based on your current mood."
      };
  }
};

export default function TodaysPlanSection({ studyPlan, currentMood }: TodaysPlanSectionProps) {
  const adaptedPlan = getMoodBasedPlan(currentMood, studyPlan);
  const completedTasks = 3; // This would come from actual data
  const totalTasks = 7; // This would come from actual data
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  return (
    <Card className="h-full border-t-4 border-t-violet-500">
      <CardHeader className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 pb-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="flex items-center text-xl">
              <Calendar className="h-5 w-5 mr-2 text-violet-600" />
              <span className="flex flex-col sm:flex-row sm:items-center">
                <span>Today's Study Plan</span>
                <Badge variant="outline" className="ml-0 sm:ml-2 mt-1 sm:mt-0 bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' })}
                </Badge>
              </span>
            </CardTitle>
            <div className="text-sm text-muted-foreground mt-1">
              Your Smart Study Roadmap for Today
            </div>
          </div>
          
          <div className="mt-2 md:mt-0 flex flex-wrap gap-2">
            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200">
              {completionPercentage}% Complete
            </Badge>
            <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200">
              Streak: 7 days 🔥
            </Badge>
          </div>
        </div>
        
        <div className="mt-3 space-y-1">
          <Progress value={completionPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{completedTasks}/{totalTasks} tasks completed</span>
            <span>Goal: Complete all by 8 PM</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 p-4">
        {/* Personal Greeting Section */}
        <div className="p-3 rounded-lg bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
          <h3 className="font-medium text-base">Good {getTimeOfDay()}, Student! 🌟</h3>
          <p className="text-sm mt-1">
            Let's conquer the day with a personalized study plan tailored for you!
          </p>
        </div>
        
        {/* Mood-based Smart Suggestion */}
        {currentMood && (
          <div className={`p-3 rounded-lg ${
            currentMood === 'happy' ? 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/30' :
            currentMood === 'focused' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800/30' :
            currentMood === 'tired' ? 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/30' :
            currentMood === 'stressed' ? 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800/30' :
            currentMood === 'anxious' ? 'bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800/30' :
            'bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800/30'
          }`}>
            <p className="text-sm">{getMoodBasedPlan(currentMood, {})?.message}</p>
          </div>
        )}
        
        {/* Today's Focus Goal */}
        <div className="mb-2">
          <h3 className="font-medium text-sm text-muted-foreground mb-1">Today's Focus Goal</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/30">
              <BookOpen className="h-3.5 w-3.5 mr-1" /> 2 Subjects
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800/30">
              <BookCheck className="h-3.5 w-3.5 mr-1" /> 1 Practice Test
            </Badge>
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/30">
              <Book className="h-3.5 w-3.5 mr-1" /> 15 Flashcards
            </Badge>
          </div>
        </div>

        {/* Subject-wise Detailed Breakdown */}
        <div className="space-y-4">
          <h3 className="font-medium text-base">Subject-wise Breakdown</h3>
          
          {/* Physics Subject Card */}
          <div className="bg-gradient-to-r from-blue-50/70 to-cyan-50/70 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Physics</h4>
              <Badge>🕒 1h 30m</Badge>
            </div>
            
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Concepts Column */}
              <div className="bg-white/80 dark:bg-gray-800/80 rounded border border-gray-100 dark:border-gray-700 p-2">
                <h5 className="text-sm font-medium mb-2 flex items-center">
                  <BookOpen className="h-3.5 w-3.5 mr-1 text-blue-500" /> Concepts
                </h5>
                <div className="space-y-2">
                  <div className="p-1.5 rounded border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex justify-between text-xs">
                      <span>Newton's Laws</span>
                      <span>25 min</span>
                    </div>
                    <Link to="/dashboard/student/concepts/physics/newtons-laws">
                      <Button variant="ghost" size="sm" className="w-full mt-1 h-7 text-xs">
                        Start Learning
                      </Button>
                    </Link>
                  </div>
                  <div className="p-1.5 rounded border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <div className="flex justify-between text-xs">
                      <span>Motion Kinematics</span>
                      <span>20 min</span>
                    </div>
                    <Link to="/dashboard/student/concepts/physics/motion-kinematics">
                      <Button variant="ghost" size="sm" className="w-full mt-1 h-7 text-xs">
                        Start Learning
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Flashcards Column */}
              <div className="bg-white/80 dark:bg-gray-800/80 rounded border border-gray-100 dark:border-gray-700 p-2">
                <h5 className="text-sm font-medium mb-2 flex items-center">
                  <Book className="h-3.5 w-3.5 mr-1 text-amber-500" /> Flashcards
                </h5>
                <div className="p-1.5 rounded border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="flex justify-between text-xs">
                    <span>10 Flashcards</span>
                    <span>15 min</span>
                  </div>
                  <Progress value={30} className="h-1.5 mt-1.5 mb-1" />
                  <Link to="/dashboard/student/flashcards/physics">
                    <Button variant="ghost" size="sm" className="w-full mt-1 h-7 text-xs">
                      Study Cards
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Practice Test Column */}
              <div className="bg-white/80 dark:bg-gray-800/80 rounded border border-gray-100 dark:border-gray-700 p-2">
                <h5 className="text-sm font-medium mb-2 flex items-center">
                  <AlertCircle className="h-3.5 w-3.5 mr-1 text-purple-500" /> Practice Test
                </h5>
                <div className="p-1.5 rounded border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="flex justify-between text-xs">
                    <span>Mini Test</span>
                    <span>30 min</span>
                  </div>
                  <Link to="/dashboard/student/practice-exam/physics/mini-test">
                    <Button variant="ghost" size="sm" className="w-full mt-1 h-7 text-xs">
                      Start Test
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Chemistry Subject Card */}
          <div className="bg-gradient-to-r from-green-50/70 to-teal-50/70 dark:from-green-900/20 dark:to-teal-900/20 border border-green-100 dark:border-green-800/30 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Chemistry</h4>
              <Badge>🕒 1h 15m</Badge>
            </div>
            
            <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Concepts Column */}
              <div className="bg-white/80 dark:bg-gray-800/80 rounded border border-gray-100 dark:border-gray-700 p-2">
                <h5 className="text-sm font-medium mb-2 flex items-center">
                  <BookOpen className="h-3.5 w-3.5 mr-1 text-blue-500" /> Concepts
                </h5>
                <div className="p-1.5 rounded border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="flex justify-between text-xs">
                    <span>Periodic Table</span>
                    <span>25 min</span>
                  </div>
                  <Link to="/dashboard/student/concepts/chemistry/periodic-table">
                    <Button variant="ghost" size="sm" className="w-full mt-1 h-7 text-xs">
                      Start Learning
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Flashcards Column */}
              <div className="bg-white/80 dark:bg-gray-800/80 rounded border border-gray-100 dark:border-gray-700 p-2">
                <h5 className="text-sm font-medium mb-2 flex items-center">
                  <Book className="h-3.5 w-3.5 mr-1 text-amber-500" /> Flashcards
                </h5>
                <div className="p-1.5 rounded border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="flex justify-between text-xs">
                    <span>5 Flashcards</span>
                    <span>10 min</span>
                  </div>
                  <Progress value={60} className="h-1.5 mt-1.5 mb-1" />
                  <Link to="/dashboard/student/flashcards/chemistry">
                    <Button variant="ghost" size="sm" className="w-full mt-1 h-7 text-xs">
                      Study Cards
                    </Button>
                  </Link>
                </div>
              </div>
              
              {/* Practice Test Column */}
              <div className="bg-white/80 dark:bg-gray-800/80 rounded border border-gray-100 dark:border-gray-700 p-2">
                <h5 className="text-sm font-medium mb-2 flex items-center">
                  <AlertCircle className="h-3.5 w-3.5 mr-1 text-purple-500" /> Practice Test
                </h5>
                <div className="p-1.5 rounded border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="flex justify-between text-xs">
                    <span>Quick Quiz</span>
                    <span>15 min</span>
                  </div>
                  <Link to="/dashboard/student/practice-exam/chemistry/quick-quiz">
                    <Button variant="ghost" size="sm" className="w-full mt-1 h-7 text-xs">
                      Start Quiz
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pending Backlogs Section */}
        <div className="mt-4">
          <h3 className="font-medium text-base flex items-center">
            <Flag className="h-4 w-4 mr-1.5 text-red-500" /> 
            ⚡ Backlogs – Let's Clear Yesterday's Challenges!
          </h3>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/50 text-xs">
                <tr>
                  <th className="px-3 py-2 text-left">📌 Subject</th>
                  <th className="px-3 py-2 text-left">Concept/Task</th>
                  <th className="px-3 py-2 text-left">Time</th>
                  <th className="px-3 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                <tr>
                  <td className="px-3 py-2">History</td>
                  <td className="px-3 py-2">Revolt of 1857 Flashcards</td>
                  <td className="px-3 py-2">15 min</td>
                  <td className="px-3 py-2">
                    <Link to="/dashboard/student/flashcards/history/revolt-1857">
                      <Button size="sm" variant="link" className="h-7 p-0 text-blue-600 dark:text-blue-400">
                        📎 Complete Now
                      </Button>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Math</td>
                  <td className="px-3 py-2">Quadratic Equations Concept</td>
                  <td className="px-3 py-2">30 min</td>
                  <td className="px-3 py-2">
                    <Link to="/dashboard/student/concepts/math/quadratic-equations">
                      <Button size="sm" variant="link" className="h-7 p-0 text-blue-600 dark:text-blue-400">
                        📎 Complete Now
                      </Button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row gap-2 bg-gray-50 dark:bg-gray-800/50 p-4">
        <Button variant="default" className="w-full sm:w-auto bg-gradient-to-r from-violet-500 to-purple-600">
          <Check className="h-4 w-4 mr-1" /> Start Study Session
        </Button>
        <Link to="/dashboard/student/today" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full">
            <Calendar className="h-4 w-4 mr-1" /> View Full Plan
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

// Helper function to determine time of day
function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  return "Evening";
}
