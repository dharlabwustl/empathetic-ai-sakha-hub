
import React, { useState } from 'react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import EnhancedNameHeaderCard from './EnhancedNameHeaderCard';
import OnboardingHighlights from './OnboardingHighlights';
import SmartSuggestionsCenter from './dashboard-sections/SmartSuggestionsCenter';
import EnhancedExamReadinessScore from './dashboard-sections/EnhancedExamReadinessScore';
import TodaysTopPrioritySection from './dashboard-sections/TodaysTopPrioritySection';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import NEETStrategyCard from './NEETStrategyCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookMarked, 
  Calendar, 
  Target, 
  TrendingUp, 
  Brain, 
  AlertTriangle, 
  CheckCircle,
  BarChart3,
  Clock,
  Zap,
  Star,
  Trophy,
  Activity,
  MessageSquare,
  Heart
} from 'lucide-react';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  isFirstTimeUser?: boolean;
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis,
  currentMood,
  onMoodChange,
  isFirstTimeUser = false
}) => {
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  // Calculate dynamic days left for exam
  const examDate = new Date('2026-05-03'); // NEET 2026 exam date
  const today = new Date();
  const daysLeft = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // Mock performance data for smart suggestions
  const performanceData = {
    accuracy: 75,
    quizScores: 82,
    conceptProgress: 65,
    streak: userProfile.studyStreak || 12
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main Content - 3 columns */}
      <div className="lg:col-span-3 space-y-6">
        {/* Enhanced Name Header Card */}
        <EnhancedNameHeaderCard userProfile={userProfile} />

        {/* Exam Goal Section */}
        <Card className="bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookMarked className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">NEET 2026</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>Days Left: <strong className="text-red-600">{daysLeft}</strong></span>
                    <span>Pace: <strong>Moderate</strong></span>
                    <span>Style: <strong>Visual</strong></span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Switch Exam
                </Button>
                <Button size="sm">
                  New Plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Exam Readiness Score */}
        <EnhancedExamReadinessScore 
          overallScore={72}
          confidence={78}
          predictiveScore="685/720"
          targetExam="NEET 2026"
          daysUntilExam={daysLeft}
        />

        {/* Priority Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TodaysTopPrioritySection />
          <TodaysPlanSection currentMood={currentMood} />
        </div>

        {/* Daily Smart Suggestions */}
        <SmartSuggestionsCenter 
          performance={performanceData}
          userName={userProfile.name || userProfile.firstName || "Student"}
        />

        {/* Advanced Concept Mastery Techniques */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              Advanced Concept Mastery Techniques for NEET 2026
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <Button variant="outline" size="sm" className="flex flex-col items-center p-3 h-auto">
                <Target className="h-4 w-4 mb-1" />
                <span className="text-xs">3D Interactive</span>
              </Button>
              <Button variant="outline" size="sm" className="flex flex-col items-center p-3 h-auto">
                <Brain className="h-4 w-4 mb-1" />
                <span className="text-xs">Interactive Visual</span>
              </Button>
              <Button variant="outline" size="sm" className="flex flex-col items-center p-3 h-auto">
                <Clock className="h-4 w-4 mb-1" />
                <span className="text-xs">Spaced Repetition</span>
              </Button>
              <Button variant="outline" size="sm" className="flex flex-col items-center p-3 h-auto">
                <Zap className="h-4 w-4 mb-1" />
                <span className="text-xs">Formula Practice</span>
              </Button>
              <Button variant="outline" size="sm" className="flex flex-col items-center p-3 h-auto">
                <Trophy className="h-4 w-4 mb-1" />
                <span className="text-xs">Take Exam</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Weak Areas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Weak Areas - Focus & Improve
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Thermodynamics', 'Ecology', 'Modern Physics'].map((area, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="font-medium">{area}</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Study Concept</Button>
                    <Button variant="outline" size="sm">Practice Recall</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Strong Areas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Strong Areas - Maintain Excellence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Organic Chemistry', 'Kinematics', 'Cell Biology'].map((area, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="font-medium">{area}</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Practice Recall</Button>
                    <Button variant="outline" size="sm">Take Exam</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subject-Wise Detailed Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Subject-Wise Detailed Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { subject: 'Physics', progress: 68, topics: '15/22', score: '78%' },
                { subject: 'Chemistry', progress: 78, topics: '18/20', score: '82%' },
                { subject: 'Biology', progress: 70, topics: '20/28', score: '75%' }
              ].map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{subject.subject}</span>
                    <div className="flex items-center gap-4 text-sm">
                      <span>Topics: {subject.topics}</span>
                      <span>Score: {subject.score}</span>
                      <span className="font-medium">{subject.progress}%</span>
                    </div>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 5 KPI Tabs */}
        <div className="grid grid-cols-5 gap-4">
          {[
            { title: 'Mastery', value: '72%', icon: Star, color: 'text-yellow-600' },
            { title: 'Progress', value: '68%', icon: TrendingUp, color: 'text-blue-600' },
            { title: 'Accuracy', value: '82%', icon: Target, color: 'text-green-600' },
            { title: 'Speed', value: '75%', icon: Zap, color: 'text-purple-600' },
            { title: 'Retention', value: '78%', icon: Activity, color: 'text-red-600' }
          ].map((kpi, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-4">
                <kpi.icon className={`h-6 w-6 ${kpi.color} mx-auto mb-2`} />
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{kpi.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Sidebar - 1 column */}
      <div className="space-y-4">
        {/* NEET Strategy Card */}
        <NEETStrategyCard />

        {/* AI Coach */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              AI Coach
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                Get Guidance
              </Button>
              <Badge className="w-full justify-center bg-purple-100 text-purple-800">
                24/7 Available
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Mood-based Learning */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-600" />
              Mood-based Learning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Target className="h-4 w-4 mr-2" />
                Adaptive Content
              </Button>
              <Badge className="w-full justify-center bg-pink-100 text-pink-800">
                Current: {currentMood || 'Motivated'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Onboarding highlights for first-time users */}
      <OnboardingHighlights
        isFirstTimeUser={isFirstTimeUser && !onboardingComplete}
        onComplete={() => setOnboardingComplete(true)}
      />
    </div>
  );
};

export default RedesignedDashboardOverview;
