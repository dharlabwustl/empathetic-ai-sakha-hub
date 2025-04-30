
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Calendar, 
  CalendarDays,
  Check, 
  Clock, 
  AlertCircle, 
  BookCheck,
  Flag,
  Book,
  ArrowRight,
  Flame
} from 'lucide-react';
import { MoodType } from '@/types/student/todaysPlan';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useTodaysPlan } from '@/hooks/useTodaysPlan';
import { UserProfileBase } from '@/types/user/base';

interface RedesignedTodaysPlanProps {
  userProfile?: UserProfileBase;
}

export default function RedesignedTodaysPlan({ userProfile }: RedesignedTodaysPlanProps) {
  const {
    loading,
    error,
    planData,
    refreshData,
    markTaskCompleted,
  } = useTodaysPlan(userProfile?.goals?.[0]?.title || "IIT-JEE", userProfile?.name || "Student");

  const [currentMood, setCurrentMood] = useState<MoodType>('motivated');

  const completedTasks = planData?.completedTasks || 0;
  const totalTasks = planData?.totalTasks || 0;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);
  
  // Helper function to determine time of day for greeting
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
  };

  const getMoodBasedSuggestion = (mood: MoodType) => {
    switch(mood) {
      case 'energetic':
      case 'motivated':
        return "You're in beast mode! 🚀 Let's tackle the toughest concepts first.";
      case 'tired':
        return "Focus on lighter topics and flashcards today. Slow and steady wins!";
      case 'anxious':
        return "Start with simple wins - 5 flashcards first to build momentum. 🧘‍♂️";
      case 'stressed':
        return "Stress-relief mode: Just 1 simple concept and quick flashcards today.";
      case 'overwhelmed':
        return "Take it step by step. I've simplified your plan for today.";
      default:
        return "Let's make today count! What would you like to focus on first?";
    }
  };

  if (error) {
    return (
      <SharedPageLayout title="Today's Plan" subtitle="Your personalized study roadmap for today">
        <div className="text-center py-8">
          <h3 className="text-lg font-medium mb-2">Error Loading Study Plan</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={refreshData}>Try Again</Button>
        </div>
      </SharedPageLayout>
    );
  }

  if (loading || !planData) {
    return (
      <SharedPageLayout title="Today's Plan" subtitle="Your personalized study roadmap for today">
        <div className="space-y-4">
          <div className="h-24 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"></div>
          <div className="h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"></div>
          <div className="h-48 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"></div>
        </div>
      </SharedPageLayout>
    );
  }

  return (
    <SharedPageLayout title="Today's Plan" subtitle="Your personalized study roadmap for today">
      <div className="space-y-6">
        {/* Main Today's Plan Card */}
        <Card className="shadow-md">
          <CardHeader className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Calendar className="text-violet-500" size={20} />
                  Today's Study Plan
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
              </div>
              
              <div className="mt-2 md:mt-0 flex gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock size={16} className="text-indigo-500" />
                  <span>Time allocated: <span className="font-medium">{planData.timeAllocation.total} min</span></span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame size={16} className="text-amber-500" />
                  <span>Streak: <span className="font-medium">{planData.streak} days</span></span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>Progress: {completionPercentage}%</span>
                <span>{completedTasks}/{totalTasks} Tasks</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
          </CardHeader>
          
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Personal Greeting Section */}
              <div className="p-3 rounded-lg bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30">
                <h3 className="font-medium text-base">Good {getTimeOfDay()}, {planData.userName}! 🌟</h3>
                <p className="text-sm mt-1">
                  Let's conquer the day with a personalized study plan tailored for you!
                </p>
              </div>
              
              {/* Mood-based Smart Suggestion */}
              <div className={`p-3 rounded-lg ${
                currentMood === 'happy' ? 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/30' :
                currentMood === 'focused' || currentMood === 'motivated' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800/30' :
                currentMood === 'tired' ? 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/30' :
                currentMood === 'stressed' ? 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800/30' :
                currentMood === 'anxious' || currentMood === 'overwhelmed' ? 'bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800/30' :
                'bg-gray-50 text-gray-700 border border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800/30'
              }`}>
                <p className="text-sm">{getMoodBasedSuggestion(currentMood)}</p>
              </div>
              
              {/* Today's Focus Goal */}
              <div className="mb-2">
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Today's Focus Goal</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/30">
                    <BookOpen className="h-3.5 w-3.5 mr-1" /> {Object.keys(planData.subjectBreakdown).length} Subjects
                  </Badge>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800/30">
                    <BookCheck className="h-3.5 w-3.5 mr-1" /> {Object.values(planData.subjectBreakdown).reduce((acc, subject) => acc + subject.practiceExams.length, 0)} Practice {Object.values(planData.subjectBreakdown).reduce((acc, subject) => acc + subject.practiceExams.length, 0) > 1 ? 'Tests' : 'Test'}
                  </Badge>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/30">
                    <Book className="h-3.5 w-3.5 mr-1" /> {Object.values(planData.subjectBreakdown).reduce((acc, subject) => acc + subject.flashcards.length, 0)} Flashcards
                  </Badge>
                </div>
              </div>

              {/* Subject-wise Detailed Breakdown */}
              <div className="space-y-4">
                <h3 className="font-medium text-base">Subject-wise Breakdown</h3>
                
                {Object.entries(planData.subjectBreakdown).map(([subjectName, subject], subjectIndex) => (
                  <div 
                    key={subjectName} 
                    className={`bg-gradient-to-r ${
                      subjectIndex % 2 === 0 
                        ? 'from-blue-50/70 to-cyan-50/70 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-100 dark:border-blue-800/30'
                        : 'from-green-50/70 to-teal-50/70 dark:from-green-900/20 dark:to-teal-900/20 border border-green-100 dark:border-green-800/30'
                    } rounded-lg p-3`}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{subjectName}</h4>
                      <Badge>
                        🕒 {Math.floor(
                          subject.concepts.reduce((acc, c) => acc + parseInt(c.timeEstimate), 0) / 60
                        )}h {
                          subject.concepts.reduce((acc, c) => acc + parseInt(c.timeEstimate), 0) % 60
                        }m
                      </Badge>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* Concepts Column */}
                      <div className="bg-white/80 dark:bg-gray-800/80 rounded border border-gray-100 dark:border-gray-700 p-2">
                        <h5 className="text-sm font-medium mb-2 flex items-center">
                          <BookOpen className="h-3.5 w-3.5 mr-1 text-blue-500" /> Concepts
                        </h5>
                        <div className="space-y-2">
                          {subject.concepts.map(concept => (
                            <div key={concept.id} className="p-1.5 rounded border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                              <div className="flex justify-between text-xs">
                                <span>{concept.title}</span>
                                <span>{concept.timeEstimate} min</span>
                              </div>
                              <Link to={`/dashboard/student/concepts/${subjectName.toLowerCase()}/${concept.id}`}>
                                <Button variant="ghost" size="sm" className="w-full mt-1 h-7 text-xs">
                                  {concept.status === '✅ completed' ? 'Review' : 'Start Learning'}
                                </Button>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Flashcards Column */}
                      <div className="bg-white/80 dark:bg-gray-800/80 rounded border border-gray-100 dark:border-gray-700 p-2">
                        <h5 className="text-sm font-medium mb-2 flex items-center">
                          <Book className="h-3.5 w-3.5 mr-1 text-amber-500" /> Flashcards
                        </h5>
                        <div className="space-y-2">
                          {subject.flashcards.map(flashcard => (
                            <div key={flashcard.id} className="p-1.5 rounded border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                              <div className="flex justify-between text-xs">
                                <span>{flashcard.deckName}</span>
                                <span>{flashcard.timeEstimate} min</span>
                              </div>
                              <Progress 
                                value={flashcard.status === '✅ completed' ? 100 : 30} 
                                className="h-1.5 mt-1.5 mb-1" 
                              />
                              <Link to={`/dashboard/student/flashcards/${subjectName.toLowerCase()}/interactive`}>
                                <Button variant="ghost" size="sm" className="w-full mt-1 h-7 text-xs">
                                  {flashcard.status === '✅ completed' ? 'Review' : 'Study Cards'}
                                </Button>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Practice Test Column */}
                      <div className="bg-white/80 dark:bg-gray-800/80 rounded border border-gray-100 dark:border-gray-700 p-2">
                        <h5 className="text-sm font-medium mb-2 flex items-center">
                          <AlertCircle className="h-3.5 w-3.5 mr-1 text-purple-500" /> Practice Test
                        </h5>
                        <div className="space-y-2">
                          {subject.practiceExams.map(exam => (
                            <div key={exam.id} className="p-1.5 rounded border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
                              <div className="flex justify-between text-xs">
                                <span>{exam.examName}</span>
                                <span>{exam.timeEstimate} min</span>
                              </div>
                              <Link to={`/dashboard/student/practice-exam/${subjectName.toLowerCase()}/start`}>
                                <Button variant="ghost" size="sm" className="w-full mt-1 h-7 text-xs">
                                  {exam.status === '✅ completed' ? 'Review Results' : 'Start Test'}
                                </Button>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pending Backlogs Section */}
              {planData.backlogTasks.length > 0 && (
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
                        {planData.backlogTasks.map(backlog => (
                          <tr key={backlog.id}>
                            <td className="px-3 py-2">{backlog.subject}</td>
                            <td className="px-3 py-2">{backlog.title}</td>
                            <td className="px-3 py-2">{backlog.timeEstimate} min</td>
                            <td className="px-3 py-2">
                              <Link to={`/dashboard/student/${backlog.type === 'concept' ? 'concepts' : backlog.type === 'flashcard' ? 'flashcards' : 'practice-exam'}/${backlog.subject.toLowerCase()}`}>
                                <Button size="sm" variant="link" className="h-7 p-0 text-blue-600 dark:text-blue-400">
                                  📎 Complete Now
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {/* Smart Tip or Suggestion */}
              <div className="p-3 bg-amber-50/50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800/30 text-sm">
                <p className="flex items-start">
                  <span className="mr-2 mt-0.5">💡</span>
                  <span>
                    {planData.backlogTasks.length > 2 
                      ? "Consider splitting your backlogs over 3 days to avoid burnout."
                      : "Need more time for a task? You can flag it for tomorrow by clicking 'Postpone'."}
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row gap-2 bg-gray-50 dark:bg-gray-800/50 p-4">
            <Button variant="default" className="w-full sm:w-auto bg-gradient-to-r from-violet-500 to-purple-600">
              <Check className="h-4 w-4 mr-1" /> Start Study Session
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <CalendarDays className="h-4 w-4 mr-1" /> View Weekly Plan
            </Button>
          </CardFooter>
        </Card>
        
        {/* Sticky Footer Tracker */}
        <div className="sticky bottom-4 bg-white dark:bg-gray-900 p-4 rounded-lg border shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Today's Progress</span>
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-sm">Streak: {planData.streak} days</span>
            </div>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          <div className="mt-2 text-center text-sm text-muted-foreground">
            {completionPercentage < 100 
              ? `${100 - completionPercentage}% more to complete today's goals!`
              : "🎉 Amazing! You've completed all tasks for today!"}
          </div>
        </div>
      </div>
    </SharedPageLayout>
  );
}
