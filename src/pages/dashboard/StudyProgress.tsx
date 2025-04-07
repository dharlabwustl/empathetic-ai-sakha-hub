
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStudyProgress } from "@/hooks/useStudyProgress";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, ResponsiveContainer, XAxis, YAxis, Bar, Line, Tooltip, Legend } from 'recharts';
import { BookOpen, Calendar, CheckCircle2, Clock, Star } from 'lucide-react';
import { UserProfileType } from '@/types/user';

const StudyProgress = () => {
  const { subjects, studyStreak, loading, selectedSubject, selectSubject } = useStudyProgress();
  const { userProfile } = useUserProfile("Student");
  const [activeTab, setActiveTab] = useState("overview");

  // Check if userProfile isn't null before accessing examPreparation
  const examGoal = userProfile?.examPreparation || "General Study";
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Study Progress</h1>
          <p className="text-muted-foreground">Track your learning journey and academic performance</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full flex items-center">
            <CheckCircle2 size={16} className="mr-1" />
            <span>{studyStreak?.current || 0} Day Streak</span>
          </div>
          
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Study Calendar
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Daily Study Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">4.5 hrs / 6 hrs</div>
            <Progress value={75} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">75% Completed Today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subjects.length}</div>
            <p className="text-sm text-muted-foreground mt-2">
              <span className="text-green-500 font-medium">2 Subjects</span> above 80% mastery
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Quiz Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-sm text-muted-foreground mt-2">
              <span className="text-green-500 font-medium">↑ 12%</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Syllabus Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48%</div>
            <p className="text-sm text-muted-foreground mt-2">
              <span className="text-amber-500 font-medium">On Track</span> for {examGoal}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Progress Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={subjects.map(s => ({
                subject: s.name,
                progress: s.progress,
                lastWeek: s.lastWeekProgress
              }))}>
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="progress" stroke="#0ea5e9" name="Current Progress" />
                <Line type="monotone" dataKey="lastWeek" stroke="#94a3b8" name="Last Week" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Study Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
                <Star className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <h3 className="text-3xl font-bold">{studyStreak?.current || 0} Days</h3>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-2">
              {studyStreak?.thisWeek.map((hours, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center ${hours > 0 ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                    {hours > 0 ? hours : 0}
                  </div>
                  <span className="text-xs mt-1">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                  </span>
                </div>
              ))}
            </div>
            
            <p className="text-sm text-muted-foreground mt-4">
              Longest streak: <span className="font-bold">{studyStreak?.longest || 0} days</span>
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Subject Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="topics">Topics</TabsTrigger>
              <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
              <TabsTrigger value="time">Study Time</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-4">Subject Progress</h3>
                  <div className="space-y-4">
                    {subjects.map(subject => (
                      <div key={subject.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span>{subject.name}</span>
                          <span className="font-medium">{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-2" style={{backgroundColor: `${subject.color}40`}}>
                          <div className="h-full" style={{backgroundColor: subject.color}}></div>
                        </Progress>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Strong vs Weak Subjects</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={subjects}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="progress" fill="#0ea5e9" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="topics">
              {selectedSubject ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">{selectedSubject.name} Topics</h3>
                    <div className="text-sm text-muted-foreground">
                      {selectedSubject.topics.filter(t => t.completed).length} of {selectedSubject.topics.length} completed
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {selectedSubject.topics.map(topic => (
                      <div key={topic.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              topic.masteryLevel > 80 ? 'bg-green-100 text-green-700' :
                              topic.masteryLevel > 50 ? 'bg-amber-100 text-amber-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {topic.masteryLevel}%
                            </div>
                            <div>
                              <h4 className="font-medium">{topic.name}</h4>
                              {topic.lastPracticed && (
                                <p className="text-xs text-muted-foreground">
                                  Last practiced: {topic.lastPracticed}
                                </p>
                              )}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Practice</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-medium text-lg">Select a subject to view topics</h3>
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    {subjects.map(subject => (
                      <Button 
                        key={subject.id}
                        variant="outline"
                        onClick={() => selectSubject(subject.id)}
                      >
                        {subject.name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="quizzes">
              <div className="space-y-6">
                <h3 className="font-medium">Recent Quiz Performance</h3>
                
                {selectedSubject ? (
                  <div className="space-y-4">
                    {selectedSubject.quizScores.map(quiz => (
                      <div key={quiz.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{quiz.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {quiz.date} • {quiz.timeTaken} min
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold">
                              {quiz.score}/{quiz.maxScore}
                            </div>
                            <div className={`text-sm ${
                              (quiz.score / quiz.maxScore) * 100 > 70 ? 'text-green-600' :
                              (quiz.score / quiz.maxScore) * 100 > 40 ? 'text-amber-600' :
                              'text-red-600'
                            }`}>
                              {Math.round((quiz.score / quiz.maxScore) * 100)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-medium text-lg">Select a subject to view quizzes</h3>
                      <div className="flex flex-wrap gap-2 justify-center mt-4">
                        {subjects.map(subject => (
                          <Button 
                            key={subject.id}
                            variant="outline"
                            onClick={() => selectSubject(subject.id)}
                          >
                            {subject.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="time">
              <div className="space-y-6">
                <h3 className="font-medium">Study Hours Distribution</h3>
                
                {selectedSubject ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={selectedSubject.studyHours}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="hours" fill="#0ea5e9" name="Hours Studied" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-medium text-lg">Select a subject to view study time</h3>
                    <div className="flex flex-wrap gap-2 justify-center mt-4">
                      {subjects.map(subject => (
                        <Button 
                          key={subject.id}
                          variant="outline"
                          onClick={() => selectSubject(subject.id)}
                        >
                          {subject.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-medium mb-4">Total Study Hours This Week</h3>
                  <div className="text-3xl font-bold">
                    {studyStreak?.thisWeek.reduce((a, b) => a + b, 0) || 0} hours
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="text-green-500 font-medium">↑ 3 hours</span> from last week
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyProgress;
