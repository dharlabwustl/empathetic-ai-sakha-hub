
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SidebarNav from "@/components/dashboard/SidebarNav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useStudyProgress } from "@/hooks/useStudyProgress";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Calendar, Clock, ArrowUpRight, BookOpen, Trophy, Zap, Brain } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const StudyProgress = () => {
  const { subjects, studyStreak, loading, selectedSubject, selectSubject } = useStudyProgress();
  const { userProfile } = useUserProfile("Student");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Initialize with some default animation
    const progressBars = document.querySelectorAll(".animate-progress");
    progressBars.forEach((bar) => {
      bar.classList.add("w-full");
    });
  }, [subjects]);

  // Function to calculate day streak including current day
  const calculateStreak = () => {
    if (!studyStreak) return 0;
    
    // Convert this week's study streak (array of studied hours)
    // to a more readable format for display
    const consecutiveDays = studyStreak.thisWeek.reduce((acc, hours) => {
      if (hours > 0) {
        return acc + 1;
      } else {
        return 0;
      }
    }, 0);
    
    return consecutiveDays;
  };

  const handleSubjectSelect = (subjectId: string) => {
    selectSubject(subjectId);
  };

  // Format date to "Month Day" format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };

  if (loading || !userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-600 border-b-blue-600 border-l-transparent border-r-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-medium mb-2">Loading your progress data...</h2>
          <p className="text-muted-foreground">Hang tight, we're analyzing your study patterns</p>
        </div>
      </div>
    );
  }

  const overviewCards = [
    {
      title: "Current Study Streak",
      icon: <Zap className="h-6 w-6 text-amber-500" />,
      value: calculateStreak(),
      unit: "days",
      change: "+2 from last week",
      trend: "up",
    },
    {
      title: "Weekly Study Hours",
      icon: <Clock className="h-6 w-6 text-blue-500" />,
      value: studyStreak?.thisWeek.reduce((sum, hours) => sum + hours, 0) || 0,
      unit: "hours",
      change: "On track with your goal",
      trend: "neutral",
    },
    {
      title: "Topics Mastered",
      icon: <BookOpen className="h-6 w-6 text-green-500" />,
      value: subjects.reduce((sum, subject) => 
        sum + subject.topics.filter(topic => topic.masteryLevel > 80).length, 0),
      unit: "topics",
      change: "+5 from last month",
      trend: "up",
    },
    {
      title: "Quiz Success Rate",
      icon: <Trophy className="h-6 w-6 text-purple-500" />,
      value: subjects.reduce((sum, subject) => {
        const totalQuizzes = subject.quizScores.length;
        if (totalQuizzes === 0) return sum;
        
        const successRate = subject.quizScores.reduce((acc, quiz) => 
          acc + (quiz.score / quiz.maxScore) * 100, 0) / totalQuizzes;
        
        return sum + (successRate / subjects.length);
      }, 0).toFixed(1),
      unit: "%",
      change: "Improving steadily",
      trend: "up",
    },
  ];

  // Calculate syllabus progress
  const calculateSyllabusProgress = () => {
    if (subjects.length === 0) return 0;
    
    const totalProgress = subjects.reduce((sum, subject) => sum + subject.progress, 0);
    return totalProgress / subjects.length;
  };

  const syllabusData = [
    { name: "Completed", value: calculateSyllabusProgress() },
    { name: "Remaining", value: 100 - calculateSyllabusProgress() }
  ];
  
  const COLORS = ['#4F46E5', '#E5E7EB'];

  // Helper function to safely parse numbers for calculations
  const safeNumber = (value: any): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <SidebarNav userType="student" userName={userProfile.name} />
      
      <div className="md:ml-64 p-6">
        <div className="mb-8 mt-10 md:mt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold mb-2 text-foreground">
                Study Progress
              </h1>
              <p className="text-muted-foreground">
                Track your learning journey for {userProfile.examPreparation || "IIT JEE"}
              </p>
            </div>
            
            <Button asChild>
              <Link to="/dashboard/student">
                <ArrowUpRight className="mr-2 h-4 w-4" /> Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 max-w-xl mx-auto bg-blue-50 dark:bg-gray-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="study-time">Study Time</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {overviewCards.map((card, i) => (
                <Card key={i} className="overflow-hidden border border-blue-100 dark:border-gray-700">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {card.title}
                      </CardTitle>
                      {card.icon}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline">
                      <div className="text-2xl font-bold">{card.value}</div>
                      <div className="ml-1 text-sm text-muted-foreground">{card.unit}</div>
                    </div>
                    <p className={`text-xs mt-1 ${
                      card.trend === "up" ? "text-green-500" : 
                      card.trend === "down" ? "text-red-500" : "text-blue-500"
                    }`}>
                      {card.change}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Syllabus Progress */}
            <Card className="border border-blue-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Syllabus Coverage</CardTitle>
                <CardDescription>
                  {calculateSyllabusProgress().toFixed(1)}% of your syllabus is completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <div className="w-1/2">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={syllabusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {syllabusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="w-1/2 space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm font-medium">{calculateSyllabusProgress().toFixed(1)}%</span>
                      </div>
                      <Progress value={calculateSyllabusProgress()} className="h-2" />
                    </div>
                    
                    {subjects.slice(0, 3).map((subject) => (
                      <div key={subject.id}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{subject.name}</span>
                          <span className="text-sm font-medium">{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-2" style={{backgroundColor: subject.color + '40'}} />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Weekly Study Trend */}
            <Card className="border border-blue-100 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Weekly Study Hours</CardTitle>
                <CardDescription>
                  See how consistently you've been studying
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      { day: "Mon", hours: safeNumber(studyStreak?.thisWeek[0]) },
                      { day: "Tue", hours: safeNumber(studyStreak?.thisWeek[1]) },
                      { day: "Wed", hours: safeNumber(studyStreak?.thisWeek[2]) },
                      { day: "Thu", hours: safeNumber(studyStreak?.thisWeek[3]) },
                      { day: "Fri", hours: safeNumber(studyStreak?.thisWeek[4]) },
                      { day: "Sat", hours: safeNumber(studyStreak?.thisWeek[5]) },
                      { day: "Sun", hours: safeNumber(studyStreak?.thisWeek[6]) },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="hours" name="Study Hours" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Subjects Tab Content */}
          <TabsContent value="subjects" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-4">
                <Card className="border border-blue-100 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle>My Subjects</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {subjects.map((subject) => (
                      <Button
                        key={subject.id}
                        variant={selectedSubject?.id === subject.id ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => handleSubjectSelect(subject.id)}
                      >
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: subject.color }}></div>
                        {subject.name} - {subject.progress}%
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2 space-y-4">
                {selectedSubject && (
                  <>
                    <Card className="border border-blue-100 dark:border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle>{selectedSubject.name} Progress</CardTitle>
                        <CardDescription>
                          Your learning journey for this subject
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <div className="flex justify-between mb-1">
                            <span>Overall Progress</span>
                            <span className="font-medium">{selectedSubject.progress}%</span>
                          </div>
                          <Progress value={selectedSubject.progress} className="h-3" />
                          <p className="text-xs text-muted-foreground mt-1">
                            {selectedSubject.progress > selectedSubject.lastWeekProgress ? (
                              <span className="text-green-500">+{(selectedSubject.progress - selectedSubject.lastWeekProgress).toFixed(1)}% from last week</span>
                            ) : (
                              <span>No change from last week</span>
                            )}
                          </p>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <h3 className="font-medium mb-2">Topics ({selectedSubject.topics.length})</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {selectedSubject.topics.map((topic) => (
                                <div
                                  key={topic.id}
                                  className={`p-3 rounded-lg border ${
                                    topic.completed ? "border-green-200 bg-green-50" : "border-gray-200"
                                  }`}
                                >
                                  <div className="flex justify-between items-start">
                                    <span className="font-medium">{topic.name}</span>
                                    {topic.completed && (
                                      <div className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                        Completed
                                      </div>
                                    )}
                                  </div>
                                  <div className="mt-2">
                                    <div className="flex justify-between mb-1 text-xs">
                                      <span>Mastery Level</span>
                                      <span>{topic.masteryLevel}%</span>
                                    </div>
                                    <Progress value={topic.masteryLevel} className="h-1.5" />
                                  </div>
                                  {topic.lastPracticed && (
                                    <div className="mt-2 text-xs text-muted-foreground">
                                      Last practiced: {formatDate(topic.lastPracticed)}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-blue-100 dark:border-gray-700">
                      <CardHeader className="pb-2">
                        <CardTitle>Recent Quizzes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {selectedSubject.quizScores.length > 0 ? (
                          <div className="space-y-3">
                            {selectedSubject.quizScores.map((quiz) => (
                              <div key={quiz.id} className="p-3 border rounded-lg">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h4 className="font-medium">{quiz.title}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {formatDate(quiz.date)} • {quiz.timeTaken} min
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-lg font-bold">
                                      {quiz.score}/{quiz.maxScore}
                                    </div>
                                    <div className={`text-sm ${
                                      (quiz.score / quiz.maxScore) >= 0.7 
                                        ? "text-green-500" 
                                        : (quiz.score / quiz.maxScore) >= 0.5 
                                          ? "text-amber-500" 
                                          : "text-red-500"
                                    }`}>
                                      {((quiz.score / quiz.maxScore) * 100).toFixed(0)}%
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <Progress 
                                    value={(quiz.score / quiz.maxScore) * 100}
                                    className={`h-2 ${
                                      (quiz.score / quiz.maxScore) >= 0.7 
                                        ? "bg-green-500" 
                                        : (quiz.score / quiz.maxScore) >= 0.5 
                                          ? "bg-amber-500" 
                                          : "bg-red-500"
                                    }`}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6">
                            <p className="text-muted-foreground">No quiz data available yet</p>
                            <Button variant="outline" className="mt-2">
                              Take a Practice Quiz
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </>
                )}
                
                {!selectedSubject && (
                  <Card className="h-full flex items-center justify-center">
                    <CardContent className="text-center py-12">
                      <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg">Select a subject to see detailed progress</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
          
          {/* Performance Tab Content */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border border-blue-100 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Quiz Performance Trend</CardTitle>
                  <CardDescription>Your quiz scores over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={subjects.flatMap(subject => 
                        subject.quizScores.map(quiz => ({
                          date: formatDate(quiz.date),
                          score: (quiz.score / quiz.maxScore) * 100,
                          subject: subject.name
                        }))
                      ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="score"
                        name="Quiz Score %"
                        stroke="#4F46E5"
                        strokeWidth={2}
                        dot={{ fill: "#4F46E5", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="border border-blue-100 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Subject-wise Performance</CardTitle>
                  <CardDescription>Average scores across your subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={subjects.map(subject => ({
                        name: subject.name,
                        score: subject.quizScores.length > 0 
                          ? subject.quizScores.reduce(
                              (sum, quiz) => sum + (quiz.score / quiz.maxScore) * 100, 0
                            ) / subject.quizScores.length
                          : 0
                      }))}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="score" name="Average Score %" fill="#4F46E5" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="border border-blue-100 dark:border-gray-700 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Assessments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subjects.flatMap(subject => 
                      subject.quizScores
                        .slice(0, 2)
                        .map(quiz => (
                          <div 
                            key={quiz.id} 
                            className="p-4 rounded-lg border bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{quiz.title}</h3>
                                <p className="text-sm text-muted-foreground">{subject.name}</p>
                              </div>
                              <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                                (quiz.score / quiz.maxScore) >= 0.7 
                                  ? "bg-green-100 text-green-700" 
                                  : (quiz.score / quiz.maxScore) >= 0.5 
                                    ? "bg-amber-100 text-amber-700" 
                                    : "bg-red-100 text-red-700"
                              }`}>
                                {((quiz.score / quiz.maxScore) * 100).toFixed(0)}%
                              </div>
                            </div>
                            
                            <div className="mt-4 flex justify-between text-sm">
                              <div>Score: {quiz.score}/{quiz.maxScore}</div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(quiz.date)}
                              </div>
                            </div>
                            
                            <Button variant="outline" size="sm" className="w-full mt-3">
                              View Details
                            </Button>
                          </div>
                        ))
                    ).slice(0, 6)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Study Time Tab Content */}
          <TabsContent value="study-time" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border border-blue-100 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Daily Study Hours</CardTitle>
                  <CardDescription>Last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={[
                        { day: "Mon", hours: safeNumber(studyStreak?.thisWeek[0]) },
                        { day: "Tue", hours: safeNumber(studyStreak?.thisWeek[1]) },
                        { day: "Wed", hours: safeNumber(studyStreak?.thisWeek[2]) },
                        { day: "Thu", hours: safeNumber(studyStreak?.thisWeek[3]) },
                        { day: "Fri", hours: safeNumber(studyStreak?.thisWeek[4]) },
                        { day: "Sat", hours: safeNumber(studyStreak?.thisWeek[5]) },
                        { day: "Sun", hours: safeNumber(studyStreak?.thisWeek[6]) },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="hours" name="Hours" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="border border-blue-100 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Subject Time Distribution</CardTitle>
                  <CardDescription>Hours spent per subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={subjects.map(subject => ({
                          name: subject.name,
                          value: subject.studyHours.reduce((sum, data) => sum + data.hours, 0)
                        }))}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {subjects.map((subject, index) => (
                          <Cell key={`cell-${index}`} fill={subject.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} hours`, 'Study Time']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="border border-blue-100 dark:border-gray-700 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Monthly Study Pattern</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={
                        studyStreak?.lastMonth.map((hours, index) => ({
                          day: index + 1,
                          hours: hours
                        })) || []
                      }
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="hours"
                        name="Hours"
                        stroke="#4F46E5"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudyProgress;
