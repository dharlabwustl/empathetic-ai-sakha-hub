
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Zap, 
  User, 
  BookOpen,
  Brain,
  Target,
  TrendingUp,
  Clock,
  Star,
  Award,
  ChevronRight,
  Play,
  BarChart3,
  Heart,
  Sparkles,
  Timer,
  CheckCircle2,
  AlertCircle,
  Trophy,
  Flame
} from 'lucide-react';
import SurroundingInfluencesMeter from '../student/SurroundingInfluencesMeter';

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
  const [selectedMood, setSelectedMood] = useState<MoodType>(currentMood || MoodType.Motivated);

  // Mock data for enhanced dashboard
  const examReadinessScore = 72;
  const daysToExam = 185;
  const studyStreak = 15;
  const studyHours = 127;
  const testsCompleted = 23;

  const subjectProgress = [
    { name: 'Physics', progress: 68, color: 'bg-blue-500', priority: 'High' },
    { name: 'Chemistry', progress: 78, color: 'bg-green-500', priority: 'Medium' },
    { name: 'Biology', progress: 92, color: 'bg-purple-500', priority: 'High' }
  ];

  const todaysPlan = [
    { subject: 'Physics', topic: 'Thermodynamics', duration: '2h 30m', color: 'bg-blue-500' },
    { subject: 'Chemistry', topic: 'Organic Chemistry', duration: '2h 15m', color: 'bg-green-500' },
    { subject: 'Biology', topic: 'Genetics', duration: '2h 45m', color: 'bg-purple-500' }
  ];

  const weakAreas = [
    { topic: 'Thermodynamics', subject: 'Physics', accuracy: 42 },
    { topic: 'Organic Reactions', subject: 'Chemistry', accuracy: 58 },
    { topic: 'Genetics & Evolution', subject: 'Biology', accuracy: 65 }
  ];

  const strongAreas = [
    { topic: 'Mechanics', subject: 'Physics', accuracy: 89 },
    { topic: 'Algebra', subject: 'Mathematics', accuracy: 92 },
    { topic: 'Inorganic Chemistry', subject: 'Chemistry', accuracy: 85 }
  ];

  const moodOptions = [
    { mood: MoodType.Motivated, emoji: '😊', label: 'Motivated', theme: 'bg-gradient-to-r from-green-400 to-blue-500' },
    { mood: MoodType.Stressed, emoji: '😰', label: 'Stressed', theme: 'bg-gradient-to-r from-red-400 to-orange-500' },
    { mood: MoodType.Confident, emoji: '😎', label: 'Confident', theme: 'bg-gradient-to-r from-purple-400 to-pink-500' },
    { mood: MoodType.Tired, emoji: '😴', label: 'Tired', theme: 'bg-gradient-to-r from-gray-400 to-gray-600' },
    { mood: MoodType.Excited, emoji: '🚀', label: 'Excited', theme: 'bg-gradient-to-r from-yellow-400 to-orange-500' }
  ];

  const advancedTechniques = [
    { title: 'Interactive Visual Diagrams', description: 'Dynamic diagrams & pattern recognition', icon: <BarChart3 className="h-5 w-5" /> },
    { title: '3D Models & Simulations', description: 'Live interactive molecular models', icon: <Brain className="h-5 w-5" /> },
    { title: 'Video Explanations', description: 'Step-by-step visual tutorials', icon: <Play className="h-5 w-5" /> },
    { title: 'Audio Explanations', description: 'Detailed narrated content', icon: <Zap className="h-5 w-5" /> },
    { title: 'Spaced Repetition', description: 'AI-powered adaptive review system', icon: <Clock className="h-5 w-5" /> },
    { title: 'Formula Mastery', description: 'Interactive numerical problem solving', icon: <Target className="h-5 w-5" /> }
  ];

  const handleMoodChange = (mood: MoodType) => {
    setSelectedMood(mood);
    if (onMoodChange) onMoodChange(mood);
  };

  const getPlanDetails = () => {
    if (!userProfile.subscription) return { name: 'Free Plan', expiryDate: null };
    
    if (typeof userProfile.subscription === 'string') {
      return { name: userProfile.subscription.toUpperCase() + ' Plan', expiryDate: null };
    }
    
    return {
      name: (userProfile.subscription.planType || 'Free').toUpperCase() + ' Plan',
      expiryDate: userProfile.subscription.expiryDate
    };
  };

  const planDetails = getPlanDetails();

  return (
    <div className="space-y-6">
      {/* Top Section - Surrounding Influences Meter */}
      <SurroundingInfluencesMeter />

      {/* User Profile Header with Subscription Info */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 ring-4 ring-white shadow-lg">
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg">
                  {userProfile.name?.split(' ').map(n => n[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Good evening, {userProfile.name}! 🚀</h1>
                <p className="text-gray-600 dark:text-gray-300">Ready to conquer your goals today?</p>
                <div className="flex items-center mt-2 space-x-4">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    NEET 2026
                  </Badge>
                  <span className="text-sm text-gray-500">{daysToExam} days left</span>
                  <Badge className="bg-green-100 text-green-800">
                    {planDetails.name}
                  </Badge>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/dashboard/student/subscription')}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Upgrade Plan
            </Button>
          </div>
          {planDetails.expiryDate && (
            <div className="mt-4 text-sm text-gray-600">
              Plan expires: {new Date(planDetails.expiryDate).toLocaleDateString()}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Exam Readiness Score */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-6 w-6 mr-2 text-blue-500" />
            Exam Readiness Score - NEET 2026
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{examReadinessScore}%</div>
              <p className="text-sm text-gray-600">Overall Readiness</p>
            </div>
            <div className="space-y-3">
              {subjectProgress.map((subject, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{subject.name} Progress</span>
                    <span className="text-sm font-bold">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              ))}
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">75%</div>
              <p className="text-sm text-gray-600">Concept Mastery</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{daysToExam}</div>
              <p className="text-sm text-gray-600">Days to Exam</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Priority & Study Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-6 w-6 mr-2 text-red-500" />
              Today's Top Priority
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200">
              <h3 className="font-bold text-lg">Physics - Thermodynamics</h3>
              <p className="text-red-600 mb-4">Accuracy: 42% - Needs immediate attention for NEET</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">📖 Interactive 3D Models</Badge>
                <Badge variant="outline">🔁 Visual Diagrams</Badge>
                <Badge variant="outline">📝 NEET Practice Questions</Badge>
              </div>
              <Button className="w-full bg-red-500 hover:bg-red-600">
                Enter Focus Mode
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-blue-500" />
              Today's NEET Study Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaysPlan.map((plan, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${plan.color}`}></div>
                    <div>
                      <p className="font-medium">{plan.subject}</p>
                      <p className="text-sm text-gray-600">{plan.topic}</p>
                    </div>
                  </div>
                  <span className="font-medium">{plan.duration}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              📅 View NEET Study Schedule
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Mood-Based Learning */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="h-6 w-6 mr-2 text-pink-500" />
            Mood-Based Learning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">How are you feeling today? Log your mood to get personalized study recommendations</p>
          <div className="grid grid-cols-5 gap-3 mb-4">
            {moodOptions.map(({ mood, emoji, label, theme }) => (
              <Button
                key={mood}
                variant={selectedMood === mood ? "default" : "outline"}
                className={`h-20 flex-col space-y-2 ${selectedMood === mood ? theme : ''}`}
                onClick={() => handleMoodChange(mood)}
              >
                <span className="text-2xl">{emoji}</span>
                <span className="text-xs">{label}</span>
              </Button>
            ))}
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Based on your {selectedMood} mood, we recommend {selectedMood === MoodType.Stressed ? 'shorter study sessions with breaks' : 'intensive focus sessions'}.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* AI Coach Suggestions */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-6 w-6 mr-2 text-purple-500" />
            NEET Specific AI Tutor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-purple-200">
            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 dark:bg-purple-900/40 p-2 rounded-full">
                <Sparkles className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-purple-800 dark:text-purple-300">AI Coach Suggestion</h4>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Your focus drops after 20 mins in Physics. Try breaking thermodynamics into 15-minute focused sessions with 5-minute breaks.
                </p>
                <Button size="sm" className="mt-3 bg-purple-500 hover:bg-purple-600">
                  <Timer className="h-4 w-4 mr-2" />
                  Start Break Timer
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Smart Suggestions */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-6 w-6 mr-2 text-yellow-500" />
            Daily Smart Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">🍅</span>
                <h4 className="font-medium">Focus Improvement</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Try the Pomodoro Technique: 25 minutes focused study, 5-minute break
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Start Pomodoro Session
              </Button>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <Target className="h-5 w-5 mr-2 text-green-600" />
                <h4 className="font-medium">Accuracy Boost</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Practice 10 thermodynamics problems to improve your 42% accuracy
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Start Practice
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Concept Mastery Techniques */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="h-6 w-6 mr-2 text-indigo-500" />
            Advanced Concept Mastery Techniques for NEET 2026 - Visual Learning
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {advancedTechniques.map((technique, index) => (
              <Card key={index} className="border-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <div className="bg-indigo-100 dark:bg-indigo-900/40 p-2 rounded-lg mr-3">
                      {technique.icon}
                    </div>
                    <h4 className="font-medium text-sm">{technique.title}</h4>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">{technique.description}</p>
                  <Button size="sm" variant="outline" className="w-full">
                    Start Session
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-red-600">Weak Areas - Improve Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weakAreas.map((area, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div>
                    <p className="font-medium">{area.topic}</p>
                    <p className="text-sm text-gray-600">{area.subject}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">{area.accuracy}%</p>
                    <Button size="sm" variant="outline" className="mt-1">
                      Improve Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-green-600">Strong Areas - Advance Practice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {strongAreas.map((area, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div>
                    <p className="font-medium">{area.topic}</p>
                    <p className="text-sm text-gray-600">{area.subject}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{area.accuracy}%</p>
                    <Button size="sm" variant="outline" className="mt-1">
                      Advance
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress & Motivation */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
            Progress & Motivation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-orange-500 flex items-center justify-center">
                <Flame className="h-6 w-6 mr-1" />
                {studyStreak}
              </div>
              <p className="text-sm text-gray-600">Day Streak</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">{studyHours}h</div>
              <p className="text-sm text-gray-600">Study Hours</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">{testsCompleted}</div>
              <p className="text-sm text-gray-600">Tests Done</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-500">{examReadinessScore}%</div>
              <p className="text-sm text-gray-600">Exam Ready</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-3">Recent Achievements</h4>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-yellow-100 text-yellow-800">🏆 Week Warrior</Badge>
              <Badge className="bg-blue-100 text-blue-800">📚 Study Streak</Badge>
              <Badge className="bg-green-100 text-green-800">🎯 Accuracy Boost</Badge>
              <Badge className="bg-purple-100 text-purple-800">⚡ Speed Master</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
