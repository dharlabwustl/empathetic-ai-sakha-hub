import React, { useState } from 'react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import ComprehensiveAdaptiveDashboard from '../adaptive/ComprehensiveAdaptiveDashboard';
import EnhancedNameHeaderCard from './EnhancedNameHeaderCard';
import OnboardingHighlights from './OnboardingHighlights';
import TodaysTopPrioritySection from './dashboard-sections/TodaysTopPrioritySection';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import SmartSuggestionsCenter from './dashboard-sections/SmartSuggestionsCenter';
import EnhancedExamReadinessScore from './dashboard-sections/EnhancedExamReadinessScore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Brain, 
  FileText, 
  Target, 
  TrendingUp, 
  Play,
  ArrowRight,
  Zap,
  RefreshCw,
  Calculator,
  Eye,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Star,
  Gamepad2,
  Layers,
  Clock,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const [showTopPriority, setShowTopPriority] = useState(true);
  const [showStudyPlan, setShowStudyPlan] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [selectedExam, setSelectedExam] = useState('NEET 2026');
  const navigate = useNavigate();

  const handleViewStudyPlan = () => {
    console.log('View study plan clicked');
  };

  const examOptions = ['NEET 2026', 'JEE Main 2026', 'JEE Advanced 2026', 'AIIMS 2026'];

  // Mock performance data for smart suggestions
  const performanceData = {
    accuracy: 75,
    quizScores: 82,
    conceptProgress: 65,
    streak: userProfile.studyStreak || 12
  };

  // Mock data for subject-wise priorities
  const subjectPriorities = [
    { subject: 'Physics', topic: 'Electromagnetic Induction', priority: 'High', progress: 45 },
    { subject: 'Chemistry', topic: 'Organic Compounds', priority: 'Critical', progress: 30 },
    { subject: 'Biology', topic: 'Genetics & Evolution', priority: 'Medium', progress: 70 }
  ];

  // Mock weak areas data
  const weakAreas = [
    { concept: 'Electromagnetic Induction', subject: 'Physics', accuracy: 35, priority: 'Critical' },
    { concept: 'Organic Chemistry', subject: 'Chemistry', accuracy: 42, priority: 'High' },
    { concept: 'Thermodynamics', subject: 'Physics', accuracy: 48, priority: 'Medium' }
  ];

  // Mock strong areas data
  const strongAreas = [
    { concept: 'Cell Biology', subject: 'Biology', accuracy: 92, mastery: 'Excellent' },
    { concept: 'Kinematics', subject: 'Physics', accuracy: 88, mastery: 'Good' },
    { concept: 'Atomic Structure', subject: 'Chemistry', accuracy: 85, mastery: 'Good' }
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Name Header Card */}
      <EnhancedNameHeaderCard userProfile={userProfile} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Enhanced Exam Goal Section with Switch Button */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200">
                        Exam: {selectedExam}
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const currentIndex = examOptions.indexOf(selectedExam);
                          const nextIndex = (currentIndex + 1) % examOptions.length;
                          setSelectedExam(examOptions[nextIndex]);
                        }}
                        className="text-xs px-3 py-1 bg-white/80 hover:bg-white border-purple-300"
                      >
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Switch
                      </Button>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-purple-600 dark:text-purple-400">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Days Left: 185
                      </span>
                      <span>•</span>
                      <span>Pace: Moderate</span>
                      <span>•</span>
                      <span>Style: Visual</span>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={handleViewStudyPlan}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  New Plan
                </Button>
              </div>
              
              {/* Progress indicator */}
              <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span>Preparation Progress</span>
                  <span>72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Exam Readiness Score Card */}
          <EnhancedExamReadinessScore 
            overallScore={72}
            targetExam={selectedExam}
            daysUntilExam={185}
          />

          {/* Subject-wise Top Priority Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-orange-600" />
                Subject-wise Top Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectPriorities.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={`${
                          item.priority === 'Critical' ? 'bg-red-500' :
                          item.priority === 'High' ? 'bg-orange-500' : 'bg-yellow-500'
                        } text-white`}>
                          {item.priority}
                        </Badge>
                        <span className="font-semibold">{item.subject}: {item.topic}</span>
                      </div>
                      <Progress value={item.progress} className="h-2" />
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline" onClick={() => navigate('/dashboard/student/concepts')}>
                        <BookOpen className="h-4 w-4 mr-1" />
                        Study Concept
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => navigate('/dashboard/student/flashcards')}>
                        <Brain className="h-4 w-4 mr-1" />
                        Practice Recall
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Today's NEET Study Plan */}
          <Card className="shadow-lg border-2 border-blue-200 dark:border-blue-800">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Active Live Daily Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  { task: 'Chemistry - Organic Compounds', time: '9:00 AM', status: 'current' },
                  { task: 'Physics - Wave Optics', time: '11:00 AM', status: 'pending' },
                  { task: 'Biology - Genetics', time: '2:00 PM', status: 'pending' }
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border">
                    <div>
                      <p className="font-semibold">{session.task}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{session.time}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <BookOpen className="h-4 w-4 mr-1" />
                        Study Concept
                      </Button>
                      <Button size="sm" variant="outline">
                        <Brain className="h-4 w-4 mr-1" />
                        Practice Recall
                      </Button>
                      <Button size="sm" variant="outline">
                        <Calculator className="h-4 w-4 mr-1" />
                        Practice Formula
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-1" />
                        Take Exam
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Advanced Concept Mastery Techniques */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-violet-600" />
                Advanced Concept Mastery Techniques for {selectedExam}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: '3D Interactive', icon: <Gamepad2 className="h-5 w-5" />, color: 'bg-green-500' },
                  { name: 'Interactive Visual', icon: <Eye className="h-5 w-5" />, color: 'bg-blue-500' },
                  { name: 'Spaced Repetition', icon: <RotateCcw className="h-5 w-5" />, color: 'bg-purple-500' },
                  { name: 'Formula Practice', icon: <Calculator className="h-5 w-5" />, color: 'bg-orange-500' },
                  { name: 'Take Exam', icon: <FileText className="h-5 w-5" />, color: 'bg-red-500' },
                  { name: 'Layered Learning', icon: <Layers className="h-5 w-5" />, color: 'bg-indigo-500' }
                ].map((technique, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    className="h-16 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-all"
                    onClick={() => navigate('/dashboard/student/concepts')}
                  >
                    <div className={`p-2 rounded-full ${technique.color} text-white`}>
                      {technique.icon}
                    </div>
                    <span className="text-sm font-medium">{technique.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weak Areas - Focus & Improve */}
          <Card className="shadow-lg border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Weak Areas - Focus & Improve
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weakAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="destructive">{area.priority}</Badge>
                        <span className="font-semibold">{area.concept}</span>
                        <span className="text-sm text-gray-600">({area.subject})</span>
                      </div>
                      <div className="text-sm text-red-600">Accuracy: {area.accuracy}%</div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline" onClick={() => navigate('/dashboard/student/concepts')}>
                        <BookOpen className="h-4 w-4 mr-1" />
                        Study Concept
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => navigate('/dashboard/student/flashcards')}>
                        <Brain className="h-4 w-4 mr-1" />
                        Practice Recall
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Strong Areas - Maintain Excellence */}
          <Card className="shadow-lg border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Strong Areas - Maintain Excellence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strongAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-green-500 text-white">{area.mastery}</Badge>
                        <span className="font-semibold">{area.concept}</span>
                        <span className="text-sm text-gray-600">({area.subject})</span>
                      </div>
                      <div className="text-sm text-green-600">Accuracy: {area.accuracy}%</div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline" onClick={() => navigate('/dashboard/student/concepts')}>
                        <Brain className="h-4 w-4 mr-1" />
                        Practice Recall
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => navigate('/dashboard/student/practice-exam')}>
                        <FileText className="h-4 w-4 mr-1" />
                        Take Exam
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subject-Wise Detailed Breakdown */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Subject-Wise Detailed Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-lg">Physics</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Mechanics</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Chemistry</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Organic Chemistry</span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Strategy Cards */}
        <div className="space-y-6">
          {/* NEET Strategy Card */}
          <Card className="shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                <Target className="h-5 w-5" />
                NEET Strategy Card
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Play className="h-4 w-4 mr-2" />
                  Adaptive Plan
                </Button>
                <div className="text-sm text-blue-600 dark:text-blue-400 p-3 bg-white/50 dark:bg-gray-800/50 rounded">
                  Your personalized strategy based on performance analysis
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Coach */}
          <Card className="shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-800 dark:text-purple-200">
                <Brain className="h-5 w-5" />
                AI Coach
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Zap className="h-4 w-4 mr-2" />
                  Get Guidance
                </Button>
                <div className="text-sm text-purple-600 dark:text-purple-400 p-3 bg-white/50 dark:bg-gray-800/50 rounded">
                  AI-powered insights and recommendations
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mood-based Learning */}
          <Card className="shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                <Star className="h-5 w-5" />
                Mood-based Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Optimize Learning
                </Button>
                <div className="text-sm text-green-600 dark:text-green-400 p-3 bg-white/50 dark:bg-gray-800/50 rounded">
                  Learning adapted to your current mood and energy
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Moved Priority Cards Section */}
          <div className="space-y-4">
            {/* Today's Top Priority Section */}
            {showTopPriority && (
              <TodaysTopPrioritySection onClose={() => setShowTopPriority(false)} />
            )}
            
            {/* Smart Suggestions */}
            <SmartSuggestionsCenter 
              performance={performanceData}
              userName={userProfile.name || userProfile.firstName || "Student"}
            />
          </div>

          {/* Comprehensive Adaptive Dashboard with exam readiness and other cards */}
          <ComprehensiveAdaptiveDashboard 
            userProfile={userProfile}
            kpis={kpis}
            currentMood={currentMood}
            onMoodChange={onMoodChange}
          />
        </div>
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
