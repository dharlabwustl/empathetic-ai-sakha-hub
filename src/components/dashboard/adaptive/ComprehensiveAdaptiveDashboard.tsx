
import React, { useState } from 'react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import SharedNavigation from '@/components/dashboard/student/SharedNavigation';
import QuickStatsGrid from '@/components/dashboard/student/QuickStatsGrid';
import ExamReadinessScore from '@/components/dashboard/student/dashboard-sections/ExamReadinessScore';
import TodaysPlanSection from '@/components/dashboard/student/dashboard-sections/TodaysPlanSection';
import NEETStrategyCard from '@/components/dashboard/student/NEETStrategyCard';
import SubjectBreakdownSection from '@/components/dashboard/student/SubjectBreakdownSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, MessageCircle, Sparkles, Target, TrendingUp, BookOpen, Award, Zap, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ComprehensiveAdaptiveDashboardProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const ComprehensiveAdaptiveDashboard: React.FC<ComprehensiveAdaptiveDashboardProps> = ({
  userProfile,
  kpis,
  currentMood,
  onMoodChange
}) => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  // Enhanced AI Coach suggestions
  const aiCoachSuggestions = [
    {
      id: 'focus-physics',
      title: 'Focus on Physics Concepts',
      description: 'Your physics scores need attention. Start with Thermodynamics and Mechanics.',
      priority: 'high',
      action: 'Start Physics Review',
      timeEstimate: '45 min',
      icon: <Target className="h-4 w-4 text-red-500" />
    },
    {
      id: 'mock-test',
      title: 'Take NEET Mock Test',
      description: 'You haven\'t taken a full-length test in 3 days. Practice is crucial.',
      priority: 'high',
      action: 'Take Mock Test',
      timeEstimate: '3 hours',
      icon: <Award className="h-4 w-4 text-blue-500" />
    },
    {
      id: 'bio-advantage',
      title: 'Leverage Biology Strength',
      description: 'Your biology is strong. Focus on advanced topics to maximize scores.',
      priority: 'medium',
      action: 'Advanced Biology',
      timeEstimate: '30 min',
      icon: <TrendingUp className="h-4 w-4 text-green-500" />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <SharedNavigation />
      
      {/* Quick Stats Grid */}
      <QuickStatsGrid userProfile={userProfile} kpis={kpis} />
      
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Exam Readiness Score */}
          <ExamReadinessScore 
            overallScore={72}
            targetExam="NEET 2026"
            daysUntilExam={85}
          />
          
          {/* Today's Plan */}
          <TodaysPlanSection currentMood={currentMood} />
        </div>
        
        {/* Right Column - Secondary Content */}
        <div className="lg:col-span-4 space-y-6">
          {/* NEET Strategy Card */}
          <NEETStrategyCard 
            studyPace="moderate"
            examProximity={85}
          />
          
          {/* Enhanced AI Coach Section */}
          <Card className="overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-800">
            <CardHeader className="pb-3 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                  <Brain className="h-5 w-5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                </div>
                <div>
                  <span className="font-bold">NEET AI Coach</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      Active
                    </Badge>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
                      <Sparkles className="h-3 w-3 mr-1" />
                      AI-Powered
                    </Badge>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-indigo-100 dark:border-indigo-800">
                  <p className="text-sm text-gray-700 dark:text-gray-200 mb-3">
                    <span className="font-medium">Good morning!</span> Based on your recent performance, here are my top recommendations:
                  </p>
                  
                  <div className="space-y-3">
                    {aiCoachSuggestions.map((suggestion, index) => (
                      <div 
                        key={suggestion.id} 
                        className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-sm ${
                          suggestion.priority === 'high' 
                            ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' 
                            : 'bg-gray-50 border-gray-200 dark:bg-gray-700/50 dark:border-gray-600'
                        }`}
                        onClick={() => setActiveFeature(suggestion.id)}
                      >
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5">{suggestion.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {suggestion.title}
                              </h4>
                              {suggestion.priority === 'high' && (
                                <Zap className="h-3 w-3 text-orange-500 animate-pulse" />
                              )}
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                              {suggestion.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <Button size="sm" variant="outline" className="h-6 text-xs">
                                {suggestion.action}
                              </Button>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {suggestion.timeEstimate}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs h-8"
                    asChild
                  >
                    <Link to="/dashboard/student/academic">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Ask AI Coach
                    </Link>
                  </Button>
                  <Link to="https://preview--empathetic-ai-sakha-hub.lovable.app/dashboard/student/subscription">
                    <Button size="sm" variant="outline" className="text-xs h-8 border-indigo-200 hover:bg-indigo-50">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Upgrade
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Premium Features Highlight */}
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-600" />
                Premium Features
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-700 dark:text-gray-200">AI Study Plan Generation</span>
                  <Badge variant="outline" className="text-xs">Pro</Badge>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-700 dark:text-gray-200">Unlimited Mock Tests</span>
                  <Badge variant="outline" className="text-xs">Pro</Badge>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-700 dark:text-gray-200">Detailed Analytics</span>
                  <Badge variant="outline" className="text-xs">Pro</Badge>
                </div>
              </div>
              <Link to="https://preview--empathetic-ai-sakha-hub.lovable.app/dashboard/student/subscription">
                <Button size="sm" className="w-full mt-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs h-7">
                  Upgrade to Pro
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Subject Breakdown Section */}
      <div className="mt-8">
        <SubjectBreakdownSection />
      </div>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
