
import React, { useState, useEffect } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WeeklySchedule from './WeeklySchedule';
import StudyGoals from './StudyGoals';
import StudyTimeAllocation from './StudyTimeAllocation';
import { useToast } from '@/hooks/use-toast';
import { StudyPlanSubject } from '@/types/user/studyPlan';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Clock, Calendar, BookOpen, TrendingUp, AlertTriangle, Brain, Timer } from 'lucide-react';

const StudyPlanPage = () => {
  const { toast } = useToast();
  
  // NEET 2026 specific subjects with enhanced data
  const [subjects, setSubjects] = useState<StudyPlanSubject[]>([
    {
      id: 'physics',
      name: 'Physics',
      color: '#8B5CF6',
      hoursPerWeek: 15,
      weeklyHours: 15,
      progress: 45,
      priority: 'high',
      proficiency: 'medium',
      completed: false,
      isWeakSubject: false,
      topics: [
        { id: 'mechanics', name: 'Mechanics', completed: false, status: 'in-progress', hoursAllocated: 4, progressPercent: 60 },
        { id: 'thermodynamics', name: 'Thermodynamics', completed: false, status: 'not-started', hoursAllocated: 3, progressPercent: 0 },
        { id: 'electromagnetism', name: 'Electromagnetism', completed: false, status: 'not-started', hoursAllocated: 4, progressPercent: 0 },
        { id: 'optics', name: 'Optics', completed: false, status: 'not-started', hoursAllocated: 2, progressPercent: 0 },
        { id: 'modern-physics', name: 'Modern Physics', completed: false, status: 'not-started', hoursAllocated: 2, progressPercent: 0 }
      ]
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      color: '#10B981',
      hoursPerWeek: 12,
      weeklyHours: 12,
      progress: 35,
      priority: 'high',
      proficiency: 'weak',
      completed: false,
      isWeakSubject: true,
      topics: [
        { id: 'physical-chemistry', name: 'Physical Chemistry', completed: false, status: 'in-progress', hoursAllocated: 4, progressPercent: 40 },
        { id: 'organic-chemistry', name: 'Organic Chemistry', completed: false, status: 'not-started', hoursAllocated: 4, progressPercent: 0 },
        { id: 'inorganic-chemistry', name: 'Inorganic Chemistry', completed: false, status: 'not-started', hoursAllocated: 4, progressPercent: 0 }
      ]
    },
    {
      id: 'biology',
      name: 'Biology',
      color: '#F59E0B',
      hoursPerWeek: 13,
      weeklyHours: 13,
      progress: 60,
      priority: 'medium',
      proficiency: 'strong',
      completed: false,
      isWeakSubject: false,
      topics: [
        { id: 'botany', name: 'Botany', completed: true, status: 'completed', hoursAllocated: 6, progressPercent: 100 },
        { id: 'zoology', name: 'Zoology', completed: false, status: 'in-progress', hoursAllocated: 4, progressPercent: 70 },
        { id: 'human-physiology', name: 'Human Physiology', completed: false, status: 'not-started', hoursAllocated: 3, progressPercent: 0 }
      ]
    }
  ]);

  // Load saved data from localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem('neet_study_plan');
    if (savedPlan) {
      try {
        const planData = JSON.parse(savedPlan);
        if (planData.subjects) {
          setSubjects(planData.subjects);
        }
      } catch (error) {
        console.error("Error loading saved study plan:", error);
      }
    }
  }, []);
  
  const handleSaveTimeAllocation = (allocations: StudyPlanSubject[]) => {
    setSubjects(allocations);
    
    toast({
      title: "Time allocation updated",
      description: "Your NEET 2026 study plan has been optimized based on your preferences.",
      variant: "default",
    });
    
    // Update localStorage with NEET 2026 data
    const neetPlanData = {
      exam: 'NEET 2026',
      examDate: '2026-05-03',
      subjects: allocations,
      lastUpdated: new Date().toISOString(),
      learningPace: 'medium',
      totalWeeklyHours: allocations.reduce((sum, s) => sum + s.hoursPerWeek, 0)
    };
    localStorage.setItem('neet_study_plan', JSON.stringify(neetPlanData));
    
    console.log("NEET 2026 time allocations saved:", allocations);
  };

  // NEET 2026 specific data
  const examDate = new Date('2026-05-03');
  const daysLeft = Math.ceil((examDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const totalWeeklyHours = subjects.reduce((sum, subject) => sum + subject.hoursPerWeek, 0);
  const weakSubjects = subjects.filter(s => s.isWeakSubject);
  const strongSubjects = subjects.filter(s => s.proficiency === 'strong');
  const averageProgress = Math.round(subjects.reduce((sum, s) => sum + s.progress, 0) / subjects.length);
  
  return (
    <SharedPageLayout
      title="NEET 2026 Study Plan"
      subtitle="Comprehensive preparation strategy for NEET 2026 - Physics, Chemistry & Biology"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      {/* NEET 2026 Overview Card */}
      <Card className="mb-6 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            NEET 2026 Exam Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <Calendar className="h-5 w-5 mx-auto mb-1 text-blue-600" />
              <div className="text-sm font-medium">Exam Date</div>
              <div className="text-lg font-bold text-blue-600">May 3, 2026</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <Clock className="h-5 w-5 mx-auto mb-1 text-green-600" />
              <div className="text-sm font-medium">Days Left</div>
              <div className="text-lg font-bold text-green-600">{daysLeft}</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <BookOpen className="h-5 w-5 mx-auto mb-1 text-purple-600" />
              <div className="text-sm font-medium">Weekly Hours</div>
              <div className="text-lg font-bold text-purple-600">{totalWeeklyHours}</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <TrendingUp className="h-5 w-5 mx-auto mb-1 text-orange-600" />
              <div className="text-sm font-medium">Avg Progress</div>
              <div className="text-lg font-bold text-orange-600">{averageProgress}%</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <AlertTriangle className="h-5 w-5 mx-auto mb-1 text-red-600" />
              <div className="text-sm font-medium">Weak Subjects</div>
              <div className="text-lg font-bold text-red-600">{weakSubjects.length}</div>
            </div>
          </div>
          
          {/* Subject Status Summary */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            {subjects.map((subject) => (
              <div key={subject.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: subject.color }}
                  />
                  <span className="font-medium">{subject.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{subject.progress}%</span>
                  {subject.isWeakSubject && (
                    <Badge variant="destructive" className="text-xs">Weak</Badge>
                  )}
                  {subject.proficiency === 'strong' && (
                    <Badge variant="default" className="text-xs bg-green-100 text-green-700">Strong</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="time-allocation" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="time-allocation">Time Allocation</TabsTrigger>
          <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="goals">Study Goals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="time-allocation">
          <StudyTimeAllocation
            weeklyTotal={totalWeeklyHours}
            subjects={subjects}
            onSave={handleSaveTimeAllocation}
          />
        </TabsContent>
        
        <TabsContent value="schedule">
          <WeeklySchedule />
        </TabsContent>
        
        <TabsContent value="goals">
          <StudyGoals />
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default StudyPlanPage;
