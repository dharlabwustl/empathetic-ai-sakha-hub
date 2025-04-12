
import React, { useState } from "react";
import { X, Calendar, Brain, Heart, Book, Clock, Activity, BarChart } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { StudentData, OnboardingData } from "@/types/admin";
import { PersonalityType, MoodType } from "@/types/user";

interface StudentProfileModalProps {
  student: StudentData;
  onClose: () => void;
}

const StudentProfileModal = ({ student, onClose }: StudentProfileModalProps) => {
  const [tab, setTab] = useState("overview");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Mock data - in a real app, you would fetch these details from your API
  const mockStudyPlanData = {
    examDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    dailyStudyHours: student.studyHours || 4,
    strongSubjects: ["Physics", "Mathematics"],
    weakSubjects: ["Chemistry", "Biology"],
    studyPace: "Balanced" as "Aggressive" | "Balanced" | "Relaxed",
    preferredStudyTime: "Evening" as "Morning" | "Afternoon" | "Evening" | "Night",
  };
  
  const mockOnboardingData: Partial<OnboardingData> = {
    examType: student.examType,
    studyHours: student.studyHours,
    studyPace: mockStudyPlanData.studyPace.toLowerCase() as "relaxed" | "balanced" | "intensive",
    preferredStudyTime: mockStudyPlanData.preferredStudyTime.toLowerCase() as "morning" | "afternoon" | "evening" | "night",
    subjectsSelected: student.subjectsSelected,
    learningStyle: "visual" as "visual" | "auditory" | "reading" | "kinesthetic" | "mixed",
    completedAt: student.registrationDate,
  };
  
  const mockMoodData = {
    current: "Focused" as MoodType,
    history: [
      { date: "2025-04-01", mood: "Happy" as MoodType },
      { date: "2025-04-02", mood: "Focused" as MoodType },
      { date: "2025-04-03", mood: "Overwhelmed" as MoodType },
      { date: "2025-04-04", mood: "Motivated" as MoodType },
      { date: "2025-04-05", mood: "Focused" as MoodType },
    ]
  };
  
  const mockPersonalityType: PersonalityType = "Strategic Thinker";
  
  const mockEngagementData = {
    studyStreak: 7,
    quizzesCompleted: 24,
    flashcardsCreated: 56,
    questionsAnswered: 312,
    doubtsAsked: 17,
    tutorSessionsAttended: 5,
    engagementScore: 82,
    lastWeekActivity: [4.5, 3.2, 5.0, 2.1, 4.7, 1.5, 3.8], // hours per day
  };
  
  const mockScheduleForSelectedDay = [
    { time: "08:00 - 09:30", subject: "Physics", topic: "Kinematics", completed: true },
    { time: "10:00 - 11:30", subject: "Chemistry", topic: "Organic Chemistry", completed: true },
    { time: "13:00 - 14:30", subject: "Mathematics", topic: "Calculus", completed: false },
    { time: "16:00 - 17:30", subject: "Biology", topic: "Cell Structure", completed: false },
  ];
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const getMoodColor = (mood: MoodType) => {
    const moodColors: Record<MoodType, string> = {
      "Happy": "bg-green-100 text-green-800",
      "Okay": "bg-blue-100 text-blue-800",
      "Sad": "bg-red-100 text-red-800",
      "Focused": "bg-purple-100 text-purple-800",
      "Tired": "bg-gray-100 text-gray-800",
      "Overwhelmed": "bg-orange-100 text-orange-800",
      "Motivated": "bg-indigo-100 text-indigo-800",
    };
    
    return moodColors[mood] || "bg-gray-100 text-gray-800";
  };
  
  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle className="text-2xl font-bold">{student.name}'s Profile</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X size={18} />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
              {student.examType}
            </Badge>
            <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
              {mockPersonalityType}
            </Badge>
            <Badge variant="outline" className={getMoodColor(mockMoodData.current)}>
              {mockMoodData.current}
            </Badge>
            <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
              Registered: {formatDate(student.registrationDate)}
            </Badge>
          </div>
        </DialogHeader>
        
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="study-plan">Study Plan</TabsTrigger>
            <TabsTrigger value="personality">Personality</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-sm text-gray-500">Name:</span>
                    <span className="col-span-2 font-medium">{student.name}</span>
                    
                    <span className="text-sm text-gray-500">Email:</span>
                    <span className="col-span-2">{student.email}</span>
                    
                    <span className="text-sm text-gray-500">Phone:</span>
                    <span className="col-span-2">{student.phoneNumber}</span>
                    
                    <span className="text-sm text-gray-500">Exam Goal:</span>
                    <span className="col-span-2">{student.examType}</span>
                    
                    <span className="text-sm text-gray-500">Registration:</span>
                    <span className="col-span-2">{formatDate(student.registrationDate)}</span>
                    
                    <span className="text-sm text-gray-500">Last Active:</span>
                    <span className="col-span-2">{formatDate(student.lastActive)}</span>
                    
                    <span className="text-sm text-gray-500">Status:</span>
                    <span className="col-span-2">
                      <Badge variant="outline" className={
                        student.lastActive > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) 
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                      }>
                        {student.lastActive > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) ? "Active" : "Inactive"}
                      </Badge>
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Study Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span className="font-medium">{student.engagementScore}%</span>
                    </div>
                    <Progress value={student.engagementScore} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="text-sm text-gray-500">Study Hours</div>
                      <div className="text-xl font-bold">{student.studyHours}h</div>
                      <div className="text-xs text-gray-400">daily average</div>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="text-sm text-gray-500">Mood Score</div>
                      <div className="text-xl font-bold">{student.moodScore}/10</div>
                      <div className="text-xs text-gray-400">average</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Exam Preparation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Syllabus Covered</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Strong Subjects</h4>
                    <div className="flex flex-wrap gap-1">
                      {mockStudyPlanData.strongSubjects.map(subject => (
                        <Badge key={subject} variant="outline" className="bg-green-100 text-green-800">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Weak Subjects</h4>
                    <div className="flex flex-wrap gap-1">
                      {mockStudyPlanData.weakSubjects.map(subject => (
                        <Badge key={subject} variant="outline" className="bg-red-100 text-red-800">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="bg-purple-100 rounded-full p-1 mt-0.5">
                        <Activity size={14} className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm">Completed 3 physics quizzes</p>
                        <p className="text-xs text-gray-500">Today, 2:30 PM</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                        <Book size={14} className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm">Created 12 flashcards on Chemistry</p>
                        <p className="text-xs text-gray-500">Yesterday, 4:15 PM</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-green-100 rounded-full p-1 mt-0.5">
                        <Brain size={14} className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm">Asked a doubt on Calculus</p>
                        <p className="text-xs text-gray-500">Apr 10, 10:20 AM</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-amber-100 rounded-full p-1 mt-0.5">
                        <Heart size={14} className="text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm">Updated mood to "Focused"</p>
                        <p className="text-xs text-gray-500">Apr 9, 9:45 AM</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="study-plan">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Study Plan Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-sm text-gray-500">Exam Date:</span>
                    <span className="col-span-2 font-medium">{formatDate(mockStudyPlanData.examDate)}</span>
                    
                    <span className="text-sm text-gray-500">Days Remaining:</span>
                    <span className="col-span-2 font-medium">
                      {Math.ceil((mockStudyPlanData.examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days
                    </span>
                    
                    <span className="text-sm text-gray-500">Daily Study Hours:</span>
                    <span className="col-span-2">{mockStudyPlanData.dailyStudyHours} hours</span>
                    
                    <span className="text-sm text-gray-500">Study Pace:</span>
                    <span className="col-span-2">{mockStudyPlanData.studyPace}</span>
                    
                    <span className="text-sm text-gray-500">Preferred Time:</span>
                    <span className="col-span-2">{mockStudyPlanData.preferredStudyTime}</span>
                    
                    <span className="text-sm text-gray-500">Strong Subjects:</span>
                    <div className="col-span-2 flex flex-wrap gap-1">
                      {mockStudyPlanData.strongSubjects.map(subject => (
                        <Badge key={subject} variant="outline" className="bg-green-100 text-green-800">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                    
                    <span className="text-sm text-gray-500">Weak Subjects:</span>
                    <div className="col-span-2 flex flex-wrap gap-1">
                      {mockStudyPlanData.weakSubjects.map(subject => (
                        <Badge key={subject} variant="outline" className="bg-red-100 text-red-800">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Current Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Overall Syllabus Coverage</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Overall</span>
                        <span className="font-medium">68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Subject-wise Progress</h4>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Physics</span>
                          <span className="font-medium">82%</span>
                        </div>
                        <Progress value={82} className="h-1.5" />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Chemistry</span>
                          <span className="font-medium">53%</span>
                        </div>
                        <Progress value={53} className="h-1.5" />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Mathematics</span>
                          <span className="font-medium">76%</span>
                        </div>
                        <Progress value={76} className="h-1.5" />
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Biology</span>
                          <span className="font-medium">45%</span>
                        </div>
                        <Progress value={45} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Study Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <h4 className="font-medium text-amber-800 mb-1">Focus Areas</h4>
                      <ul className="text-sm text-amber-800 space-y-1">
                        <li>• Organic Chemistry - Spend 2 more hours this week</li>
                        <li>• Biology Cell Structure - Practice needs improvement</li>
                        <li>• Trigonometry - Review formulas and take practice test</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <h4 className="font-medium text-green-800 mb-1">Strengths</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Physics Mechanics - Excellent progress, maintain practice</li>
                        <li>• Calculus - Strong understanding, ready for advanced problems</li>
                        <li>• Inorganic Chemistry - Good recall of concepts</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <h4 className="font-medium text-blue-800 mb-1">Study Tips</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Try spaced repetition for Biology concepts</li>
                        <li>• Take more timed practice tests for Mathematics</li>
                        <li>• Create more flashcards for Chemistry reactions</li>
                        <li>• Consider joining the Physics group study session</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="personality">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personality Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Personality Type</h4>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-purple-100 text-purple-800">{mockPersonalityType}</Badge>
                      <span className="text-sm text-gray-500">Based on onboarding assessment</span>
                    </div>
                    
                    <div className="mt-4 text-sm">
                      <p className="mb-2">As a <strong>Strategic Thinker</strong>, {student.name} tends to:</p>
                      <ul className="space-y-1 list-disc pl-5">
                        <li>Plan ahead and organize study material methodically</li>
                        <li>Enjoy analytical problem-solving and logical reasoning</li>
                        <li>Prefer structured learning environments</li>
                        <li>Benefit from seeing the big picture before details</li>
                        <li>Learn best through conceptual understanding</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Learning Style</h4>
                    <div className="flex gap-2 flex-wrap">
                      <Badge className="bg-blue-100 text-blue-800">Visual</Badge>
                      <Badge className="bg-gray-100 text-gray-800">Reading/Writing</Badge>
                    </div>
                    
                    <div className="mt-4 text-sm">
                      <p>Recommended learning methods:</p>
                      <ul className="space-y-1 list-disc pl-5 mt-1">
                        <li>Diagrams, charts, and visual representations</li>
                        <li>Written notes and text-based materials</li>
                        <li>Mind maps and visual organizers</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Emotional Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Current Mood</h4>
                    <Badge className={`${getMoodColor(mockMoodData.current)} text-sm px-3 py-1`}>
                      {mockMoodData.current}
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Mood History</h4>
                    <div className="space-y-2">
                      {mockMoodData.history.map((entry, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">{entry.date}</span>
                          <Badge className={getMoodColor(entry.mood)}>
                            {entry.mood}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Stress Management</h4>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-800">
                        Student shows moderate stress levels before exams. Responds well to break reminders and 
                        benefits from guided meditation exercises.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Interests & Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Areas of Interest</h4>
                      <div className="flex flex-wrap gap-1.5">
                        <Badge variant="outline">Physics</Badge>
                        <Badge variant="outline">Astronomy</Badge>
                        <Badge variant="outline">Robotics</Badge>
                        <Badge variant="outline">AI/ML</Badge>
                        <Badge variant="outline">Mathematics</Badge>
                        <Badge variant="outline">Computer Science</Badge>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Career Aspirations</h4>
                        <p className="text-sm">Interested in pursuing Engineering at a top-tier institution, 
                        with a focus on either Computer Science or Aerospace Engineering.</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Personal Goals</h4>
                      <ul className="space-y-2">
                        <li className="text-sm flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-green-600"></div>
                          </div>
                          Score above 95% in the final examination
                        </li>
                        <li className="text-sm flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-green-600"></div>
                          </div>
                          Qualify for the national-level science olympiad
                        </li>
                        <li className="text-sm flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-green-600"></div>
                          </div>
                          Complete an independent research project
                        </li>
                        <li className="text-sm flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-green-600"></div>
                          </div>
                          Improve time management skills during exams
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="engagement">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <Card className="md:col-span-8">
                <CardHeader>
                  <CardTitle>Engagement Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="text-sm text-gray-500">Study Streak</div>
                      <div className="text-xl font-bold">{mockEngagementData.studyStreak} days</div>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="text-sm text-gray-500">Quizzes</div>
                      <div className="text-xl font-bold">{mockEngagementData.quizzesCompleted}</div>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="text-sm text-gray-500">Flashcards</div>
                      <div className="text-xl font-bold">{mockEngagementData.flashcardsCreated}</div>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="text-sm text-gray-500">Questions</div>
                      <div className="text-xl font-bold">{mockEngagementData.questionsAnswered}</div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-3">Last Week Activity</h4>
                    <div className="h-40 bg-muted/50 rounded-md flex items-end justify-between px-4 pb-4">
                      {mockEngagementData.lastWeekActivity.map((hours, i) => (
                        <div 
                          key={i} 
                          className="bg-primary w-8 rounded-t-sm" 
                          style={{height: `${(hours / 6) * 100}%`}}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-600">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                    <div className="text-xs text-gray-500 text-center mt-1">Study hours per day</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-4">
                <CardHeader>
                  <CardTitle>Engagement Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative h-32 w-32 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="h-full w-full">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="10"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="10"
                          strokeDasharray="251.2"
                          strokeDashoffset={251.2 - (251.2 * mockEngagementData.engagementScore) / 100}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute">
                        <span className="text-3xl font-bold">{mockEngagementData.engagementScore}</span>
                        <span className="text-lg">%</span>
                      </div>
                    </div>
                    
                    <div className="text-center mt-4 space-y-1">
                      <p className="text-sm font-medium">Engagement Level</p>
                      <Badge className="bg-green-100 text-green-800">High</Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        Top 15% compared to peers
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-6">
                <CardHeader>
                  <CardTitle>Feature Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Flashcards</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-1.5" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Practice Tests</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <Progress value={78} className="h-1.5" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Study Plan</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-1.5" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>AI Tutor</span>
                        <span className="font-medium">63%</span>
                      </div>
                      <Progress value={63} className="h-1.5" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Feel Good Corner</span>
                        <span className="font-medium">42%</span>
                      </div>
                      <Progress value={42} className="h-1.5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-6">
                <CardHeader>
                  <CardTitle>Time Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Time Distribution</h4>
                      <div className="flex h-4 rounded-full overflow-hidden">
                        <div className="bg-blue-500 w-[35%]" title="Physics: 35%"></div>
                        <div className="bg-green-500 w-[25%]" title="Chemistry: 25%"></div>
                        <div className="bg-purple-500 w-[30%]" title="Mathematics: 30%"></div>
                        <div className="bg-amber-500 w-[10%]" title="Biology: 10%"></div>
                      </div>
                      <div className="flex text-xs mt-2 justify-between px-1">
                        <span>Physics (35%)</span>
                        <span>Chemistry (25%)</span>
                        <span>Math (30%)</span>
                        <span>Bio (10%)</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Activity by Time of Day</h4>
                      <div className="flex items-end h-24 gap-1">
                        {Array.from({ length: 24 }).map((_, i) => {
                          // Generate a realistic height based on time of day
                          // Morning: moderate, afternoon: high, evening: highest, night: low
                          let height;
                          if (i < 6) height = Math.random() * 10 + 5; // Night (low)
                          else if (i < 12) height = Math.random() * 20 + 30; // Morning (moderate)
                          else if (i < 18) height = Math.random() * 20 + 50; // Afternoon (high)
                          else height = Math.random() * 20 + 70; // Evening (highest)
                          
                          return (
                            <div
                              key={i}
                              className="flex-1 bg-primary/70 rounded-t"
                              style={{ height: `${height}%` }}
                              title={`${i}:00 - ${i + 1}:00`}
                            ></div>
                          );
                        })}
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>12 AM</span>
                        <span>6 AM</span>
                        <span>12 PM</span>
                        <span>6 PM</span>
                        <span>12 AM</span>
                      </div>
                      <div className="text-xs text-center text-gray-500 mt-1">Hours of the day</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="schedule">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Study Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="border rounded-md"
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Schedule for {formatDate(selectedDate || new Date())}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockScheduleForSelectedDay.map((item, index) => (
                      <div 
                        key={index} 
                        className={`p-3 rounded-lg border ${
                          item.completed 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{item.subject}: {item.topic}</h4>
                            <div className="text-sm text-gray-500">{item.time}</div>
                          </div>
                          {item.completed && (
                            <Badge className="bg-green-100 text-green-800">Completed</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {mockScheduleForSelectedDay.length === 0 && (
                      <div className="text-center py-8">
                        <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No sessions scheduled</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          No study sessions are scheduled for this day.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Weekly Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 7 }).map((_, dayIndex) => {
                      const day = new Date();
                      day.setDate(day.getDate() - day.getDay() + dayIndex);
                      const isToday = new Date().toDateString() === day.toDateString();
                      
                      return (
                        <div 
                          key={dayIndex}
                          className={`p-2 rounded-lg border ${
                            isToday ? 'border-primary bg-primary/10' : 'border-gray-200'
                          }`}
                        >
                          <div className={`text-center font-medium ${isToday ? 'text-primary' : ''}`}>
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayIndex]}
                          </div>
                          <div className="text-center text-xs text-gray-500">
                            {day.getDate()}
                          </div>
                          
                          <div className="mt-2 space-y-1">
                            {/* Generate random study blocks */}
                            {Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map((_, i) => (
                              <div 
                                key={i}
                                className="bg-blue-100 text-blue-800 p-1 text-xs rounded truncate"
                                title={['Physics', 'Chemistry', 'Mathematics', 'Biology'][Math.floor(Math.random() * 4)]}
                              >
                                {['Physics', 'Chemistry', 'Mathematics', 'Biology'][Math.floor(Math.random() * 4)]}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default StudentProfileModal;
