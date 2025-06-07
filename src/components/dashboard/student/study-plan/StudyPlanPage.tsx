
import React, { useState, useEffect } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Clock, 
  Calendar, 
  BookOpen, 
  TrendingUp, 
  AlertTriangle, 
  Brain, 
  Timer,
  User,
  BarChart3,
  Settings,
  FileText,
  Award,
  Lightbulb
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WeeklySchedule from './WeeklySchedule';
import StudyGoals from './StudyGoals';
import StudyTimeAllocation from './StudyTimeAllocation';
import { StudentProfileSection } from './sections/StudentProfileSection';
import { SubjectAnalysisSection } from './sections/SubjectAnalysisSection';
import { AdaptivePlanTable } from './sections/AdaptivePlanTable';
import { WeeklyMonthlyDashboard } from './sections/WeeklyMonthlyDashboard';
import { AIRecommendationsSection } from './sections/AIRecommendationsSection';
import { PerformanceTrackerSection } from './sections/PerformanceTrackerSection';
import { ResourcesNotesSection } from './sections/ResourcesNotesSection';
import { SettingsCustomizationSection } from './sections/SettingsCustomizationSection';
import { useToast } from '@/hooks/use-toast';
import { StudyPlanSubject } from '@/types/user/studyPlan';

const StudyPlanPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
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
  
  // Quick stats for the header
  const quickStats = {
    examDate: '2026-05-03',
    daysLeft: daysLeft,
    totalProgress: averageProgress,
    todayProgress: 3.5,
    weeklyTarget: totalWeeklyHours
  };

  return (
    <SharedPageLayout
      title="NEET 2026 Study Plan"
      subtitle="Comprehensive preparation strategy for NEET 2026 - Physics, Chemistry & Biology"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export Plan
          </Button>
          <Button
            onClick={() => navigate('/dashboard/student/study-plan/adaptive')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Brain className="h-4 w-4 mr-2" />
            Try Adaptive Plan
          </Button>
        </div>
      }
    >
      {/* Quick Overview Header */}
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <Calendar className="h-5 w-5 mx-auto mb-1 text-blue-600" />
              <div className="text-xs text-gray-600">Exam Date</div>
              <div className="font-bold text-blue-600">May 3, 2026</div>
            </div>
            <div className="text-center">
              <Clock className="h-5 w-5 mx-auto mb-1 text-red-600" />
              <div className="text-xs text-gray-600">Days Left</div>
              <div className="font-bold text-red-600">{quickStats.daysLeft}</div>
            </div>
            <div className="text-center">
              <TrendingUp className="h-5 w-5 mx-auto mb-1 text-green-600" />
              <div className="text-xs text-gray-600">Overall Progress</div>
              <div className="font-bold text-green-600">{quickStats.totalProgress}%</div>
            </div>
            <div className="text-center">
              <BookOpen className="h-5 w-5 mx-auto mb-1 text-orange-600" />
              <div className="text-xs text-gray-600">Today's Hours</div>
              <div className="font-bold text-orange-600">{quickStats.todayProgress}h</div>
            </div>
            <div className="text-center">
              <Target className="h-5 w-5 mx-auto mb-1 text-purple-600" />
              <div className="text-xs text-gray-600">Weekly Target</div>
              <div className="font-bold text-purple-600">{quickStats.weeklyTarget}h</div>
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

      {/* Enhanced Feature Banner */}
      <Card className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="font-bold text-purple-800">🚀 Try Our Advanced Adaptive Study Plan</h3>
                <p className="text-sm text-purple-700">AI-powered adaptive planning with dynamic scheduling & detailed analytics</p>
              </div>
            </div>
            <Button
              onClick={() => navigate('/dashboard/student/study-plan/adaptive')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Explore Adaptive Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Schedule</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-1">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">AI</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-1">
            <Award className="h-4 w-4" />
            <span className="hidden sm:inline">Performance</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Resources</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <StudyTimeAllocation
            weeklyTotal={totalWeeklyHours}
            subjects={subjects}
            onSave={handleSaveTimeAllocation}
          />
        </TabsContent>

        <TabsContent value="profile">
          <StudentProfileSection />
        </TabsContent>

        <TabsContent value="analysis">
          <SubjectAnalysisSection />
        </TabsContent>
        
        <TabsContent value="schedule">
          <WeeklySchedule />
        </TabsContent>
        
        <TabsContent value="ai">
          <AIRecommendationsSection />
        </TabsContent>

        <TabsContent value="performance">
          <PerformanceTrackerSection />
        </TabsContent>

        <TabsContent value="resources">
          <ResourcesNotesSection />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsCustomizationSection />
        </TabsContent>
      </Tabs>
    </SharedPageLayout>
  );
};

export default StudyPlanPage;
