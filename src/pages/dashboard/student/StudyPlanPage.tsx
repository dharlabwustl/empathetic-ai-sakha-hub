
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Target, TrendingUp, BookOpen, Settings, Users, Timer } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { StudyPlanSubject } from '@/types/user/studyPlan';

const StudyPlanPage = () => {
  const [studyPlan, setStudyPlan] = useState({
    name: "NEET 2026 Preparation",
    examDate: "2026-05-03",
    totalWeeklyHours: 40,
    studyHoursPerDay: 6,
    learningPace: "medium",
    subjects: [
      {
        id: "physics",
        name: "Physics",
        color: "#3b82f6",
        hoursPerWeek: 14,
        weeklyHours: 14,
        progress: 35,
        priority: "high",
        proficiency: "medium",
        completed: false,
        isWeakSubject: false,
        topics: [
          { id: "mechanics", name: "Mechanics", hoursAllocated: 4, status: "in-progress", completed: false, progressPercent: 60, estimatedTime: 25, conceptsCount: 15 },
          { id: "thermodynamics", name: "Thermodynamics", hoursAllocated: 3, status: "not-started", completed: false, progressPercent: 0, estimatedTime: 20, conceptsCount: 12 },
          { id: "optics", name: "Optics", hoursAllocated: 3, status: "not-started", completed: false, progressPercent: 0, estimatedTime: 18, conceptsCount: 10 },
          { id: "modern-physics", name: "Modern Physics", hoursAllocated: 4, status: "not-started", completed: false, progressPercent: 0, estimatedTime: 30, conceptsCount: 18 }
        ]
      },
      {
        id: "chemistry",
        name: "Chemistry",
        color: "#10b981",
        hoursPerWeek: 13,
        weeklyHours: 13,
        progress: 25,
        priority: "high",
        proficiency: "weak",
        completed: false,
        isWeakSubject: true,
        topics: [
          { id: "organic", name: "Organic Chemistry", hoursAllocated: 5, status: "in-progress", completed: false, progressPercent: 40, estimatedTime: 35, conceptsCount: 25 },
          { id: "inorganic", name: "Inorganic Chemistry", hoursAllocated: 4, status: "not-started", completed: false, progressPercent: 0, estimatedTime: 25, conceptsCount: 20 },
          { id: "physical", name: "Physical Chemistry", hoursAllocated: 4, status: "not-started", completed: false, progressPercent: 0, estimatedTime: 28, conceptsCount: 18 }
        ]
      },
      {
        id: "biology",
        name: "Biology",
        color: "#8b5cf6",
        hoursPerWeek: 13,
        weeklyHours: 13,
        progress: 55,
        priority: "medium",
        proficiency: "strong",
        completed: false,
        isWeakSubject: false,
        topics: [
          { id: "botany", name: "Botany", hoursAllocated: 6, status: "completed", completed: true, progressPercent: 100, estimatedTime: 30, conceptsCount: 22 },
          { id: "zoology", name: "Zoology", hoursAllocated: 4, status: "in-progress", completed: false, progressPercent: 70, estimatedTime: 25, conceptsCount: 20 },
          { id: "genetics", name: "Genetics", hoursAllocated: 3, status: "not-started", completed: false, progressPercent: 0, estimatedTime: 20, conceptsCount: 15 }
        ]
      }
    ] as StudyPlanSubject[]
  });

  const [activeTab, setActiveTab] = useState("overview");

  const updateSubjectHours = (subjectId: string, newHours: number) => {
    setStudyPlan(prev => ({
      ...prev,
      subjects: prev.subjects.map(subject =>
        subject.id === subjectId 
          ? { ...subject, hoursPerWeek: newHours, weeklyHours: newHours }
          : subject
      )
    }));
  };

  const updateTopicHours = (subjectId: string, topicId: string, newHours: number) => {
    setStudyPlan(prev => ({
      ...prev,
      subjects: prev.subjects.map(subject =>
        subject.id === subjectId 
          ? {
              ...subject,
              topics: subject.topics?.map(topic =>
                topic.id === topicId 
                  ? { ...topic, hoursAllocated: newHours }
                  : topic
              )
            }
          : subject
      )
    }));
  };

  const daysLeft = Math.ceil((new Date(studyPlan.examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const totalProgress = Math.round(studyPlan.subjects.reduce((sum, subject) => sum + subject.progress, 0) / studyPlan.subjects.length);

  return (
    <SharedPageLayout
      title="Complete Study Plan"
      subtitle={`${studyPlan.name} • ${daysLeft} days remaining`}
    >
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overall Progress</p>
                  <p className="text-2xl font-bold">{totalProgress}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
              <Progress value={totalProgress} className="mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Weekly Hours</p>
                  <p className="text-2xl font-bold">{studyPlan.totalWeeklyHours}h</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Days Remaining</p>
                  <p className="text-2xl font-bold">{daysLeft}</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Daily Hours</p>
                  <p className="text-2xl font-bold">{studyPlan.studyHoursPerDay}h</p>
                </div>
                <Timer className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {studyPlan.subjects.map(subject => (
                <Card key={subject.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: subject.color }}
                        />
                        {subject.name}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Badge variant={subject.priority === 'high' ? 'destructive' : 'outline'}>
                          {subject.priority} priority
                        </Badge>
                        {subject.isWeakSubject && (
                          <Badge variant="secondary">Weak Subject</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">Progress</span>
                          <span className="text-sm font-medium">{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} />
                      </div>
                      
                      <div>
                        <Label className="text-sm">Weekly Hours: {subject.hoursPerWeek}h</Label>
                        <Slider
                          value={[subject.hoursPerWeek]}
                          onValueChange={(value) => updateSubjectHours(subject.id, value[0])}
                          max={20}
                          min={5}
                          step={1}
                          className="mt-2"
                        />
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Topics</h4>
                        {subject.topics?.map(topic => (
                          <div key={topic.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                            <div className="flex-1">
                              <span className="text-sm font-medium">{topic.name}</span>
                              <div className="flex items-center gap-2 mt-1">
                                <Progress value={topic.progressPercent || 0} className="flex-1 h-1" />
                                <span className="text-xs text-muted-foreground">{topic.progressPercent || 0}%</span>
                              </div>
                            </div>
                            <div className="ml-4 text-xs text-muted-foreground">
                              {topic.hoursAllocated}h
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="subjects" className="space-y-6">
            {studyPlan.subjects.map(subject => (
              <Card key={subject.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-6 h-6 rounded-full" 
                        style={{ backgroundColor: subject.color }}
                      />
                      <span>{subject.name}</span>
                      <Badge variant={subject.isWeakSubject ? 'destructive' : 'outline'}>
                        {subject.proficiency} proficiency
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {subject.hoursPerWeek}h/week
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Weekly Hours Allocation</Label>
                      <div className="flex items-center gap-4 mt-2">
                        <Slider
                          value={[subject.hoursPerWeek]}
                          onValueChange={(value) => updateSubjectHours(subject.id, value[0])}
                          max={25}
                          min={5}
                          step={1}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={subject.hoursPerWeek}
                          onChange={(e) => updateSubjectHours(subject.id, parseInt(e.target.value) || 5)}
                          className="w-20"
                          min={5}
                          max={25}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Topic Time Allocation</h4>
                      {subject.topics?.map(topic => (
                        <div key={topic.id} className="space-y-2 p-3 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{topic.name}</span>
                            <Badge variant={topic.status === 'completed' ? 'default' : 'outline'}>
                              {topic.status?.replace('-', ' ')}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                            <div>Est. Time: {topic.estimatedTime}h</div>
                            <div>Concepts: {topic.conceptsCount}</div>
                          </div>
                          
                          <div>
                            <Label className="text-sm">Allocated Hours: {topic.hoursAllocated}h</Label>
                            <Slider
                              value={[topic.hoursAllocated]}
                              onValueChange={(value) => updateTopicHours(subject.id, topic.id, value[0])}
                              max={15}
                              min={1}
                              step={0.5}
                              className="mt-1"
                            />
                          </div>
                          
                          <Progress value={topic.progressPercent || 0} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Study Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studyPlan.subjects.map(subject => (
                    <div key={subject.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{subject.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {subject.hoursPerWeek}h/week
                        </span>
                      </div>
                      <div className="space-y-1">
                        {subject.topics?.map(topic => (
                          <div key={topic.id} className="flex items-center gap-3 p-2 bg-muted/30 rounded">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: subject.color }} />
                            <span className="flex-1 text-sm">{topic.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {topic.hoursAllocated}h
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {Math.ceil(topic.hoursAllocated / (subject.hoursPerWeek / 7))} days
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Study Plan Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label>Daily Study Hours</Label>
                    <div className="flex items-center gap-4 mt-2">
                      <Slider
                        value={[studyPlan.studyHoursPerDay]}
                        onValueChange={(value) => setStudyPlan(prev => ({ ...prev, studyHoursPerDay: value[0] }))}
                        max={12}
                        min={3}
                        step={0.5}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-12">{studyPlan.studyHoursPerDay}h</span>
                    </div>
                  </div>

                  <div>
                    <Label>Learning Pace</Label>
                    <Select 
                      value={studyPlan.learningPace} 
                      onValueChange={(value) => setStudyPlan(prev => ({ ...prev, learningPace: value }))}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="slow">Slow & Steady</SelectItem>
                        <SelectItem value="medium">Medium Pace</SelectItem>
                        <SelectItem value="fast">Fast Track</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full">Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default StudyPlanPage;
