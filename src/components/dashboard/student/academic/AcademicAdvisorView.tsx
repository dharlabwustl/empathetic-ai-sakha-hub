
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Clock, CalendarDays, Users, Target, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { StudyPlan, StudyPlanSubject } from '@/types/user/studyPlan';

const AcademicAdvisorView = () => {
  const [activeTab, setActiveTab] = React.useState('plans');
  const navigate = useNavigate();

  // Mock study plans
  const studyPlans: StudyPlan[] = [
    {
      id: "plan1",
      title: "NEET 2024 Preparation",
      examGoal: "NEET",
      examDate: "2024-05-15",
      status: "active",
      subjects: [
        {
          id: "subject1",
          name: "Physics",
          hoursPerWeek: 10,
          priority: "high",
          proficiency: "medium",
          completed: false,
          status: "in-progress",
          difficulty: "medium"
        },
        {
          id: "subject2",
          name: "Chemistry",
          hoursPerWeek: 8,
          priority: "medium",
          proficiency: "weak",
          completed: false,
          status: "pending",
          difficulty: "easy"
        },
        {
          id: "subject3",
          name: "Biology",
          hoursPerWeek: 12,
          priority: "high",
          proficiency: "medium",
          completed: false,
          status: "completed",
          difficulty: "hard"
        }
      ],
      studyHoursPerDay: 6,
      preferredStudyTime: "morning",
      learningPace: "moderate",
      createdAt: "2023-07-10",
      progressPercent: 45
    },
    {
      id: "plan2",
      title: "JEE Advanced",
      examGoal: "JEE",
      examDate: "2024-06-10",
      status: "pending",
      subjects: [
        {
          id: "subject4",
          name: "Physics",
          hoursPerWeek: 12,
          priority: "high",
          proficiency: "weak",
          completed: false,
          status: "pending",
          difficulty: "hard"
        },
        {
          id: "subject5",
          name: "Chemistry",
          hoursPerWeek: 10,
          priority: "medium",
          proficiency: "medium",
          completed: false,
          status: "in-progress",
          difficulty: "medium"
        },
        {
          id: "subject6",
          name: "Mathematics",
          hoursPerWeek: 14,
          priority: "low",
          proficiency: "weak",
          completed: false,
          status: "pending",
          difficulty: "hard"
        }
      ],
      studyHoursPerDay: 8,
      preferredStudyTime: "evening",
      learningPace: "fast",
      createdAt: "2023-08-05",
      progressPercent: 15
    },
    {
      id: "plan3",
      title: "UPSC Pre",
      examGoal: "UPSC",
      examDate: "2023-06-15",
      status: "completed",
      subjects: [
        {
          id: "subject7",
          name: "History",
          hoursPerWeek: 8,
          priority: "high",
          proficiency: "strong",
          completed: true,
          status: "completed",
          difficulty: "medium"
        },
        {
          id: "subject8",
          name: "Geography",
          hoursPerWeek: 6,
          priority: "high",
          proficiency: "strong",
          completed: true,
          status: "completed",
          difficulty: "easy"
        },
        {
          id: "subject9",
          name: "Current Affairs",
          hoursPerWeek: 10,
          priority: "medium",
          proficiency: "medium",
          completed: true,
          status: "in-progress",
          difficulty: "hard"
        }
      ],
      studyHoursPerDay: 7,
      preferredStudyTime: "afternoon",
      learningPace: "moderate",
      createdAt: "2022-09-10",
      progressPercent: 100
    }
  ];

  const studySessions = [
    {
      id: "session1",
      subject: "Physics",
      topic: "Mechanics",
      date: "2023-09-15",
      startTime: "09:00",
      endTime: "11:00",
      completed: true
    },
    {
      id: "session2",
      subject: "Chemistry",
      topic: "Organic Chemistry",
      date: "2023-09-15",
      startTime: "14:00",
      endTime: "16:00",
      completed: false
    },
    {
      id: "session3",
      subject: "Biology",
      topic: "Human Physiology",
      date: "2023-09-16",
      startTime: "10:00",
      endTime: "12:00",
      completed: false
    }
  ];

  return (
    <div className="container max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Academic Advisor</h1>
          <p className="text-muted-foreground">Manage your study plans and academic progress</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Study Plan
        </Button>
      </div>

      <Tabs defaultValue="plans" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="plans">Study Plans</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-4">
          {studyPlans.map(plan => (
            <Card key={plan.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle>{plan.title}</CardTitle>
                  <Badge className={
                    plan.status === 'active' ? 'bg-green-100 text-green-800' : 
                    plan.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }>
                    {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center text-sm mb-1">
                      <div>
                        <span className="mr-4">Goal: {plan.examGoal}</span>
                        <span>Exam Date: {new Date(plan.examDate).toLocaleDateString()}</span>
                      </div>
                      <span>Progress: {plan.progressPercent}%</span>
                    </div>
                    <Progress value={plan.progressPercent} className="h-2" />
                  </div>

                  {/* Subject list */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {plan.subjects.slice(0, 3).map(subject => (
                      <div key={subject.id} className="border rounded-md p-3">
                        <div className="flex justify-between mb-2">
                          <h3 className="font-medium">{subject.name}</h3>
                          <Badge variant="outline" className="capitalize">
                            {subject.priority}
                          </Badge>
                        </div>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span>Hours/Week</span>
                            <span>{subject.hoursPerWeek}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Proficiency</span>
                            <span className="capitalize">{subject.proficiency}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Status</span>
                            <span className="capitalize">{subject.status?.replace('-', ' ')}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* View plan button */}
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      className="flex items-center"
                      onClick={() => navigate(`/dashboard/student/study-plan/${plan.id}`)}
                    >
                      View Full Plan
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Study Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studySessions.map(session => (
                  <div key={session.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div>
                      <h3 className="font-medium">{session.subject}: {session.topic}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CalendarDays className="mr-1 h-4 w-4" />
                        <span>{session.date}</span>
                        <Clock className="ml-3 mr-1 h-4 w-4" />
                        <span>{session.startTime} - {session.endTime}</span>
                      </div>
                    </div>
                    <Button variant={session.completed ? "outline" : "default"} size="sm">
                      {session.completed ? "Completed" : "Start Session"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Content for progress tab will go here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AcademicAdvisorView;
