
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Brain, BookOpen, Target, TrendingUp, Calendar, Clock, 
  Star, Award, Zap, Users, MessageSquare, Volume2,
  ArrowRight, Play, Settings, Crown, Upgrade,
  Sun, Moon, Sunset, Coffee
} from 'lucide-react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { useNavigate } from 'react-router-dom';
import MoodSelector from '../student/MoodSelector';
import SurroundingInfluencesSection from '../student/SurroundingInfluencesSection';

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
  const navigate = useNavigate();
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodType>(currentMood || MoodType.NEUTRAL);
  const [influenceMeterCollapsed, setInfluenceMeterCollapsed] = useState(true);

  // Enhanced exam details
  const examDetails = {
    exam: 'NEET 2026',
    goal: 185,
    daysToGo: 185,
    pace: 'Moderate',
    learnerStyle: 'Visual',
    mood: selectedMood
  };

  // Get subscription details
  const getSubscriptionDetails = () => {
    if (!userProfile.subscription) {
      return { planType: 'Free', expiryDate: null, isExpired: false };
    }
    
    if (typeof userProfile.subscription === 'object') {
      const isExpired = userProfile.subscription.expiryDate 
        ? new Date(userProfile.subscription.expiryDate) < new Date()
        : false;
        
      return {
        planType: userProfile.subscription.planType || 'Free',
        expiryDate: userProfile.subscription.expiryDate,
        isExpired
      };
    }
    
    return {
      planType: userProfile.subscription as string,
      expiryDate: null,
      isExpired: false
    };
  };

  const subscriptionDetails = getSubscriptionDetails();

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    setShowMoodSelector(false);
    if (onMoodChange) {
      onMoodChange(mood);
    }
  };

  // Enhanced daily suggestions based on time
  const getDailySmartSuggestions = () => {
    const currentHour = new Date().getHours();
    
    if (currentHour < 12) {
      return {
        timeOfDay: 'Morning',
        icon: <Sun className="h-4 w-4" />,
        suggestions: [
          { text: 'Review yesterday\'s Physics concepts', action: 'Start Review', route: '/dashboard/student/concepts' },
          { text: 'Complete 20 Chemistry MCQs', action: 'Practice Now', route: '/dashboard/student/practice-exam' },
          { text: 'Plan today\'s study schedule', action: 'Plan Now', route: '/dashboard/student/today' }
        ]
      };
    } else if (currentHour < 17) {
      return {
        timeOfDay: 'Afternoon',
        icon: <Sun className="h-4 w-4" />,
        suggestions: [
          { text: 'Focus on Biology weak areas', action: 'Study Now', route: '/dashboard/student/concepts' },
          { text: 'Take a mock test', action: 'Start Test', route: '/dashboard/student/practice-exam' },
          { text: 'Review flashcards', action: 'Review', route: '/dashboard/student/flashcards' }
        ]
      };
    } else if (currentHour < 20) {
      return {
        timeOfDay: 'Evening',
        icon: <Sunset className="h-4 w-4" />,
        suggestions: [
          { text: 'Solve previous year questions', action: 'Solve Now', route: '/dashboard/student/practice-exam' },
          { text: 'Revise formulas', action: 'Revise', route: '/dashboard/student/concepts' },
          { text: 'Quick concept recap', action: 'Recap', route: '/dashboard/student/flashcards' }
        ]
      };
    } else {
      return {
        timeOfDay: 'Night',
        icon: <Moon className="h-4 w-4" />,
        suggestions: [
          { text: 'Light revision before sleep', action: 'Revise', route: '/dashboard/student/concepts' },
          { text: 'Review today\'s progress', action: 'Review', route: '/dashboard/student/today' },
          { text: 'Plan tomorrow\'s goals', action: 'Plan', route: '/dashboard/student/academic' }
        ]
      };
    }
  };

  const smartSuggestions = getDailySmartSuggestions();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 ${selectedMood ? `mood-${selectedMood.toLowerCase()}` : ''}`}>
      {/* Top Stats Bar */}
      <div className="mb-6 bg-white rounded-xl shadow-lg border border-purple-200 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-sm text-gray-600">Exam</div>
              <div className="font-bold text-purple-800">{examDetails.exam}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Goal</div>
              <div className="font-bold text-green-600">{examDetails.goal}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Days to Go</div>
              <div className="font-bold text-red-600">{examDetails.daysToGo}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Pace</div>
              <div className="font-bold text-blue-600">{examDetails.pace}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Style</div>
              <div className="font-bold text-orange-600">{examDetails.learnerStyle}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Mood</div>
              <div className="font-bold text-purple-600 flex items-center gap-1">
                😰 {selectedMood}
              </div>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/dashboard/student/academic')}
            className="text-purple-600 border-purple-200"
          >
            Switch Exam / New Plan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* User Profile & Subscription Card */}
          <Card className="premium-card bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                    <AvatarFallback>{userProfile.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <Crown className="h-4 w-4" />
                      <span className="text-purple-100">{subscriptionDetails.planType} Plan</span>
                      {subscriptionDetails.expiryDate && (
                        <span className="text-sm text-purple-200">
                          • Expires: {new Date(subscriptionDetails.expiryDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="secondary"
                  onClick={() => navigate('/dashboard/student/subscription')}
                  className="bg-white text-purple-600 hover:bg-purple-50"
                >
                  <Upgrade className="h-4 w-4 mr-2" />
                  Upgrade Plan
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Enhanced Exam Readiness Score */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Exam Readiness Score - NEET 2026
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">78%</div>
                  <div className="text-sm text-gray-600">Overall Readiness</div>
                  <Progress value={78} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">85%</div>
                  <div className="text-sm text-gray-600">Recall Mastery</div>
                  <Progress value={85} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">72%</div>
                  <div className="text-sm text-gray-600">Average Exam Score</div>
                  <Progress value={72} className="mt-2" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">680</div>
                  <div className="text-sm text-gray-600">Predicted Score</div>
                  <div className="text-xs text-green-600 mt-1">↗ +15 from last week</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Today's Top Priority */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-600" />
                Today's Top Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800">High Priority</h4>
                  <p className="text-sm text-red-600 mt-1">Organic Chemistry - Reactions</p>
                  <Button 
                    size="sm" 
                    className="mt-2 bg-red-600 hover:bg-red-700"
                    onClick={() => navigate('/dashboard/student/concepts/organic-chemistry-reactions')}
                  >
                    Study Now
                  </Button>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800">Medium Priority</h4>
                  <p className="text-sm text-yellow-600 mt-1">Physics - Mechanics</p>
                  <Button 
                    size="sm" 
                    className="mt-2 bg-yellow-600 hover:bg-yellow-700"
                    onClick={() => navigate('/dashboard/student/concepts/physics-mechanics')}
                  >
                    Review
                  </Button>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800">Practice</h4>
                  <p className="text-sm text-green-600 mt-1">Biology - Mock Test</p>
                  <Button 
                    size="sm" 
                    className="mt-2 bg-green-600 hover:bg-green-700"
                    onClick={() => navigate('/dashboard/student/practice-exam')}
                  >
                    Take Test
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Today's NEET Study Plan */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                Today's NEET Study Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <span className="font-medium">Morning Session</span>
                    <p className="text-sm text-gray-600">Physics - Current Electricity (2 hours)</p>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => navigate('/dashboard/student/today')}
                  >
                    Start
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <span className="font-medium">Afternoon Session</span>
                    <p className="text-sm text-gray-600">Chemistry - Organic Reactions (1.5 hours)</p>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => navigate('/dashboard/student/today')}
                  >
                    Continue
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <span className="font-medium">Evening Session</span>
                    <p className="text-sm text-gray-600">Biology - Genetics (1 hour)</p>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => navigate('/dashboard/student/today')}
                  >
                    Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Mood-Based Learning */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Mood-Based Learning Optimization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Current Mood: {selectedMood}</p>
                    <p className="text-sm text-gray-600">
                      {selectedMood === MoodType.STRESSED ? 'Light study plan with breaks' : 'Regular study intensity'}
                    </p>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => setShowMoodSelector(true)}
                  >
                    Change Mood
                  </Button>
                </div>
                
                {showMoodSelector && (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="font-medium mb-3">How are you feeling today?</h4>
                    <MoodSelector
                      currentMood={selectedMood}
                      onMoodSelect={handleMoodSelect}
                      className="grid grid-cols-4 gap-2"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-medium text-blue-800">Today's Tasks</h4>
                    <p className="text-2xl font-bold text-blue-600">
                      {selectedMood === MoodType.STRESSED ? '3' : '5'} tasks
                    </p>
                    <p className="text-sm text-blue-600">Adjusted for your mood</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-medium text-green-800">Recommended Break</h4>
                    <p className="text-lg font-bold text-green-600">
                      {selectedMood === MoodType.STRESSED ? '15 min' : '10 min'}
                    </p>
                    <p className="text-sm text-green-600">Every hour</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Daily Smart Suggestions */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {smartSuggestions.icon}
                Daily Smart Suggestions - {smartSuggestions.timeOfDay}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {smartSuggestions.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">{suggestion.text}</span>
                    <Button 
                      size="sm"
                      onClick={() => navigate(suggestion.route)}
                    >
                      {suggestion.action}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Advanced Concept Mastery Techniques */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-600" />
                Advanced Concept Mastery Techniques for NEET 2026
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Visual Learning
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">Organic Chemistry - Weak Area</p>
                  <Button 
                    size="sm" 
                    className="mt-2"
                    onClick={() => navigate('/dashboard/student/concepts/organic-chemistry')}
                  >
                    Study Concepts
                  </Button>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Flashcard Practice
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">Physics Formulas - Practice</p>
                  <Button 
                    size="sm" 
                    className="mt-2"
                    onClick={() => navigate('/dashboard/student/flashcards/1/interactive')}
                  >
                    Interactive Practice
                  </Button>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Formula Mastery
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">Mathematics - Integration</p>
                  <Button 
                    size="sm" 
                    className="mt-2"
                    onClick={() => navigate('/dashboard/student/concepts/mathematics-integration')}
                  >
                    Formula Lab
                  </Button>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Practice Tests
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">Biology - Genetics Quiz</p>
                  <Button 
                    size="sm" 
                    className="mt-2"
                    onClick={() => navigate('/dashboard/student/practice-exam')}
                  >
                    Take Quiz
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weak Areas - Enhanced */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-red-600" />
                Weak Areas - Improve Now
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800">Organic Chemistry</h4>
                  <p className="text-sm text-red-600">42% mastery</p>
                  <div className="flex gap-2 mt-3">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate('/dashboard/student/concepts/organic-chemistry')}
                    >
                      Concepts
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate('/dashboard/student/flashcards/1/interactive')}
                    >
                      Recall
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate('/dashboard/student/practice-exam')}
                    >
                      Exam
                    </Button>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800">Thermodynamics</h4>
                  <p className="text-sm text-yellow-600">55% mastery</p>
                  <div className="flex gap-2 mt-3">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate('/dashboard/student/concepts/thermodynamics')}
                    >
                      Concepts
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate('/dashboard/student/flashcards/1/interactive')}
                    >
                      Recall
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate('/dashboard/student/practice-exam')}
                    >
                      Exam
                    </Button>
                  </div>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800">Vectors</h4>
                  <p className="text-sm text-orange-600">48% mastery</p>
                  <div className="flex gap-2 mt-3">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate('/dashboard/student/concepts/vectors')}
                    >
                      Concepts
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate('/dashboard/student/flashcards/1/interactive')}
                    >
                      Recall
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate('/dashboard/student/practice-exam')}
                    >
                      Exam
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strong Areas - Enhanced */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-green-600" />
                Strong Areas - Maintain Excellence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800">Algebra</h4>
                  <p className="text-sm text-green-600">92% mastery</p>
                  <div className="flex gap-2 mt-3">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate('/dashboard/student/concepts/algebra')}
                    >
                      Concepts
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate('/dashboard/student/flashcards/1/interactive')}
                    >
                      Recall
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate('/dashboard/student/practice-exam')}
                    >
                      Exam
                    </Button>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800">Mechanics</h4>
                  <p className="text-sm text-blue-600">88% mastery</p>
                  <div className="flex gap-2 mt-3">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate('/dashboard/student/concepts/mechanics')}
                    >
                      Concepts
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate('/dashboard/student/flashcards/1/interactive')}
                    >
                      Recall
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate('/dashboard/student/practice-exam')}
                    >
                      Exam
                    </Button>
                  </div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800">Biology</h4>
                  <p className="text-sm text-purple-600">85% mastery</p>
                  <div className="flex gap-2 mt-3">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate('/dashboard/student/concepts/biology')}
                    >
                      Concepts
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate('/dashboard/student/flashcards/1/interactive')}
                    >
                      Recall
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate('/dashboard/student/practice-exam')}
                    >
                      Exam
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* NEET-Specific AI Tutor */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                NEET AI Tutor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    "Focus on Organic Chemistry today. Your weak areas in reactions need attention."
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => navigate('/dashboard/student/tutor')}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Chat
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      if ('speechSynthesis' in window) {
                        const utterance = new SpeechSynthesisUtterance("Let's focus on Organic Chemistry today. Your weak areas in reactions need attention.");
                        window.speechSynthesis.speak(utterance);
                      }
                    }}
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Coach Suggestions */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                AI Coach Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <h4 className="font-medium text-purple-800">Study Technique</h4>
                  <p className="text-sm text-purple-600">
                    Try active recall for Chemistry formulas
                  </p>
                  <Button 
                    size="sm" 
                    className="mt-2"
                    onClick={() => navigate('/dashboard/student/flashcards/1/interactive')}
                  >
                    Try Now
                  </Button>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-medium text-green-800">Time Management</h4>
                  <p className="text-sm text-green-600">
                    Take a 5-minute break after this session
                  </p>
                  <Button 
                    size="sm" 
                    className="mt-2"
                    onClick={() => navigate('/dashboard/student/feel-good-corner')}
                  >
                    Relax
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Insights */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Performance Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">+12%</div>
                  <div className="text-sm text-gray-600">This week's improvement</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Physics</span>
                    <span className="text-green-600">↗ +8%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Chemistry</span>
                    <span className="text-red-600">↘ -2%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Biology</span>
                    <span className="text-green-600">↗ +15%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  className="w-full justify-start"
                  onClick={() => navigate('/dashboard/student/practice-exam')}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Mock Test
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/dashboard/student/flashcards')}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Quick Revision
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/dashboard/student/academic')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Study Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Surrounding Influences Section at Bottom */}
      <div className="mt-12">
        <SurroundingInfluencesSection 
          influenceMeterCollapsed={influenceMeterCollapsed}
          setInfluenceMeterCollapsed={setInfluenceMeterCollapsed}
        />
      </div>

      <style jsx>{`
        .premium-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%);
          border: 1px solid rgba(147, 51, 234, 0.1);
          box-shadow: 0 8px 32px rgba(147, 51, 234, 0.1);
          backdrop-filter: blur(10px);
        }
        
        .mood-stressed {
          background: linear-gradient(135deg, #fef7cd 0%, #fef3c7 50%, #fed7aa 100%);
        }
        
        .mood-happy {
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%);
        }
        
        .mood-focused {
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%);
        }
      `}</style>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
