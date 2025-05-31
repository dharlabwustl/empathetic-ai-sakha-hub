
import React, { useState, useEffect } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Target, BookOpen, TrendingUp, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { StudyPlanSubject, StudyPlanTopic } from '@/types/user/studyPlan';

const EnhancedStudyPlanPage = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // NEET 2026 specific data
  const examDate = new Date('2026-05-03');
  const daysLeft = Math.ceil((examDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  const [subjects, setSubjects] = useState<StudyPlanSubject[]>([
    {
      id: 'physics',
      name: 'Physics',
      color: '#8B5CF6',
      hoursPerWeek: 12,
      weeklyHours: 12,
      progress: 65,
      priority: 'high',
      proficiency: 'medium',
      completed: false,
      status: 'in-progress',
      isWeakSubject: false,
      topics: [
        { id: 'p1', name: 'Mechanics', completed: true, estimatedHours: 40, status: 'completed', difficulty: 'medium' },
        { id: 'p2', name: 'Thermodynamics', completed: false, estimatedHours: 35, status: 'in-progress', difficulty: 'medium' },
        { id: 'p3', name: 'Electromagnetism', completed: false, estimatedHours: 45, status: 'pending', difficulty: 'hard' },
        { id: 'p4', name: 'Modern Physics', completed: false, estimatedHours: 30, status: 'pending', difficulty: 'hard' },
        { id: 'p5', name: 'Optics', completed: false, estimatedHours: 25, status: 'pending', difficulty: 'medium' }
      ]
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      color: '#10B981',
      hoursPerWeek: 14,
      weeklyHours: 14,
      progress: 45,
      priority: 'high',
      proficiency: 'weak',
      completed: false,
      status: 'in-progress',
      isWeakSubject: true,
      topics: [
        { id: 'c1', name: 'Physical Chemistry', completed: false, estimatedHours: 50, status: 'in-progress', difficulty: 'hard' },
        { id: 'c2', name: 'Organic Chemistry', completed: false, estimatedHours: 55, status: 'pending', difficulty: 'hard' },
        { id: 'c3', name: 'Inorganic Chemistry', completed: false, estimatedHours: 40, status: 'pending', difficulty: 'medium' }
      ]
    },
    {
      id: 'biology',
      name: 'Biology',
      color: '#F59E0B',
      hoursPerWeek: 14,
      weeklyHours: 14,
      progress: 70,
      priority: 'medium',
      proficiency: 'strong',
      completed: false,
      status: 'in-progress',
      isWeakSubject: false,
      topics: [
        { id: 'b1', name: 'Cell Biology', completed: true, estimatedHours: 30, status: 'completed', difficulty: 'medium' },
        { id: 'b2', name: 'Genetics', completed: false, estimatedHours: 35, status: 'in-progress', difficulty: 'medium' },
        { id: 'b3', name: 'Ecology', completed: false, estimatedHours: 25, status: 'pending', difficulty: 'easy' },
        { id: 'b4', name: 'Human Physiology', completed: false, estimatedHours: 40, status: 'pending', difficulty: 'hard' }
      ]
    }
  ]);

  const totalWeeklyHours = subjects.reduce((sum, subject) => sum + subject.hoursPerWeek, 0);

  const handleTimeAllocationChange = (subjectId: string, newHours: number[]) => {
    setSubjects(prev => prev.map(subject => 
      subject.id === subjectId 
        ? { ...subject, hoursPerWeek: newHours[0], weeklyHours: newHours[0] }
        : subject
    ));
  };

  const saveTimeAllocations = () => {
    localStorage.setItem('neet_study_plan_subjects', JSON.stringify(subjects));
    toast({
      title: "Time allocations saved",
      description: "Your NEET 2026 study plan has been updated successfully.",
    });
  };

  const getSubjectStatusBadge = (subject: StudyPlanSubject) => {
    if (subject.isWeakSubject) {
      return <Badge variant="destructive" className="text-xs">Needs Focus</Badge>;
    }
    if (subject.proficiency === 'strong') {
      return <Badge variant="default" className="text-xs bg-green-600">Strong</Badge>;
    }
    return <Badge variant="secondary" className="text-xs">Medium</Badge>;
  };

  const getTopicIcon = (topic: StudyPlanTopic) => {
    switch (topic.status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      case 'pending': return '⏳';
      default: return '📚';
    }
  };

  return (
    <SharedPageLayout 
      title="NEET 2026 Study Plan"
      subtitle={`Comprehensive preparation strategy • ${daysLeft} days remaining`}
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Exam Overview Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              NEET 2026 Exam Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{daysLeft}</div>
                <div className="text-sm text-gray-600">Days Left</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">May 3, 2026</div>
                <div className="text-sm text-gray-600">Exam Date</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{totalWeeklyHours}h</div>
                <div className="text-sm text-gray-600">Weekly Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">60%</div>
                <div className="text-sm text-gray-600">Overall Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="allocation" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="allocation">Time Allocation</TabsTrigger>
            <TabsTrigger value="timeline">Detailed Timeline</TabsTrigger>
            <TabsTrigger value="topics">Subject Topics</TabsTrigger>
          </TabsList>

          <TabsContent value="allocation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Weekly Time Allocation
                  </span>
                  <Button onClick={saveTimeAllocations}>Save Changes</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: subject.color }}
                          />
                          <span className="font-medium">{subject.name}</span>
                          {getSubjectStatusBadge(subject)}
                        </div>
                        <div className="text-sm font-medium">
                          {subject.hoursPerWeek} hours/week
                        </div>
                      </div>
                      <Slider
                        value={[subject.hoursPerWeek]}
                        min={5}
                        max={25}
                        step={1}
                        onValueChange={(value) => handleTimeAllocationChange(subject.id, value)}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>5h</span>
                        <span>{Math.round((subject.hoursPerWeek / totalWeeklyHours) * 100)}% of total time</span>
                        <span>25h</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Detailed Study Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: subject.color }}
                          />
                          {subject.name}
                        </h3>
                        <div className="text-sm text-gray-600">
                          Progress: {subject.progress}%
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            backgroundColor: subject.color, 
                            width: `${subject.progress}%` 
                          }}
                        />
                      </div>
                      <div className="text-sm text-gray-600">
                        Target: Complete by {new Date(Date.now() + (100 - subject.progress) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="topics" className="space-y-4">
            {subjects.map((subject) => (
              <Card key={subject.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: subject.color }}
                    />
                    {subject.name} Topics
                    {subject.isWeakSubject && (
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {subject.topics?.map((topic) => (
                      <div key={topic.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{getTopicIcon(topic)}</span>
                          <div>
                            <div className="font-medium">{topic.name}</div>
                            <div className="text-sm text-gray-600">
                              Estimated: {topic.estimatedHours}h • {topic.difficulty} difficulty
                            </div>
                          </div>
                        </div>
                        <Badge 
                          variant={topic.status === 'completed' ? 'default' : 'secondary'}
                          className="capitalize"
                        >
                          {topic.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default EnhancedStudyPlanPage;
