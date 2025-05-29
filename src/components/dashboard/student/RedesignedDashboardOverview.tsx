
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
import MoodBasedSuggestions from './dashboard-sections/MoodBasedSuggestions';
import MoodLogButton from './mood-tracking/MoodLogButton';
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
  Heart,
  BookOpen,
  RotateCcw,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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

        {/* Exam Goal Section with Mood Log Button */}
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
                    <MoodLogButton 
                      currentMood={currentMood} 
                      onMoodChange={onMoodChange} 
                      size="sm"
                      showLabel={false}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Link to="/dashboard/student/academic-advisor">
                  <Button variant="outline" size="sm">
                    Switch Exam
                  </Button>
                </Link>
                <Link to="/dashboard/student/academic-advisor">
                  <Button size="sm">
                    New Plan
                  </Button>
                </Link>
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
              <Link to="/dashboard/student/3d-concepts">
                <Button variant="outline" size="sm" className="flex flex-col items-center p-3 h-auto w-full hover:scale-105 transition-transform">
                  <Target className="h-4 w-4 mb-1" />
                  <span className="text-xs">3D Interactive</span>
                </Button>
              </Link>
              <Link to="/dashboard/student/visual-concepts">
                <Button variant="outline" size="sm" className="flex flex-col items-center p-3 h-auto w-full hover:scale-105 transition-transform">
                  <Brain className="h-4 w-4 mb-1" />
                  <span className="text-xs">Interactive Visual</span>
                </Button>
              </Link>
              <Link to="/dashboard/student/spaced-repetition">
                <Button variant="outline" size="sm" className="flex flex-col items-center p-3 h-auto w-full hover:scale-105 transition-transform">
                  <Clock className="h-4 w-4 mb-1" />
                  <span className="text-xs">Spaced Repetition</span>
                </Button>
              </Link>
              <Link to="/dashboard/student/formula-practice">
                <Button variant="outline" size="sm" className="flex flex-col items-center p-3 h-auto w-full hover:scale-105 transition-transform">
                  <Zap className="h-4 w-4 mb-1" />
                  <span className="text-xs">Formula Practice</span>
                </Button>
              </Link>
              <Link to="/dashboard/student/practice-exam">
                <Button variant="outline" size="sm" className="flex flex-col items-center p-3 h-auto w-full hover:scale-105 transition-transform">
                  <Trophy className="h-4 w-4 mb-1" />
                  <span className="text-xs">Take Exam</span>
                </Button>
              </Link>
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
              {['Thermodynamics', 'Ecology', 'Modern Physics', 'Organic Reactions', 'Genetics'].map((area, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-800/30"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="font-medium">{area}</span>
                  <div className="flex gap-2">
                    <Link to={`/dashboard/student/concepts/${area.toLowerCase().replace(/\s+/g, '-')}`}>
                      <Button variant="outline" size="sm" className="hover:bg-blue-50">
                        <BookOpen className="h-3 w-3 mr-1" />
                        Study Concept
                      </Button>
                    </Link>
                    <Link to={`/dashboard/student/flashcards/${area.toLowerCase().replace(/\s+/g, '-')}`}>
                      <Button variant="outline" size="sm" className="hover:bg-green-50">
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Practice Recall
                      </Button>
                    </Link>
                  </div>
                </motion.div>
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
              {['Organic Chemistry', 'Kinematics', 'Cell Biology', 'Algebra', 'Mechanics'].map((area, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800/30"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="font-medium">{area}</span>
                  <div className="flex gap-2">
                    <Link to={`/dashboard/student/flashcards/${area.toLowerCase().replace(/\s+/g, '-')}`}>
                      <Button variant="outline" size="sm" className="hover:bg-blue-50">
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Practice Recall
                      </Button>
                    </Link>
                    <Link to={`/dashboard/student/practice-exam/${area.toLowerCase().replace(/\s+/g, '-')}`}>
                      <Button variant="outline" size="sm" className="hover:bg-purple-50">
                        <Trophy className="h-3 w-3 mr-1" />
                        Take Exam
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Subject-Wise Detailed Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Subject-Wise Detailed Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { subject: 'Physics', progress: 68, topics: '15/22', score: '78%', mastery: 'Intermediate', color: 'blue' },
                { subject: 'Chemistry', progress: 78, topics: '18/20', score: '82%', mastery: 'Advanced', color: 'green' },
                { subject: 'Biology', progress: 70, topics: '20/28', score: '75%', mastery: 'Intermediate', color: 'purple' }
              ].map((subject, index) => (
                <motion.div 
                  key={index} 
                  className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-lg">{subject.subject}</span>
                      <Badge 
                        className={`${
                          subject.mastery === 'Advanced' ? 'bg-green-100 text-green-800' :
                          subject.mastery === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                        }`}
                      >
                        {subject.mastery}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span>Topics: <strong>{subject.topics}</strong></span>
                      <span>Score: <strong>{subject.score}</strong></span>
                      <span className="font-bold text-lg">{subject.progress}%</span>
                    </div>
                  </div>
                  <Progress value={subject.progress} className="h-3" />
                  <div className="flex gap-2 mt-2">
                    <Link to={`/dashboard/student/concepts/${subject.subject.toLowerCase()}`}>
                      <Button size="sm" variant="outline">
                        <BookOpen className="h-3 w-3 mr-1" />
                        Study Concepts
                      </Button>
                    </Link>
                    <Link to={`/dashboard/student/practice-exam/${subject.subject.toLowerCase()}`}>
                      <Button size="sm" variant="outline">
                        <Trophy className="h-3 w-3 mr-1" />
                        Take Test
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced 5 KPI Tabs */}
        <div className="grid grid-cols-5 gap-4">
          {[
            { title: 'Mastery', value: '72%', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20', link: '/dashboard/student/mastery' },
            { title: 'Progress', value: '68%', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', link: '/dashboard/student/progress' },
            { title: 'Accuracy', value: '82%', icon: Target, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20', link: '/dashboard/student/accuracy' },
            { title: 'Speed', value: '75%', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20', link: '/dashboard/student/speed' },
            { title: 'Retention', value: '78%', icon: Activity, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20', link: '/dashboard/student/retention' }
          ].map((kpi, index) => (
            <Link key={index} to={kpi.link} className="no-underline">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className={`text-center cursor-pointer hover:shadow-lg transition-all ${kpi.bg} border-0`}>
                  <CardContent className="p-4">
                    <kpi.icon className={`h-6 w-6 ${kpi.color} mx-auto mb-2`} />
                    <div className="text-2xl font-bold">{kpi.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{kpi.title}</div>
                  </CardContent>
                </Card>
              </motion.div>
            </Link>
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
              <Link to="/dashboard/student/tutor">
                <Button variant="outline" className="w-full justify-start hover:bg-purple-50">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Get Guidance
                </Button>
              </Link>
              <Badge className="w-full justify-center bg-purple-100 text-purple-800">
                24/7 Available
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Mood-based Learning */}
        <MoodBasedSuggestions 
          currentMood={currentMood}
          onMoodSelect={onMoodChange}
        />
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
