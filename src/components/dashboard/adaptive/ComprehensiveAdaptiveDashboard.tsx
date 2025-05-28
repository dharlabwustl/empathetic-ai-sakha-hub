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
  ChevronDown, ChevronUp, Lightbulb, Volume2, Mic
} from 'lucide-react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MoodSelector } from '../student/MoodSelector';
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

  // Key dashboard stats based on user's subscription and exam
  const examInfo = {
    name: "NEET 2026",
    daysLeft: 185,
    learningStyle: "Visual",
    profileType: "Moderate"
  };

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

  return (
    <div className="space-y-6 p-6">
      {/* Top Key Stats Bar */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Goal</div>
              <div className="font-bold text-blue-600">{examInfo.name}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Days Left</div>
              <div className="font-bold text-red-600">{examInfo.daysLeft}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Pace</div>
              <div className="font-bold text-green-600">{examInfo.profileType}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Learning Style</div>
              <div className="font-bold text-purple-600">{examInfo.learningStyle}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Current Mood</div>
              <div className="font-bold text-orange-600 flex items-center gap-1">
                😰 {selectedMood}
              </div>
            </div>
          </div>
          <Dialog open={showMoodDialog} onOpenChange={setShowMoodDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Update Mood
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>How are you feeling today?</DialogTitle>
              </DialogHeader>
              <MoodSelector 
                currentMood={selectedMood}
                onMoodSelect={handleMoodSelect}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Header Section with User Info and Key Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* User Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={userProfile.avatar || userProfile.photoURL} />
                <AvatarFallback>{userProfile.name?.split(' ').map(n => n[0]).join('') || 'AS'}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{userProfile.name || 'Amit Singh'}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">{examInfo.name}</Badge>
                  <Badge variant="secondary">{examInfo.daysLeft} days</Badge>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">{examInfo.learningStyle}</Badge>
                  <Badge variant="outline">{examInfo.profileType}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exam Readiness Score - Enhanced */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl">Exam Readiness Score - {examInfo.name}</CardTitle>
                <p className="text-sm text-muted-foreground">+2% this week</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => navigate('/subscription')}
                className="text-blue-600"
              >
                {userProfile.subscription?.planType || 'Free'} Plan
                {userProfile.subscription?.expiryDate && (
                  <span className="ml-1 text-xs">
                    (expires {new Date(userProfile.subscription.expiryDate).toLocaleDateString()})
                  </span>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">72%</div>
                <div className="text-sm font-medium">Overall Readiness</div>
                <Progress value={72} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">75%</div>
                <div className="text-sm">Concept Mastery</div>
                <Progress value={75} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">68%</div>
                <div className="text-sm">Recall Accuracy</div>
                <Progress value={68} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">82%</div>
                <div className="text-sm">Predicted Score</div>
                <Progress value={82} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">78%</div>
                <div className="text-sm">Average Exam</div>
                <Progress value={78} className="mt-2" />
              </div>
            </div>
            
            <div className="mt-6 h-32">
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
      </div>

      {/* Personalized Study Plan Based on Mood */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Today's Study Plan</CardTitle>
          <p className="text-sm text-muted-foreground">
            Optimized for a {selectedMood} mood
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Physics */}
            <div className="border rounded-lg p-4">
              <h4 className="font-medium flex items-center gap-1">
                <Zap className="h-4 w-4 text-red-500" /> Physics
              </h4>
              <p className="text-sm text-muted-foreground">
                {studyPlan.physics.duration} | {studyPlan.physics.tasks} tasks
              </p>
              <Button variant="outline" className="w-full mt-2">Start Physics</Button>
            </div>

            {/* Chemistry */}
            <div className="border rounded-lg p-4">
              <h4 className="font-medium flex items-center gap-1">
                <Brain className="h-4 w-4 text-green-500" /> Chemistry
              </h4>
              <p className="text-sm text-muted-foreground">
                {studyPlan.chemistry.duration} | {studyPlan.chemistry.tasks} tasks
              </p>
              <Button variant="outline" className="w-full mt-2">Start Chemistry</Button>
            </div>

            {/* Biology */}
            <div className="border rounded-lg p-4">
              <h4 className="font-medium flex items-center gap-1">
                <BookOpen className="h-4 w-4 text-blue-500" /> Biology
              </h4>
              <p className="text-sm text-muted-foreground">
                {studyPlan.biology.duration} | {studyPlan.biology.tasks} tasks
              </p>
              <Button variant="outline" className="w-full mt-2">Start Biology</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions and Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Practice Exams */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <PlayCircle className="h-5 w-5 text-blue-500" />
              Practice Exams
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Take a practice exam to test your knowledge and identify areas for improvement.
            </p>
            <Button variant="secondary" className="w-full">Start Practice Exam</Button>
          </CardContent>
        </Card>

        {/* Flashcard Review */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Flashcard Review
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Review key concepts and formulas with flashcards to reinforce your understanding.
            </p>
            <Button variant="secondary" className="w-full">Review Flashcards</Button>
          </CardContent>
        </Card>

        {/* Community Forum */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-500" />
              Community Forum
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Connect with other students, ask questions, and share your knowledge.
            </p>
            <Button variant="secondary" className="w-full">Visit Forum</Button>
          </CardContent>
        </Card>
      </div>

      {/* Goal Setting and Progress Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-500" />
            Goal Setting and Progress Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium">Current Goal</h4>
              <p className="text-sm text-muted-foreground">Achieve a score of 650+ in NEET 2024</p>
            </div>
            <div>
              <h4 className="font-medium">Progress</h4>
              <p className="text-sm text-muted-foreground">72% complete</p>
              <Progress value={72} className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Surrounding Influences Section at Bottom */}
      <SurroundingInfluencesSection 
        influenceMeterCollapsed={influenceMeterCollapsed}
        setInfluenceMeterCollapsed={setInfluenceMeterCollapsed}
      />
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
