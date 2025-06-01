
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Target, TrendingUp, BookOpen, AlertTriangle } from 'lucide-react';
import EnhancedTimeAllocation from './EnhancedTimeAllocation';
import StudyTimeline from './StudyTimeline';
import SubjectProgress from './SubjectProgress';
import { useToast } from '@/hooks/use-toast';

const EnhancedStudyPlanPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  
  // NEET 2026 data
  const examDate = new Date('2026-05-03');
  const daysLeft = Math.ceil((examDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  const [studyPlan, setStudyPlan] = useState({
    id: 'neet-2026',
    name: 'NEET 2026 Preparation',
    exam: 'NEET',
    examDate: '2026-05-03',
    totalHours: 2800,
    completedHours: 420,
    weeklyTarget: 40,
    subjects: [
      {
        id: 'physics',
        name: 'Physics',
        color: '#8B5CF6',
        hoursPerWeek: 15,
        weeklyHours: 15,
        progress: 35,
        priority: 'high' as const,
        proficiency: 'medium' as const,
        completed: false,
        isWeakSubject: false,
        topics: [
          { id: 'mechanics', name: 'Mechanics', completed: false, status: 'in-progress' as const, hoursAllocated: 120, progressPercent: 60 },
          { id: 'thermodynamics', name: 'Thermodynamics', completed: false, status: 'not-started' as const, hoursAllocated: 80, progressPercent: 0 },
          { id: 'waves', name: 'Waves & Optics', completed: false, status: 'not-started' as const, hoursAllocated: 100, progressPercent: 0 },
          { id: 'electromagnetism', name: 'Electromagnetism', completed: false, status: 'not-started' as const, hoursAllocated: 140, progressPercent: 0 },
          { id: 'modern-physics', name: 'Modern Physics', completed: false, status: 'not-started' as const, hoursAllocated: 90, progressPercent: 0 }
        ]
      },
      {
        id: 'chemistry',
        name: 'Chemistry',
        color: '#10B981',
        hoursPerWeek: 12,
        weeklyHours: 12,
        progress: 28,
        priority: 'high' as const,
        proficiency: 'weak' as const,
        completed: false,
        isWeakSubject: true,
        topics: [
          { id: 'physical-chem', name: 'Physical Chemistry', completed: false, status: 'in-progress' as const, hoursAllocated: 160, progressPercent: 45 },
          { id: 'organic-chem', name: 'Organic Chemistry', completed: false, status: 'not-started' as const, hoursAllocated: 180, progressPercent: 0 },
          { id: 'inorganic-chem', name: 'Inorganic Chemistry', completed: false, status: 'not-started' as const, hoursAllocated: 140, progressPercent: 0 }
        ]
      },
      {
        id: 'biology',
        name: 'Biology',
        color: '#F59E0B',
        hoursPerWeek: 13,
        weeklyHours: 13,
        progress: 52,
        priority: 'medium' as const,
        proficiency: 'strong' as const,
        completed: false,
        isWeakSubject: false,
        topics: [
          { id: 'botany', name: 'Botany', completed: true, status: 'completed' as const, hoursAllocated: 200, progressPercent: 100 },
          { id: 'zoology', name: 'Zoology', completed: false, status: 'in-progress' as const, hoursAllocated: 220, progressPercent: 65 },
          { id: 'human-physiology', name: 'Human Physiology', completed: false, status: 'not-started' as const, hoursAllocated: 160, progressPercent: 0 }
        ]
      }
    ]
  });

  const overallProgress = Math.round((studyPlan.completedHours / studyPlan.totalHours) * 100);
  const weakSubjects = studyPlan.subjects.filter(s => s.isWeakSubject);

  const handleTimeAllocationSave = (allocations: any[]) => {
    toast({
      title: "Time allocation updated",
      description: "Your NEET 2026 study plan has been optimized.",
    });
  };

  return (
    <SharedPageLayout
      title="NEET 2026 Study Plan"
      subtitle={`Comprehensive preparation strategy • ${daysLeft} days remaining`}
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Overall Progress</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{overallProgress}%</div>
              <Progress value={overallProgress} className="mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Hours Completed</span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {studyPlan.completedHours}/{studyPlan.totalHours}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {studyPlan.weeklyTarget}h/week target
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium">Days Left</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">{daysLeft}</div>
              <div className="text-xs text-muted-foreground mt-1">Until NEET 2026</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium">Weak Subjects</span>
              </div>
              <div className="text-2xl font-bold text-orange-600">{weakSubjects.length}</div>
              <div className="text-xs text-muted-foreground mt-1">Need attention</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="allocation">Time Allocation</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {studyPlan.subjects.map((subject) => (
                <Card key={subject.id} className="border-l-4" style={{ borderLeftColor: subject.color }}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <div className="flex gap-2">
                        {subject.isWeakSubject && (
                          <Badge variant="destructive" className="text-xs">Weak</Badge>
                        )}
                        <Badge variant={subject.proficiency === 'strong' ? 'default' : 'secondary'} className="text-xs">
                          {subject.proficiency}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{subject.progress}%</span>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                      
                      <div className="flex justify-between text-sm">
                        <span>Weekly Hours</span>
                        <span className="font-medium">{subject.weeklyHours}h</span>
                      </div>
                      
                      <div className="text-sm">
                        <div className="font-medium mb-1">Topics:</div>
                        <div className="space-y-1">
                          {subject.topics?.slice(0, 3).map((topic) => (
                            <div key={topic.id} className="flex justify-between items-center">
                              <span className="truncate">{topic.name}</span>
                              <Badge 
                                variant={topic.status === 'completed' ? 'default' : 
                                        topic.status === 'in-progress' ? 'secondary' : 'outline'} 
                                className="text-xs ml-2"
                              >
                                {topic.progressPercent}%
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="allocation">
            <EnhancedTimeAllocation
              subjects={studyPlan.subjects}
              weeklyTotal={studyPlan.weeklyTarget}
              onSave={handleTimeAllocationSave}
            />
          </TabsContent>
          
          <TabsContent value="timeline">
            <StudyTimeline subjects={studyPlan.subjects} examDate={studyPlan.examDate} />
          </TabsContent>
          
          <TabsContent value="progress">
            <SubjectProgress subjects={studyPlan.subjects} />
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default EnhancedStudyPlanPage;
