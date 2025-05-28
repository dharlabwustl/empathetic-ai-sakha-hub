
import React, { useState } from 'react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import ExamReadinessSection from '@/components/dashboard/student/ExamReadinessSection';
import SurroundingInfluencesSection from '@/components/dashboard/student/SurroundingInfluencesSection';
import NEETStrategyCard from '@/components/dashboard/student/NEETStrategyCard';
import SubjectBreakdownSection from '@/components/dashboard/student/SubjectBreakdownSection';
import { 
  Calendar, 
  Clock, 
  Target, 
  TrendingUp, 
  User, 
  BookOpen, 
  Brain, 
  MessageSquare, 
  Lightbulb,
  Star,
  Zap,
  Crown,
  ExternalLink,
  Flame,
  Heart,
  Coffee,
  Moon,
  Sun,
  Sunset,
  Play,
  Volume2
} from 'lucide-react';
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
  const [influenceMeterCollapsed, setInfluenceMeterCollapsed] = useState(false);

  // Mock data for components
  const weeklyTrendsData = [
    { week: '1', score: 30 },
    { week: '2', score: 35 },
    { week: '3', score: 40 },
    { week: '4', score: 38 },
    { week: '5', score: 45 },
    { week: '6', score: 52 },
    { week: '7', score: 58 }
  ];
  
  const weakAreas = ['Organic Chemistry', 'Thermodynamics', 'Vectors'];
  const strongAreas = ['Algebra', 'Mechanics', 'Biology'];

  return (
    <div className="space-y-6 p-6">
      {/* Top Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Target className="h-4 w-4" />
            <span className="text-sm font-medium">Exam</span>
          </div>
          <div className="text-lg font-bold">NEET 2026</div>
          <div className="text-xs opacity-90">185 days to go</div>
        </div>
        
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-lg text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">Study Pace</span>
          </div>
          <div className="text-lg font-bold">Moderate</div>
          <div className="text-xs opacity-90">4.5 hrs/day</div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 rounded-lg text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Brain className="h-4 w-4" />
            <span className="text-sm font-medium">Learner Style</span>
          </div>
          <div className="text-lg font-bold">Visual</div>
          <div className="text-xs opacity-90">Interactive</div>
        </div>
        
        <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white p-4 rounded-lg text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Heart className="h-4 w-4" />
            <span className="text-sm font-medium">Mood</span>
          </div>
          <div className="text-lg font-bold">Stressed</div>
          <div className="text-xs opacity-90">Need support</div>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-lg text-center">
          <Link 
            to="/dashboard/student/academic" 
            className="block hover:scale-105 transition-transform"
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <Target className="h-4 w-4" />
              <span className="text-sm font-medium">Switch Plan</span>
            </div>
            <div className="text-lg font-bold">New Goal</div>
            <div className="text-xs opacity-90">Academic Advisor</div>
          </Link>
        </div>
      </div>

      {/* User Profile Section */}
      <Card className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src={userProfile.avatar || '/lovable-uploads/1bd9164d-90e1-4088-b058-0fa5966be194.png'} 
                  alt={userProfile.name}
                  className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                />
                <div className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full p-1">
                  <Crown className="h-3 w-3" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold">{userProfile.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    Free Plan
                  </Badge>
                  <span className="text-sm text-muted-foreground">Expires: Never</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <a 
                href="https://preview--empathetic-ai-sakha-hub.lovable.app/dashboard/student/subscription"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade Plan
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Exam Readiness Section */}
          <ExamReadinessSection 
            score={65}
            previousScore={58}
            weeklyTrends={weeklyTrendsData}
            weakAreas={weakAreas}
            strongAreas={strongAreas}
          />

          {/* Today's Top Priority */}
          <Card className="relative overflow-hidden border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
            <div className="absolute top-2 right-2">
              <Zap className="h-4 w-4 text-orange-500 animate-pulse" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-600" />
                Today's Top Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-white/70 dark:bg-gray-800/50 rounded-lg border border-orange-200">
                  <h3 className="font-semibold mb-2">Complete Thermodynamics Concepts</h3>
                  <p className="text-sm text-muted-foreground mb-3">Focus on Heat Transfer and Laws of Thermodynamics</p>
                  <div className="flex gap-2">
                    <Link to="/dashboard/student/concepts">
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        Start Learning
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's NEET Study Plan */}
          <Card className="relative overflow-hidden border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <div className="absolute top-2 right-2">
              <Star className="h-4 w-4 text-green-500 animate-pulse" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Today's NEET Study Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-white/70 dark:bg-gray-800/50 rounded-lg">
                    <div className="text-sm font-medium">Physics</div>
                    <div className="text-2xl font-bold text-blue-600">2</div>
                    <div className="text-xs text-muted-foreground">concepts</div>
                  </div>
                  <div className="text-center p-3 bg-white/70 dark:bg-gray-800/50 rounded-lg">
                    <div className="text-sm font-medium">Chemistry</div>
                    <div className="text-2xl font-bold text-purple-600">3</div>
                    <div className="text-xs text-muted-foreground">formulas</div>
                  </div>
                  <div className="text-center p-3 bg-white/70 dark:bg-gray-800/50 rounded-lg">
                    <div className="text-sm font-medium">Biology</div>
                    <div className="text-2xl font-bold text-green-600">1</div>
                    <div className="text-xs text-muted-foreground">test</div>
                  </div>
                </div>
                <Link to="/dashboard/student/today">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    View Full Plan
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Daily Smart Suggestions */}
          <Card className="relative overflow-hidden border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <div className="absolute top-2 right-2">
              <Lightbulb className="h-4 w-4 text-blue-500 animate-pulse" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-blue-600" />
                Daily Smart Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center p-3 bg-white/70 dark:bg-gray-800/50 rounded-lg">
                  <Sun className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                  <div className="text-xs font-medium">Morning</div>
                  <div className="text-xs text-muted-foreground">Review formulas</div>
                  <Button size="sm" variant="outline" className="mt-2 h-6 text-xs">
                    Start
                  </Button>
                </div>
                <div className="text-center p-3 bg-white/70 dark:bg-gray-800/50 rounded-lg">
                  <Sunset className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                  <div className="text-xs font-medium">Afternoon</div>
                  <div className="text-xs text-muted-foreground">Practice problems</div>
                  <Button size="sm" variant="outline" className="mt-2 h-6 text-xs">
                    Start
                  </Button>
                </div>
                <div className="text-center p-3 bg-white/70 dark:bg-gray-800/50 rounded-lg">
                  <Coffee className="h-6 w-6 text-brown-500 mx-auto mb-2" />
                  <div className="text-xs font-medium">Evening</div>
                  <div className="text-xs text-muted-foreground">Take mock test</div>
                  <Button size="sm" variant="outline" className="mt-2 h-6 text-xs">
                    Start
                  </Button>
                </div>
                <div className="text-center p-3 bg-white/70 dark:bg-gray-800/50 rounded-lg">
                  <Moon className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                  <div className="text-xs font-medium">Night</div>
                  <div className="text-xs text-muted-foreground">Light revision</div>
                  <Button size="sm" variant="outline" className="mt-2 h-6 text-xs">
                    Start
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Concept Mastery Techniques */}
          <Card className="relative overflow-hidden border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <div className="absolute top-2 right-2">
              <Brain className="h-4 w-4 text-purple-500 animate-pulse" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Advanced Concept Mastery Techniques for NEET 2026 - Visual Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/70 dark:bg-gray-800/50 rounded-lg">
                  <h4 className="font-medium mb-2">Concept Cards</h4>
                  <p className="text-sm text-muted-foreground mb-2">Weak: Organic Chemistry, Thermodynamics</p>
                  <Link to="/dashboard/student/concepts">
                    <Button size="sm" variant="outline" className="w-full">
                      Practice Now
                    </Button>
                  </Link>
                </div>
                <div className="p-4 bg-white/70 dark:bg-gray-800/50 rounded-lg">
                  <h4 className="font-medium mb-2">Interactive Flashcards</h4>
                  <p className="text-sm text-muted-foreground mb-2">Weak: Physics Formulas, Chemical Reactions</p>
                  <Link to="/dashboard/student/flashcards">
                    <Button size="sm" variant="outline" className="w-full">
                      Start Review
                    </Button>
                  </Link>
                </div>
                <div className="p-4 bg-white/70 dark:bg-gray-800/50 rounded-lg">
                  <h4 className="font-medium mb-2">Formula Lab</h4>
                  <p className="text-sm text-muted-foreground mb-2">Weak: Physics Laws, Chemical Equations</p>
                  <Link to="/dashboard/student/concepts">
                    <Button size="sm" variant="outline" className="w-full">
                      Explore Formulas
                    </Button>
                  </Link>
                </div>
                <div className="p-4 bg-white/70 dark:bg-gray-800/50 rounded-lg">
                  <h4 className="font-medium mb-2">Mock Exams</h4>
                  <p className="text-sm text-muted-foreground mb-2">Weak: Time Management, Question Analysis</p>
                  <Link to="/dashboard/student/practice-exam">
                    <Button size="sm" variant="outline" className="w-full">
                      Take Test
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* NEET Strategy Card */}
          <NEETStrategyCard studyPace="moderate" examProximity={185} />

          {/* AI Coach Suggestions */}
          <Card className="relative overflow-hidden border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20">
            <div className="absolute top-2 right-2">
              <MessageSquare className="h-4 w-4 text-indigo-500 animate-pulse" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-indigo-600" />
                AI Coach Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-white/70 dark:bg-gray-800/50 rounded-lg">
                  <p className="text-sm font-medium mb-1">Physics Focus</p>
                  <p className="text-xs text-muted-foreground">Work on Thermodynamics concepts. You're struggling with heat transfer problems.</p>
                </div>
                <div className="p-3 bg-white/70 dark:bg-gray-800/50 rounded-lg">
                  <p className="text-sm font-medium mb-1">Study Strategy</p>
                  <p className="text-xs text-muted-foreground">Take shorter breaks. Your focus drops after 45 minutes of continuous study.</p>
                </div>
                <Link to="/dashboard/student/tutor">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat with AI Tutor
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* NEET Specific AI Tutor */}
          <Card className="relative overflow-hidden border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20">
            <div className="absolute top-2 right-2">
              <Volume2 className="h-4 w-4 text-teal-500 animate-pulse" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-teal-600" />
                NEET Specific AI Tutor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-white/70 dark:bg-gray-800/50 rounded-lg">
                  <p className="text-sm font-medium mb-1">Suggested Topics</p>
                  <div className="space-y-1">
                    <div className="text-xs">• Organic Chemistry Reactions</div>
                    <div className="text-xs">• Human Physiology</div>
                    <div className="text-xs">• Modern Physics</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to="/dashboard/student/tutor" className="flex-1">
                    <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Chat
                    </Button>
                  </Link>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Volume2 className="h-4 w-4 mr-1" />
                    Audio
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weak Areas - Improve Now */}
          <Card className="relative overflow-hidden border-2 border-red-200 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
            <div className="absolute top-2 right-2">
              <TrendingUp className="h-4 w-4 text-red-500 animate-pulse" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-red-600" />
                Weak Areas - Improve Now
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {weakAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white/70 dark:bg-gray-800/50 rounded-lg">
                    <span className="text-sm font-medium">{area}</span>
                    <div className="flex gap-1">
                      <Link to="/dashboard/student/concepts">
                        <Button size="sm" variant="outline" className="h-6 text-xs">
                          Concept
                        </Button>
                      </Link>
                      <Link to="/dashboard/student/flashcards">
                        <Button size="sm" variant="outline" className="h-6 text-xs">
                          Recall
                        </Button>
                      </Link>
                      <Link to="/dashboard/student/practice-exam">
                        <Button size="sm" variant="outline" className="h-6 text-xs">
                          Exam
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Strong Areas */}
          <Card className="relative overflow-hidden border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <div className="absolute top-2 right-2">
              <Star className="h-4 w-4 text-green-500 animate-pulse" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-green-600" />
                Strong Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {strongAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white/70 dark:bg-gray-800/50 rounded-lg">
                    <span className="text-sm font-medium">{area}</span>
                    <div className="flex gap-1">
                      <Link to="/dashboard/student/concepts">
                        <Button size="sm" variant="outline" className="h-6 text-xs">
                          Review
                        </Button>
                      </Link>
                      <Link to="/dashboard/student/practice-exam">
                        <Button size="sm" variant="outline" className="h-6 text-xs">
                          Test
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Sections */}
      <div className="space-y-6">
        {/* Subject Breakdown Sections */}
        <SubjectBreakdownSection />

        {/* Surrounding Influences at Bottom */}
        <SurroundingInfluencesSection 
          influenceMeterCollapsed={influenceMeterCollapsed}
          setInfluenceMeterCollapsed={setInfluenceMeterCollapsed}
        />
      </div>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
