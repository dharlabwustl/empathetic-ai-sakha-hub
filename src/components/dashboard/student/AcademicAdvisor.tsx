
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Clock, CalendarDays, Users, Target, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { StudyPlan, StudyPlanSubject, StudyPlanTopic } from '@/types/user/studyPlan';

const AcademicAdvisor = () => {
  const [activeTab, setActiveTab] = useState('plans');
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
          color: "#3b82f6",
          proficiency: "medium",
          priority: "high",
          hoursPerWeek: 10,
          completed: false,
          status: "in-progress",
          difficulty: "medium"
        },
        {
          id: "subject2",
          name: "Chemistry",
          color: "#10b981",
          proficiency: "weak",
          priority: "high",
          hoursPerWeek: 12,
          completed: false,
          status: "in-progress",
          difficulty: "hard"
        },
        {
          id: "subject3",
          name: "Biology",
          color: "#f59e0b",
          proficiency: "strong",
          priority: "medium",
          hoursPerWeek: 8,
          completed: false,
          status: "in-progress",
          difficulty: "medium"
        }
      ],
      studyHoursPerDay: 6,
      preferredStudyTime: "morning",
      learningPace: "moderate",
      createdAt: "2023-07-10",
      progressPercent: 45
    }
  ];

  // Mock completed topics for the plan
  const completedTopics: StudyPlanTopic[] = [
    {
      id: "topic1",
      name: "Mechanics: Laws of Motion",
      difficulty: "medium",
      completed: true,
      status: "completed",
      priority: "high"
    },
    {
      id: "topic2",
      name: "Organic Chemistry: Hydrocarbons",
      difficulty: "medium",
      completed: true,
      status: "completed",
      priority: "medium"
    },
    {
      id: "topic3",
      name: "Human Physiology: Digestive System",
      difficulty: "hard",
      completed: true,
      status: "completed",
      priority: "high"
    }
  ];

  // Mock study sessions
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

  // Mock study groups
  const studyGroups = [
    {
      id: "group1",
      name: "NEET Physics Champions",
      members: 24,
      subject: "Physics",
      nextSession: "2023-09-17T18:00:00"
    },
    {
      id: "group2",
      name: "Bio Study Buddies",
      members: 16,
      subject: "Biology",
      nextSession: "2023-09-18T17:00:00"
    }
  ];

  const handleCreateStudyPlan = () => {
    navigate('/dashboard/student/study-plan/create');
  };

  const handleViewStudyPlan = (planId: string) => {
    navigate(`/dashboard/student/study-plan/${planId}`);
  };

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Academic Advisor</h1>
          <p className="text-muted-foreground">Manage your study plans and academic progress</p>
        </div>
        <Button onClick={handleCreateStudyPlan}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Study Plan
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="plans">Study Plans</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="groups">Study Groups</TabsTrigger>
          <TabsTrigger value="goals">Goals & Targets</TabsTrigger>
        </TabsList>

        {/* Study Plans Tab */}
        <TabsContent value="plans" className="space-y-4">
          {studyPlans.length > 0 ? (
            studyPlans.map(plan => (
              <Card key={plan.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>{plan.title}</CardTitle>
                    <Badge className={plan.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Progress</span>
                        <span>{plan.progressPercent}%</span>
                      </div>
                      <Progress value={plan.progressPercent} className="h-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {plan.subjects.map(subject => (
                        <div key={subject.id} className="border rounded-md p-3">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-medium">{subject.name}</h3>
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: subject.color }}
                            ></div>
                          </div>
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Hours/Week</span>
                              <span>{subject.hoursPerWeek}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Priority</span>
                              <Badge variant="outline" className="capitalize">
                                {subject.priority}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Proficiency</span>
                              <Badge variant="outline" className="capitalize">
                                {subject.proficiency}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <h3 className="font-medium mb-2">Recently Completed Topics</h3>
                      <div className="space-y-2">
                        {completedTopics.map(topic => (
                          <div key={topic.id} className="flex justify-between items-center bg-gray-50 rounded-md p-2">
                            <span>{topic.name}</span>
                            <Badge className="bg-green-100 text-green-800">Completed</Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button 
                        variant="outline" 
                        className="flex items-center"
                        onClick={() => handleViewStudyPlan(plan.id)}
                      >
                        View Full Plan
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-muted-foreground mb-4">You don't have any study plans yet</p>
                <Button onClick={handleCreateStudyPlan}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Your First Study Plan
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Upcoming Study Sessions</span>
                <Button variant="outline" size="sm">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  View Calendar
                </Button>
              </CardTitle>
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

        {/* Study Groups Tab */}
        <TabsContent value="groups">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Your Study Groups</span>
                <Button variant="outline" size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Join New Group
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studyGroups.map(group => (
                  <div key={group.id} className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">{group.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subject</span>
                        <span>{group.subject}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Members</span>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{group.members}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Next Session</span>
                        <span>{new Date(group.nextSession).toLocaleString()}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4" variant="outline">View Group</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goals & Targets Tab */}
        <TabsContent value="goals">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Academic Goals</span>
                <Button variant="outline" size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Goal
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">NEET 2024 Exam</h3>
                      <p className="text-sm text-muted-foreground">Target: 650+ Score</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Long-term</Badge>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    <span>Target Date: May 15, 2024</span>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">Complete Physics Mock Tests</h3>
                      <p className="text-sm text-muted-foreground">Target: 10 full-length tests</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Short-term</Badge>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>3/10</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    <span>Target Date: October 15, 2023</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AcademicAdvisor;
