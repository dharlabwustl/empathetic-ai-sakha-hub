
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, 
  GraduationCap, 
  Book, 
  Brain, 
  Clock, 
  Smile, 
  Activity,
  Mail,
  Phone,
  CalendarCheck,
  Users,
  Sparkles,
  AlertTriangle,
  UserCheck,
  Award,
  LineChart
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { StudentData } from "@/types/admin";

interface StudentProfileModalProps {
  student: StudentData;
  onClose: () => void;
}

const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  student,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Helper function to format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Mock data for student profile - this would come from the backend in a real app
  const studentProfile = {
    // Personal Data
    personalityType: "Analytical Learner",
    studyStyle: "Visual",
    studyPace: "Balanced",
    studyTime: "Evening",
    commitmentHours: 4,
    startDate: new Date('2023-07-15'),
    targetExamDate: new Date('2024-05-20'),
    
    // Academic Data
    subjects: [
      { name: "Physics", strength: 78 },
      { name: "Chemistry", strength: 62 },
      { name: "Mathematics", strength: 85 },
      { name: "Biology", strength: 45 }
    ],
    weakAreas: ["Organic Chemistry", "Thermodynamics", "Cell Biology"],
    strongAreas: ["Mechanics", "Algebra", "Electrostatics"],
    
    // Engagement Data
    studyStreak: 14,
    totalHoursStudied: 247,
    questionsSolved: 2564,
    quizzesTaken: 48,
    averageScore: 72,
    
    // Emotional Data
    moodTrend: [
      { date: '2023-09-01', mood: 'Motivated' },
      { date: '2023-09-02', mood: 'Focused' },
      { date: '2023-09-03', mood: 'Tired' },
      { date: '2023-09-04', mood: 'Anxious' },
      { date: '2023-09-05', mood: 'Motivated' },
    ],
    stressLevel: 'Moderate',
    motivationTriggers: ['Progress tracking', 'Competitive quizzes'],
    
    // Daily Pattern
    sleepHours: 7.5,
    focusHours: ["8:00 AM - 10:00 AM", "4:00 PM - 6:00 PM"],
    breakPattern: "Pomodoro (25/5)",
    studyEnvironment: "Quiet room with natural light"
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-white dark:bg-slate-900">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <span className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white">
              {student.name.charAt(0)}
            </span>
            <span>{student.name}</span>
          </DialogTitle>
          <DialogDescription className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-2">
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-gray-500" />
              <span>{student.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-gray-500" />
              <span>{student.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarCheck size={14} className="text-gray-500" />
              <span>Joined {formatDate(student.registrationDate)}</span>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="study-plan">Study Plan</TabsTrigger>
            <TabsTrigger value="personality">Personality</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <GraduationCap size={16} className="text-purple-500" />
                    <span>Exam Goal</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold">{student.examType}</h3>
                    <div className="text-sm text-gray-500 flex flex-col gap-1">
                      <div className="flex justify-between">
                        <span>Exam Date:</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {formatDate(studentProfile.targetExamDate)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Days Remaining:</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {Math.ceil((studentProfile.targetExamDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                        </span>
                      </div>
                      <Progress 
                        value={65} 
                        className="h-2 mt-2" 
                        indicatorClassName="bg-gradient-to-r from-pink-500 to-purple-600" 
                      />
                      <span className="text-xs text-right">65% syllabus covered</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Brain size={16} className="text-purple-500" />
                    <span>Learning Profile</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Personality:</span>
                      <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">
                        {studentProfile.personalityType}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Study Style:</span>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                        {studentProfile.studyStyle}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Study Pace:</span>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                        {studentProfile.studyPace}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Daily Commitment:</span>
                      <span className="font-medium">{studentProfile.commitmentHours} hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Activity size={16} className="text-purple-500" />
                    <span>Recent Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Study Streak:</span>
                      <span className="font-medium text-orange-600">{studentProfile.studyStreak} days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Questions Solved:</span>
                      <span className="font-medium">{studentProfile.questionsSolved}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Avg. Quiz Score:</span>
                      <span className="font-medium">{studentProfile.averageScore}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Recent Mood:</span>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 flex items-center gap-1">
                        <Smile size={12} />
                        {studentProfile.moodTrend[studentProfile.moodTrend.length - 1].mood}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Book size={16} className="text-purple-500" />
                  <span>Subject Performance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentProfile.subjects.map((subject, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">{subject.name}</span>
                        <span className="text-sm font-medium">{subject.strength}%</span>
                      </div>
                      <Progress 
                        value={subject.strength} 
                        className="h-2" 
                        indicatorClassName={`${
                          subject.strength > 70 ? 'bg-green-500' : 
                          subject.strength > 50 ? 'bg-orange-500' : 'bg-red-500'
                        }`} 
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Study Plan Tab */}
          <TabsContent value="study-plan" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar size={18} className="text-purple-500" />
                    Study Plan Details
                  </span>
                  <Button variant="outline" size="sm" className="text-purple-600 border-purple-200 hover:bg-purple-50">
                    View Full Plan
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Exam Target</h3>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{student.examType}</span>
                        <Badge className="bg-purple-100 text-purple-800">
                          {formatDate(studentProfile.targetExamDate)}
                        </Badge>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Daily Study Hours</h3>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{studentProfile.commitmentHours} hours/day</span>
                        <Badge className="bg-blue-100 text-blue-800">
                          {studentProfile.studyPace} Pace
                        </Badge>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Preferred Study Time</h3>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{studentProfile.studyTime}</span>
                        <Clock size={16} className="text-gray-500" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Upcoming Study Sessions</h3>
                    <div className="space-y-2">
                      {[
                        {
                          day: "Today",
                          sessions: [
                            { time: "4:00 PM - 5:30 PM", subject: "Physics", topic: "Electrostatics" },
                            { time: "6:00 PM - 7:00 PM", subject: "Chemistry", topic: "Chemical Bonding" }
                          ]
                        },
                        {
                          day: "Tomorrow",
                          sessions: [
                            { time: "9:00 AM - 10:30 AM", subject: "Mathematics", topic: "Calculus" },
                            { time: "11:00 AM - 12:30 PM", subject: "Physics", topic: "Thermodynamics" }
                          ]
                        }
                      ].map((day, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 border rounded-lg p-3">
                          <h4 className="text-sm font-medium text-purple-700 dark:text-purple-400 mb-2">{day.day}</h4>
                          <div className="space-y-2">
                            {day.sessions.map((session, j) => (
                              <div key={j} className="flex items-start gap-2">
                                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-full p-1">
                                  <Clock size={14} />
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{session.time}</p>
                                  <p className="text-xs text-gray-500">
                                    {session.subject} - {session.topic}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium">Focus Areas</h3>
                      <Badge className="bg-amber-100 text-amber-800">AI Recommended</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-2">Weak Areas (Focus More)</h4>
                        <div className="space-y-1">
                          {studentProfile.weakAreas.map((area, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <AlertTriangle size={14} className="text-amber-500" />
                              <span className="text-sm">{area}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-2">Strong Areas (Maintain)</h4>
                        <div className="space-y-1">
                          {studentProfile.strongAreas.map((area, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Award size={14} className="text-green-500" />
                              <span className="text-sm">{area}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Personality Tab */}
          <TabsContent value="personality" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Brain size={18} className="text-purple-500" />
                    Learning Style & Personality
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Personality Type</h3>
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30 rounded-lg p-3">
                      <span className="font-semibold text-purple-800 dark:text-purple-300">{studentProfile.personalityType}</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        An analytical learner who thrives on organized information and prefers to understand 
                        concepts thoroughly before moving on. Excels with structured study methods.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Learning Style Preferences</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Visual</span>
                        <Progress value={85} className="w-32 h-2" indicatorClassName="bg-blue-500" />
                        <span className="text-xs font-medium">85%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Auditory</span>
                        <Progress value={45} className="w-32 h-2" indicatorClassName="bg-green-500" />
                        <span className="text-xs font-medium">45%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Reading/Writing</span>
                        <Progress value={70} className="w-32 h-2" indicatorClassName="bg-purple-500" />
                        <span className="text-xs font-medium">70%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Kinesthetic</span>
                        <Progress value={30} className="w-32 h-2" indicatorClassName="bg-amber-500" />
                        <span className="text-xs font-medium">30%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock size={18} className="text-purple-500" />
                    Daily Life Pattern
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-xs text-gray-500">Average Sleep</span>
                      <p className="font-semibold">{studentProfile.sleepHours} hours</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-gray-500">Break Pattern</span>
                      <p className="font-semibold">{studentProfile.breakPattern}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-gray-500">Study Environment</span>
                      <p className="font-semibold text-sm">{studentProfile.studyEnvironment}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-gray-500">Study Pace</span>
                      <p className="font-semibold">{studentProfile.studyPace}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">Peak Focus Hours</h3>
                    <div className="space-y-2">
                      {studentProfile.focusHours.map((hours, i) => (
                        <div key={i} className="bg-gray-50 dark:bg-slate-800 rounded p-2 text-sm font-medium">
                          {hours}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Smile size={18} className="text-purple-500" />
                  Emotional Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500">Current Stress Level</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{studentProfile.stressLevel}</span>
                      <Badge className="bg-amber-100 text-amber-800">Needs Attention</Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500">Mood Trend (Last 5 Days)</span>
                    <div className="flex gap-1">
                      {studentProfile.moodTrend.map((day, i) => {
                        const moodColor = 
                          day.mood === 'Motivated' || day.mood === 'Focused' ? 'bg-green-500' :
                          day.mood === 'Tired' ? 'bg-amber-500' : 'bg-red-500';
                        return (
                          <div key={i} className="flex flex-col items-center">
                            <div className={`w-2 h-8 rounded-full ${moodColor}`}></div>
                            <span className="text-xs mt-1">{day.date.split('-')[2]}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500">Motivation Triggers</span>
                    <div className="flex flex-wrap gap-1">
                      {studentProfile.motivationTriggers.map((trigger, i) => (
                        <Badge key={i} className="bg-purple-100 text-purple-800">
                          {trigger}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Engagement Tab */}
          <TabsContent value="engagement" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Activity size={16} className="text-purple-500" />
                    <span>Study Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Total Hours</span>
                    <span className="font-semibold">{studentProfile.totalHoursStudied} hrs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Avg. Daily</span>
                    <span className="font-semibold">{Math.round(studentProfile.totalHoursStudied / 90 * 10) / 10} hrs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Current Streak</span>
                    <span className="font-semibold text-orange-600">{studentProfile.studyStreak} days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Last Active</span>
                    <Badge variant="outline">Today</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Users size={16} className="text-purple-500" />
                    <span>Peer Comparison</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Study Hours</span>
                    <Badge className="bg-green-100 text-green-800">Top 15%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Quiz Performance</span>
                    <Badge className="bg-blue-100 text-blue-800">Top 30%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Consistency</span>
                    <Badge className="bg-purple-100 text-purple-800">Top 20%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Overall Rank</span>
                    <span className="font-semibold">42 of 278</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <LineChart size={16} className="text-purple-500" />
                    <span>Progress Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Questions Solved</span>
                    <span className="font-semibold">{studentProfile.questionsSolved}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Quizzes Taken</span>
                    <span className="font-semibold">{studentProfile.quizzesTaken}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Average Score</span>
                    <span className="font-semibold">{studentProfile.averageScore}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Syllabus Coverage</span>
                    <span className="font-semibold">65%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles size={18} className="text-purple-500" />
                  Achievement & Contribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-500">Achievements</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: "7-Day Streak", desc: "Study 7 days in a row", completed: true },
                        { name: "Quiz Master", desc: "Score >90% in 5 quizzes", completed: true },
                        { name: "Early Bird", desc: "Complete 5 sessions before 9AM", completed: true },
                        { name: "Problem Solver", desc: "Solve 1000 practice problems", completed: true },
                        { name: "Marathon Runner", desc: "Study for 100 total hours", completed: true },
                        { name: "Subject Expert", desc: "Master all topics in a subject", completed: false }
                      ].map((achievement, i) => (
                        <div 
                          key={i}
                          className={`border rounded-lg p-3 ${achievement.completed ? 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800/30' : 'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700'}`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {achievement.completed ? (
                              <UserCheck size={14} className="text-purple-600" />
                            ) : (
                              <Award size={14} className="text-gray-400" />
                            )}
                            <span className={`text-sm font-medium ${achievement.completed ? 'text-purple-800 dark:text-purple-400' : 'text-gray-400'}`}>
                              {achievement.name}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">{achievement.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-500">Contributions</h3>
                    <div className="space-y-2">
                      {[
                        { type: "Questions Added", count: 12 },
                        { type: "Notes Shared", count: 5 },
                        { type: "Forum Answers", count: 8 },
                        { type: "Reviews Given", count: 15 }
                      ].map((contribution, i) => (
                        <div key={i} className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-2 rounded">
                          <span className="text-sm">{contribution.type}</span>
                          <Badge variant="outline">{contribution.count}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Calendar size={18} className="text-purple-500" />
                    Study Calendar
                  </span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Month
                    </Button>
                    <Button variant="default" size="sm" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                      Week
                    </Button>
                    <Button variant="outline" size="sm">
                      Day
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-7 bg-gray-50 dark:bg-gray-800">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="py-2 text-center font-medium text-sm border-b">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 h-64 overflow-y-auto">
                    {Array.from({ length: 7 }).map((_, i) => {
                      // Today is the 3rd day (Wednesday) in our mock calendar
                      const isToday = i === 3;
                      return (
                        <div 
                          key={i} 
                          className={`border-r border-b p-1 h-full ${
                            isToday 
                              ? 'bg-purple-50 dark:bg-purple-900/20' 
                              : ''
                          }`}
                        >
                          <div className={`w-6 h-6 flex items-center justify-center text-xs rounded-full mb-1 ${
                            isToday 
                              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold' 
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {12 + i}
                          </div>
                          
                          {i >= 2 && i <= 4 && ( // Add study sessions to Wed-Fri
                            <div className="space-y-1">
                              {i === 3 && ( // Today (Wednesday) has 2 sessions
                                <>
                                  <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs p-1 rounded">
                                    <div className="font-medium">Physics</div>
                                    <div className="text-xs">4:00 - 5:30 PM</div>
                                  </div>
                                  <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs p-1 rounded">
                                    <div className="font-medium">Chemistry</div>
                                    <div className="text-xs">6:00 - 7:00 PM</div>
                                  </div>
                                </>
                              )}
                              
                              {i === 4 && ( // Thursday has 1 session
                                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 text-xs p-1 rounded">
                                  <div className="font-medium">Mathematics</div>
                                  <div className="text-xs">5:00 - 6:30 PM</div>
                                </div>
                              )}
                              
                              {i === 2 && ( // Tuesday has 1 session
                                <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs p-1 rounded">
                                  <div className="font-medium">Biology</div>
                                  <div className="text-xs">4:30 - 6:00 PM</div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Clock size={16} className="text-purple-500" />
                    Study Time Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-xs text-gray-500">Weekly Target</span>
                        <p className="font-semibold">{studentProfile.commitmentHours * 7} hours</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-gray-500">Weekly Actual</span>
                        <p className="font-semibold">26 hours</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-gray-500">Daily Average</span>
                        <p className="font-semibold">3.7 hours</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-gray-500">Consistency</span>
                        <p className="font-semibold text-green-600">92%</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xs font-medium text-gray-500">Subject Distribution</h3>
                      <div className="h-4 w-full rounded-full overflow-hidden flex">
                        <div className="bg-blue-500 h-full" style={{ width: '35%' }}></div>
                        <div className="bg-green-500 h-full" style={{ width: '25%' }}></div>
                        <div className="bg-purple-500 h-full" style={{ width: '30%' }}></div>
                        <div className="bg-amber-500 h-full" style={{ width: '10%' }}></div>
                      </div>
                      <div className="flex text-xs justify-between">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Physics (35%)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Chemistry (25%)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>Mathematics (30%)</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                          <span>Biology (10%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <UserCheck size={16} className="text-purple-500" />
                    Study Habits Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Study Session Duration</span>
                        <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        Maintains focused study sessions of 60-90 minutes with adequate breaks.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Consistency</span>
                        <Badge className="bg-green-100 text-green-800">Good</Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        Studies regularly with occasional missed days. Current streak: {studentProfile.studyStreak} days.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Subject Balance</span>
                        <Badge className="bg-amber-100 text-amber-800">Needs Improvement</Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        Some subjects receive significantly less attention (Biology: 10%).
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Time of Day Preference</span>
                        <Badge className="bg-blue-100 text-blue-800">Evening Learner</Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        Most productive between 4PM - 8PM, aligns with identified preferred study time.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700">
            Generate Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentProfileModal;
