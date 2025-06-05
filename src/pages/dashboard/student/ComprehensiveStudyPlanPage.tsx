
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, BookOpen, Settings, Target, TrendingUp, Brain, Clock, ChevronLeft, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/dashboard/student/BackButton';
import SidebarLayout from '@/components/dashboard/SidebarLayout';
import StudentProfileSection from '@/components/dashboard/student/study-plan/StudentProfileSection';
import SubjectAnalysisInput from '@/components/dashboard/student/study-plan/SubjectAnalysisInput';
import AdaptiveStudyPlanTable from '@/components/dashboard/student/study-plan/AdaptiveStudyPlanTable';
import WeeklyMonthlyDashboard from '@/components/dashboard/student/study-plan/WeeklyMonthlyDashboard';
import AIRecommendationsSection from '@/components/dashboard/student/study-plan/AIRecommendationsSection';
import PerformanceTrackerSection from '@/components/dashboard/student/study-plan/PerformanceTrackerSection';
import ResourcesNotesSection from '@/components/dashboard/student/study-plan/ResourcesNotesSection';
import SettingsCustomizationSection from '@/components/dashboard/student/study-plan/SettingsCustomizationSection';

const ComprehensiveStudyPlanPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [studyPlanData, setStudyPlanData] = useState({
    profile: {
      name: 'John Doe',
      examGoal: 'NEET 2026',
      targetDate: '2026-05-03',
      learningPace: 'moderate',
      preferredStudyTime: 'morning',
      studyHoursPerDay: 6,
      availableDaysPerWeek: 6,
      preferredSubjectsPerDay: 2
    },
    subjects: {
      weakSubjects: ['Chemistry'],
      strongSubjects: ['Biology', 'Physics'],
      confidenceLevels: {
        Physics: 4,
        Chemistry: 2,
        Biology: 4
      }
    },
    schedule: [],
    performance: {},
    settings: {
      studyHours: '6',
      studyDays: '6',
      learningPace: 'moderate',
      weekendOff: false,
      autoAdjustment: true,
      revisionFrequency: 'weekly'
    }
  });

  return (
    <SidebarLayout>
      <div className="container py-6 max-w-7xl mx-auto">
        <BackButton to="/dashboard/student" />
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Comprehensive Study Plan</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Personalized adaptive learning path for {studyPlanData.profile.examGoal}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Customize
            </Button>
            <Button size="sm">
              <Target className="h-4 w-4 mr-2" />
              Save Plan
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto p-1">
            <TabsTrigger value="profile" className="flex flex-col items-center gap-1 py-2">
              <User className="h-4 w-4" />
              <span className="text-xs">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex flex-col items-center gap-1 py-2">
              <Brain className="h-4 w-4" />
              <span className="text-xs">Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex flex-col items-center gap-1 py-2">
              <Calendar className="h-4 w-4" />
              <span className="text-xs">Schedule</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex flex-col items-center gap-1 py-2">
              <Clock className="h-4 w-4" />
              <span className="text-xs">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="ai-recommendations" className="flex flex-col items-center gap-1 py-2">
              <Target className="h-4 w-4" />
              <span className="text-xs">AI Tips</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex flex-col items-center gap-1 py-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs">Performance</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex flex-col items-center gap-1 py-2">
              <BookOpen className="h-4 w-4" />
              <span className="text-xs">Resources</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex flex-col items-center gap-1 py-2">
              <Settings className="h-4 w-4" />
              <span className="text-xs">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <StudentProfileSection 
              data={studyPlanData.profile}
              onUpdate={(data) => setStudyPlanData(prev => ({ ...prev, profile: data }))}
            />
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <SubjectAnalysisInput
              data={studyPlanData.subjects}
              onUpdate={(data) => setStudyPlanData(prev => ({ ...prev, subjects: data }))}
            />
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <AdaptiveStudyPlanTable
              data={studyPlanData.schedule}
              subjects={studyPlanData.subjects}
              onUpdate={(data) => setStudyPlanData(prev => ({ ...prev, schedule: data }))}
            />
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <WeeklyMonthlyDashboard
              data={studyPlanData}
            />
          </TabsContent>

          <TabsContent value="ai-recommendations" className="space-y-6">
            <AIRecommendationsSection
              performance={studyPlanData.performance}
              subjects={studyPlanData.subjects}
            />
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <PerformanceTrackerSection
              data={studyPlanData.performance}
              onUpdate={(data) => setStudyPlanData(prev => ({ ...prev, performance: data }))}
            />
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <ResourcesNotesSection />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <SettingsCustomizationSection
              data={studyPlanData.settings}
              onUpdate={(data) => setStudyPlanData(prev => ({ ...prev, settings: data }))}
            />
          </TabsContent>
        </Tabs>
      </div>
    </SidebarLayout>
  );
};

export default ComprehensiveStudyPlanPage;
