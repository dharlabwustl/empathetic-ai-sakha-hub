
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { 
  TrendingUp, Calendar, Clock, Target, Brain, BookOpen, 
  Zap, Trophy, PlayCircle, MessageSquare, ChevronRight,
  AlertCircle, CheckCircle2, Star, BarChart3, Users,
  ChevronDown, ChevronUp, Lightbulb, Volume2, Mic,
  Sun, CloudSun, Sunset, Moon, Sparkles
} from 'lucide-react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
  currentMood = MoodType.MOTIVATED,
  onMoodChange
}) => {
  const navigate = useNavigate();
  const [showMoodDialog, setShowMoodDialog] = useState(false);
  const [influenceMeterCollapsed, setInfluenceMeterCollapsed] = useState(true);
  const [selectedMood, setSelectedMood] = useState(currentMood);

  // Sample data
  const examReadinessData = [
    { week: '1w ago', score: 65 },
    { week: '6d ago', score: 67 },
    { week: '5d ago', score: 69 },
    { week: '4d ago', score: 70 },
    { week: '3d ago', score: 71 },
    { week: '2d ago', score: 72 },
    { week: 'Today', score: 72 }
  ];

  // Get subscription details safely
  const getSubscriptionDetails = () => {
    if (!userProfile.subscription) {
      return { planType: 'Free', expiryDate: null };
    }
    
    if (typeof userProfile.subscription === 'string') {
      return { planType: userProfile.subscription, expiryDate: null };
    }
    
    return {
      planType: userProfile.subscription.planType || 'Free',
      expiryDate: userProfile.subscription.expiryDate
    };
  };

  const subscription = getSubscriptionDetails();

  // Key dashboard stats
  const examInfo = {
    name: "NEET 2026",
    daysLeft: 185,
    learningStyle: "Visual",
    profileType: "Moderate"
  };

  // Mood options with emojis
  const moodOptions = [
    { type: MoodType.MOTIVATED, emoji: '🚀', label: 'Motivated' },
    { type: MoodType.FOCUSED, emoji: '🎯', label: 'Focused' },
    { type: MoodType.HAPPY, emoji: '😊', label: 'Happy' },
    { type: MoodType.STRESSED, emoji: '😰', label: 'Stressed' },
    { type: MoodType.TIRED, emoji: '😴', label: 'Tired' },
    { type: MoodType.ANXIOUS, emoji: '😟', label: 'Anxious' },
    { type: MoodType.CONFUSED, emoji: '😕', label: 'Confused' },
    { type: MoodType.OVERWHELMED, emoji: '😵', label: 'Overwhelmed' }
  ];

  // Mood-based study plan adjustment
  const getMoodBasedStudyPlan = (mood: MoodType) => {
    const basePlan = {
      physics: { duration: '2h 30m', tasks: 4 },
      chemistry: { duration: '2h 15m', tasks: 3 },
      biology: { duration: '2h 45m', tasks: 5 }
    };

    const moodAdjustments = {
      [MoodType.MOTIVATED]: { multiplier: 1.2, extraTasks: 2 },
      [MoodType.STRESSED]: { multiplier: 0.8, extraTasks: -1 },
      [MoodType.TIRED]: { multiplier: 0.7, extraTasks: -2 },
      [MoodType.FOCUSED]: { multiplier: 1.1, extraTasks: 1 },
      [MoodType.ANXIOUS]: { multiplier: 0.9, extraTasks: 0 },
      [MoodType.HAPPY]: { multiplier: 1.0, extraTasks: 1 },
      [MoodType.CONFUSED]: { multiplier: 0.8, extraTasks: -1 },
      [MoodType.OVERWHELMED]: { multiplier: 0.6, extraTasks: -2 }
    };

    const adjustment = moodAdjustments[mood] || { multiplier: 1.0, extraTasks: 0 };
    
    return {
      physics: { 
        duration: Math.round(150 * adjustment.multiplier) + 'm', 
        tasks: Math.max(1, basePlan.physics.tasks + adjustment.extraTasks)
      },
      chemistry: { 
        duration: Math.round(135 * adjustment.multiplier) + 'm', 
        tasks: Math.max(1, basePlan.chemistry.tasks + adjustment.extraTasks)
      },
      biology: { 
        duration: Math.round(165 * adjustment.multiplier) + 'm', 
        tasks: Math.max(1, basePlan.biology.tasks + adjustment.extraTasks)
      }
    };
  };

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    onMoodChange?.(mood);
    setShowMoodDialog(false);
    
    // Apply theme changes based on mood
    const themes = {
      [MoodType.MOTIVATED]: 'theme-energetic',
      [MoodType.STRESSED]: 'theme-calm',
      [MoodType.TIRED]: 'theme-gentle',
      [MoodType.FOCUSED]: 'theme-sharp',
      [MoodType.ANXIOUS]: 'theme-soothing',
      [MoodType.HAPPY]: 'theme-bright',
      [MoodType.CONFUSED]: 'theme-clear',
      [MoodType.OVERWHELMED]: 'theme-minimal'
    };
    
    document.body.className = themes[mood] || '';
  };

  const studyPlan = getMoodBasedStudyPlan(selectedMood);
  const currentMoodOption = moodOptions.find(m => m.type === selectedMood) || moodOptions[0];

  return (
    <div className="space-y-6 p-6">
      {/* Top Stats Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="font-bold">NEET 2026</div>
              <div className="text-sm opacity-80">Goal</div>
            </div>
            <div className="text-center">
              <div className="font-bold">185</div>
              <div className="text-sm opacity-80">days</div>
            </div>
            <div className="text-center">
              <div className="font-bold">Moderate</div>
              <div className="text-sm opacity-80">Pace</div>
            </div>
            <div className="text-center">
              <div className="font-bold">Visual</div>
              <div className="text-sm opacity-80">Style</div>
            </div>
            <div className="text-center">
              <div className="font-bold">{currentMoodOption.emoji} {currentMoodOption.label}</div>
              <div className="text-sm opacity-80">Mood</div>
            </div>
          </div>
        </div>
      </div>

      {/* Surrounding Influences Section - Top */}
      <SurroundingInfluencesSection 
        influenceMeterCollapsed={influenceMeterCollapsed}
        setInfluenceMeterCollapsed={setInfluenceMeterCollapsed}
      />

      {/* Premium User Profile Card with Subscription */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-blue-300">
                <AvatarImage src={userProfile.avatar || userProfile.photoURL} />
                <AvatarFallback className="bg-blue-100 text-blue-700">
                  {userProfile.name?.split(' ').map(n => n[0]).join('') || 'AS'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold text-blue-900">{userProfile.name || 'Amit Singh'}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    Current Plan: {subscription.planType}
                  </Badge>
                  {subscription.expiryDate && (
                    <Badge variant="secondary" className="text-xs">
                      Expires: {new Date(subscription.expiryDate).toLocaleDateString()}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/subscription')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Upgrade Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Exam Readiness Score */}
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="text-xl text-green-900">Exam Readiness Score - {examInfo.name}</CardTitle>
          <p className="text-sm text-green-700">+2% improvement this week</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="text-center p-4 bg-white rounded-lg border-2 border-blue-200">
              <div className="text-3xl font-bold text-blue-600">72%</div>
              <div className="text-sm font-medium text-blue-800">Overall Readiness</div>
              <Progress value={72} className="mt-2" />
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-green-600">75%</div>
              <div className="text-sm">Concept Mastery</div>
              <Progress value={75} className="mt-2" />
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">68%</div>
              <div className="text-sm">Recall Mastery</div>
              <Progress value={68} className="mt-2" />
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-purple-600">82%</div>
              <div className="text-sm">Predicted Score</div>
              <Progress value={82} className="mt-2" />
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-orange-600">78%</div>
              <div className="text-sm">Average Exam Score</div>
              <Progress value={78} className="mt-2" />
            </div>
          </div>
          
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={examReadinessData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[60, 80]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Today's Top Priority */}
      <Card className="border-2 border-red-200 bg-gradient-to-r from-red-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-900">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Today's Top Priority
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white border-2 border-red-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-red-800">Physics - Thermodynamics</h3>
                <p className="text-red-600 text-sm">Accuracy: 42% - Needs immediate attention for NEET</p>
                <div className="flex gap-2 mt-3">
                  <Button 
                    size="sm" 
                    onClick={() => navigate('/concept-detail/thermodynamics')}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    📖 Concept Cards
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate('/concept-detail/thermodynamics')}
                  >
                    🔁 Visual Diagrams
                  </Button>
                </div>
              </div>
              <Button onClick={() => navigate('/focus-mode')}>
                Enter Focus Mode
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's NEET Study Plan */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-blue-900">Today's NEET Study Plan</CardTitle>
            <Button 
              variant="outline" 
              onClick={() => navigate('/today-plan')}
              className="flex items-center gap-2 border-blue-300 text-blue-700"
            >
              📅 View Full Schedule
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border-2 border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800">Physics</h3>
              <p className="text-2xl font-bold text-blue-600">{studyPlan.physics.duration}</p>
              <p className="text-sm text-blue-600">{studyPlan.physics.tasks} tasks planned</p>
            </div>
            <div className="bg-white border-2 border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800">Chemistry</h3>
              <p className="text-2xl font-bold text-green-600">{studyPlan.chemistry.duration}</p>
              <p className="text-sm text-green-600">{studyPlan.chemistry.tasks} tasks planned</p>
            </div>
            <div className="bg-white border-2 border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800">Biology</h3>
              <p className="text-2xl font-bold text-purple-600">{studyPlan.biology.duration}</p>
              <p className="text-sm text-purple-600">{studyPlan.biology.tasks} tasks planned</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Mood-Based Learning */}
      <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="text-purple-900">Mood-Based Learning</CardTitle>
          <p className="text-sm text-purple-700">
            Your current mood affects your study plan and recommendations
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-white border-2 border-purple-200 rounded-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{currentMoodOption.emoji}</span>
              <div>
                <p className="font-medium text-purple-900">Current Mood: {currentMoodOption.label}</p>
                <p className="text-sm text-purple-700">
                  Study plan adjusted for optimal performance
                </p>
              </div>
            </div>
            <Dialog open={showMoodDialog} onOpenChange={setShowMoodDialog}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">Update Mood</Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>How are you feeling today?</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {moodOptions.map((mood) => (
                    <Button
                      key={mood.type}
                      variant={selectedMood === mood.type ? "default" : "outline"}
                      onClick={() => handleMoodSelect(mood.type)}
                      className="flex items-center gap-2 h-auto p-3"
                    >
                      <span className="text-xl">{mood.emoji}</span>
                      <span className="text-sm">{mood.label}</span>
                    </Button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* NEET Specific AI Tutor with Chat Panel */}
      <Card className="border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-900">
            <Brain className="h-5 w-5 text-indigo-500" />
            NEET Specific AI Tutor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white border-2 border-indigo-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-indigo-800">AI Coach Suggestions</h3>
                <p className="text-sm text-indigo-600">Focus areas: Physics - Thermodynamics, Chemistry - Organic</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => navigate('/chat')}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Chat
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-indigo-300"
                >
                  <Volume2 className="h-4 w-4 mr-1" />
                  Audio
                </Button>
              </div>
            </div>
            <div className="text-sm text-indigo-700 bg-indigo-50 p-3 rounded">
              "Based on your recent performance, I recommend focusing on thermodynamics concepts today. Your understanding of heat transfer needs attention for NEET success."
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Smart Suggestions */}
      <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-900">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Daily Smart Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Sun className="h-4 w-4 text-orange-500" />
                <span className="font-medium text-sm">Morning</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">Start with physics concepts when your mind is fresh</p>
              <Button size="sm" variant="outline" className="w-full text-xs">
                Begin Physics
              </Button>
            </div>
            <div className="bg-white border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <CloudSun className="h-4 w-4 text-yellow-500" />
                <span className="font-medium text-sm">Afternoon</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">Perfect time for chemistry problem solving</p>
              <Button size="sm" variant="outline" className="w-full text-xs">
                Solve Chemistry
              </Button>
            </div>
            <div className="bg-white border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Sunset className="h-4 w-4 text-orange-600" />
                <span className="font-medium text-sm">Evening</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">Review biology with flashcards and diagrams</p>
              <Button size="sm" variant="outline" className="w-full text-xs">
                Review Biology
              </Button>
            </div>
            <div className="bg-white border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Moon className="h-4 w-4 text-indigo-500" />
                <span className="font-medium text-sm">Night</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">Light revision and tomorrow's plan</p>
              <Button size="sm" variant="outline" className="w-full text-xs">
                Plan Tomorrow
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Concept Mastery Techniques */}
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-teal-50">
        <CardHeader>
          <CardTitle className="text-green-900">Advanced Concept Mastery Techniques for NEET 2026</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Visual Learning</h3>
              <p className="text-sm text-green-600 mb-3">Weak: Thermodynamics, Organic Chemistry</p>
              <Button 
                size="sm" 
                onClick={() => navigate('/concept-detail/thermodynamics')}
                className="w-full bg-green-600 hover:bg-green-700 mb-2"
              >
                📖 Concept Cards
              </Button>
            </div>
            <div className="bg-white border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Interactive Practice</h3>
              <p className="text-sm text-blue-600 mb-3">Weak: Cell Biology, Atomic Structure</p>
              <Button 
                size="sm" 
                onClick={() => navigate('/interactive-flashcards')}
                className="w-full bg-blue-600 hover:bg-blue-700 mb-2"
              >
                🔄 Flashcards
              </Button>
            </div>
            <div className="bg-white border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-2">Formula Mastery</h3>
              <p className="text-sm text-purple-600 mb-3">Weak: Kinematics, Chemical Bonding</p>
              <Button 
                size="sm" 
                onClick={() => navigate('/concept-detail/kinematics?tab=formula')}
                className="w-full bg-purple-600 hover:bg-purple-700 mb-2"
              >
                📐 Formulas
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weak and Strong Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-2 border-red-200 bg-gradient-to-r from-red-50 to-pink-50">
          <CardHeader>
            <CardTitle className="text-red-900">Weak Areas - Improve Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-white border border-red-200 rounded p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-red-800">Thermodynamics</h4>
                    <p className="text-sm text-red-600">42% accuracy</p>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      onClick={() => navigate('/concept-detail/thermodynamics')}
                      className="text-xs"
                    >
                      Concept
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate('/interactive-flashcards/thermodynamics')}
                      className="text-xs"
                    >
                      Practice
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-red-200 rounded p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-red-800">Organic Chemistry</h4>
                    <p className="text-sm text-red-600">38% accuracy</p>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      onClick={() => navigate('/concept-detail/organic-chemistry')}
                      className="text-xs"
                    >
                      Concept
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate('/exam-taking/organic-chemistry')}
                      className="text-xs"
                    >
                      Exam
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="text-green-900">Strong Areas - Maintain Excellence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-white border border-green-200 rounded p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-green-800">Mechanics</h4>
                    <p className="text-sm text-green-600">89% accuracy</p>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      onClick={() => navigate('/concept-detail/mechanics')}
                      className="text-xs bg-green-600 hover:bg-green-700"
                    >
                      Advanced
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate('/interactive-flashcards/mechanics')}
                      className="text-xs"
                    >
                      Review
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-green-200 rounded p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-green-800">Plant Biology</h4>
                    <p className="text-sm text-green-600">85% accuracy</p>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      onClick={() => navigate('/concept-detail/plant-biology')}
                      className="text-xs bg-green-600 hover:bg-green-700"
                    >
                      Mastery
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate('/exam-taking/plant-biology')}
                      className="text-xs"
                    >
                      Test
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
