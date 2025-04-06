
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  LineChart, 
  BarChart,
  BookOpen, 
  Brain, 
  Clock, 
  Calendar, 
  Award, 
  CheckCircle, 
  BookMarked,
  RadioTower,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useStudyProgress } from "@/hooks/useStudyProgress";
import SidebarNav from "@/components/dashboard/SidebarNav";
import ChatAssistant from "@/components/dashboard/ChatAssistant";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart as RechartsLineChart,
  BarChart as RechartsBarChart,
  ComposedChart,
  Area
} from "recharts";

const StudyProgress = () => {
  const { toast } = useToast();
  const { userProfile } = useUserProfile("Student");
  const { subjects, studyStreak, loading, selectedSubject, selectSubject } = useStudyProgress();
  const [activeTab, setActiveTab] = useState("overview");

  if (loading || !userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-100/30 via-white to-violet-100/30 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-400 to-violet-500 animate-pulse blur-md"></div>
            <img 
              src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
              alt="Sakha AI" 
              className="w-20 h-20 mx-auto relative z-10" 
            />
          </div>
          <h2 className="text-xl font-medium mb-2">Loading your study progress...</h2>
          <p className="text-muted-foreground">Analyzing your performance data</p>
        </div>
      </div>
    );
  }

  // Helper functions
  const getTotalStudyHours = () => {
    return subjects.reduce((total, subject) => {
      return total + subject.studyHours.reduce((hours, day) => hours + day.hours, 0);
    }, 0).toFixed(1);
  };

  const getAverageSubjectProgress = () => {
    if (subjects.length === 0) return 0;
    return Math.round(subjects.reduce((sum, subject) => sum + subject.progress, 0) / subjects.length);
  };

  const getTopPerformingSubject = () => {
    if (subjects.length === 0) return null;
    return subjects.reduce((best, subject) => 
      best.progress > subject.progress ? best : subject
    );
  };

  const getWeakestSubject = () => {
    if (subjects.length === 0) return null;
    return subjects.reduce((weakest, subject) => 
      weakest.progress < subject.progress ? weakest : subject
    );
  };

  const getSubjectProgressImprovement = (subject: typeof subjects[0]) => {
    return subject.progress - subject.lastWeekProgress;
  };

  const getProgressColor = (progress: number) => {
    if (progress < 30) return "text-red-500";
    if (progress < 60) return "text-yellow-500";
    return "text-green-500";
  };

  const topSubject = getTopPerformingSubject();
  const weakestSubject = getWeakestSubject();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/30 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10">
      <SidebarNav userType="student" userName={userProfile.name} />
      
      <main className="md:ml-64 p-6">
        <div className="mb-8 mt-10 md:mt-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold mb-2 text-foreground">
                Study Progress Dashboard
              </h1>
              <p className="text-muted-foreground">Track your learning journey, improve your performance</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center gap-2 bg-white/50 p-2 rounded-lg border border-gray-100 text-sm">
              <Calendar size={16} className="text-sky-500" />
              <span>Last updated: <span className="font-medium">Today</span></span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Overall Progress KPI */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold">{getAverageSubjectProgress()}%</div>
                  <p className="text-xs text-muted-foreground">Across all subjects</p>
                </div>
                <BarChart3 size={24} className="text-sky-500" />
              </div>
              <Progress value={getAverageSubjectProgress()} className="mt-2 h-2" />
            </CardContent>
          </Card>
          
          {/* Study Streak KPI */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Current Study Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold">{studyStreak?.current} days</div>
                  <p className="text-xs text-muted-foreground">Longest: {studyStreak?.longest} days</p>
                </div>
                <RadioTower size={24} className="text-violet-500" />
              </div>
              <div className="mt-2 flex gap-1">
                {studyStreak?.thisWeek.map((hours, i) => (
                  <div 
                    key={i}
                    className="flex-1 h-6 rounded-sm bg-violet-100"
                    style={{ 
                      position: 'relative',
                      height: `${Math.min(hours * 8, 24)}px` 
                    }}
                  >
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-violet-500 rounded-sm"
                      style={{ height: `${Math.min(100, hours * 25)}%` }} 
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Total Study Hours KPI */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Study Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold">{getTotalStudyHours()} hrs</div>
                  <p className="text-xs text-muted-foreground">Last 7 days</p>
                </div>
                <Clock size={24} className="text-emerald-500" />
              </div>
              <div className="mt-2 grid grid-cols-7 gap-1 text-[10px] text-center">
                {['M','T','W','T','F','S','S'].map((day, i) => (
                  <div key={i} className="text-muted-foreground">{day}</div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Top Subject KPI */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Top Subject</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold">{topSubject?.name}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className={getProgressColor(topSubject?.progress || 0)}>
                      {topSubject?.progress}% mastered
                    </span>
                  </p>
                </div>
                <Award size={24} className="text-amber-500" />
              </div>
              <Progress 
                value={topSubject?.progress} 
                className="mt-2 h-2" 
                style={{ backgroundColor: 'rgb(251 243 207)', '--tw-bg-opacity': 0.5 }}
              />
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="time">Study Time</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Subject Progress */}
              <Card className="md:row-span-2">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Subject Progress</span>
                    <BookOpen size={18} />
                  </CardTitle>
                  <CardDescription>Your progress across all subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subjects.map(subject => {
                      const improvement = getSubjectProgressImprovement(subject);
                      return (
                        <div key={subject.id}>
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: subject.color }} 
                              />
                              <span className="font-medium">{subject.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>{subject.progress}%</span>
                              {improvement > 0 && (
                                <span className="text-xs text-green-500 flex items-center">
                                  <TrendingUp size={12} />
                                  +{improvement}%
                                </span>
                              )}
                            </div>
                          </div>
                          <Progress 
                            value={subject.progress} 
                            className="h-2" 
                            style={{ 
                              '--progress-background': subject.color,
                            } as React.CSSProperties}
                          />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
              
              {/* Recent Quizzes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Recent Quizzes</span>
                    <Brain size={18} />
                  </CardTitle>
                  <CardDescription>Your latest quiz results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {subjects.flatMap(subject => 
                      subject.quizScores.slice(0, 1).map(quiz => (
                        <div key={quiz.id} className="flex justify-between items-start pb-2 border-b">
                          <div>
                            <p className="font-medium">{quiz.title}</p>
                            <p className="text-xs text-muted-foreground">{subject.name} • {quiz.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">
                              {Math.round((quiz.score / quiz.maxScore) * 100)}%
                            </p>
                            <p className="text-xs text-muted-foreground">{quiz.score}/{quiz.maxScore} points</p>
                          </div>
                        </div>
                      ))
                    ).slice(0, 4)}
                  </div>
                </CardContent>
              </Card>
              
              {/* Weekly Study Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Weekly Study Hours</span>
                    <Clock size={18} />
                  </CardTitle>
                  <CardDescription>Your study time this week</CardDescription>
                </CardHeader>
                <CardContent className="h-60">
                  <ChartContainer
                    config={{
                      hours: {
                        theme: {
                          light: "#8b5cf6",
                          dark: "#c4b5fd"
                        }
                      }
                    }}
                  >
                    <RechartsBarChart data={[
                      { day: "Mon", hours: studyStreak?.thisWeek[0] || 0 },
                      { day: "Tue", hours: studyStreak?.thisWeek[1] || 0 },
                      { day: "Wed", hours: studyStreak?.thisWeek[2] || 0 },
                      { day: "Thu", hours: studyStreak?.thisWeek[3] || 0 },
                      { day: "Fri", hours: studyStreak?.thisWeek[4] || 0 },
                      { day: "Sat", hours: studyStreak?.thisWeek[5] || 0 },
                      { day: "Sun", hours: studyStreak?.thisWeek[6] || 0 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip content={(props) => {
                        const { payload } = props;
                        if (!payload || !payload.length) return null;
                        
                        return (
                          <div className="bg-white p-2 border rounded shadow-sm text-xs">
                            <p>{payload[0].payload.day}: <strong>{payload[0].value} hours</strong></p>
                          </div>
                        );
                      }} />
                      <Bar dataKey="hours" fill="var(--color-hours)" radius={[4, 4, 0, 0]} />
                    </RechartsBarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Improvement Suggestions</span>
                  <TrendingUp size={18} />
                </CardTitle>
                <CardDescription>AI-generated recommendations based on your progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 pb-3 border-b">
                    <div className="bg-red-100 p-2 rounded-full text-red-600">
                      <BookMarked size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium">Focus on {weakestSubject?.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Your weakest subject is currently at {weakestSubject?.progress}%. Try spending an extra 30 minutes per day on this subject.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 pb-3 border-b">
                    <div className="bg-amber-100 p-2 rounded-full text-amber-600">
                      <CheckCircle size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium">Practice More Quizzes</h4>
                      <p className="text-sm text-muted-foreground">
                        Your quiz performance could be improved. Taking more practice tests will help solidify your knowledge.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-100 p-2 rounded-full text-emerald-600">
                      <Award size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium">Maintain Your Streak</h4>
                      <p className="text-sm text-muted-foreground">
                        You have a {studyStreak?.current}-day study streak going. Keep it up to build consistency in your learning!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subjects Tab */}
          <TabsContent value="subjects">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Subject List</CardTitle>
                    <CardDescription>Click on a subject to view details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {subjects.map(subject => (
                        <Button
                          key={subject.id}
                          variant={selectedSubject?.id === subject.id ? "default" : "outline"}
                          className="w-full justify-start"
                          onClick={() => selectSubject(subject.id)}
                        >
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: subject.color }} 
                          />
                          {subject.name}
                          <span className="ml-auto">{subject.progress}%</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {selectedSubject && (
                  <Card>
                    <CardHeader>
                      <CardTitle>{selectedSubject.name} Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Progress:</span>
                          <span className="font-medium">{selectedSubject.progress}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Topics Completed:</span>
                          <span className="font-medium">
                            {selectedSubject.topics.filter(t => t.completed).length}/
                            {selectedSubject.topics.length}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Quizzes Taken:</span>
                          <span className="font-medium">{selectedSubject.quizScores.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Avg. Quiz Score:</span>
                          <span className="font-medium">
                            {Math.round(
                              selectedSubject.quizScores.reduce((sum, quiz) => 
                                sum + (quiz.score / quiz.maxScore) * 100, 0) / 
                                selectedSubject.quizScores.length
                            )}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Study Time:</span>
                          <span className="font-medium">
                            {selectedSubject.studyHours.reduce((sum, day) => sum + day.hours, 0).toFixed(1)} hrs
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <div className="md:col-span-2">
                {selectedSubject ? (
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>{selectedSubject.name} Topic Mastery</CardTitle>
                      <CardDescription>Your progress on individual topics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-5">
                        {selectedSubject.topics.map(topic => (
                          <div key={topic.id}>
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex items-center gap-2">
                                {topic.completed ? 
                                  <CheckCircle size={16} className="text-green-500" /> : 
                                  <div className="w-4 h-4 border border-gray-300 rounded-full" />
                                }
                                <span className="font-medium">{topic.name}</span>
                              </div>
                              <span className="text-sm">{topic.masteryLevel}% mastery</span>
                            </div>
                            <Progress value={topic.masteryLevel} className="h-2" />
                            <p className="text-xs text-muted-foreground mt-1">
                              {topic.lastPracticed && `Last practiced: ${topic.lastPracticed}`}
                            </p>
                          </div>
                        ))}
                      </div>
                      
                      {selectedSubject.quizScores.length > 0 && (
                        <div className="mt-8">
                          <h3 className="text-lg font-medium mb-4">Quiz Performance</h3>
                          <div className="h-60">
                            <ChartContainer
                              config={{
                                score: {
                                  theme: {
                                    light: selectedSubject.color,
                                    dark: selectedSubject.color
                                  }
                                }
                              }}
                            >
                              <RechartsLineChart data={selectedSubject.quizScores.map(quiz => ({
                                name: quiz.title,
                                score: Math.round((quiz.score / quiz.maxScore) * 100)
                              }))}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip content={(props) => {
                                  const { payload } = props;
                                  if (!payload || !payload.length) return null;
                                  
                                  return (
                                    <div className="bg-white p-2 border rounded shadow-sm">
                                      <p>{payload[0].payload.name}</p>
                                      <p><strong>{payload[0].value}% score</strong></p>
                                    </div>
                                  );
                                }} />
                                <Line 
                                  type="monotone" 
                                  dataKey="score" 
                                  stroke="var(--color-score)" 
                                  strokeWidth={2}
                                  dot={{ fill: selectedSubject.color }}
                                />
                              </RechartsLineChart>
                            </ChartContainer>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  <div className="h-full flex items-center justify-center text-center p-12 border rounded-lg">
                    <div>
                      <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-medium mb-2">Select a subject</h3>
                      <p className="text-muted-foreground">
                        Choose a subject from the list to view detailed progress information
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Compare your performance across subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 mb-8">
                  <ChartContainer
                    config={{
                      current: {
                        theme: {
                          light: "#3b82f6",
                          dark: "#60a5fa"
                        }
                      },
                      previous: {
                        theme: {
                          light: "#d1d5db",
                          dark: "#9ca3af"
                        }
                      }
                    }}
                  >
                    <RechartsBarChart
                      data={subjects.map(subject => ({
                        name: subject.name,
                        current: subject.progress,
                        previous: subject.lastWeekProgress
                      }))}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={(props) => {
                        const { payload } = props;
                        if (!payload || !payload.length) return null;
                        
                        return (
                          <div className="bg-white p-2 border rounded shadow-sm">
                            <p><strong>{payload[0].payload.name}</strong></p>
                            <p>Current: {payload[0].value}%</p>
                            <p>Previous: {payload[1].value}%</p>
                            <p>Change: {payload[0].value - payload[1].value}%</p>
                          </div>
                        );
                      }} />
                      <Legend />
                      <Bar dataKey="previous" fill="var(--color-previous)" name="Last Week" />
                      <Bar dataKey="current" fill="var(--color-current)" name="Current" />
                    </RechartsBarChart>
                  </ChartContainer>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Areas of Strength</h3>
                    <div className="space-y-4">
                      {subjects
                        .filter(s => s.progress >= 60)
                        .sort((a, b) => b.progress - a.progress)
                        .map(subject => (
                          <div key={subject.id} className="flex items-start gap-3">
                            <div 
                              className="p-2 rounded-full" 
                              style={{ backgroundColor: `${subject.color}20` }}
                            >
                              <CheckCircle size={16} style={{ color: subject.color }} />
                            </div>
                            <div>
                              <h4 className="font-medium">{subject.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {subject.progress}% mastered ({subject.progress - subject.lastWeekProgress}% improvement)
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Areas for Improvement</h3>
                    <div className="space-y-4">
                      {subjects
                        .filter(s => s.progress < 60)
                        .sort((a, b) => a.progress - b.progress)
                        .map(subject => (
                          <div key={subject.id} className="flex items-start gap-3">
                            <div 
                              className="p-2 rounded-full" 
                              style={{ backgroundColor: `${subject.color}20` }}
                            >
                              <TrendingUp size={16} style={{ color: subject.color }} />
                            </div>
                            <div>
                              <h4 className="font-medium">{subject.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {subject.progress}% mastered (needs {60 - subject.progress}% to reach target)
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Study Time Tab */}
          <TabsContent value="time">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Study Pattern</CardTitle>
                  <CardDescription>Hours studied per day this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ChartContainer
                      config={{
                        hours: {
                          theme: {
                            light: "#8b5cf6",
                            dark: "#c4b5fd"
                          }
                        }
                      }}
                    >
                      <ComposedChart 
                        data={[
                          { day: "Mon", hours: studyStreak?.thisWeek[0] || 0 },
                          { day: "Tue", hours: studyStreak?.thisWeek[1] || 0 },
                          { day: "Wed", hours: studyStreak?.thisWeek[2] || 0 },
                          { day: "Thu", hours: studyStreak?.thisWeek[3] || 0 },
                          { day: "Fri", hours: studyStreak?.thisWeek[4] || 0 },
                          { day: "Sat", hours: studyStreak?.thisWeek[5] || 0 },
                          { day: "Sun", hours: studyStreak?.thisWeek[6] || 0 }
                        ]}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip content={(props) => {
                          const { payload } = props;
                          if (!payload || !payload.length) return null;
                          
                          return (
                            <div className="bg-white p-2 border rounded shadow-sm">
                              <p><strong>{payload[0].payload.day}</strong>: {payload[0].value} hours</p>
                            </div>
                          );
                        }} />
                        <Bar dataKey="hours" fill="var(--color-hours)" barSize={30} />
                        <Line type="monotone" dataKey="hours" stroke="#8884d8" dot={{ fill: "#8884d8" }} />
                      </ComposedChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Study Time Distribution</CardTitle>
                  <CardDescription>Hours spent on each subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ChartContainer
                      config={Object.fromEntries(
                        subjects.map(subject => [
                          subject.name.toLowerCase(), 
                          { 
                            theme: { 
                              light: subject.color, 
                              dark: subject.color 
                            } 
                          }
                        ])
                      )}
                    >
                      <RechartsBarChart
                        data={[
                          {
                            name: "This Week",
                            ...Object.fromEntries(
                              subjects.map(subject => [
                                subject.name.toLowerCase(), 
                                Number(subject.studyHours.reduce((sum, day) => sum + day.hours, 0).toFixed(1))
                              ])
                            )
                          }
                        ]}
                        layout="vertical"
                        margin={{ top: 20, right: 20, bottom: 20, left: 100 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" />
                        <Tooltip />
                        <Legend />
                        {subjects.map(subject => (
                          <Bar 
                            key={subject.id}
                            dataKey={subject.name.toLowerCase()}
                            fill={`var(--color-${subject.name.toLowerCase()})`}
                            name={subject.name}
                          />
                        ))}
                      </RechartsBarChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Monthly Study Trend</CardTitle>
                <CardDescription>Your daily study hours for the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer
                    config={{
                      hours: {
                        theme: {
                          light: "#3b82f6",
                          dark: "#60a5fa"
                        }
                      },
                      target: {
                        theme: {
                          light: "#ef4444",
                          dark: "#f87171"
                        }
                      }
                    }}
                  >
                    <RechartsLineChart
                      data={studyStreak?.lastMonth.map((hours, index) => ({
                        day: index + 1,
                        hours,
                        target: 3
                      })) || []}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip content={(props) => {
                        const { payload } = props;
                        if (!payload || !payload.length) return null;
                        
                        return (
                          <div className="bg-white p-2 border rounded shadow-sm">
                            <p><strong>Day {payload[0].payload.day}</strong></p>
                            <p>Hours: {payload[0].value}</p>
                            <p>Target: {payload[1].value} hours</p>
                          </div>
                        );
                      }} />
                      <Line 
                        type="monotone" 
                        dataKey="hours" 
                        stroke="var(--color-hours)" 
                        strokeWidth={2}
                        dot={{ r: 2 }}
                        activeDot={{ r: 5 }}
                        name="Daily hours"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="target" 
                        stroke="var(--color-target)" 
                        strokeWidth={1}
                        strokeDasharray="5 5"
                        dot={false}
                        name="Target hours"
                      />
                      <Legend />
                      <Area 
                        type="monotone"
                        dataKey="hours"
                        fill="var(--color-hours)"
                        fillOpacity={0.1}
                      />
                    </RechartsLineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <ChatAssistant userType="student" />
    </div>
  );
};

export default StudyProgress;
